import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@layouts': path.resolve(import.meta.dirname, './src/layouts'),
      '@lib': path.resolve(import.meta.dirname, './src/lib'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
      '@providers': path.resolve(import.meta.dirname, './src/providers'),
    },
  },
})
