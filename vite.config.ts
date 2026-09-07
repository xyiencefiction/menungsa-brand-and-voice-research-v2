import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  resolve: { alias: { '@menungsa/i18n': fileURLToPath(new URL('./src/i18n', import.meta.url)) } },
  optimizeDeps: { exclude: ['@menungsa/i18n', '@menungsa/i18n/jsx-runtime', '@menungsa/i18n/jsx-dev-runtime', fileURLToPath(new URL('./src/i18n/jsx-runtime.ts', import.meta.url)), fileURLToPath(new URL('./src/i18n/jsx-dev-runtime.ts', import.meta.url))] },
  plugins: [
    react({ jsxImportSource: '@menungsa/i18n' }),
    tailwindcss(),
    {
      name: 'local-localization-runtime',
      configResolved(config) {
        // React's plugin explicitly includes its JSX runtime in prebundling.
        // Ours is local source and must share the app's single language context.
        config.optimizeDeps.include = config.optimizeDeps.include?.filter(id => !id.startsWith('@menungsa/i18n'));
      },
    },
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('copyCheatsheet.json')) {
            return 'copy-cheatsheet-data';
          }
          if (id.includes('/src/i18n/') && id.endsWith('.json')) {
            return 'i18n-locales';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide-icons';
          }
          if (id.includes('node_modules/papaparse')) {
            return 'papaparse';
          }
        },
      },
    },
  },
})
