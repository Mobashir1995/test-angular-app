import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4200,
    allowedHosts: [
      'b6d220191a33.ngrok-free.app',
      '.ngrok-free.app',
      '.ngrok.io',
      '.ngrok.app'
    ],
    strictPort: false,
    hmr: {
      clientPort: 4200
    }
  }
});
