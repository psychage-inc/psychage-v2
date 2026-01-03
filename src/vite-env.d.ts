/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Backend API Connection
  readonly VITE_API_URL: string;

  // Supabase Configuration
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;

  // Sanity CMS Configuration
  readonly VITE_SANITY_PROJECT_ID: string;
  readonly VITE_SANITY_DATASET: string;
  readonly VITE_SANITY_API_VERSION: string;

  // Gemini AI Configuration
  readonly VITE_GEMINI_API_KEY: string;

  // Application Metadata
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;

  // Feature Flags
  readonly VITE_ENABLE_AI_CHAT: string;
  readonly VITE_ENABLE_PROVIDER_DIRECTORY: string;
  readonly VITE_ENABLE_MOOD_JOURNAL: string;
  readonly VITE_ENABLE_SLEEP_TRACKER: string;
  readonly VITE_ENABLE_CLARITY_SCORE: string;

  // Development Settings
  readonly VITE_DEBUG_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
