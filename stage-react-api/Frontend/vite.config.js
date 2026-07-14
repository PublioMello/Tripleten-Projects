import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In development, proxy /v2/* → newsapi.org to avoid CORS restrictions
    proxy: {
      '/v2': {
        target: 'https://newsapi.org',
        changeOrigin: true,
      },
    },
  },
});
