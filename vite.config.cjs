import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5174, // Make sure this is the port your React app runs on
    proxy: {
      '/api': 'http://localhost:3000', // Proxy all API requests to your backend
    },
  },
});