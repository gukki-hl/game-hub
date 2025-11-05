# Docker 本地开发指南

## 使用 Docker Compose（推荐）

### 开发环境

```bash
# 启动开发服务器（支持热重载）
#热重载（修改代码自动刷新）
docker-compose --profile dev up

# 或者在后台运行
docker-compose --profile dev up -d

# 查看日志
docker-compose logs -f dev

# 停止
docker-compose --profile dev down
```

访问：http://localhost:5173

### 生产环境测试

```bash
# 构建并启动生产环境
docker-compose --profile prod up --build

# 停止
docker-compose --profile prod down
```

访问：http://localhost:8080

## 使用单独的 Dockerfile

### 开发环境

```bash
# 构建开发镜像
docker build -f Dockerfile.dev -t game-hub:dev .

# 运行开发容器（挂载本地代码）
docker run -it --rm \
  -p 5173:5173 \
  -v ${PWD}:/app \
  -v /app/node_modules \
  --env-file .env \
  game-hub:dev
```

### 生产环境

```bash
# 构建生产镜像
docker build \
  --build-arg VITE_SENTRY_DSN=your-dsn \
  --build-arg VITE_APP_VERSION=1.0.0 \
  -t game-hub:prod .

# 运行生产容器
docker run -d -p 8080:8080 game-hub:prod
```

## 特性说明

### 开发环境特性

- ✅ 热重载（代码修改自动刷新）
- ✅ 本地文件挂载（无需重建镜像）
- ✅ 完整的开发工具支持
- ✅ 环境变量从 .env 文件加载

### 生产环境特性

- ✅ 多阶段构建（减小镜像体小）
- ✅ Nginx 静态服务
- ✅ 健康检查
- ✅ 非 root 用户运行
- ✅ 环境变量在构建时注入

## 常见问题

### 1. 热重载不工作

确保 `vite.config.ts` 中启用了 `usePolling: true`

### 2. 端口已被占用

修改 `docker-compose.yml` 中的端口映射，例如：

```yaml
ports:
  - "3000:5173" # 使用本地 3000 端口
```

### 3. node_modules 更新

```bash
# 重新安装依赖
docker-compose --profile dev down -v  # 删除 volume
docker-compose --profile dev up       # 重新创建
```

## 环境变量

确保你的 `.env` 文件包含：

```
VITE_SENTRY_DSN=your-sentry-dsn
VITE_API_URL=your-api-url
VITE_APP_VERSION=1.0.0
```
