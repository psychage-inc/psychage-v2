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
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
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

            // React MUST be a singleton — route all react imports here
            if (id.includes('/react-dom/') || id.includes('/scheduler/')) return 'vendor-react';
            if (id.includes('/react/') && !id.includes('/react-i18next') && !id.includes('/react-router') && !id.includes('/react-three') && !id.includes('/@react-')) return 'vendor-react';
            if (id.includes('/react-router-dom/') || id.includes('/react-router/') || id.includes('/@remix-run/')) return 'vendor-react';

            // UI and animation
            if (id.includes('/framer-motion/') || id.includes('/lucide-react/') || id.includes('/class-variance-authority/') || id.includes('/clsx/') || id.includes('/tailwind-merge/')) return 'vendor-ui';

            // Charts
            if (id.includes('/recharts/') || id.includes('/d3-') || id.includes('/victory-')) return 'vendor-charts';

            // 3D (heavy, homepage only)
            if (id.includes('/three/') || id.includes('/@react-three/')) return 'vendor-three';

            // Backend
            if (id.includes('/@supabase/')) return 'vendor-supabase';
            if (id.includes('/@sanity/') || id.includes('/@portabletext/')) return 'vendor-sanity';

            // Date
            if (id.includes('/date-fns/')) return 'vendor-date';

            // i18n (react-i18next goes here, but NOT react itself)
            if (id.includes('/i18next') || id.includes('/react-i18next')) return 'vendor-i18n';

            // Radix UI
            if (id.includes('/@radix-ui/')) return 'vendor-radix';

            // Rich text editor (admin-only)
            if (id.includes('/@tiptap/') || id.includes('/prosemirror')) return 'vendor-editor';
          }
        }
      },
      // Increase warning limit slightly since we've optimized with chunks
      chunkSizeWarningLimit: 600,
    }
  };
});
