# ==========================================
# 第一阶段：构建阶段
# ==========================================
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置环境变量（构建时使用，Vite 推荐 VITE_* 前缀；如用 REACT_APP_*，需 vite.config.ts 映射）
ARG VITE_API_URL
ARG VITE_SENTRY_DSN
ARG VITE_ENV
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
ENV VITE_ENV=$VITE_ENV

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖（包括 dev，用于 tsc/vite build）
RUN npm ci

# 复制所有源代码
COPY . .

# 构建生产版本（现在 tsc 会正常运行）
RUN npm run build

# ==========================================
# 第二阶段：生产阶段
# ==========================================
FROM nginx:alpine

# 安装 curl（健康检查用）
RUN apk add --no-cache curl

# 从构建阶段复制构建产物（Vite 默认 dist/）
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 Nginx 配置（处理 SPA 路由）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 创建/调整非 root 用户权限（alpine 已内置 nginx 用户 UID 101）
RUN adduser -D -H -u 101 -s /bin/false nginx 2>/dev/null || : && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

# 切换到非 root 用户
USER nginx

# 暴露标准 HTTP 端口
EXPOSE 8080

# 健康检查（统一用 80 端口）
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]