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
          manualChunks: {
            // Core React libraries
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // UI and animation libraries
            'vendor-ui': ['framer-motion', 'lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
            // Chart libraries (heavy)
            'vendor-charts': ['recharts'],
            // 3D libraries (heavy, only used on homepage)
            'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
            // Backend integrations
            'vendor-supabase': ['@supabase/supabase-js'],
            'vendor-sanity': ['@sanity/client', '@sanity/image-url', '@portabletext/react'],
            // Date utilities
            'vendor-date': ['date-fns'],
            // i18n
            'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
            // Radix UI primitives
            'vendor-radix': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-accordion',
              '@radix-ui/react-collapsible',
              '@radix-ui/react-tabs',
            ],
            // Rich text editor (admin-only)
            'vendor-editor': [
              '@tiptap/react',
              '@tiptap/starter-kit',
              '@tiptap/extension-link',
              '@tiptap/extension-image',
              '@tiptap/extension-placeholder',
            ],
          }
        }
      },
      // Increase warning limit slightly since we've optimized with chunks
      chunkSizeWarningLimit: 600,
    }
  };
});
