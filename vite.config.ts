import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Serve admin.html for /admin/* routes in dev (mimics Vercel hostname rewrite) */
function adminFallbackPlugin(): Plugin {
  return {
    name: 'admin-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const pathname = (req.url || '').split('?')[0];
        if (pathname.startsWith('/admin') && !/\.\w+$/.test(pathname)) {
          req.url = '/admin.html';
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    test: {
      environment: 'jsdom',
      exclude: ['**/node_modules/**', '**/e2e/**'],
      setupFiles: ['./src/tests/setup.ts'],
      globals: true,
    },
    server: {
      port: 5173,
      host: '0.0.0.0',
      watch: {
        ignored: ['**/clarity-score/**'],
      },
    },
    plugins: [adminFallbackPlugin(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'react': path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: [
        'react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime',
        '@tiptap/react', '@tiptap/starter-kit', '@tiptap/core',
        '@tiptap/extension-link', '@tiptap/extension-image', '@tiptap/extension-table',
        '@tiptap/extension-placeholder', '@tiptap/extension-underline',
        '@tiptap/extension-text-align', '@tiptap/extension-highlight',
        '@tiptap/extension-text-style', '@tiptap/extension-task-list',
        '@tiptap/extension-task-item', '@tiptap/extension-youtube',
        '@tiptap/extension-table-row', '@tiptap/extension-table-cell',
        '@tiptap/extension-table-header',
      ],
      exclude: ['clarity-score'],
      entries: ['src/**/*.{ts,tsx}'],
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          admin: path.resolve(__dirname, 'admin.html'),
        },
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;

            // --- Only split non-React-dependent heavy libraries ---
            // React-dependent libs (framer-motion, lucide, radix, recharts, react-i18next,
            // react-router, react-three, tiptap-react) MUST stay in the default chunk
            // with React to avoid createContext/forwardRef init-time failures.

            // 3D engine (no top-level React calls — Three.js core is pure JS)
            if (id.includes('/three/src/') || id.includes('/three/build/')) return 'vendor-three';

            // Prosemirror (pure JS, no React dependency)
            if (id.includes('/prosemirror-')) return 'vendor-editor';

            // Backend SDKs (no React dependency)
            if (id.includes('/@supabase/')) return 'vendor-supabase';
            if (id.includes('/@sanity/') || id.includes('/@portabletext/')) return 'vendor-sanity';

            // Pure i18n core (NOT react-i18next)
            if (id.includes('/i18next/') || id.includes('/i18next-browser-languagedetector/')) return 'vendor-i18n';

            // Date utilities (no React dependency)
            if (id.includes('/date-fns/')) return 'vendor-date';

            // D3 internals (pure JS math/layout, used by recharts)
            if (id.includes('/d3-')) return 'vendor-charts';
          }
        }
      },
      // Increase warning limit slightly since we've optimized with chunks
      chunkSizeWarningLimit: 600,
    }
  };
});
