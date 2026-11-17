import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath, URL} from 'node:url';
import {createAuthHandler} from './server/auth.js';

export default defineConfig(({ mode }) => {
  const auth = createAuthHandler(loadEnv(mode, process.cwd(), 'AUTH_'));
  const mountAuth = server => { server.middlewares.use('/api/auth', auth); };
  return {
  plugins: [react(), tailwindcss(), { name: 'sparkdv-auth', configureServer: mountAuth, configurePreviewServer: mountAuth }],
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
