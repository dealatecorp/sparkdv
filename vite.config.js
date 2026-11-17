import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath, URL} from 'node:url';
import {createAuthHandler, createStoreAccess} from './server/auth.js';
import {createOrdersHandler} from './server/orders.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['AUTH_', 'ORDER_', 'RESEND_']);
  const getStore = createStoreAccess(env, false);
  const auth = createAuthHandler(env, false, getStore);
  const orders = createOrdersHandler(env, false, getStore);
  const mountApi = server => {
    server.middlewares.use('/api/auth', auth);
    server.middlewares.use('/api/orders', orders);
  };
  return {
  plugins: [react(), tailwindcss(), { name: 'sparkdv-api', configureServer: mountApi, configurePreviewServer: mountApi }],
  resolve: {alias: {'@': fileURLToPath(new URL('./src', import.meta.url))}},
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.endsWith('source-content.json')) return 'source-content';
        }
      }
    }
  }
  };
});
