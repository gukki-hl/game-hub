export const sentryConfig = {
  dsn: process.env.REACT_APP_SENTRY_DSN || process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  tracesSampleRate: 1.0, // 100% 的性能监控（生产环境可以降低到 0.1）
  replaysSessionSampleRate: 0.1, // 10% 的会话录制
  replaysOnErrorSampleRate: 1.0, // 100% 的错误录制
};
