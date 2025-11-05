# Game Hub - 开发指南

## 📋 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [开发流程](#开发流程)
- [相关文档](#相关文档)

## 项目概述

Game Hub 是一个现代化的游戏信息展示平台，使用 React + TypeScript 构建，提供游戏浏览、搜索、分类和详情查看功能。

### 主要功能

- 🎮 游戏列表浏览和搜索
- 🎯 按平台、类型、评分排序筛选
- 📱 响应式设计，支持移动端和桌面端
- 🌓 暗色/亮色主题切换
- 📊 游戏详情页（预告片、截图、评分等）
- 🔄 无限滚动加载
- 🐛 Sentry 错误监控和性能追踪

## 技术栈

### 核心框架
- **React 18.2** - UI 框架
- **TypeScript 4.9** - 类型安全
- **Vite 4.1** - 构建工具

### UI 库
- **Chakra UI 2.5** - 组件库
- **Framer Motion 6.5** - 动画库
- **React Icons 5.5** - 图标库

### 状态管理
- **Zustand 4.3** - 全局状态管理
- **React Query 4.28** - 服务端状态管理

### 路由
- **React Router 6.10** - 客户端路由

### HTTP 客户端
- **Axios 1.10** - API 请求

### 监控与追踪
- **Sentry 10.22** - 错误监控和性能追踪

### 开发工具
- **React Query Devtools** - 调试工具
- **TypeScript** - 类型检查

## 快速开始

### 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量（可选）
# 复制 .env.example 并重命名为 .env
# 填入你的 Sentry DSN 等配置

# 3. 启动开发服务器
npm run dev

# 4. 访问应用
# 浏览器打开 http://localhost:5173
```

### Docker 开发（推荐）

```bash
# 启动开发容器
docker-compose --profile dev up

# 访问应用
# 浏览器打开 http://localhost:5173
```

详细的 Docker 使用说明请参考：[DOCKER_DEV_GUIDE.md](./DOCKER_DEV_GUIDE.md)

### 生产构建

```bash
# 本地构建
npm run build

# Docker 生产构建
docker-compose --profile prod up --build
```

## 项目结构

详细的项目结构说明请参考：[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

```
game-hub/
├── src/
│   ├── components/      # 可复用组件
│   ├── pages/          # 页面组件
│   ├── hooks/          # 自定义 Hooks
│   ├── services/       # API 服务
│   ├── entities/       # 类型定义
│   ├── store/          # Zustand 状态管理
│   ├── data/           # 静态数据
│   ├── assets/         # 静态资源
│   └── main.tsx        # 应用入口
├── public/             # 公共资源
├── Dockerfile          # 生产环境镜像
├── Dockerfile.dev      # 开发环境镜像
├── docker-compose.yml  # Docker Compose 配置
├── nginx.conf          # Nginx 配置
└── vite.config.ts      # Vite 配置
```

## 开发流程

### 1. 分支管理

```bash
# 创建功能分支
git checkout -b feature/your-feature-name

# 创建修复分支
git checkout -b fix/bug-description
```

### 2. 代码开发

- 遵循项目的 TypeScript 类型规范
- 使用 Chakra UI 组件保持 UI 一致性
- 自定义 Hooks 放在 `src/hooks/` 目录
- API 调用统一通过 `src/services/` 管理

### 3. 测试

```bash
# 本地运行检查
npm run dev

# 类型检查
npm run build
```

### 4. 提交代码

```bash
# 添加更改
git add .

# 提交（Sentry 会追踪 commit）
git commit -m "feat: your feature description"

# 推送
git push origin your-branch-name
```

### 5. 部署

详细的 CI/CD 部署流程请参考：[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 环境变量

在项目根目录创建 `.env` 文件：

```bash
# Sentry 配置
VITE_SENTRY_DSN=your-sentry-dsn-here

# API 地址（如果需要）
VITE_API_URL=https://api.rawg.io/api

# 应用版本
VITE_APP_VERSION=1.0.0
```

**重要提示：**
- 开发环境使用 `.env` 文件
- 生产环境使用 `.env.production` 文件
- 不要将包含敏感信息的 `.env` 文件提交到 Git

## 常用命令

### 开发

```bash
npm run dev              # 启动开发服务器
npm run build            # 生产构建
npm run preview          # 预览生产构建
```

### Docker

```bash
# 开发环境
docker-compose --profile dev up          # 启动开发容器
docker-compose --profile dev down        # 停止开发容器
docker-compose --profile dev down -v     # 停止并删除数据卷

# 生产环境
docker-compose --profile prod up --build # 构建并启动生产容器
docker-compose --profile prod down       # 停止生产容器
```

## 调试技巧

### React Query Devtools

开发环境下自动启用，可以在页面右下角看到图标，点击可查看：
- 缓存状态
- 请求历史
- 数据更新情况

### Sentry 错误测试

开发环境下，HomePage 底部有 Sentry 测试按钮：
- **Test Sentry Event** - 发送测试消息
- **Test Sentry Error** - 发送测试错误

在 Sentry 控制台可以看到：
- 错误堆栈
- 用户会话回放
- 性能监控数据
- Release 版本信息

### Chrome DevTools

推荐安装以下浏览器扩展：
- React Developer Tools
- Redux DevTools（虽然用的是 Zustand，但也能查看状态）

## 相关文档

- [项目结构详解](./PROJECT_STRUCTURE.md) - 详细的目录和文件说明
- [Docker 开发指南](./DOCKER_DEV_GUIDE.md) - Docker 容器化开发
- [部署指南](./DEPLOYMENT_GUIDE.md) - CI/CD 和生产部署

## 故障排查

### 常见问题

1. **端口被占用**
   ```bash
   # 修改 vite.config.ts 中的端口
   server: { port: 3000 }
   ```

2. **依赖安装失败**
   ```bash
   # 清除缓存重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Docker 热重载不工作**
   - 确保 `vite.config.ts` 中启用了 `usePolling: true`

4. **Sentry 不工作**
   - 检查 `.env` 文件中的 `VITE_SENTRY_DSN` 是否配置
   - 确认 Sentry 在 `main.tsx` 中已初始化

## 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证
