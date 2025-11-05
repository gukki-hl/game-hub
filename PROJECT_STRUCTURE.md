# Project Structure - 项目结构详解

## 📁 目录结构总览

```
game-hub/
├── public/                 # 静态资源目录
├── src/                    # 源代码目录
│   ├── assets/            # 项目资源文件
│   ├── components/        # React 组件
│   ├── data/              # 静态数据
│   ├── entities/          # TypeScript 类型定义
│   ├── hooks/             # 自定义 React Hooks
│   ├── pages/             # 页面组件
│   ├── services/          # API 服务层
│   ├── store/             # Zustand 状态管理
│   ├── tool/              # 工具函数
│   ├── index.css          # 全局样式
│   ├── main.tsx           # 应用入口
│   ├── routes.tsx         # 路由配置
│   ├── theme.ts           # Chakra UI 主题配置
│   └── vite-env.d.ts      # Vite 类型声明
├── .dockerignore          # Docker 忽略文件
├── .env                   # 开发环境变量
├── .env.production        # 生产环境变量
├── .gitignore             # Git 忽略文件
├── Dockerfile             # 生产环境 Docker 镜像
├── Dockerfile.dev         # 开发环境 Docker 镜像
├── docker-compose.yml     # Docker Compose 配置
├── nginx.conf             # Nginx 配置文件
├── package.json           # 项目依赖配置
├── sentry.config.js       # Sentry 配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 构建配置
├── README_DEV.md          # 开发指南（主文档）
├── PROJECT_STRUCTURE.md   # 项目结构说明（本文档）
├── DEPLOYMENT_GUIDE.md    # 部署指南
└── DOCKER_DEV_GUIDE.md    # Docker 开发指南
```

## 🗂️ 源代码目录详解

### `src/components/` - 组件目录

可复用的 React 组件，按功能分类：

#### 导航和布局组件
- **`NavBar.tsx`** - 顶部导航栏，包含 Logo、搜索框和主题切换
- **`ColorModeSwitch.tsx`** - 暗色/亮色主题切换开关
- **`SearchInput.tsx`** - 游戏搜索输入框

#### 游戏列表相关组件
- **`GameGrid.tsx`** - 游戏网格布局，使用无限滚动
- **`GameCard.tsx`** - 单个游戏卡片
- **`GameCardContainer.tsx`** - 游戏卡片容器（用于骨架屏）
- **`GameCardSkeleton.tsx`** - 游戏卡片加载骨架屏
- **`GameHeading.tsx`** - 游戏列表标题

#### 游戏详情相关组件
- **`GameAttributes.tsx`** - 游戏属性展示（平台、类型等）
- **`GameTrailers.tsx`** - 游戏预告片播放器
- **`GameScreenShots.tsx`** - 游戏截图展示
- **`ExpandableText.tsx`** - 可展开/折叠的文本组件
- **`Definitionitem.tsx`** - 定义列表项组件

#### 筛选和排序组件
- **`GenreList.tsx`** - 游戏类型列表（侧边栏）
- **`PlatformSelector.tsx`** - 平台选择下拉框
- **`SortSelector.tsx`** - 排序方式选择器
- **`PlatformIconList.tsx`** - 平台图标列表

#### 通用组件
- **`CriticScore.tsx`** - 评分徽章组件
- **`Emoij.tsx`** - 评分对应的表情图标

### `src/pages/` - 页面组件

应用的主要页面：

- **`Layout.tsx`** - 应用主布局，包含导航栏和内容区域
- **`HomePage.tsx`** - 首页，显示游戏列表和筛选器
- **`GameDetailPage.tsx`** - 游戏详情页
- **`ErrorPage.tsx`** - 404 错误页面

### `src/hooks/` - 自定义 Hooks

封装业务逻辑和数据请求的自定义 Hooks：

#### 游戏相关
- **`useGames.ts`** - 获取游戏列表（支持筛选、排序、分页）
- **`useGeme.ts`** - 获取单个游戏详情
- **`useTrailes.ts`** - 获取游戏预告片
- **`useScreenshots.ts`** - 获取游戏截图

#### 分类相关
- **`useGenres.ts`** - 获取游戏类型列表
- **`useGenre.ts`** - 获取单个游戏类型信息
- **`usePlatofroms.ts`** - 获取平台列表
- **`usePlatform.ts`** - 获取单个平台信息

**设计模式：** 所有 Hooks 都使用 React Query 进行数据获取和缓存管理

### `src/services/` - API 服务层

与后端 API 交互的服务层：

- **`api-client.ts`** - Axios 客户端封装
  - 统一的 API 配置
  - 请求/响应拦截器
  - 泛型类 `APIClient<T>` 用于不同实体的 CRUD 操作

**示例：**
```typescript
const gamesClient = new APIClient<Game>('/games');
gamesClient.getAll({ params: { page: 1 } });
```

### `src/entities/` - 类型定义

TypeScript 接口和类型定义：

- **`Game.ts`** - 游戏实体类型
- **`Genre.ts`** - 游戏类型实体
- **`Platforms.ts`** - 平台实体
- **`Publishers.ts`** - 发行商实体
- **`ScreenShots.ts`** - 截图实体
- **`Trailers.ts`** - 预告片实体

**设计原则：** 与后端 API 响应结构保持一致

### `src/store/` - 状态管理

使用 Zustand 管理全局状态：

- **`index.ts`** - 游戏查询状态 Store
  - 搜索关键词
  - 选中的类型
  - 选中的平台
  - 排序方式

**为什么用 Zustand？**
- 简单轻量
- TypeScript 友好
- 无需 Context Provider
- 与 React Query 配合使用，分离服务端和客户端状态

### `src/data/` - 静态数据

预加载的静态数据，减少 API 请求：

- **`genre.ts`** - 游戏类型静态数据
- **`platform.ts`** - 平台静态数据

### `src/tool/` - 工具函数

通用工具函数：

- **`image-url.ts`** - 图片 URL 处理函数
  - 优化图片尺寸
  - 生成 CDN 地址

### `src/assets/` - 资源文件

项目静态资源：
- 图片
- 图标
- 其他媒体文件

### 核心文件说明

#### `src/main.tsx` - 应用入口

应用的启动文件，包含：
- React 渲染
- Sentry 初始化和配置
- Chakra UI Provider
- React Query Provider
- 路由配置

**关键配置：**
```typescript
// Sentry 监控
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION,
  debug: import.meta.env.DEV,
});

// React Query 配置
const queryClient = new QueryClient();
```

#### `src/routes.tsx` - 路由配置

使用 React Router 定义应用路由：
- `/` - 首页（游戏列表）
- `/games/:slug` - 游戏详情页
- `*` - 404 错误页

#### `src/theme.ts` - 主题配置

Chakra UI 主题自定义：
- 颜色方案
- 默认颜色模式
- 断点配置

## 🐳 Docker 相关文件

### `Dockerfile` - 生产环境镜像

多阶段构建：
1. **构建阶段：** 使用 Node.js 编译 TypeScript 和打包资源
2. **运行阶段：** 使用 Nginx 提供静态文件服务

**特性：**
- 体积小（Alpine Linux）
- 安全（非 root 用户运行）
- 健康检查
- 环境变量注入

### `Dockerfile.dev` - 开发环境镜像

专为开发设计：
- 支持热重载
- 挂载本地代码
- 包含开发工具

### `docker-compose.yml` - 编排配置

定义两个服务配置：
- **dev profile：** 开发环境
- **prod profile：** 生产环境

### `nginx.conf` - Nginx 配置

生产环境的 Web 服务器配置：
- 单页应用路由支持
- Gzip 压缩
- 缓存策略
- 安全头部

## ⚙️ 配置文件

### `vite.config.ts` - Vite 配置

构建工具配置：
- React 插件
- 开发服务器配置（支持 Docker）
- 文件监听（轮询模式）

### `tsconfig.json` - TypeScript 配置

TypeScript 编译选项：
- 严格模式
- ESNext 目标
- 路径别名（如需要）

### `package.json` - 依赖配置

项目依赖和脚本：
- `dev` - 启动开发服务器
- `build` - 生产构建
- `preview` - 预览生产构建

### `sentry.config.js` - Sentry 配置

错误监控配置：
- DSN 配置
- 环境变量
- 采样率设置

## 🔐 环境变量文件

### `.env` - 开发环境变量

开发环境使用的环境变量：
```
VITE_SENTRY_DSN=...
VITE_API_URL=...
VITE_APP_VERSION=1.0.0-dev
```

### `.env.production` - 生产环境变量

生产环境使用的环境变量：
```
VITE_SENTRY_DSN=...
VITE_API_URL=...
VITE_APP_VERSION=1.0.0
```

**注意：** 这些文件不应提交到 Git

## 📝 文档文件

- **`README_DEV.md`** - 主开发指南
- **`PROJECT_STRUCTURE.md`** - 本文档，项目结构说明
- **`DEPLOYMENT_GUIDE.md`** - CI/CD 部署指南
- **`DOCKER_DEV_GUIDE.md`** - Docker 使用指南

## 🎯 架构设计原则

### 1. 关注点分离

- **组件层：** 只关注 UI 展示
- **Hooks 层：** 封装业务逻辑和数据获取
- **服务层：** 统一的 API 调用
- **状态层：** 全局状态管理

### 2. 单一职责

每个文件/组件只做一件事：
- 组件只负责渲染
- Hooks 只负责数据和逻辑
- 服务只负责 API 交互

### 3. 可复用性

- 组件设计通用化
- Hooks 参数化
- 工具函数纯函数化

### 4. 类型安全

- 所有 API 响应都有类型定义
- 组件 Props 严格类型化
- 避免使用 `any`

### 5. 性能优化

- React Query 自动缓存
- 无限滚动加载
- 图片懒加载和优化
- 代码分割（路由级别）

## 🔄 数据流

```
用户交互
   ↓
页面组件
   ↓
自定义 Hook (React Query)
   ↓
API Client (Axios)
   ↓
RAWG API
   ↓
响应数据缓存 (React Query)
   ↓
组件重新渲染
```

## 📊 状态管理策略

### 服务端状态（React Query）
- API 数据
- 缓存管理
- 加载/错误状态

### 客户端状态（Zustand）
- 筛选条件
- 搜索关键词
- UI 状态

### 本地状态（useState）
- 组件内部状态
- 表单输入

## 🚀 最佳实践

### 添加新功能

1. 在 `entities/` 定义类型
2. 在 `services/` 创建 API 客户端
3. 在 `hooks/` 创建自定义 Hook
4. 在 `components/` 创建 UI 组件
5. 在 `pages/` 组合成页面

### 命名规范

- **组件：** PascalCase（如 `GameCard.tsx`）
- **Hooks：** camelCase，use 前缀（如 `useGames.ts`）
- **类型：** PascalCase（如 `Game`, `Genre`）
- **文件：** 与导出的主要内容同名

### 导入顺序

1. React 和第三方库
2. 自定义 Hooks
3. 组件
4. 类型
5. 工具函数
6. 样式

## 📚 扩展阅读

- [React 官方文档](https://react.dev)
- [TypeScript 官方文档](https://www.typescriptlang.org)
- [Chakra UI 文档](https://chakra-ui.com)
- [React Query 文档](https://tanstack.com/query/latest)
- [Zustand 文档](https://docs.pmnd.rs/zustand)
