import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 5173,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    build: {
      rollupOptions: {
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
          }
        }
      },
      // Increase warning limit slightly since we've optimized with chunks
      chunkSizeWarningLimit: 600,
    }
  };
});
