import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssMinify: true,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
            return 'router-vendor'
          }
          if (id.includes('content/productCategories')) {
            return 'catalog-data'
          }
          if (id.includes('content/faqCopy') || id.includes('content/faqItems')) {
            return 'faq-data'
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/wp-api': {
        target: 'https://altronindia.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wp-api/, '/wp-json'),
      },
    },
  },
})
