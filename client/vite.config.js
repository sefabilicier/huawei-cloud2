import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
     proxy: {
      "/api": {
        target: "http://localhost:8081", // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), //  `/api` prefix'ini kaldırır
      },
    }, 
  },
})