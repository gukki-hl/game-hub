# Deployment Guide - CI/CD 部署指南

## 📋 目录

- [部署概述](#部署概述)
- [部署前准备](#部署前准备)
- [本地构建部署](#本地构建部署)
- [Docker 部署](#docker-部署)
- [CI/CD 自动化部署](#cicd-自动化部署)
- [监控和追踪](#监控和追踪)
- [回滚策略](#回滚策略)
- [故障排查](#故障排查)

## 部署概述

Game Hub 支持多种部署方式，从简单的静态文件托管到完整的容器化部署。

### 部署架构

```
开发者提交代码
    ↓
Git 仓库 (GitHub/GitLab)
    ↓
CI/CD 管道 (自动触发)
    ↓
构建 Docker 镜像
    ↓
推送到容器注册表
    ↓
部署到生产环境
    ↓
Sentry 监控 + 健康检查
```

### 支持的部署方式

1. **静态文件托管** - Vercel, Netlify, GitHub Pages
2. **Docker 容器** - 任何支持 Docker 的平台
3. **云平台** - AWS, Google Cloud, Azure
4. **Kubernetes** - 企业级容器编排

## 部署前准备

### 1. 环境变量配置

创建 `.env.production` 文件：

```bash
# Sentry 错误监控
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# API 地址（如果有自己的后端）
VITE_API_URL=https://api.yourdomain.com

# 应用版本（建议使用 Git Tag 或 Commit Hash）
VITE_APP_VERSION=1.0.0

# 其他配置
VITE_APP_ENV=production
```

### 2. Sentry 配置

在 [Sentry.io](https://sentry.io) 创建项目：

1. 注册 Sentry 账号
2. 创建新项目（选择 React）
3. 获取 DSN（Data Source Name）
4. 配置 Release Tracking（可选但推荐）

### 3. 域名和 SSL 证书

- 准备域名
- 配置 DNS 记录
- 获取 SSL 证书（推荐使用 Let's Encrypt）

## 本地构建部署

### 方式 1：静态文件部署

适用于 Vercel、Netlify、GitHub Pages 等静态托管平台。

```bash
# 1. 安装依赖
npm install

# 2. 构建生产版本
npm run build

# 3. 构建产物在 dist/ 目录
# 将 dist/ 目录内容上传到静态托管平台
```

#### Vercel 部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

**Vercel 配置文件 `vercel.json`：**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_SENTRY_DSN": "@sentry-dsn",
    "VITE_APP_VERSION": "1.0.0"
  }
}
```

#### Netlify 部署

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod
```

**Netlify 配置文件 `netlify.toml`：**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 方式 2：传统服务器部署

适用于 VPS、云服务器等。

```bash
# 1. 构建
npm run build

# 2. 将 dist/ 上传到服务器
scp -r dist/* user@server:/var/www/game-hub/

# 3. 配置 Nginx
# 参考下面的 Nginx 配置
```

**Nginx 配置示例：**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 强制 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL 证书
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    root /var/www/game-hub;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # 单页应用路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Docker 部署

### 方式 1：Docker Compose（推荐）

最简单的容器化部署方式。

```bash
# 1. 确保 docker-compose.yml 和 .env.production 已配置

# 2. 构建并启动生产容器
docker-compose --profile prod up -d --build

# 3. 查看日志
docker-compose logs -f prod

# 4. 访问应用
# http://localhost:8080 或您配置的域名
```

**生产环境 docker-compose 配置：**

```yaml
services:
  prod:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - VITE_SENTRY_DSN=${VITE_SENTRY_DSN}
        - VITE_API_URL=${VITE_API_URL}
        - VITE_APP_VERSION=${VITE_APP_VERSION}
    ports:
      - "8080:8080"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/"]
      interval: 30s
      timeout: 3s
      retries: 3
```

### 方式 2：Docker 单独部署

```bash
# 1. 构建镜像
docker build \
  --build-arg VITE_SENTRY_DSN="your-dsn" \
  --build-arg VITE_APP_VERSION="1.0.0" \
  -t game-hub:1.0.0 .

# 2. 运行容器
docker run -d \
  --name game-hub \
  -p 8080:8080 \
  --restart unless-stopped \
  game-hub:1.0.0

# 3. 查看日志
docker logs -f game-hub

# 4. 健康检查
docker inspect --format='{{.State.Health.Status}}' game-hub
```

### 方式 3：推送到容器注册表

```bash
# 1. 登录 Docker Hub（或其他注册表）
docker login

# 2. 标记镜像
docker tag game-hub:1.0.0 yourusername/game-hub:1.0.0
docker tag game-hub:1.0.0 yourusername/game-hub:latest

# 3. 推送镜像
docker push yourusername/game-hub:1.0.0
docker push yourusername/game-hub:latest

# 4. 在生产服务器拉取并运行
docker pull yourusername/game-hub:latest
docker run -d -p 8080:8080 yourusername/game-hub:latest
```

## CI/CD 自动化部署

### GitHub Actions 示例

创建 `.github/workflows/deploy.yml`：

```yaml
name: Build and Deploy

on:
  push:
    branches: [main, master]
    tags:
      - 'v*'
  pull_request:
    branches: [main, master]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 获取完整 Git 历史（Sentry Release 需要）

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run build

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,prefix={{branch}}-

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          build-args: |
            VITE_SENTRY_DSN=${{ secrets.SENTRY_DSN }}
            VITE_APP_VERSION=${{ github.ref_name }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Create Sentry Release
        if: startsWith(github.ref, 'refs/tags/')
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
        with:
          environment: production
          version: ${{ github.ref_name }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/')

    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.DEPLOY_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /opt/game-hub
            docker-compose pull
            docker-compose up -d
            docker image prune -f
```

### GitLab CI/CD 示例

创建 `.gitlab-ci.yml`：

```yaml
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG

build:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build
        --build-arg VITE_SENTRY_DSN=$SENTRY_DSN
        --build-arg VITE_APP_VERSION=$CI_COMMIT_TAG
        -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
  only:
    - main
    - tags

test:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run build
  only:
    - merge_requests
    - main

deploy:production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "
        cd /opt/game-hub &&
        docker-compose pull &&
        docker-compose up -d &&
        docker image prune -f
      "
  only:
    - main
    - tags
  when: manual
```

### 配置 Secrets

在 GitHub/GitLab 中配置以下 secrets：

- `SENTRY_DSN` - Sentry DSN
- `SENTRY_AUTH_TOKEN` - Sentry 认证令牌
- `SENTRY_ORG` - Sentry 组织名
- `SENTRY_PROJECT` - Sentry 项目名
- `DEPLOY_HOST` - 部署服务器地址
- `DEPLOY_USER` - SSH 用户名
- `DEPLOY_KEY` - SSH 私钥

## 监控和追踪

### Sentry Release Tracking

在部署时创建 Sentry Release 以追踪错误：

```bash
# 安装 Sentry CLI
npm install -g @sentry/cli

# 配置认证
export SENTRY_AUTH_TOKEN=your-auth-token
export SENTRY_ORG=your-org
export SENTRY_PROJECT=your-project

# 创建 Release
sentry-cli releases new "v1.0.0"

# 关联 commits
sentry-cli releases set-commits "v1.0.0" --auto

# 完成 Release
sentry-cli releases finalize "v1.0.0"

# 部署通知
sentry-cli releases deploys "v1.0.0" new -e production
```

### 健康检查

Docker 容器已配置健康检查：

```bash
# 检查容器健康状态
docker inspect --format='{{.State.Health.Status}}' game-hub

# 查看健康检查日志
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' game-hub
```

### 日志监控

```bash
# 实时查看日志
docker-compose logs -f prod

# 查看最近 100 行
docker logs --tail 100 game-hub

# 导出日志
docker logs game-hub > game-hub.log 2>&1
```

## 回滚策略

### Docker 镜像回滚

```bash
# 1. 查看可用的镜像版本
docker images | grep game-hub

# 2. 停止当前容器
docker-compose down

# 3. 修改 docker-compose.yml 指定旧版本
# image: yourusername/game-hub:1.0.0

# 4. 启动旧版本
docker-compose up -d
```

### Git 回滚

```bash
# 回滚到特定 commit
git revert <commit-hash>
git push origin main

# 或者重置到特定版本（谨慎使用）
git reset --hard <commit-hash>
git push origin main --force
```

### Sentry Release 回滚

在 Sentry 控制台：
1. 进入 Releases 页面
2. 找到要回滚的版本
3. 标记为 "Bad Release"
4. 部署之前的良好版本

## 故障排查

### 常见问题

#### 1. 容器启动失败

```bash
# 查看容器日志
docker logs game-hub

# 检查容器状态
docker ps -a

# 进入容器调试
docker exec -it game-hub sh
```

#### 2. Nginx 502 错误

- 检查应用是否正常运行
- 检查端口映射是否正确
- 查看 Nginx 错误日志

#### 3. 环境变量未生效

```bash
# 检查容器环境变量
docker exec game-hub env | grep VITE

# 重新构建时确保传递了环境变量
docker build --build-arg VITE_SENTRY_DSN=xxx ...
```

#### 4. Sentry 未收到错误

- 检查 DSN 配置是否正确
- 确认 Sentry 在 main.tsx 中已初始化
- 查看浏览器控制台是否有 Sentry 相关错误

#### 5. 静态资源 404

- 检查 Nginx 配置的 root 路径
- 确认文件权限正确
- 查看浏览器 Network 面板

### 性能优化检查清单

- [ ] 启用 Gzip 压缩
- [ ] 配置静态资源缓存
- [ ] 使用 CDN（如需要）
- [ ] 启用 HTTP/2
- [ ] 优化图片（已通过 image-url.ts 处理）
- [ ] 代码分割（Vite 自动处理）
- [ ] 使用生产模式构建

### 安全检查清单

- [ ] HTTPS 配置正确
- [ ] 安全响应头已设置
- [ ] 容器以非 root 用户运行
- [ ] 定期更新依赖
- [ ] 敏感信息使用环境变量
- [ ] 配置 CORS（如需要）

## 版本发布流程

### 1. 开发完成

```bash
# 确保所有更改已提交
git status

# 运行测试
npm run build
```

### 2. 版本号更新

```bash
# 更新 package.json 版本
npm version patch  # 1.0.0 -> 1.0.1
# 或
npm version minor  # 1.0.0 -> 1.1.0
# 或
npm version major  # 1.0.0 -> 2.0.0
```

### 3. 创建 Git Tag

```bash
# 创建并推送标签
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

### 4. 触发 CI/CD

推送 tag 会自动触发 CI/CD 流程

### 5. 验证部署

- 访问生产环境确认更新
- 检查 Sentry 是否显示新版本
- 测试关键功能

### 6. 发布说明

在 GitHub/GitLab 创建 Release Notes，说明：
- 新功能
- Bug 修复
- 破坏性变更
- 升级说明

## 最佳实践

1. **版本化部署** - 使用语义化版本号
2. **蓝绿部署** - 保持旧版本运行直到新版本验证通过
3. **金丝雀发布** - 逐步将流量切换到新版本
4. **自动化测试** - 部署前运行完整测试套件
5. **监控告警** - 配置 Sentry 告警规则
6. **备份策略** - 定期备份配置和数据
7. **文档更新** - 每次发布更新文档

## 相关资源

- [Docker 文档](https://docs.docker.com)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [GitLab CI 文档](https://docs.gitlab.com/ee/ci/)
- [Sentry 文档](https://docs.sentry.io)
- [Nginx 文档](https://nginx.org/en/docs/)
