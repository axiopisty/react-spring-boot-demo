import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': 'http://localhost:8080',
      '/health': 'http://localhost:8080'
    } : {},
  },
})
