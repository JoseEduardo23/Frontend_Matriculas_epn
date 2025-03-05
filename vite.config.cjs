import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5174, 
    proxy: {
      '/api': 'http://localhost:3000', 
    },
  },
  build: {
    outDir: 'build', // Render busca esta carpeta por defecto
  }
});