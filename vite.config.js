import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    host: true, // Permite conexões externas
    port: process.env.PORT || 4173, // Usa a porta definida pelo Render
    allowedHosts: ["news-explorer-frontend.onrender.com"], // Permite esse domínio
  }
});
