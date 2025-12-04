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

### Phase 2: Award-Winning UI Foundation
**Goal**: Elevate design to portfolio-worthy, award-submission quality

#### 2.1 Design System Overhaul

- [ ] Replace generic fonts (Inter -> distinctive choice like Satoshi or Lexend)
- [ ] Refine color palette with CSS custom properties
- [ ] Create comprehensive spacing scale
- [ ] Document all design tokens in `/docs/design-system.md`

#### 2.2 Typography System

- [ ] Self-host fonts locally (download and add to `/public/fonts`)
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

### Phase 3: Learn Hub UI (Educational Content)
**Goal**: Build polished article browsing and reading experience

#### 3.1 Article Data Structure

- [ ] Define TypeScript interfaces for articles
- [ ] Expand mock article data (15-20 articles)
- [ ] Add categories, authors, reading time, citations
- [ ] Create rich content structure for article bodies

#### 3.2 Category Pages

- [ ] Build category listing page with grid layout
- [ ] Create 10 primary category cards:
  1. Anxiety, 2. Depression, 3. PTSD & Trauma
  4. ADHD, 5. OCD, 6. Bipolar Disorder
  7. Eating Disorders, 8. Substance Use
  9. Personality Disorders, 10. Schizophrenia & Psychosis
- [ ] Implement subcategory navigation
- [ ] Add category hero sections with illustrations

#### 3.3 Article Detail Page

- [ ] Build beautiful article reading experience
- [ ] Create table of contents from headings
- [ ] Add reading progress indicator
- [ ] Build related articles sidebar
- [ ] Implement citation hover cards
- [ ] Add medical disclaimer footer

#### 3.4 Article Search & Filter UI

- [ ] Build search input with autocomplete UI
- [ ] Create search results page
- [ ] Add category filter chips
- [ ] Add sort dropdown (newest, popular, relevance)
- [ ] Implement empty state and no-results state

#### 3.5 Content Components

- [ ] Create `<Disclaimer>` component
- [ ] Build `<Citation>` inline component
- [ ] Create `<ReferenceList>` for article footers
- [ ] Build `<CrisisResources>` footer component

**Deliverables**: Complete Learn hub UI with mock content

---

### Phase 4: Clarity Score Assessment UI
**Goal**: Build polished self-assessment experience

#### 4.1 Assessment Questions Data

- [ ] Expand mock questions from 8 to 25-30
- [ ] Define question types (Likert scale, multiple choice)
- [ ] Add dimension tags (anxiety, depression, stress)
- [ ] Create scoring weights for each question

#### 4.2 Assessment Flow UI

- [ ] Build assessment landing/intro page
- [ ] Create one-question-at-a-time interface
- [ ] Implement animated progress bar
- [ ] Add smooth back/next navigation with transitions
- [ ] Save progress to localStorage
- [ ] Add "exit and save" functionality

#### 4.3 Results Visualization

- [ ] Build results page with score display
- [ ] Create animated score reveal
- [ ] Add color-coded severity indicators
- [ ] Build dimension breakdown charts (Recharts)
- [ ] Create personalized insights cards
- [ ] Add "retake assessment" option

#### 4.4 Crisis Detection UI

- [ ] Create prominent crisis banner component
- [ ] Add 988 Lifeline, Crisis Text Line, 911 resources
- [ ] Make banner visually distinct and accessible
- [ ] Implement non-dismissible state for severe scores

#### 4.5 Score History UI (Mock)

- [ ] Create score history page layout
- [ ] Build trend visualization chart
- [ ] Add score comparison cards
- [ ] Create empty state for new users

#### 4.6 Recommendations UI

- [ ] Create "What does this mean?" expandable section
- [ ] Build recommended articles cards
- [ ] Add suggested provider specialties

**Deliverables**: Complete Clarity Score UI with all states

---

### Phase 5: Provider Directory UI
**Goal**: Build polished provider search and profile experience

#### 5.1 Provider Data Structure

- [ ] Expand mock provider data (15-20 providers)
- [ ] Add diverse specialties, locations, credentials
- [ ] Include session types (In-person, Telehealth, Hybrid)
- [ ] Add insurance information

#### 5.2 Provider Search & Filter UI

- [ ] Build search bar with location input
- [ ] Create multi-select specialty filter
- [ ] Add discipline filter (Therapist, Psychologist, etc.)
- [ ] Add session type filter chips
- [ ] Add insurance dropdown filter
- [ ] Implement results pagination UI

#### 5.3 Provider Cards

- [ ] Design provider card component
- [ ] Add photo, name, credentials, specialties
- [ ] Show session types and availability indicators
- [ ] Add "Verified" badge styling
- [ ] Create hover/focus states

#### 5.4 Provider Profile Page

- [ ] Build provider detail page layout
- [ ] Display full bio and credentials
- [ ] Show specialties with descriptions
- [ ] Add session types and insurance info
- [ ] Create contact information section
- [ ] Add "similar providers" section

#### 5.5 Empty & Loading States

- [ ] Create no-results state with suggestions
- [ ] Build skeleton loading cards
- [ ] Add filter reset option

**Deliverables**: Complete Provider Directory UI

---

### Phase 6: Forms & Interactive Elements
**Goal**: Polish all form experiences

#### 6.1 Contact Form

- [ ] Redesign contact form with validation
- [ ] Add input animations and feedback
- [ ] Create success/error states
- [ ] Build form submission animation

#### 6.2 Newsletter Signup

- [ ] Create newsletter signup component
- [ ] Add email validation
- [ ] Build success confirmation UI

#### 6.3 Mock Authentication UI

- [ ] Build login page design
- [ ] Create signup page design
- [ ] Design password reset flow
- [ ] Add form validation feedback

#### 6.4 Provider Onboarding Form UI (Mock)

- [ ] Design multi-step form wizard
- [ ] Create step progress indicator
- [ ] Build form field components
- [ ] Add photo upload UI component

**Deliverables**: All forms polished and functional (frontend only)

---

### Phase 7: Polish & Optimization
**Goal**: Final optimization and quality assurance

#### 7.1 SEO Optimization

- [ ] Add unique title/meta to all pages
- [ ] Configure React Helmet for dynamic meta
- [ ] Create sitemap.xml (static)
- [ ] Configure robots.txt

#### 7.2 Performance Optimization

- [ ] Achieve Lighthouse 90+ scores
- [ ] Implement code splitting with React.lazy
- [ ] Optimize images (WebP, lazy loading, responsive srcset)
- [ ] Minimize bundle size
- [ ] Test on 3G networks

#### 7.3 Cross-Browser Testing

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS Safari, Chrome Android
- [ ] Fix any browser-specific issues

#### 7.4 Accessibility Audit

- [ ] Run axe accessibility tests
- [ ] Test with screen readers (VoiceOver, NVDA)
- [ ] Verify keyboard navigation
- [ ] Check color contrast ratios
- [ ] Test with reduced motion preference

#### 7.5 Final QA Checklist

- [ ] Test all navigation flows
- [ ] Verify all animations are smooth
- [ ] Check all responsive breakpoints
- [ ] Validate all form behaviors
- [ ] Test error states and edge cases

**Deliverables**: Production-ready frontend

---

## Mock Content Expansion

**Note**: Expand mock data for realistic demo experience

### Articles (Target: 15-20 for demo)

- [ ] Create 2-3 articles per top condition
- [ ] Include varied content lengths
- [ ] Add author information
- [ ] Include citation examples

### Providers (Target: 15-20 for demo)

- [ ] Create diverse provider profiles
- [ ] Vary locations (SF Bay Area focus)
- [ ] Mix of specialties and session types
- [ ] Include different credential types

### Assessment Questions (Target: 25-30)

- [ ] Expand from 8 to 25-30 questions
- [ ] Cover all dimensions (anxiety, depression, stress)
- [ ] Balance question types

---

## Excluded from Plan

The following are **excluded** from this frontend-focused plan:
- Backend infrastructure (Supabase, Firebase, API routes)
- CMS integration (Sanity.io)
- User authentication system
- Admin dashboards
- Email integration
- Real data persistence
- AI Chat Widget (user has separately)

---

## Files to Create/Modify

### New Files to Create

- `/lib/animation-variants.ts` - Framer Motion variants
- `/docs/design-system.md` - Design documentation
- `/styles/tokens.css` - CSS custom properties
- `/data/` - Expanded mock data files
- Typography components
- Enhanced form components

### Files to Enhance

- All existing page components
- Component library (Button, Card, etc.)
- Navigation components
- Layout components

---

## Success Criteria

- [ ] All 7 phases complete
- [ ] 15+ mock articles
- [ ] 15+ mock providers
- [ ] 25+ assessment questions
- [ ] Lighthouse scores 90+
- [ ] WCAG 2.1 AA compliant
- [ ] Smooth 60fps animations
- [ ] Award-submission worthy design
- [ ] Fully functional demo experience (frontend only)
