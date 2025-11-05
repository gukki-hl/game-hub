import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 允许外部访问（Docker 需要）
    port: 5173,
    watch: {
      usePolling: true, // Docker 环境下需要轮询以检测文件变化
    },
  },
})
