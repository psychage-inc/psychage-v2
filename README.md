# Psychage

Psychage is a mental health education and wellness platform. People can read clinically reviewed articles, browse conditions, find providers, track mood and sleep, take the Clarity Score assessment, and talk with the MindMate assistant. Patients, providers, and admins each get role-based dashboards, and the admin panel is served as a separate entry point.

## Stack

React 18, TypeScript, Vite, Tailwind CSS, React Router 7, Supabase (Postgres, auth, edge functions), Sanity CMS, Vercel serverless functions, i18next, Vitest, Playwright, Storybook.

## Setup

Requires Node 22 (`.nvmrc`) and pnpm 10.

```bash
pnpm install
cp .env.example .env   # then fill in values
pnpm dev               # http://localhost:5173
pnpm dev:all           # also runs the API functions via vercel dev
```

## Environment variables

Templates: `.env.example`, `.env.ai.example`, `.env.e2e.example`, `.env.production.example`.

| Group | Variables |
|---|---|
| Core | `VITE_API_URL`, `VITE_APP_NAME`, `VITE_APP_VERSION`, `VITE_DEBUG_MODE` |
| Supabase | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Sanity | `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION` |
| MindMate | `ANTHROPIC_API_KEY` |
| Monitoring and abuse | `VITE_TURNSTILE_SITE_KEY` |
| Feature flags | `VITE_ENABLE_AI_CHAT`, `VITE_ENABLE_PROVIDER_DIRECTORY`, `VITE_ENABLE_MOOD_JOURNAL`, `VITE_ENABLE_SLEEP_TRACKER`, `VITE_ENABLE_CLARITY_SCORE`, `VITE_ENABLE_MEDICATION_TRACKER`, `VITE_CRISIS_DETECTION_ENABLED`, `VITE_MOOD_TRACKING_ENABLED`, `VITE_SAFETY_PLAN_ENABLED`, `VITE_NAV_TIER1_ENABLED` through `VITE_NAV_TIER6_ENABLED`, `VITE_NAVIGATOR_AGE_GATE`, `VITE_NAVIGATOR_AGE_GATE_MIN_AGE` |
| E2E | `PSYCHAGE_E2E_EMAIL`, `PSYCHAGE_E2E_PASSWORD`, `PLAYWRIGHT_BASE_URL` |

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev`, `pnpm dev:api`, `pnpm dev:all` | Run the app, the API, or both |
| `pnpm build`, `pnpm preview` | Type-check and build; preview the build |
| `pnpm lint`, `pnpm format` | ESLint; Prettier |
| `pnpm test`, `pnpm test:watch`, `pnpm test:ui` | Unit tests |
| `pnpm test:e2e`, `pnpm test:e2e:ui`, `pnpm test:e2e:headed` | End-to-end tests |
| `pnpm test:smoke`, `pnpm test:smoke:prod` | Smoke test |
| `pnpm storybook`, `pnpm build-storybook` | Component library |
| `pnpm verify:routes`, `pnpm verify:backend`, `pnpm verify:fallback`, `pnpm verify:deployment` | Verification checks |
| `pnpm seed:articles:generate`, `pnpm seed:articles:content`, `pnpm seed:articles:citations`, `pnpm audit:articles` | Article seed and audit tools |

## Folder structure

```
api/            Vercel serverless functions
data-pipeline/  Python data pipeline
docs/           Product and deployment docs
e2e/            Playwright tests
preview/        Preview content build
public/         Static assets
qa/             QA crawler docs
scripts/        Operational and content scripts
src/            Application source
supabase/       Migrations, edge functions, SQL tests
```
