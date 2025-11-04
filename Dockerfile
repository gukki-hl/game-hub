# ==========================================
# 第一阶段：构建
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# 构建参数
ARG VITE_SENTRY_DSN
ARG VITE_API_URL
ARG VITE_APP_VERSION

# 设置环境变量
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_VERSION=$VITE_APP_VERSION

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建（环境变量会被打包进去）
RUN npm run build

# ==========================================
# 第二阶段：生产
# ==========================================
FROM nginx:alpine

RUN apk add --no-cache curl

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]