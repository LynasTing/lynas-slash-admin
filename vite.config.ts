import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    vanillaExtractPlugin({
      identifiers: ({ debugId }) => `${debugId}`
    })
  ],
  server: {
    port: 5678,
    proxy: {
      '/api': {
        target: 'http://localhost:5678',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        // 忽略 https 证书
        secure: false
      }
    }
  }
});
