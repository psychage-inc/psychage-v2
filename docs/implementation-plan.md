# Psychage V2 - Frontend Implementation Plan

## Executive Summary

**Project**: Psychage - Mental Health Operating System
**Goal**: Build an award-winning mental health education platform UI with provider directory and self-assessment tools
**Current State**: Frontend UI exists (React + Vite) with basic components and mock data
**Target**: Production-ready, award-worthy frontend with polished UI/UX

---

## Current State Analysis

### What Exists (✅ Complete)
- **UI Framework**: React 18 + Vite + TypeScript + Tailwind CSS
- **All Core Pages**: Home, Articles, Providers, Clarity Score, About, Contact, Legal, 404
- **Component Library**: Button, Card, Badge, Tooltip, Skeletons
- **Animations**: Framer Motion with 3D effects, staggered reveals
- **Design System**: Teal color scheme, Plus Jakarta Sans + Inter fonts
- **Mock Data**: 6 articles, 6 providers, 8 assessment questions, 6 videos

### What Needs Enhancement (🔧 UI Focus)
| Area | Current State | Target |
|------|---------------|--------|
| Design System | Basic teal theme | Award-worthy, distinctive branding |
| Typography | Generic fonts | Premium, self-hosted fonts |
| Animations | Basic Framer Motion | Orchestrated, 60fps micro-interactions |
| Components | Functional | Polished, accessible, delightful |
| Mobile Experience | Responsive | Mobile-first excellence |
| Accessibility | Partial | WCAG 2.1 AA compliant |
| Mock Content | 6 articles, 6 providers | Expanded demo content |

### Framework Decision
**Current**: Vite + React (SPA)
**Recommendation**: Stay with Vite + React for now
- Faster development iteration
- Simpler deployment
- No backend requirements
- Can migrate to Next.js later when backend is needed

---

## Implementation Phases

### Phase 1: Project Structure & Foundation
**Goal**: Optimize project structure and development workflow

#### 1.1 Project Organization
- [ ] Organize components into feature folders
- [ ] Set up path aliases (@/) for cleaner imports
- [ ] Create consistent file naming conventions
- [ ] Set up Prettier + ESLint configuration
- [ ] Configure TypeScript strict mode

#### 1.2 Design Token System
- [ ] Create `/styles/tokens.css` with CSS custom properties
- [ ] Define color palette (primary, secondary, neutrals, semantic)
- [ ] Define spacing scale (4px base unit)
- [ ] Define typography scale
- [ ] Define shadow and border radius tokens

#### 1.3 Development Environment
- [ ] Set up Storybook for component development
- [ ] Configure hot module replacement optimization
- [ ] Add development utilities (React DevTools, etc.)

**Deliverables**: Clean, organized codebase with design token system

---

### Phase 2: Award-Winning UI Foundation (Epic 0)
**Goal**: Elevate design to portfolio-worthy, award-submission quality

#### 2.1 Design System Overhaul
- [ ] Replace generic fonts (Inter → distinctive choice like Satoshi or Lexend)
- [ ] Refine color palette with CSS custom properties
- [ ] Create comprehensive spacing scale
- [ ] Document all design tokens in `/docs/design-system.md`

#### 2.2 Typography System
- [ ] Self-host fonts via `next/font/local`
- [ ] Create typography components (Display, Heading, Body, Caption)
- [ ] Implement proper heading hierarchy
- [ ] Optimize font loading (preload, variable fonts)

#### 2.3 Animation System
- [ ] Create `/lib/animation-variants.ts` with reusable patterns
- [ ] Implement page transition system
- [ ] Add scroll-triggered animations
- [ ] Create `useReducedMotion` hook for accessibility
- [ ] Ensure 60fps performance

#### 2.4 Homepage Redesign
- [ ] Redesign hero with hub-and-spoke navigation
- [ ] Create distinctive satellite cards for Learn, Connect, Tools, About
- [ ] Implement orchestrated page load sequence
- [ ] Add visual surprises and unexpected layouts

#### 2.5 Component Library Enhancement
- [ ] Redesign Button with distinctive hover effects
- [ ] Create elevated Card variants (glass, depth, interactive)
- [ ] Build sophisticated form components (Input, Select, Checkbox)
- [ ] Add loading states and skeleton screens
- [ ] Implement Toast notification system

#### 2.6 Visual Effects
- [ ] Enhance grain/noise texture overlay
- [ ] Create gradient mesh backgrounds
- [ ] Add glassmorphism effects
- [ ] Implement subtle micro-interactions

#### 2.7 Responsive & Mobile Excellence
- [ ] Audit all pages for mobile experience
- [ ] Ensure 44px minimum touch targets
- [ ] Create mobile navigation drawer
- [ ] Test on real iOS/Android devices

#### 2.8 Accessibility (WCAG 2.1 AA)
- [ ] Add comprehensive ARIA labels
- [ ] Implement keyboard navigation throughout
- [ ] Create visible focus indicators
- [ ] Add skip-to-content link
- [ ] Implement `prefers-reduced-motion` globally

**Deliverables**: Award-worthy homepage and component library

---

### Phase 3: Educational Content System (Epic 2)
**Goal**: Build CMS-powered Learn hub with 50 evidence-based articles

#### 3.1 Sanity.io CMS Setup
- [ ] Create Sanity project
- [ ] Install `@sanity/client` and `next-sanity`
- [ ] Configure Sanity Studio at `/studio` route
- [ ] Set up image CDN pipeline
- [ ] Generate TypeScript types from schemas

#### 3.2 Article Content Schema
- [ ] Define `article` document type with fields:
  - title, slug, summary, body (Portable Text)
  - category, subcategory, author, publishedAt
  - readTime (auto-calculated), featured
  - metaTitle, metaDescription, ogImage
- [ ] Create validation rules (reading level, word count)
- [ ] Set up Portable Text for rich content

#### 3.3 Evidence Citation System
- [ ] Create `citation` document type
- [ ] Build inline citation annotation for Portable Text
- [ ] Implement citation hovercards
- [ ] Create reference list component

#### 3.4 Content Categories & Taxonomy
- [ ] Create `category` document type
- [ ] Seed 10 primary categories:
  1. Anxiety, 2. Depression, 3. PTSD & Trauma
  4. ADHD, 5. OCD, 6. Bipolar Disorder
  7. Eating Disorders, 8. Substance Use
  9. Personality Disorders, 10. Schizophrenia & Psychosis
- [ ] Build category browsing pages
- [ ] Implement subcategory navigation

#### 3.5 Article Display Pages
- [ ] Build `/learn/[category]/[slug]` route (SSG)
- [ ] Implement Portable Text renderer
- [ ] Create table of contents from headings
- [ ] Add reading progress indicator
- [ ] Build related articles sidebar
- [ ] Add medical disclaimer footer

#### 3.6 Article Search
- [ ] Implement search with Sanity GROQ
- [ ] Add autocomplete suggestions
- [ ] Create search results page
- [ ] Add category/sort filters

#### 3.7 Expert Review Workflow
- [ ] Add status field (draft, in_review, approved, published)
- [ ] Create reviewer assignment system
- [ ] Build admin dashboard for pending reviews
- [ ] Track annual re-review dates

#### 3.8 Content Disclaimers
- [ ] Create `<Disclaimer>` component
- [ ] Add medical disclaimer to all articles
- [ ] Implement crisis resources footer
- [ ] Create Privacy Policy and Terms pages

#### 3.9 Seed Content
- [ ] Create 10-15 seed articles for launch
- [ ] Cover top 5 categories (2 articles each)
- [ ] Pass quality assurance checklist

**Deliverables**: Fully functional Learn hub with CMS and 15+ articles

---

### Phase 4: Clarity Score Assessment (Epic 3)
**Goal**: Build 10-minute validated self-assessment tool

#### 4.1 Assessment Data Model
- [ ] Create `assessment_questions` table in Supabase
- [ ] Define question schema (text, type, dimension, weight)
- [ ] Seed 25-30 validated questions based on:
  - GAD-7 derivatives (anxiety)
  - PHQ-9 derivatives (depression)
  - PSS derivatives (stress)

#### 4.2 Assessment UI Flow
- [ ] Build assessment landing page with intro
- [ ] Create one-question-at-a-time interface
- [ ] Implement progress bar
- [ ] Add back/next navigation
- [ ] Save progress to localStorage

#### 4.3 Scoring Algorithm
- [ ] Implement scoring function in API route
- [ ] Calculate dimension scores (anxiety, depression, stress)
- [ ] Calculate overall Clarity Score (0-100)
- [ ] Define score thresholds (Minimal, Mild, Moderate, Severe)
- [ ] Store anonymized results in Supabase

#### 4.4 Results Visualization
- [ ] Build results page at `/tools/clarity-score/results/[id]`
- [ ] Create color-coded score display
- [ ] Add dimension breakdown charts (Recharts)
- [ ] Generate personalized insights text

#### 4.5 Crisis Detection
- [ ] Define trigger thresholds (score ≥71, depression ≥80)
- [ ] Create prominent crisis banner component
- [ ] Add 988 Lifeline, Crisis Text Line, 911 resources
- [ ] Make banner non-dismissible for severe scores

#### 4.6 Score History (Authenticated)
- [ ] Create user score history page
- [ ] Build trend visualization chart
- [ ] Allow score deletion (GDPR compliance)

#### 4.7 Recommendations Engine
- [ ] Link scores to relevant Learn articles
- [ ] Pre-filter Provider Directory by specialty
- [ ] Create "What does this mean?" expandable section

**Deliverables**: Complete Clarity Score tool with crisis detection

---

### Phase 5: Provider Directory (Epic 4)
**Goal**: Build verified provider search and discovery system

#### 5.1 Provider Data Model
- [ ] Create `providers` table in Supabase with fields:
  - name, credentials, license info (private)
  - practice details, specialties, session types
  - bio, photo, insurance, verified status

#### 5.2 Provider Onboarding Form
- [ ] Build multi-step onboarding form:
  1. Account creation (email, password)
  2. Professional info (credentials, license)
  3. Practice details (address, phone, website)
  4. Specialties and session types
  5. Bio and photo upload
  6. Review and submit
- [ ] Implement form validation with Zod
- [ ] Store submissions in Supabase

#### 5.3 Provider Verification Process
- [ ] Create admin verification dashboard
- [ ] Build approval/rejection workflow
- [ ] Send email notifications on status change
- [ ] Display "Verified" badge on approved profiles

#### 5.4 Provider Search & Filter
- [ ] Implement location-based search (zip + radius)
- [ ] Add specialty multi-select filter
- [ ] Add discipline filter (Therapist, Psychologist, etc.)
- [ ] Add session type filter (In-person, Telehealth, Hybrid)
- [ ] Add insurance filter
- [ ] Implement pagination (10 results per page)

#### 5.5 Provider Public Profile
- [ ] Build `/providers/[id]` page
- [ ] Display public info (name, credentials, bio, specialties)
- [ ] Hide private data (license number, insurance policy)
- [ ] Add "Contact" button with info display
- [ ] Add SEO schema markup

#### 5.6 Provider Dashboard (Post-Approval)
- [ ] Create provider login area
- [ ] Build profile edit form
- [ ] Show basic analytics (profile views, search impressions)
- [ ] Track license renewal dates

#### 5.7 Annual Re-Verification
- [ ] Flag providers with expiring licenses
- [ ] Send reminder emails at 90 days
- [ ] Unpublish profiles if not renewed

**Deliverables**: Searchable provider directory with verification workflow

---

### Phase 6: User Management (Epic 5)
**Goal**: Implement patient and provider accounts

#### 6.1 Patient Account System
- [ ] Build signup page (email, password, optional name)
- [ ] Implement email verification flow
- [ ] Create login page with "Forgot password"
- [ ] Build patient dashboard with:
  - Clarity Score history
  - Bookmarked articles
  - Saved providers
  - Account settings

#### 6.2 Session Management
- [ ] Configure JWT tokens (30-day session)
- [ ] Implement refresh token logic
- [ ] Add "Remember me" option
- [ ] Handle logout and session clearing

#### 6.3 Data Privacy (GDPR/CCPA)
- [ ] Build data export feature (JSON download)
- [ ] Implement account deletion with confirmation
- [ ] Send deletion confirmation email
- [ ] Retain only anonymized analytics data

#### 6.4 Provider Account System
- [ ] Distinguish provider vs patient accounts
- [ ] Require email verification before profile submission
- [ ] Show pending status until admin approval

**Deliverables**: Complete authentication and user management

---

### Phase 7: Admin Operations (Epic 6)
**Goal**: Build admin tools for content and provider management

#### 7.1 Admin Authentication
- [ ] Create admin roles (Super Admin, Content Admin, Provider Admin)
- [ ] Require 2FA for all admins
- [ ] Implement IP whitelisting
- [ ] Set 4-hour idle timeout

#### 7.2 Content Management Dashboard
- [ ] Integrate Sanity Studio for article management
- [ ] Show pending review queue
- [ ] Track re-review schedules

#### 7.3 Provider Management Dashboard
- [ ] List pending provider applications
- [ ] Build verification checklist interface
- [ ] Track re-verification queue
- [ ] Manage provider status (approve, reject, suspend)

#### 7.4 Platform Analytics Dashboard
- [ ] Display user metrics (total, new, active)
- [ ] Show content metrics (articles, views, engagement)
- [ ] Track assessment completions and crisis triggers
- [ ] Add date range selector and CSV export

#### 7.5 User Management Tools
- [ ] User search by email/name
- [ ] View user profiles and history
- [ ] Handle GDPR data requests
- [ ] Manage support tickets (future: Zendesk)

**Deliverables**: Admin dashboard for operations

---

### Phase 8: Polish & Launch (Epic 7)
**Goal**: Final optimization and launch readiness

#### 8.1 SEO Optimization
- [ ] Add unique title/meta to all pages
- [ ] Implement schema.org markup (Article, LocalBusiness, Organization)
- [ ] Generate sitemap.xml
- [ ] Configure robots.txt
- [ ] Set canonical URLs

#### 8.2 Performance Optimization
- [ ] Achieve Lighthouse 90+ scores
- [ ] Implement code splitting
- [ ] Optimize images (WebP, lazy loading, responsive srcset)
- [ ] Configure caching headers
- [ ] Test on 3G networks

#### 8.3 Analytics Integration
- [ ] Set up Plausible Analytics (GDPR-compliant)
- [ ] Track key events (score completions, searches, contacts)
- [ ] Create conversion funnels

#### 8.4 Email Integration
- [ ] Set up SendGrid/Resend for transactional emails
- [ ] Build email templates (verification, password reset, notifications)
- [ ] Connect contact form to email backend
- [ ] Set up newsletter signup

#### 8.5 Final QA Checklist
- [ ] Test all user flows end-to-end
- [ ] Verify accessibility (axe, manual testing)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)
- [ ] Security audit (XSS, CSRF, SQL injection)
- [ ] Load testing

#### 8.6 Launch Preparation
- [ ] Configure custom domain
- [ ] Set up error monitoring (Sentry)
- [ ] Create backup procedures
- [ ] Document deployment process
- [ ] Prepare rollback plan

**Deliverables**: Production-ready platform

---

## Content Creation (Parallel Track)

**Note**: Content creation happens in parallel with development

### Articles (Target: 50 for MVP, 15 minimum for launch)
- [ ] Create 5 articles per top condition:
  - Overview, Symptoms, Causes, Treatment, Living With
- [ ] Ensure 8th-10th grade reading level
- [ ] Add 3+ citations per article
- [ ] Get clinician review

### Providers (Target: 20-50, minimum 10 for launch)
- [ ] Recruit providers in SF Bay Area
- [ ] Verify licenses manually
- [ ] Onboard through new provider form

### Assessment Questions (Target: 25-30)
- [ ] Expand from 8 to 25-30 questions
- [ ] Cover all dimensions (anxiety, depression, stress)
- [ ] Get clinician validation

---

## Excluded from Plan (Per User Request)

The following AI-related features are **excluded** as the user has these ready separately:
- AI Chat Widget (AIChatWidget.tsx)
- Gemini API integration
- AI-powered recommendations
- Sykes AI features

---

## Critical Files to Modify

### New Files to Create
- `/app/` - Next.js App Router pages
- `/lib/supabase.ts` - Supabase client
- `/lib/auth.ts` - Firebase auth helpers
- `/lib/env.ts` - Environment validation
- `/lib/animation-variants.ts` - Framer Motion variants
- `/sanity/` - Sanity.io schemas and config
- `/docs/design-system.md` - Design documentation

### Files to Migrate
- `/components/` - All existing components (minimal changes)
- `/data/` - Will be replaced by Supabase/Sanity

### Files to Delete (After Migration)
- `vite.config.ts` - Replaced by `next.config.js`
- Custom routing in `App.tsx` - Replaced by App Router

---

## Estimated Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Foundation | 1-2 weeks | None |
| Phase 2: UI Polish | 1-2 weeks | Phase 1 |
| Phase 3: Learn Hub | 2-3 weeks | Phase 1, 2 |
| Phase 4: Clarity Score | 1-2 weeks | Phase 1 |
| Phase 5: Provider Directory | 2 weeks | Phase 1 |
| Phase 6: User Management | 1 week | Phase 1 |
| Phase 7: Admin | 1-2 weeks | Phase 3, 4, 5 |
| Phase 8: Launch | 1 week | All phases |

**Total**: 10-15 weeks for complete MVP

---

## Success Criteria

- [ ] All 8 epics complete
- [ ] 15+ articles published
- [ ] 10+ verified providers
- [ ] 25+ assessment questions
- [ ] Lighthouse scores 90+
- [ ] WCAG 2.1 AA compliant
- [ ] Production deployment on Vercel
- [ ] Award-submission worthy design
