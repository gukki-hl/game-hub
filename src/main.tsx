import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./index.css";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
const queryClient = new QueryClient();


// 初始化 Sentry（开发和生产环境都启用）
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // 性能监控
  tracesSampleRate: 1.0,
  // 会话录制
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // 环境标识
  environment: import.meta.env.MODE,
  // 发布版本
  release: import.meta.env.VITE_APP_VERSION || 'development',
  // 开发环境下打印调试信息
  debug: import.meta.env.DEV,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
