# Project Psychage V1 - Epic Breakdown

**Author:** Ryan
**Date:** 2025-11-12
**Project Level:** HIGH (Healthcare domain with regulatory considerations)
**Target Scale:** 100K+ MAU by Year 3, 750 verified providers, 500+ articles

---

## Overview

This document provides the complete epic and story breakdown for Project Psychage V1, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

### Epic Summary

Project Psychage V1 is organized into **8 sequential epics** with UI-first approach that deliver incremental value:

0. **Award-Winning UI Foundation** 🎨 *(NEW - TOP PRIORITY)* - Establish distinctive visual design system before building features
1. **Foundation & Core Infrastructure** *(Redesign UI components)* - Establish technical foundation (Next.js 16, Supabase, Vercel deployment)
2. **Learn - Educational Content System** *(Redesign article display)* - Evidence-based mental health education (50 articles, Sanity.io CMS)
3. **Tools - Clarity Score Assessment** *(Redesign assessment UI)* - 10-minute self-assessment with personalized insights
4. **Connect - Provider Directory** *(Use new design system)* - Verified provider search and discovery
5. **User Management & Authentication** *(Use new design system)* - Personalized experiences with account management
6. **Admin Operations & Management** *(Use new design system)* - Content quality control and platform operations
7. **Polish & Launch Readiness** *(Final optimization)* - SEO, accessibility, performance optimization

**Total Stories**: 53-68 bite-sized stories across 8 epics
**Development Approach**: UI-first with sequential epic delivery - complete visual foundation (Epic 0) before building features
**Strategic Rationale**: Award-winning UI is a trust signal in healthcare - better to establish design system first than retrofit later
**Healthcare Compliance**: HIPAA-exempt boundaries, crisis detection, and evidence-based standards integrated throughout

---

## Epic 0: Award-Winning UI Foundation 🎨

**Epic Goal**: Establish a distinctive, portfolio-worthy visual foundation for Psychage that avoids generic health-tech aesthetics and creates a memorable, award-winning user experience. This epic delivers the complete design system, typography, color, animation, and layout patterns that all subsequent features will use.

**Value Delivery**: By completing this epic, Psychage has a distinctive visual identity that signals trustworthiness and sophistication, differentiating from competitors through superior design craft.

**Design Philosophy**: Follow frontend-design skill principles - bold aesthetics, distinctive typography, rich motion, unexpected layouts, and context-specific character. Every page should be portfolio-worthy.

**Epic Completion Criteria:**
- ✅ Homepage is portfolio-worthy and award-submission quality
- ✅ Design system is complete and documented
- ✅ All core components are visually distinctive
- ✅ Animations are smooth and delightful
- ✅ Accessibility maintained (WCAG 2.1 AA)
- ✅ Performance excellent (Lighthouse 90+ scores)
- ✅ Mobile experience equally impressive as desktop

---

### Story 0.1: Design System Foundation & Color Architecture

As a **developer**,
I want **a complete design system with distinctive color palette, spacing scale, and CSS architecture**,
So that **all UI components have a consistent, award-winning visual foundation**.

**Acceptance Criteria:**

**Given** The Next.js project with Tailwind is configured
**When** I implement the design system
**Then** Tailwind config includes custom design tokens

**And** Color system is defined:
- CSS custom properties for all colors (not generic Tailwind defaults)
- Semantic color naming (primary, accent, neutral, crisis - not blue-500)
- Dark mode variants for all colors
- Dominant color strategy (deep blues dominant, coral accents - not evenly-distributed)
- Unexpected accent colors that create visual interest
- High contrast for accessibility (WCAG AA minimum)

**And** Spacing scale is refined:
- Custom spacing scale extending Tailwind defaults
- Generous whitespace built into system (4px base)
- Consistent rhythm throughout UI

**And** Typography scale is established:
- Display, heading, body, caption sizes
- Line heights optimized for readability (1.5 body, 1.2 headings)
- Letter spacing adjustments for display fonts
- Clear hierarchy (H1 > H2 > H3 > H4 > H5 > H6)

**And** Component architecture patterns:
- Variant-based component API using class-variance-authority (CVA)
- Consistent prop patterns across components
- Accessible by default (ARIA labels, semantic HTML)

**And** CSS Variables are organized:
```css
:root {
  /* Colors */
  --color-primary-50: ...;
  --color-primary-900: ...;
  --color-accent-coral: ...;

  /* Spacing */
  --spacing-xs: ...;
  --spacing-xl: ...;

  /* Typography */
  --font-display: ...;
  --font-body: ...;
}
```

**Prerequisites:** Story 1.1 (Project Initialization)

**Technical Notes:**
- Extend Tailwind theme significantly in `tailwind.config.ts`
- Create shared CSS custom properties in `app/globals.css`
- Document all design tokens in `README-design-system.md`
- Reference frontend-design principles throughout

**Estimated Effort:** 2-3 days

---

### Story 0.2: Typography System & Custom Font Integration

As a **user**,
I want **distinctive, beautiful typography throughout the platform**,
So that **Psychage feels crafted and professional, not generic**.

**Acceptance Criteria:**

**Given** Design system foundation exists
**When** I implement typography system
**Then** Custom fonts are loaded via next/font

**And** Font pairing is distinctive:
- Display/heading font is characterful (NOT Inter, Roboto, Arial, system fonts)
- Body font is refined and readable
- Monospace for code/technical content
- Fonts complement each other (display + body pairing)

**And** Typography hierarchy is clear:
- H1 through H6 are visually distinct with proper sizing
- Body text is optimized (line-height 1.5, measure 60-75ch, high contrast)
- Micro-typography styled (blockquotes, lists, inline code, links)
- Display font used for hero headings and section titles
- Body font used for paragraphs, UI text, forms

**And** Performance is optimized:
- Fonts are preloaded in root layout
- Variable fonts used where possible (reduces file size)
- Fallback fonts minimize FOUT (Flash of Unstyled Text)
- Fonts subset for Latin + Extended Latin only
- Self-hosted (not Google Fonts CDN)

**And** Font configuration in `app/fonts.ts`:
```typescript
import localFont from 'next/font/local'

export const displayFont = localFont({
  src: '../public/fonts/display-variable.woff2',
  variable: '--font-display',
  display: 'swap',
  preload: true
})

export const bodyFont = localFont({
  src: '../public/fonts/body-variable.woff2',
  variable: '--font-body',
  display: 'swap',
  preload: true
})
```

**And** Tailwind config updated:
```typescript
fontFamily: {
  display: ['var(--font-display)', 'system-ui', 'sans-serif'],
  body: ['var(--font-body)', 'system-ui', 'sans-serif']
}
```

**And** Accessibility maintained:
- All text meets WCAG contrast requirements (4.5:1 normal, 3:1 large)
- Font sizes scale properly with user preferences
- Line length constrained for readability (max 75ch)
- Focus indicators visible on all interactive text

**Prerequisites:** Story 0.1 (Design System Foundation)

**Technical Notes:**
- Research font licensing for commercial use (check licenses carefully)
- Use `next/font/local` for self-hosting
- Consider variable fonts for performance (single file, all weights)
- Test font loading on slow connections

**Font Selection Resources:**
- Display fonts: Fontshare, Velvetyne, Open Foundry
- Body fonts: Adobe Fonts, Commercial foundries with proper licenses
- Avoid: Google Fonts (CDN issues), Inter/Roboto (generic)

**Estimated Effort:** 2-3 days

---

### Story 0.3: Animation System & Motion Library Setup

As a **user**,
I want **delightful, sophisticated animations throughout the interface**,
So that **Psychage feels premium and engaging, not static**.

**Acceptance Criteria:**

**Given** Design system and typography are established
**When** I set up animation system
**Then** Framer Motion is installed and configured

**And** Animation patterns are defined:
- Page transitions (fade in/out, slide)
- Staggered reveals for lists (cards, articles)
- Scroll-triggered animations (elements fade in as user scrolls)
- Hover micro-interactions (lift, scale, color shift)
- Loading states (skeleton screens, spinners)

**And** Framer Motion installed:
```bash
npm install framer-motion@^11.0.0
```

**And** Animation variants created in `lib/animation-variants.ts`:
```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
}
```

**And** CSS-first simple animations:
- Fade-in utilities with Tailwind animations
- Slide-in utilities for modals/drawers
- Scale utilities for hover effects
- Custom easing curves (easeOut, easeInOut)

**And** Animation hooks created:
```typescript
// hooks/use-in-view.ts
export const useInView = () => {
  const ref = useRef(null)
  const isInView = useInViewFramer(ref, { once: true })
  return { ref, isInView }
}

// hooks/use-reduced-motion.ts
export const useReducedMotion = () => {
  return useReducedMotionFramer()
}
```

**And** Accessibility is respected:
- Animations respect `prefers-reduced-motion` media query
- Reduced motion mode uses instant transitions (duration: 0)
- Animations don't block interaction (non-blocking)
- Focus management maintained during transitions

**And** Performance is optimized:
- Animations use `transform` and `opacity` only (GPU-accelerated)
- No layout thrashing (avoid animating width/height)
- 60fps maintained on all animations
- Animation duration reasonable (200-400ms for most)

**Prerequisites:** Story 0.2 (Typography System)

**Technical Notes:**
- Create reusable animation variants for consistency
- Build animation utility hooks for common patterns
- Document animation patterns in design system docs
- Test on low-end devices for performance

**Estimated Effort:** 2-3 days

---

### Story 0.4: Hub-and-Spoke Homepage - Award-Winning Redesign

As a **user visiting Psychage for the first time**,
I want **an immediately striking, memorable homepage that clearly shows my options**,
So that **I'm impressed by the quality and understand how to navigate**.

**Acceptance Criteria:**

**Given** Design system, typography, and animation system exist
**When** I design and build the homepage
**Then** Hub-and-spoke layout is implemented

**And** Visual impact is achieved:
- Hero section with distinctive visual treatment (not generic header)
- Satellite cards with unexpected design (asymmetric layout, not generic grid)
- Asymmetric or grid-breaking layouts create visual interest
- Rich backgrounds (gradients, patterns, depth - not solid colors)
- Attention to micro-details (custom shadows, borders, hover states)
- Every element feels intentionally designed

**And** Four satellites are clear and distinctive:
- **Learn** (education) - Icon + title + description
- **Connect** (providers) - Icon + title + description
- **Tools** (Clarity Score) - Icon + title + description
- **Spark** (content) - Icon + title + description
- Each satellite has unique visual treatment

**And** Animation choreography:
- Page load sequence is orchestrated (not everything at once)
- Staggered reveals for satellite cards (0.1s delay between each)
- Smooth fade-in for hero section
- Hover states are surprising and delightful (lift, scale, glow)
- Scroll-triggered animations for below-fold content

**And** Typography hierarchy guides eye:
- Clear H1 headline that explains Psychage value prop
- Supporting H2/H3 copy that doesn't overwhelm
- Call-to-action buttons are obvious (high contrast, large)
- Whitespace creates breathing room

**And** Hero section components:
- Headline: "Mental Health Operating System" or similar
- Subheadline: Clear value proposition
- Primary CTA: "Take Clarity Score" or "Explore Mental Health"
- Visual element: Gradient mesh background, floating cards, or distinctive graphic

**And** Crisis resources in footer:
- Always visible but not intrusive
- Clear, accessible design
- NAMI, 988, Crisis Text Line links
- "If you're in crisis" clear messaging

**And** Mobile responsive:
- Hub-and-spoke works beautifully on mobile (cards stack)
- Touch-friendly tap targets (44px minimum)
- Typography scales appropriately
- Animations work smoothly on mobile devices

**And** Accessibility maintained:
- Semantic HTML structure (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Keyboard navigation works perfectly
- Screen reader experience is clear
- WCAG 2.1 AA compliance (contrast, focus states)
- Skip to content link for screen readers

**And** Performance optimized:
- Lighthouse performance score 90+
- Images optimized (WebP, proper sizing)
- Animations don't block rendering
- Fast load on 3G connections

**Prerequisites:** Story 0.3 (Animation System)

**Technical Notes:**
- This is the flagship page - take time to make it exceptional
- Consider multiple design iterations - don't settle for first draft
- Mobile-first approach but desktop should be stunning
- Reference frontend-design skill for inspiration
- Test on real devices (iOS, Android)

**Design Thinking:**
- **Purpose:** First impression, navigation hub, value communication
- **Tone:** Bold but trustworthy, sophisticated but accessible
- **Constraints:** Healthcare context (avoid playful), accessibility critical
- **Differentiation:** What makes this homepage UNFORGETTABLE?

**Estimated Effort:** 3-4 days

---

### Story 0.5: Core Component Library - Award-Winning Redesign

As a **developer**,
I want **beautifully designed, accessible UI components that follow our design system**,
So that **all features I build look cohesive and portfolio-worthy**.

**Acceptance Criteria:**

**Given** Design system, typography, and animation system exist
**When** I redesign the core component library
**Then** All shadcn/ui components are visually customized (not default styles)

**And** Button components (`components/ui/button.tsx`):
- Multiple variants (primary, secondary, ghost, danger, link)
- Size variants (sm, md, lg, icon)
- Loading states with elegant spinner
- Disabled states with reduced opacity
- Focus states that are beautiful (not just blue outline - custom ring)
- Hover animations (lift, scale, color shift)
- Icon support (left/right)

**And** Card components (`components/ui/card.tsx`):
- Multiple card patterns (default, elevated, bordered, interactive)
- Hover effects and depth (lift on hover, shadow transition)
- Support for images, icons, badges
- Asymmetric layouts (not always centered)
- Glassmorphism variant (backdrop blur)

**And** Form components:
- **Input fields** (`components/ui/input.tsx`): Sophisticated styling, focus states, error states
- **Select dropdowns** (`components/ui/select.tsx`): Custom dropdown that doesn't look generic
- **Checkboxes** (`components/ui/checkbox.tsx`): Distinctive check mark, smooth animation
- **Radio buttons** (`components/ui/radio-group.tsx`): Elegant selection indicator
- **Text areas**: Proper sizing, resize handles
- **Validation states**: Clear error/success indicators with color + icon

**And** Navigation components:
- **Header/Navbar**: Matches brand aesthetic, sticky/fixed positioning
- **Footer**: Organized content, crisis resources prominent
- **Breadcrumbs**: Clear hierarchy, proper spacing
- **Tabs**: Active state obvious, smooth transitions

**And** Feedback components:
- **Toast notifications** (`components/ui/toast.tsx`): Delightful slide-in animation, auto-dismiss
- **Alert/Banner** (`components/ui/alert.tsx`): Proper hierarchy (info, warning, error, success)
- **Dialog/Modal** (`components/ui/dialog.tsx`): Smooth fade-in, backdrop blur, ESC to close
- **Loading states**: Custom spinner matching brand, skeleton screens
- **Progress bars**: Smooth animations, determinate/indeterminate variants

**And** All components use design tokens:
- Colors from CSS variables (consistent palette)
- Spacing from spacing scale (consistent rhythm)
- Typography from font system (consistent type)
- Animations from animation variants (consistent motion)

**And** All components are accessible:
- WCAG 2.1 AA compliance maintained
- Keyboard navigation works perfectly
- Screen reader support with proper ARIA labels
- Focus indicators always visible
- Color not sole indicator of meaning

**And** Component documentation:
- Each component has usage examples
- Variants documented
- Props documented
- Accessibility notes included

**Prerequisites:** Story 0.4 (Homepage Redesign)

**Technical Notes:**
- Customize shadcn/ui components heavily - don't use default styles
- Build component playground for testing (Storybook future enhancement)
- Document usage patterns in `components/ui/README.md`
- Use CVA (class-variance-authority) for variant management

**Estimated Effort:** 3-4 days

---

### Story 0.6: Visual Effects & Atmospheric Details

As a **user**,
I want **rich visual details and atmospheric effects throughout the site**,
So that **Psychage feels crafted and premium, not generic**.

**Acceptance Criteria:**

**Given** Core components and homepage exist
**When** I add visual effects and details
**Then** Background treatments are implemented:
- Subtle grain/noise texture overlay across site (optional toggle)
- Gradient mesh backgrounds for hero sections
- Geometric pattern library (dots, lines, waves)
- Depth through layering (cards float above backgrounds)

**And** Grain/noise texture:
```typescript
// components/effects/grain-overlay.tsx
export const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay">
    <svg>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" />
      </filter>
    </svg>
  </div>
)
```

**And** Gradient mesh backgrounds:
```css
.gradient-mesh {
  background:
    conic-gradient(from 180deg at 50% 50%,
      hsl(210, 80%, 50%),
      hsl(240, 70%, 60%),
      hsl(210, 80%, 50%)
    );
}
```

**And** Visual details are added:
- Custom cursor effects for interactive elements (optional, performance-tested)
- Decorative borders and dividers (not generic 1px lines)
- Shadows and elevation system (realistic depth, not flat)
- Glassmorphism effects where appropriate (cards, modals)

**And** Micro-interactions:
- Button hover effects (lift, glow, scale)
- Link hover effects (underline animation, color shift)
- Card interaction effects (tilt on hover, shadow expansion)
- Scroll progress indicators (page top, article reading progress)

**And** Atmospheric components created:
```typescript
// components/effects/floating-shapes.tsx - Decorative background elements
// components/effects/gradient-mesh.tsx - Gradient backgrounds
// components/effects/geometric-pattern.tsx - Pattern library
// components/effects/glass-card.tsx - Glassmorphism card variant
```

**And** Performance is maintained:
- Effects are GPU-accelerated where possible (`transform`, `opacity`)
- No performance degradation (60fps maintained)
- Effects are opt-out for low-end devices (feature detection)
- Reduced motion mode disables decorative animations

**And** Accessibility is respected:
- Effects don't interfere with usability
- Color is not sole indicator of meaning
- Reduced motion mode supported
- Screen readers ignore decorative elements (aria-hidden)

**Prerequisites:** Story 0.5 (Component Library)

**Technical Notes:**
- Keep effects subtle and tasteful (avoid overdoing it)
- Test on various devices (desktop, tablet, mobile)
- Consider battery impact on mobile
- Use CSS `will-change` sparingly

**Estimated Effort:** 2-3 days

---

### Story 0.7: Responsive Layout System & Mobile Excellence

As a **mobile user**,
I want **the award-winning design to work beautifully on my phone**,
So that **the mobile experience is just as impressive as desktop**.

**Acceptance Criteria:**

**Given** All desktop UI is implemented
**When** I optimize for mobile and tablet
**Then** Responsive breakpoint system is refined:
- Mobile-first approach (design for mobile, enhance for desktop)
- Custom breakpoints in Tailwind config (sm, md, lg, xl, 2xl)
- Touch-friendly sizing (44px minimum touch targets)
- Proper viewport meta tag configured

**And** Mobile homepage is excellent:
- Hub-and-spoke works beautifully on small screens (cards stack)
- Satellite cards are touch-friendly (no tiny tap targets)
- Typography scales appropriately (readable on mobile)
- Animations work smoothly on mobile (no jank)
- Hero section adapts (vertical layout on mobile)

**And** Mobile components are optimized:
- Navigation collapses to hamburger menu (smooth slide-in drawer)
- Forms are easy to fill on mobile (proper input types, no zoom-in)
- Cards stack properly (vertical layout)
- Images are optimized for mobile bandwidth (responsive images)
- Tables become horizontally scrollable or stacked

**And** Touch interactions:
- Hover states have mobile alternatives (tap for info)
- Gestures work naturally (swipe, tap, pinch)
- No accidental clicks (proper touch target size)
- Pull-to-refresh disabled where appropriate

**And** Mobile navigation:
```typescript
// components/navigation/mobile-nav.tsx
// Hamburger menu with smooth drawer animation
// Touch-friendly menu items (44px height)
// Proper focus management
```

**And** Performance on mobile:
- Fast loading on 3G connections (<5s First Contentful Paint)
- Efficient use of battery (minimize repaints)
- Smooth scrolling and animations (60fps on mid-range devices)
- Images lazy-loaded appropriately

**And** Responsive images:
```tsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  sizes="(max-width: 768px) 100vw, 50vw"
  width={1200}
  height={600}
/>
```

**And** Touch target sizing:
- All interactive elements 44x44px minimum
- Proper spacing between tap targets (8px minimum)
- Large enough for thumb interaction

**And** Mobile testing:
- Tested on real iOS device (iPhone)
- Tested on real Android device (Samsung, Pixel)
- Tested on various screen sizes (small, medium, large)
- Tested in Chrome DevTools device mode

**Prerequisites:** Story 0.6 (Visual Effects)

**Technical Notes:**
- Test on real devices (emulators don't catch everything)
- Use Chrome DevTools for network throttling (3G)
- Consider touch-action CSS properties for gesture control
- Use Lighthouse mobile audit for performance

**Estimated Effort:** 2-3 days

---

### Story 0.8: Design System Documentation & Style Guide

As a **developer building new features**,
I want **comprehensive documentation of the design system**,
So that **I can maintain consistency and quality in all new work**.

**Acceptance Criteria:**

**Given** Complete design system is implemented
**When** I create documentation
**Then** Design system is documented in `docs/design-system.md`

**And** Documentation includes:

**1. Color Palette Section:**
- All color variables with hex values
- Usage guidelines (when to use primary vs accent)
- Contrast ratios for accessibility
- Dark mode variants
- Examples of color combinations

**2. Typography Scale Section:**
- Font families with specimens
- All heading sizes (H1-H6) with examples
- Body text variants
- Line heights and letter spacing
- When to use display vs body font

**3. Spacing System Section:**
- Spacing scale values
- Usage examples (margins, padding, gaps)
- Grid system guidelines
- Whitespace principles

**4. Component Library Catalog:**
- All components with screenshots
- Available variants for each
- Props documentation
- Usage examples (code snippets)
- Accessibility notes

**5. Animation Patterns Section:**
- Animation variants documented
- Duration/easing guidelines
- When to use animations
- Performance considerations
- Reduced motion handling

**6. Layout Patterns Section:**
- Common layout patterns (hub-and-spoke, cards, forms)
- Grid/flexbox usage
- Responsive patterns
- Mobile adaptations

**7. Do's and Don'ts:**
- Examples of good usage with screenshots
- Common mistakes to avoid
- Anti-patterns to watch for
- Accessibility guidelines

**8. Frontend Design Principles:**
- Reference to frontend-design skill principles
- "Why" behind design decisions
- How to maintain award-winning quality
- Quality bar definition

**And** Code examples are provided:
```tsx
// Example: Using button component
<Button variant="primary" size="lg">
  Get Started
</Button>

// Example: Using color tokens
className="bg-primary-500 text-primary-50"

// Example: Using animation variant
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content
</motion.div>
```

**And** Visual examples with screenshots:
- Homepage screenshot showing complete design
- Component examples rendered
- Color palette swatches
- Typography specimens
- Animation examples (GIFs if possible)

**And** Design tokens exported:
```json
// design-tokens.json
{
  "colors": {
    "primary": { "50": "#...", "500": "#..." }
  },
  "spacing": { "xs": "4px", "sm": "8px" },
  "typography": { "h1": "48px", "body": "16px" }
}
```

**And** Contributing guidelines:
- How to add new components
- How to extend design system
- How to maintain consistency
- Code review checklist

**Prerequisites:** Story 0.7 (Responsive System)

**Technical Notes:**
- Consider Storybook for interactive component catalog (future enhancement)
- Keep documentation in sync with code
- Use automated tools to generate token documentation if possible
- Include MDX for interactive examples

**Future Enhancements:**
- Storybook for interactive component playground
- Automated visual regression testing
- Design token sync with Figma (if design files exist)

**Estimated Effort:** 1-2 days

---

## Epic 1: Foundation & Core Infrastructure

**Epic Goal**: Establish the technical foundation that enables all subsequent development - project structure, core dependencies, database setup, authentication scaffold, deployment pipeline, and basic UI component library. This epic creates the bedrock upon which all other features will be built.

**Value Delivery**: By completing this epic, the development environment is ready, the application can be deployed, and basic patterns (routing, styling, data fetching) are established.

---

### Story 1.1: Project Initialization and Core Setup

As a **developer**,
I want **a fully configured Next.js 16 project with TypeScript, essential dependencies, and project structure**,
So that **I have a solid foundation to build all features on**.

**Acceptance Criteria:**

**Given** I have Node.js 18+ and npm/pnpm installed
**When** I run the project setup commands
**Then** A Next.js 16 app with TypeScript and App Router is created

**And** Project structure includes:
- `/app` directory for routes (App Router)
- `/components` for reusable UI components
- `/lib` for utilities and helpers
- `/types` for TypeScript definitions
- `/public` for static assets

**And** Core dependencies are installed:
- next@16.x, react@19.x, typescript@5.5.x
- tailwindcss@3.4.x (styling)
- @supabase/supabase-js (database client)
- zod (validation)
- prettier, eslint (code quality)

**And** Configuration files are present:
- `tsconfig.json` (strict mode enabled)
- `tailwind.config.ts` (custom theme)
- `next.config.js` (optimized for production)
- `.eslintrc.json`, `.prettierrc`

**And** Git repository is initialized with `.gitignore`

**And** README.md documents setup instructions

**Prerequisites:** None (first story)

**Technical Notes:**
- Use `create-next-app` with TypeScript template
- Enable Next.js 16 App Router (not Pages Router)
- Configure TypeScript strict mode for type safety in healthcare context
- Set up Tailwind with custom color palette (blues, coral from brand guidelines)
- This story establishes the foundation - all subsequent stories depend on this

---

### Story 1.2: Supabase Database Setup and Configuration

As a **developer**,
I want **Supabase PostgreSQL configured with initial schema and connection established**,
So that **I can store user accounts, provider profiles, and Clarity Score data**.

**Acceptance Criteria:**

**Given** The Next.js project is initialized
**When** I configure Supabase in the project
**Then** Supabase client is configured with environment variables

**And** Database tables are created:
- `users` (patient accounts)
- `providers` (provider accounts and profiles)
- `clarity_scores` (assessment results, anonymized)
- `bookmarks` (saved articles and providers)

**And** Row-Level Security (RLS) policies are defined:
- Users can only read their own data
- Providers can only edit their own profiles
- Clarity scores are anonymized (no user_id linkage)

**And** Database migrations are version-controlled in `/supabase/migrations`

**And** Connection test passes (can read/write to database)

**And** TypeScript types are generated from schema (`supabase gen types typescript`)

**Prerequisites:** Story 1.1 (Project Initialization)

**Technical Notes:**
- Create Supabase project at supabase.com
- Store `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Use Supabase CLI for local development (`supabase init`, `supabase start`)
- CRITICAL: Separate `clarity_scores` table from `users` table to maintain HIPAA-exempt status (no PHI linkage)
- RLS policies prevent accidental data exposure
- Generate TypeScript types for type-safe database queries

---

### Story 1.3: Authentication Scaffold with Firebase

As a **developer**,
I want **Firebase Authentication integrated with basic login/signup flows**,
So that **users and providers can create accounts and authenticate**.

**Acceptance Criteria:**

**Given** Supabase database is configured
**When** I implement Firebase Auth
**Then** Firebase project is created and configured

**And** Authentication methods are enabled:
- Email/password authentication
- Email verification workflow

**And** Auth helper functions are created in `/lib/auth.ts`:
- `signUp(email, password)` - create account
- `signIn(email, password)` - login
- `signOut()` - logout
- `getCurrentUser()` - get current session
- `resetPassword(email)` - password reset

**And** Auth context provider wraps the app (`/app/providers.tsx`)

**And** Protected route middleware checks authentication

**And** Session management configured (30-day JWT tokens)

**And** TypeScript types for User objects are defined

**Prerequisites:** Story 1.2 (Supabase Database Setup)

**Technical Notes:**
- Use Firebase Auth for authentication, Supabase for data storage
- Configure Firebase with environment variables (`NEXT_PUBLIC_FIREBASE_API_KEY`, etc.)
- Implement middleware in `/middleware.ts` for protected routes
- Store Firebase UID in Supabase `users.uid` field for linkage
- Use `onAuthStateChanged` to sync auth state
- Handle edge cases: email already exists, weak password, network errors

---

### Story 1.4: Vercel Deployment Pipeline

As a **developer**,
I want **automatic deployment to Vercel with CI/CD pipeline**,
So that **changes are deployed to staging/production environments automatically**.

**Acceptance Criteria:**

**Given** The project has authentication and database configured
**When** I push code to GitHub
**Then** Vercel automatically deploys to preview environment

**And** Production branch (`main`) deploys to production URL

**And** Environment variables are configured in Vercel:
- Supabase credentials
- Firebase credentials
- Node environment (`NODE_ENV=production`)

**And** Build settings are optimized:
- Build command: `next build`
- Output directory: `.next`
- Node version: 18.x

**And** Deployment status checks pass:
- Build succeeds
- No TypeScript errors
- No linting errors

**And** Custom domain configured (optional for MVP)

**And** Deployment URLs are accessible and functional

**Prerequisites:** Story 1.3 (Authentication Scaffold)

**Technical Notes:**
- Connect GitHub repo to Vercel
- Configure automatic deployments: PR preview + main → production
- Set up environment variables in Vercel dashboard
- Enable Vercel Analytics (Web Vitals)
- Configure redirects and rewrites in `vercel.json` if needed
- Test deployment: homepage loads, auth flow works, database queries succeed

---

### Story 1.5: Core UI Component Library

As a **developer**,
I want **reusable UI components following the design system**,
So that **I can build consistent interfaces quickly across all features**.

**Acceptance Criteria:**

**Given** The project is deployed and accessible
**When** I create the component library
**Then** Base components are implemented in `/components/ui/`:
- `Button` (primary, secondary, ghost, danger variants)
- `Card` (content containers with shadow/border)
- `Input` (text, email, password, with validation states)
- `Textarea` (multi-line input)
- `Select` (dropdown with search)
- `Badge` (small status indicators)
- `Alert` (info, warning, error, success messages)
- `Modal` (dialog overlay)
- `Spinner` (loading indicator)

**And** Components follow brand design system:
- Color palette: Primary blues (#1E3A8A to #3B82F6), Secondary coral (#FB923C)
- Typography: Inter font family
- Spacing: 4px base unit (Tailwind defaults)
- Border radius: 0.5rem for cards, 0.375rem for buttons

**And** Components are accessible:
- Keyboard navigation works
- ARIA labels present
- Focus indicators visible
- Color contrast ≥4.5:1

**And** Components are typed with TypeScript props

**And** Component usage examples are documented in README

**Prerequisites:** Story 1.4 (Vercel Deployment)

**Technical Notes:**
- Use Tailwind CSS for styling (utility-first approach)
- Consider shadcn/ui for base components (copy-paste, customizable)
- Implement with `className` prop for extensibility
- Use `clsx` or `cn` utility for conditional classes
- Add `disabled` and `loading` states for buttons
- Ensure mobile-responsive (touch targets ≥44px)
- Components will be used across all subsequent epics

---

### Story 1.6: App Layout and Navigation Structure

As a **user**,
I want **consistent navigation and layout across all pages**,
So that **I can easily move between sections of the platform**.

**Acceptance Criteria:**

**Given** Core UI components are available
**When** I create the app layout
**Then** Root layout (`/app/layout.tsx`) includes:
- Header with logo and navigation links
- Footer with crisis resources (988 Lifeline) and legal links
- Main content area

**And** Header navigation shows:
- Logo (links to homepage)
- Main links: Learn, Connect, Tools, About
- Auth state: "Sign In" (logged out) or "Profile" (logged in)

**And** Footer includes:
- Crisis resources: "In crisis? Call 988 Lifeline" (prominent)
- Legal links: Privacy Policy, Terms of Service, Contact
- Social media placeholders
- Copyright notice

**And** Navigation is mobile-responsive:
- Hamburger menu on mobile (<768px)
- Full horizontal nav on desktop

**And** Active page is highlighted in navigation

**And** Layout is accessible:
- Skip-to-content link
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Keyboard navigation works

**Prerequisites:** Story 1.5 (Core UI Component Library)

**Technical Notes:**
- Use Next.js 16 App Router layout system
- Implement responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Use `usePathname()` hook to highlight active page
- Crisis resources in footer REQUIRED for all pages (domain requirement)
- Consider sticky header for easy navigation
- Header and footer are shared across all pages via root layout

---

### Story 1.7: Basic Error Handling and Loading States

As a **user**,
I want **clear feedback when errors occur or content is loading**,
So that **I understand what's happening and don't get confused**.

**Acceptance Criteria:**

**Given** The app layout is implemented
**When** I create error handling patterns
**Then** Global error boundary catches unhandled errors

**And** Custom error pages exist:
- `404.tsx` - Page not found
- `500.tsx` - Server error
- `error.tsx` - General error boundary

**And** Error pages show:
- Friendly error message (not technical details)
- Suggested action ("Return to homepage", "Try again")
- Contact link for persistent issues

**And** Loading states are implemented:
- Page-level loading (`loading.tsx` for routes)
- Component-level loading (Spinner component)
- Skeleton screens for content-heavy pages

**And** Toast notification system for user feedback:
- Success: "Account created"
- Error: "Failed to save"
- Info: "Email sent"

**And** Network error handling:
- Offline detection
- Retry mechanisms for failed requests
- Timeout handling (>30s)

**Prerequisites:** Story 1.6 (App Layout and Navigation)

**Technical Notes:**
- Use Next.js 16 `error.tsx` and `loading.tsx` conventions
- Implement toast with `react-hot-toast` or similar
- Log errors to console in development, to error tracking service in production (optional: Sentry)
- Don't expose sensitive error details to users (security)
- Provide actionable error messages: "Your session expired. Please log in again."
- Loading states prevent user confusion during async operations

---

### Story 1.8: Environment Configuration and Secrets Management

As a **developer**,
I want **secure environment variable management for all configurations**,
So that **API keys and secrets are protected and environment-specific**.

**Acceptance Criteria:**

**Given** All infrastructure components are set up
**When** I configure environment variables
**Then** `.env.local` exists for local development (git-ignored)

**And** `.env.example` documents required variables:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

**And** Vercel environment variables are configured for staging and production

**And** Public vs. private variables are clearly distinguished:
- `NEXT_PUBLIC_*` - exposed to browser
- Non-prefixed - server-only (API keys, secrets)

**And** Type-safe environment variable validation using Zod schema

**And** Environment-specific configurations:
- Development: Local Supabase, verbose logging
- Production: Production Supabase, minimal logging

**And** Secrets are never committed to git (`.gitignore` includes `.env*`)

**Prerequisites:** Story 1.7 (Error Handling)

**Technical Notes:**
- Create `/lib/env.ts` with Zod schema for environment validation
- Validate environment variables at build time (fail fast if missing)
- Use `process.env.NEXT_PUBLIC_*` for client-side, `process.env.*` for server-side
- Document setup in README: "Copy `.env.example` to `.env.local` and fill in values"
- Never log sensitive values (API keys, tokens)
- Consider using Vercel's built-in secrets management
- This ensures security compliance (domain requirement: protect sensitive data)

---

## Epic 1 Complete ✅

**Total Stories**: 8
**Estimated Effort**: 2-3 weeks (solo dev with AI assistance)
**Outcome**: Production-ready foundation with deployment pipeline, authentication, database, and core UI components

━━━━━━━━━━━━━━━━━━━━━━━

Epic 1 is now fully decomposed. Shall I continue with **Epic 2: Learn - Educational Content System**?

Please respond with **[c]** to continue or **[e]** to edit Epic 1.

---

## Epic 2: Learn - Educational Content System

**Epic Goal**: Deliver evidence-based mental health education through a content management system that enables creation, curation, and discovery of 50 high-quality articles. This epic implements the "clarity without overwhelming" principle through structured content, evidence citations, and guided discovery.

**Value Delivery**: By completing this epic, users can discover and consume trustworthy mental health information, establishing Psychage as a credible educational resource.

---

### Story 2.1: Sanity.io CMS Setup and Integration

As a **developer**,
I want **Sanity.io headless CMS integrated with the Next.js application**,
So that **content editors can manage educational articles independently from code deployments**.

**Acceptance Criteria:**

**Given** The Next.js foundation is ready (Epic 1 complete)
**When** I set up Sanity.io CMS
**Then** Sanity Studio is created and configured

**And** Sanity project is connected to Next.js app via environment variables

**And** Content API endpoints are configured:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (for write operations)

**And** Sanity Studio is accessible at `/studio` route in development

**And** Real-time preview is configured (see content changes before publishing)

**And** Image CDN is configured (Sanity image pipeline for optimized delivery)

**And** TypeScript types are generated from Sanity schemas

**Prerequisites:** Epic 1 complete (Story 1.8 - Environment Configuration)

**Technical Notes:**
- Create Sanity project at sanity.io
- Use `@sanity/client` and `next-sanity` packages
- Configure GROQ query client for fetching content
- Set up Sanity Studio in `/sanity` directory
- Enable real-time preview with `@sanity/preview-kit`
- Configure image optimization with `next/image` + Sanity image pipeline
- Use Sanity's Vision plugin for query testing
- Dataset: "production" for live content

---

### Story 2.2: Article Content Schema and Model

As a **content editor**,
I want **a structured article schema with required fields and validation**,
So that **all articles follow a consistent format and quality standard**.

**Acceptance Criteria:**

**Given** Sanity.io is integrated
**When** I define the article schema
**Then** `article` document type includes required fields:
- `title` (string, required, max 100 chars)
- `slug` (slug, required, unique, generated from title)
- `summary` (text, required, 3 sentences max, 280 chars)
- `body` (portable text, required, rich text editor)
- `category` (reference to category document, required)
- `subcategory` (string, optional)
- `author` (reference to author document, required)
- `publishedAt` (datetime, required)
- `updatedAt` (datetime, auto-generated)
- `featured` (boolean, default false)
- `readTime` (number, auto-calculated from body)

**And** Portable text supports:
- Headings (H2, H3 only - no H1)
- Paragraphs with bold, italic, underline
- Bulleted and numbered lists
- Block quotes
- Inline citations (custom annotation)
- Images with alt text (required for accessibility)

**And** Validation rules enforce:
- Title: 30-100 characters
- Summary: 150-280 characters, ~3 sentences
- Body: Minimum 1,000 words, maximum 2,500 words
- Reading level check: Flesch-Kincaid 60-70 (8th-10th grade)

**And** Required metadata fields:
- `metaTitle` (SEO title, 50-60 chars)
- `metaDescription` (SEO description, 150-160 chars)
- `ogImage` (Open Graph image for social sharing)

**Prerequisites:** Story 2.1 (Sanity.io CMS Setup)

**Technical Notes:**
- Define schema in `/sanity/schemas/article.ts`
- Use Portable Text for rich content (not HTML)
- Custom annotation type for inline citations
- Implement custom validation functions for reading level
- Auto-generate slug from title (with conflict resolution)
- Calculate read time: 200 words per minute
- Export schema types to TypeScript for frontend use

---

### Story 2.3: Evidence Citation System

As a **content editor**,
I want **to add inline citations and reference lists to articles**,
So that **every clinical claim is backed by authoritative sources**.

**Acceptance Criteria:**

**Given** Article schema is defined
**When** I implement the citation system
**Then** `citation` document type is created with fields:
- `sourceType` (enum: WHO, CDC, APA, NIMH, PeerReviewed, Book)
- `title` (string, required)
- `authors` (array of strings)
- `publicationDate` (date or year)
- `url` (string, validated URL)
- `doi` (string, optional)
- `journalName` (string, for peer-reviewed)
- `publisher` (string, for books)

**And** Portable text supports inline citation annotation:
- Editor can select text and add citation reference
- Citation displays as superscript number in preview
- Citation reference stored with text span

**And** Article schema includes `references` array (list of citations)

**And** Article display page shows:
- Inline citations as clickable superscript numbers
- Hovercards on hover showing source preview
- Reference list at article bottom with full details
- External link icons for URLs

**And** Validation enforces:
- At least 1 citation per article
- All citation URLs are accessible (link checker)
- Peer-reviewed sources require DOI or journal name

**Prerequisites:** Story 2.2 (Article Content Schema)

**Technical Notes:**
- Create custom Portable Text annotation for citations
- Implement citation hovercard component with `@radix-ui/react-popover`
- Store citations as separate documents, reference by ID
- Use Zod schema for URL validation
- Implement periodic link checker (cron job or manual admin tool)
- Format citations: APA style (Author, Year. Title. Publisher/Journal.)
- Domain requirement: Citations are critical for medical liability protection

---

### Story 2.4: Content Categories and Taxonomy

As a **user**,
I want **articles organized by mental health condition categories**,
So that **I can browse topics relevant to my interests**.

**Acceptance Criteria:**

**Given** Article and citation schemas exist
**When** I implement the taxonomy system
**Then** `category` document type is created with fields:
- `name` (string, required, e.g., "Anxiety")
- `slug` (slug, unique)
- `description` (text, 2-3 sentences)
- `icon` (image, optional)
- `order` (number, for sorting)

**And** 10 primary categories are seeded:
1. Anxiety
2. Depression
3. PTSD & Trauma
4. ADHD
5. OCD
6. Bipolar Disorder
7. Eating Disorders
8. Substance Use
9. Personality Disorders
10. Schizophrenia & Psychosis

**And** Each category can have subcategories (e.g., Anxiety → GAD, Panic, Social)

**And** Category browsing pages are created:
- `/learn` - All categories grid
- `/learn/[category-slug]` - Articles in category
- `/learn/[category-slug]/[article-slug]` - Individual article

**And** Category pages show:
- Category name and description
- Article count
- List of articles (sorted by featured, then date)
- Related categories

**Prerequisites:** Story 2.3 (Evidence Citation System)

**Technical Notes:**
- Use Next.js dynamic routes: `/app/learn/[category]/page.tsx`
- Fetch articles by category using GROQ query: `*[_type == "article" && category->slug.current == $slug]`
- Implement category navigation component (used in header and Learn hub)
- Consider tag taxonomy (optional) for cross-category topics
- SEO: Each category page has unique meta title/description
- Mobile-responsive grid: 1 column mobile, 2-3 columns desktop

---

### Story 2.5: Article Display and Reading Experience

As a **user**,
I want **to read articles with clear formatting and easy navigation**,
So that **I can understand the content without feeling overwhelmed**.

**Acceptance Criteria:**

**Given** Categories and articles exist in Sanity
**When** I implement article display pages
**Then** Article page (`/learn/[category]/[article-slug]`) shows:
- Article title (H1)
- 3-sentence summary (prominent callout)
- Author byline and publish date
- Read time estimate
- Article body with proper typography

**And** Article body formatting includes:
- Generous line-height (1.7)
- Optimal line-length (60-80 characters)
- Proper heading hierarchy (H2 → H3)
- Styled lists and block quotes
- Responsive images with captions

**And** Inline citations display as superscript numbers with hovercards

**And** Reference list at bottom shows all sources

**And** Disclaimer footer present: "This is educational content, not medical advice. If you're experiencing a mental health crisis, call 988 Lifeline."

**And** Article sidebar (desktop) shows:
- Table of contents (jump links to H2 headings)
- Related articles (3-5 suggestions)
- "Take Clarity Score" CTA
- Share buttons (copy link, Twitter, Facebook)

**And** Mobile experience adapts:
- Single column layout
- Sticky TOC button (opens modal)
- Bottom CTA bar for "Take Clarity Score"

**And** Accessibility features:
- Semantic HTML (article, section, aside elements)
- Proper heading hierarchy (no skipped levels)
- Alt text for all images
- High contrast text (4.5:1 minimum)

**Prerequisites:** Story 2.4 (Content Categories)

**Technical Notes:**
- Use Next.js static generation (SSG) for article pages
- Implement `generateStaticParams` for all article slugs
- Use Portable Text React renderer for body content
- Calculate TOC from H2 headings in body
- Implement smooth scroll for jump links
- Use next/image for optimized image delivery
- Add schema.org Article markup for SEO
- Reading experience is critical for "clarity without overwhelming" principle

---

### Story 2.6: Article Search Functionality

As a **user**,
I want **to search for articles by keyword or topic**,
So that **I can quickly find information relevant to my needs**.

**Acceptance Criteria:**

**Given** Articles are published and displayable
**When** I implement search functionality
**Then** Search bar is prominently placed:
- Homepage hero section
- Learn hub page header
- Global header (mobile + desktop)

**And** Search supports:
- Keyword search across title, summary, body
- Autocomplete suggestions (as user types)
- Recent searches (saved in localStorage)
- Popular searches (based on analytics)

**And** Search results page (`/learn/search?q=anxiety`) shows:
- Number of results found
- Results sorted by relevance
- Each result displays: title, category, summary snippet, read time
- Highlight matched keywords in results

**And** Search filters:
- Filter by category (multi-select)
- Sort by: Relevance (default), Newest, Most Read

**And** Empty state handles:
- No results: Suggest related categories or popular articles
- Typos: "Did you mean...?" suggestions

**And** Search performance:
- Results return within 500ms
- Debounced autocomplete (300ms delay)
- Maximum 50 results per page

**And** SEO considerations:
- Search results pages are crawlable
- No-index meta tag for search results (avoid duplicate content)

**Prerequisites:** Story 2.5 (Article Display)

**Technical Notes:**
- Implement search using Sanity's GROQ `score()` function for relevance
- Query: `*[_type == "article" && [title, summary, body] match $query] | score(title match $query, boost(2.0))`
- Use Algolia or Meilisearch for advanced search (post-MVP optimization)
- Implement debounced search with `useDebouncedValue` hook
- Store search analytics in Supabase for "popular searches" feature
- Consider full-text search index in Supabase for performance (Growth phase)
- Mobile: Search opens fullscreen overlay

---

### Story 2.7: Related Articles Recommendation Engine

As a **user**,
I want **to discover related articles after reading**,
So that **I can explore topics deeper without searching**.

**Acceptance Criteria:**

**Given** Articles have categories, subcategories, and content
**When** I implement related articles
**Then** Each article displays 3-5 related articles

**And** Related articles algorithm prioritizes:
1. Same subcategory (highest relevance)
2. Same category (medium relevance)
3. Shared keywords in title/summary (low relevance)

**And** Related articles display shows:
- Article title
- Category badge
- Read time
- Thumbnail image (if available)

**And** Related articles appear:
- Article sidebar (desktop)
- Bottom of article (mobile)
- After completing article (scroll-triggered)

**And** Related articles exclude:
- Currently viewed article
- Already bookmarked articles (if user logged in)

**And** Algorithm performance:
- Related articles calculated at build time (SSG)
- Results cached to avoid runtime computation
- Fallback to category articles if <3 related found

**Prerequisites:** Story 2.6 (Article Search)

**Technical Notes:**
- Implement related articles calculation in GROQ query or build step
- Query: `*[_type == "article" && category._ref == $categoryId && _id != $currentId][0...5]`
- Consider keyword extraction from article body for better matching (post-MVP)
- Store related article IDs in article document (denormalized for performance)
- Use LRU cache for frequently accessed articles
- Related articles enhance engagement (metric: pages per session)

---

### Story 2.8: Expert Review Workflow for Content Quality

As a **admin/content manager**,
I want **an approval workflow for article publication**,
So that **all content is reviewed by licensed clinicians before going live**.

**Acceptance Criteria:**

**Given** Articles can be created in Sanity
**When** I implement the review workflow
**Then** Article status field is added with states:
- `draft` - Being written, not visible to public
- `ready_for_review` - Submitted for expert review
- `in_review` - Clinician actively reviewing
- `approved` - Clinician approved, ready to publish
- `published` - Live on website
- `needs_revision` - Requires changes before approval

**And** Article schema includes review metadata:
- `reviewer` (reference to clinician document)
- `reviewedAt` (datetime)
- `reviewNotes` (text, feedback from reviewer)
- `nextReviewDate` (datetime, annual re-review)

**And** Sanity Studio workflow:
- "Submit for Review" button (draft → ready_for_review)
- Admin assigns reviewer (ready_for_review → in_review)
- Reviewer can approve or request revisions
- Only approved articles can be published

**And** Admin dashboard shows:
- Articles pending review (count and list)
- Articles needing annual re-review (365 days since last review)
- Reviewer workload distribution

**And** Email notifications sent:
- Author notified when review complete
- Reviewer notified when article assigned
- Admin notified when article ready for review

**And** Published articles display reviewer credit:
- "Reviewed by [Name], [Credentials]"
- Last reviewed date

**Prerequisites:** Story 2.7 (Related Articles)

**Technical Notes:**
- Implement custom workflow in Sanity Studio using document actions
- Create `clinician` document type with credentials field
- Use Sanity's built-in draft/publish system
- Filter public queries to only show published articles: `*[_type == "article" && status == "published"]`
- Email notifications via SendGrid/Resend (Growth phase) or manual for MVP
- Annual re-review ensures content stays current (domain requirement)
- Expert review is critical for medical liability protection

---

### Story 2.9: Content Disclaimers and Legal Requirements

As a **stakeholder**,
I want **clear disclaimers on all educational content**,
So that **users understand this is education, not medical advice, reducing liability**.

**Acceptance Criteria:**

**Given** Articles can be published and viewed
**When** I implement content disclaimers
**Then** Every article page includes disclaimer footer:
- "**Medical Disclaimer**: This content is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions about medical conditions."

**And** Disclaimer is visually prominent:
- Placed at article bottom (before comments/related articles)
- Distinct styling (border, background color, icon)
- Large enough font (16px minimum)

**And** Learn hub page includes general disclaimer:
- Displayed above article grid
- Can be dismissed but persists in localStorage

**And** Crisis resources footer on every page:
- "**In Crisis?** Call 988 Suicide & Crisis Lifeline or text 'HELLO' to 741741."
- Prominent placement in global footer
- Orange/warm color (not alarming red)

**And** About page includes legal statements:
- HIPAA-exempt status explanation
- Evidence-based content policy
- Expert review process
- Source citation standards
- Privacy practices

**And** Terms of Service page includes:
- Limitation of liability clauses
- No medical advice disclaimer
- User responsibilities
- Content accuracy limitations

**And** Privacy Policy page includes:
- GDPR/CCPA compliance statements
- Data collection practices (anonymized analytics)
- Cookie policy (Plausible is cookieless)
- User rights (data export, deletion)

**Prerequisites:** Story 2.8 (Expert Review Workflow)

**Technical Notes:**
- Create reusable `<Disclaimer>` component
- Store legal text in Sanity for easy updates (without code deploy)
- Version legal documents (Terms, Privacy) with effective dates
- Require users to acknowledge disclaimers on first visit (cookie/localStorage)
- Legal review before launch (consult healthcare attorney)
- Disclaimers are critical for HIPAA-exempt status and liability protection
- Crisis resources must be visible on EVERY page (domain requirement)

---

### Story 2.10: Initial Content Seeding and Quality Assurance

As a **content team**,
I want **10-15 seed articles published across major categories**,
So that **the platform has enough content to validate the educational experience at MVP launch**.

**Acceptance Criteria:**

**Given** All Learn infrastructure is complete
**When** I create seed content
**Then** At least 10 articles are published covering:
- 2 articles per top 5 categories (Anxiety, Depression, PTSD, ADHD, OCD)
- Mix of article types: Overview, Symptoms, Causes, Treatment, Living With

**And** Each article meets quality standards:
- 8th-10th grade reading level (Flesch-Kincaid 60-70)
- 1,500-2,500 words
- Minimum 3 citations per article
- All citations link to authoritative sources
- Reviewed and approved by clinician

**And** Articles demonstrate variety:
- Different subcategories within each category
- Different content structures (lists, narratives, Q&A)
- Different lengths (short 1,500, medium 2,000, long 2,500)

**And** Quality assurance checklist passed:
- ✅ All links functional
- ✅ Images have alt text
- ✅ Citations format correctly
- ✅ Disclaimers present
- ✅ Mobile-responsive
- ✅ Accessible (WCAG AA)
- ✅ SEO optimized (meta titles, descriptions, schema markup)

**And** Content performance baseline established:
- Average read time tracked
- Search functionality tested with real queries
- Related articles algorithm validated
- User feedback mechanism in place (simple rating or feedback form)

**Prerequisites:** Story 2.9 (Content Disclaimers)

**Technical Notes:**
- Use AI assistance (Claude) to draft initial articles, human editor to refine
- Clinician review for all articles (can be async, doesn't block development)
- Create content creation playbook documenting process
- Use Hemingway Editor to check reading level
- Target 50 articles total by MVP launch (6 months), but 10-15 sufficient for initial validation
- Content creation is ongoing parallel to development (not blocking other epics)
- Consider content calendar for consistent publishing cadence

---

## Epic 2 Complete ✅

**Total Stories**: 10
**Estimated Effort**: 3-4 weeks (development) + ongoing content creation
**Outcome**: Fully functional educational content system with CMS, 10-15 published articles, search, discovery, and quality assurance workflows

**Note**: Content creation (reaching 50 articles) is ongoing parallel work. Development team delivers infrastructure, content team populates content.

━━━━━━━━━━━━━━━━━━━━━━━

Epic 2 is now fully decomposed. Shall I continue with **Epic 3: Tools - Clarity Score Assessment**?

Please respond with **[c]** to continue or **[e]** to edit Epic 2.

---

## Epic 3: Tools - Clarity Score Assessment

**Epic Goal**: Enable self-understanding through a 10-minute guided assessment that provides users with personalized mental health insights without diagnosing. This epic delivers the "spark moment" - when users gain clarity about their mental health state and understand actionable next steps.

**Value Delivery**: By completing this epic, users can complete a validated self-assessment, receive a 0-100 Clarity Score with dimensional breakdown (anxiety, depression, stress), and get personalized recommendations for next steps - all while maintaining HIPAA-exempt status.

---

### Story 3.1: Assessment Data Model and Question Bank

As a **developer**,
I want **a flexible questionnaire data model with validated mental health questions**,
So that **I can deliver a scientifically-grounded assessment while maintaining flexibility to update questions**.

**Acceptance Criteria:**

**Given** The database and infrastructure are ready (Epic 1 complete)
**When** I design the assessment data model
**Then** Supabase database includes `assessment_questions` table with fields:
- `question_id` (UUID, primary key)
- `question_text` (text, required)
- `question_type` (enum: likert_scale, yes_no, multiple_choice)
- `dimension` (enum: anxiety, depression, stress, general)
- `order` (integer, for sequencing)
- `weight` (float, scoring weight)
- `reverse_scored` (boolean, for reverse-coded items)
- `active` (boolean, whether currently in use)

**And** Question bank is seeded with 20-30 validated questions:
- 7-10 questions for anxiety dimension (based on GAD-7 derivatives)
- 7-10 questions for depression dimension (based on PHQ-9 derivatives)
- 6-10 questions for stress dimension (based on PSS derivatives)

**And** Questions use accessible language:
- 8th-10th grade reading level
- Clear, non-clinical phrasing
- Examples: "Do you feel nervous or on edge?" not "Do you experience generalized anxiety?"

**And** Likert scale options are consistent:
- 0 = Not at all
- 1 = Several days
- 2 = More than half the days
- 3 = Nearly every day

**And** TypeScript types are generated for questions and responses

**And** Admin can add/edit/deactivate questions via Supabase dashboard

**Prerequisites:** Epic 1 complete (Story 1.2 - Supabase Database)

**Technical Notes:**
- Base questions on validated frameworks (GAD-7, PHQ-9, PSS) but modify to avoid copyrighted exact phrasing
- Store questions in database (not hardcoded) for flexibility
- Question order can be randomized within dimension to prevent survey fatigue patterns
- Weight field allows adjusting question importance in scoring algorithm
- Reverse-scored items prevent acquiescence bias
- Active field allows A/B testing different questions without deleting data
- Consult with licensed clinician to validate question selection and phrasing

---

### Story 3.2: Assessment UI Flow and Progress Tracking

As a **user**,
I want **a guided assessment experience with clear progress indication**,
So that **I understand how far along I am and feel motivated to complete it**.

**Acceptance Criteria:**

**Given** Assessment questions are available in the database
**When** I implement the assessment UI
**Then** Assessment page (`/tools/clarity-score`) displays:
- Welcoming introduction explaining the assessment (1-2 paragraphs)
- Time estimate: "Takes about 10 minutes"
- Privacy assurance: "Anonymous by default. Optional account to save results."
- "Start Assessment" button

**And** Assessment flow displays one question at a time:
- Question number and total (e.g., "Question 5 of 25")
- Progress bar showing completion percentage
- Question text (large, readable font)
- Answer options (buttons or radio inputs)
- "Previous" button (disabled on first question)
- "Next" button (disabled until answer selected)

**And** User can navigate backward to change previous answers

**And** Progress is saved in browser localStorage:
- User can close browser and resume later
- Warning before leaving: "Your progress will be saved"

**And** Visual design reduces cognitive load:
- One question per screen (not overwhelming)
- Generous whitespace
- Clear selected state for answers
- Smooth transitions between questions

**And** Mobile-optimized:
- Large touch targets for answer buttons (≥44px)
- Sticky progress bar at top
- Easy thumb reach for "Next" button

**And** Accessibility features:
- Keyboard navigation (arrow keys to select, Enter to proceed)
- Screen reader announces question number and text
- Focus management (focus on question when rendered)

**Prerequisites:** Story 3.1 (Assessment Data Model)

**Technical Notes:**
- Use React state management (useState or Zustand) for assessment state
- Store responses: `{ question_id: string, answer: number }[]`
- Implement route protection to prevent direct access to /results before completing
- Progress persistence: localStorage with encryption (anonymity)
- Consider pagination vs. single-page with scroll (single question per view is less overwhelming)
- Loading state between questions (if fetching next question)
- "Clarity without overwhelming" principle: one decision at a time

---

### Story 3.3: Scoring Algorithm and Calculation Engine

As a **developer**,
I want **a transparent scoring algorithm that calculates dimensional and overall scores**,
So that **users receive consistent, validated results from their assessment responses**.

**Acceptance Criteria:**

**Given** User has completed all assessment questions
**When** I implement the scoring engine
**Then** Scoring function calculates:
- Anxiety score (0-100 scale)
- Depression score (0-100 scale)
- Stress score (0-100 scale)
- Overall Clarity Score (0-100 scale, weighted average of dimensions)

**And** Calculation logic:
- Sum raw scores per dimension
- Apply reverse scoring where needed (reverse_scored = true)
- Apply question weights
- Normalize to 0-100 scale
- Overall score = weighted average (anxiety: 33%, depression: 33%, stress: 34%)

**And** Scoring thresholds are defined:
- 0-30: Low/Minimal
- 31-50: Mild
- 51-70: Moderate
- 71-100: Severe

**And** Score is stored anonymously in `clarity_scores` table:
- `score_id` (UUID, primary key)
- `overall_score` (integer 0-100)
- `anxiety_score` (integer 0-100)
- `depression_score` (integer 0-100)
- `stress_score` (integer 0-100)
- `responses` (JSONB, array of question-answer pairs)
- `completed_at` (timestamp)
- `user_id` (UUID, nullable, only if logged in)

**And** Data is anonymized:
- No PHI collected
- IP address not stored
- User agent not stored
- Score viewable only with score_id (UUID)

**And** Scoring function is unit tested:
- Test cases for each threshold range
- Test reverse scoring
- Test weighted averages
- Test edge cases (all 0s, all max scores)

**Prerequisites:** Story 3.2 (Assessment UI Flow)

**Technical Notes:**
- Implement scoring as serverless function (Next.js API route)
- Validate all responses before scoring (no missing answers)
- Use TypeScript for type-safe scoring logic
- Consider implementing multiple scoring models (A/B test different algorithms)
- Log aggregate scoring trends (anonymized) for Clarity Index data product
- CRITICAL: Maintain HIPAA-exempt status - no linkage to identifiable user data
- Document scoring algorithm in code comments and technical docs
- Clinician should validate scoring thresholds align with clinical assessment tools

---

### Story 3.4: Results Visualization and Insights Display

As a **user**,
I want **to see my Clarity Score with clear visual representation and interpretation**,
So that **I understand my results and what they mean for me**.

**Acceptance Criteria:**

**Given** User's assessment is scored
**When** I implement the results page
**Then** Results page (`/tools/clarity-score/results/[score_id]`) displays:
- Overall Clarity Score prominently (large number, 0-100)
- Color-coded indicator:
  - Green (0-30): Minimal
  - Yellow (31-50): Mild
  - Orange (51-70): Moderate
  - Red (71-100): Severe
- Text interpretation of overall score

**And** Dimensional breakdown section shows:
- Anxiety score with visual bar/gauge
- Depression score with visual bar/gauge
- Stress score with visual bar/gauge
- Each dimension color-coded by severity

**And** Personalized insights section includes:
- 2-3 sentence interpretation of scores
- What the scores suggest about mental health state
- Contextual information (e.g., "Moderate anxiety is common and treatable")

**And** Results are easy to understand:
- Plain language (no clinical jargon)
- Visual hierarchy (most important info first)
- Generous whitespace and clear sections

**And** Chart visualization options:
- Radar chart showing all 3 dimensions
- Bar chart comparing dimensions
- Mobile-responsive (simplified on mobile)

**And** Results page includes actions:
- "Save These Results" (prompts account creation if not logged in)
- "Find a Therapist" (links to Provider Directory with pre-filtered specialty)
- "Learn More About [Highest Dimension]" (links to relevant Learn articles)
- "Retake Assessment" (start fresh)

**And** Social proof removed:
- No "You scored higher than X% of users" (could be discouraging)
- Focus on personal understanding, not comparison

**Prerequisites:** Story 3.3 (Scoring Algorithm)

**Technical Notes:**
- Use recharts or chart.js for visualizations
- Results page accessible via shareable UUID link (no auth required)
- Implement server-side rendering (SSR) for results page (personalized per score)
- Cache results page for performance (score doesn't change)
- Results are immutable once created (no editing)
- Consider "View Example Results" on assessment intro page (sample data)
- Interpretation text could be dynamically generated based on score thresholds
- Mobile: Stack visualizations vertically, simplify radar chart

---

### Story 3.5: Crisis Detection and Resource Display

As a **platform**,
I want **to detect severe distress and prominently display crisis resources**,
So that **users in immediate danger get help immediately**.

**Acceptance Criteria:**

**Given** User completes assessment
**When** Scoring indicates severe distress
**Then** Crisis detection triggers if:
- Overall score ≥71 (severe range)
- Depression score ≥80 (very high depression)
- Any response indicating self-harm ideation (specific question flags)

**And** Crisis banner displays prominently on results page:
- Placed at top of results (before score display)
- High-contrast, attention-grabbing (but not panic-inducing)
- Orange/warm color scheme (not alarming red)
- Large, readable text

**And** Crisis banner content includes:
- "If you're in crisis or thinking about self-harm, help is available:"
- 988 Suicide & Crisis Lifeline: Call or text 988
- Crisis Text Line: Text HELLO to 741741
- International crisis resources link
- "Call 911 if immediate danger"

**And** Crisis resources are actionable:
- Click-to-call links on mobile (`tel:988`, `sms:741741`)
- Copy phone number button on desktop
- External link to 988lifeline.org for more resources

**And** Crisis banner remains visible:
- Sticky position (follows user as they scroll)
- Cannot be dismissed (no X button)
- Present on all pages if user navigates away

**And** Non-crisis severe scores still show:
- Normal results page layout
- General mental health resources prominent
- "Consider speaking with a professional" messaging
- Provider Directory link emphasized

**And** Crisis detection is logged (anonymized):
- Track crisis banner impressions (for reporting)
- No PHI logged (just anonymous counts)
- Used for Clarity Index data (crisis prevalence trends)

**Prerequisites:** Story 3.4 (Results Visualization)

**Technical Notes:**
- Implement crisis threshold logic in scoring function
- Consider specific high-risk question flags (e.g., "Thoughts of being better off dead")
- Banner should not block results content (user should still see scores)
- Test crisis banner on mobile and desktop
- Legal review of crisis messaging (liability protection)
- Domain requirement: Prominent crisis resources are critical for safety
- Consider analytics: Do users click crisis resources? (track engagement)
- Crisis detection should err on side of showing resources (false positives acceptable)

---

### Story 3.6: Anonymous Assessment Experience

As a **user**,
I want **to take the assessment without creating an account**,
So that **I can explore my mental health privately without commitment**.

**Acceptance Criteria:**

**Given** User arrives at assessment page
**When** User is not logged in
**Then** Assessment proceeds without requiring login:
- No sign-in prompt before starting
- No account required to complete
- Results accessible via unique URL

**And** Privacy messaging is clear:
- Assessment intro: "Anonymous by default. No account needed."
- Results page: "Your results are private. Only you have this link."
- Option to create account: "Want to save your results? Create free account."

**And** Anonymous results are fully functional:
- All results features work (visualizations, insights, recommendations)
- Shareable link provided (user can bookmark or share)
- Results persist indefinitely (no expiration)

**And** Score is stored anonymously in database:
- `user_id` field is NULL for anonymous scores
- `score_id` is UUID (unguessable)
- No session cookies or tracking

**And** User can upgrade to saved results:
- "Save These Results" button on results page
- Clicking prompts account creation/login
- After auth, score is linked to user account (user_id updated)

**And** Anonymous limitations explained:
- Cannot view past scores without account
- Cannot track progress over time
- Cannot access saved results from other devices

**And** URL structure supports anonymous access:
- Results URL: `/tools/clarity-score/results/[uuid]`
- No authentication required to view (if you have the link)

**Prerequisites:** Story 3.5 (Crisis Detection)

**Technical Notes:**
- Store assessment responses in browser localStorage during completion
- Submit to server only when clicking "See Results"
- Server returns score_id (UUID) for results page
- Results page queries database by score_id (no auth required)
- Implement rate limiting (max 10 assessments per IP per day) to prevent abuse
- Anonymity is critical for HIPAA-exempt status
- Consider analytics: What % of users take anonymous vs. logged-in assessments?
- Security: Ensure score_id is cryptographically random (not sequential)

---

### Story 3.7: Account-Based Score History and Progress Tracking

As a **logged-in user**,
I want **to save my scores and track progress over time**,
So that **I can monitor my mental health journey**.

**Acceptance Criteria:**

**Given** User has an account and is logged in
**When** User completes assessment
**Then** Score is automatically linked to user account:
- `user_id` field populated with Firebase UID
- Score appears in user's history

**And** User profile dashboard shows score history:
- List of all past scores (date, overall score, crisis flag)
- "View Results" link for each past score
- "Take New Assessment" CTA

**And** Progress chart visualizes trends:
- Line chart showing overall score over time
- Option to toggle dimensions (anxiety, depression, stress)
- Date range selector (Last 30 days, 3 months, 6 months, All time)

**And** User can compare scores:
- "Compare to Previous" feature on results page
- Shows score change (e.g., "+5 points since last assessment")
- Trend indication (improving, stable, worsening)

**And** Recommended assessment frequency:
- Platform suggests weekly or monthly check-ins
- Optional email reminders (user can enable/disable)
- "It's been 2 weeks since your last assessment" nudge

**And** Data privacy maintained:
- Scores visible only to user (not shared with providers)
- User can delete individual scores
- User can export all scores (GDPR compliance)

**And** Historical data is structured:
- Database query: `SELECT * FROM clarity_scores WHERE user_id = $uid ORDER BY completed_at DESC`
- Aggregate stats: Average score, trend direction, variance

**Prerequisites:** Story 3.6 (Anonymous Assessment)

**Technical Notes:**
- Implement user dashboard page (`/dashboard` or `/profile`)
- Use recharts for trend visualization
- Cache historical scores for performance (user unlikely to have >50 scores)
- Consider gamification: "You've completed 5 assessments! Keep tracking your progress."
- Email reminders require email service integration (Growth phase - SendGrid/Resend)
- Export functionality: Generate CSV or PDF of score history
- Progress tracking is powerful engagement feature (increases return visits)
- Consider sharing: "Share progress with therapist" feature (secure link)

---

### Story 3.8: Personalized Recommendations and Next Steps

As a **user**,
I want **actionable recommendations based on my scores**,
So that **I know what to do next to improve my mental health**.

**Acceptance Criteria:**

**Given** User views their results
**When** The system generates recommendations
**Then** Recommendations are personalized to score profile:
- If anxiety is highest: "Explore anxiety management techniques"
- If depression is highest: "Learn about depression treatment options"
- If stress is highest: "Discover stress reduction strategies"

**And** Recommendations include specific actions:
- "Read: [Article Title]" - Link to relevant Learn article
- "Try: Mindfulness exercise" - Link to self-help resource (if available)
- "Connect: Find an anxiety specialist" - Link to filtered Provider Directory
- "Talk: Reach out to a trusted friend or family member"

**And** Recommendations are tiered by score severity:
- **Minimal (0-30)**: "Your scores look good! Here's how to maintain mental wellness."
- **Mild (31-50)**: "Consider these self-help resources and monitor your symptoms."
- **Moderate (51-70)**: "We recommend speaking with a mental health professional."
- **Severe (71-100)**: "Please consider reaching out to a professional soon." + Crisis resources

**And** Provider Directory filtering is smart:
- User clicks "Find a Therapist" from results
- Provider Directory pre-filters by highest dimension specialty:
  - High anxiety → anxiety specialists
  - High depression → depression therapists
  - High stress → general practitioners, counselors

**And** Learn content is contextually linked:
- Results page suggests 2-3 articles matching highest dimension
- Article recommendations prioritize:
  1. Treatment options (actionable)
  2. Understanding the condition (educational)
  3. Living with the condition (coping strategies)

**And** User can dismiss or mark recommendations as "Done":
- Checkbox next to each recommendation
- "Show new recommendations" refreshes list

**And** Recommendations avoid:
- Overwhelming user with too many options (max 5 recommendations)
- Medical advice or diagnosis ("You have anxiety" → "Your scores suggest elevated anxiety")
- Prescriptive language ("You must see a therapist" → "Consider speaking with a professional")

**Prerequisites:** Story 3.7 (Score History)

**Technical Notes:**
- Implement recommendation engine as function: `generateRecommendations(scores: ScoreBreakdown)`
- Match highest dimension to article categories in Sanity
- Query: `*[_type == "article" && category->name == $highestDimension][0...3]`
- Provider Directory link includes query params: `/connect?specialty=anxiety&location=auto`
- Consider ML for recommendations in future (personalized based on past behavior)
- Track recommendation engagement: Which recommendations do users click?
- Recommendations are critical for "guided experience" - users shouldn't feel lost after results

---

### Story 3.9: Assessment Disclaimers and Non-Diagnostic Language

As a **stakeholder**,
I want **clear disclaimers throughout the assessment**,
So that **users understand this is not a clinical diagnosis and liability is mitigated**.

**Acceptance Criteria:**

**Given** User interacts with the Clarity Score assessment
**When** Disclaimers are displayed
**Then** Assessment introduction page includes:
- "**Not a Diagnosis**: This assessment is for educational purposes only and does not provide a medical diagnosis."
- "**Consult a Professional**: If you have concerns about your mental health, please speak with a qualified healthcare provider."
- "**In Crisis?**: If you're experiencing a mental health crisis, call 988 Lifeline immediately."

**And** Results page includes disclaimers:
- Top of page (before scores): "These results are based on your self-reported responses and are not a clinical diagnosis."
- Bottom of page: Full medical disclaimer (same as Learn articles)

**And** Email with results (if user opts in) includes disclaimers

**And** Disclaimer language is prominent:
- Minimum 14px font size
- Bold or highlighted for emphasis
- Cannot be hidden or minimized

**And** Assessment questions avoid diagnostic language:
- "How often do you feel nervous?" (good)
- "Do you have Generalized Anxiety Disorder?" (bad - too clinical)

**And** Results interpretation avoids diagnosis:
- "Your scores suggest elevated anxiety" (good)
- "You have moderate depression" (bad - sounds like diagnosis)

**And** Legal review of all disclaimer text:
- Consult healthcare attorney before launch
- Ensure language protects against medical liability
- Update disclaimers if legal requirements change

**And** Users acknowledge disclaimer before starting:
- Checkbox: "I understand this is not a medical diagnosis" (optional, consider for liability)
- Cannot proceed without acknowledging (if checkbox implemented)

**Prerequisites:** Story 3.8 (Personalized Recommendations)

**Technical Notes:**
- Create reusable `<AssessmentDisclaimer>` component
- Store disclaimer text in Sanity for easy updates (legal changes)
- Version disclaimers with effective dates (legal compliance)
- Log disclaimer acknowledgments (if checkbox required)
- Disclaimers are CRITICAL for HIPAA-exempt status
- Never use words: diagnose, treatment, condition (except in educational context)
- Use: assessment, insights, scores, symptoms, elevated, suggest
- Domain requirement: Clear non-diagnostic language throughout

---

## Epic 3 Complete ✅

**Total Stories**: 9
**Estimated Effort**: 2-3 weeks (solo dev with AI assistance)
**Outcome**: Fully functional Clarity Score assessment with anonymous and account-based scoring, crisis detection, personalized recommendations, and comprehensive disclaimers

**Key Deliverables**:
- 20-30 question assessment based on validated frameworks
- 0-100 scoring with anxiety, depression, stress breakdown
- Beautiful results visualization with charts
- Crisis detection and resource display
- Anonymous and logged-in assessment paths
- Score history and progress tracking for logged-in users
- Personalized next-step recommendations
- Comprehensive disclaimers maintaining HIPAA-exempt status

━━━━━━━━━━━━━━━━━━━━━━━

## Epic 4: Connect - Provider Directory

**Goal**: Enable mental health providers to create verified profiles and allow patients to discover and connect with qualified professionals through an intuitive, trustworthy directory.

**Value**: Bridges the gap between patients seeking care and qualified providers, creating a trusted marketplace that generates sustainable revenue while maintaining high quality standards.

---

### Story 4.1: Provider Profile Schema and Data Model

As a **developer**,
I want **a comprehensive provider profile data model with all necessary fields for professional listings**,
So that **providers can create rich, informative profiles that help patients make informed decisions**.

**Acceptance Criteria:**

**Given** I am designing the provider profile schema
**When** I create the data model in Supabase
**Then** The schema includes all required professional fields:
- Basic info: name, credentials, license numbers, specializations
- Practice details: treatment approaches, insurance accepted, languages spoken
- Availability: consultation types (in-person/virtual), hours, booking preferences
- Profile content: bio, expertise areas, years of experience

**And** The schema includes verification status fields:
- `verification_status` (pending/verified/rejected/expired)
- `verification_date` and `verification_expiry_date` (annual renewal)
- `documents_submitted` (license verification proofs)

**And** The schema includes privacy and quality fields:
- `is_accepting_patients` boolean
- `profile_visibility` (public/private/draft)
- `last_updated` timestamp for freshness indicators

**And** The schema supports relationships:
- Provider → User account (one-to-one)
- Provider → Specializations (many-to-many)
- Provider → Insurance Plans (many-to-many)

**Prerequisites:** Story 1.2 (Supabase Database Setup)

**Technical Notes:**
- Use Supabase PostgreSQL with row-level security (RLS) policies
- Create separate tables: `providers`, `specializations`, `insurance_plans`, `provider_specializations`, `provider_insurance`
- Index fields used for search/filter: specializations, location, insurance accepted
- No PHI storage - only professional/practice information
- Implement soft deletes for provider profiles (retain data for compliance)

---

### Story 4.2: Provider Profile Creation and Submission Flow

As a **mental health provider**,
I want **to create and submit my professional profile for verification**,
So that **I can be listed in the directory and connect with potential patients**.

**Acceptance Criteria:**

**Given** I am a mental health provider with a verified user account
**When** I navigate to the "Create Provider Profile" section
**Then** I see a multi-step profile creation form with clear progress indicators

**And** The form collects all required information across logical sections:
- Step 1: Basic Professional Information (name, credentials, license numbers)
- Step 2: Practice Details (specializations, treatment approaches, languages)
- Step 3: Availability & Insurance (consultation types, accepted insurance, rates)
- Step 4: Profile Content (bio, expertise statement, profile photo)
- Step 5: Verification Documents (license uploads, credential verification)

**And** The form includes real-time validation:
- Required field indicators
- Format validation (license numbers, phone, email)
- Character limits with live counters
- Image upload restrictions (size, format)

**And** I can save progress as a draft and return later

**And** When I submit the completed profile:
- Status changes to "pending verification"
- I receive confirmation email with next steps
- I'm directed to a "verification pending" dashboard

**Prerequisites:** Story 4.1 (Provider Profile Schema), Story 1.3 (Authentication Scaffold)

**Technical Notes:**
- Use React Hook Form with Zod validation for complex multi-step form
- Implement form state persistence in localStorage (auto-save drafts)
- Use Supabase Storage for document uploads with virus scanning
- Create email notification template for submission confirmation
- Ensure WCAG 2.1 AA compliance for form accessibility
- Implement progress auto-save every 30 seconds

---

### Story 4.3: Provider Verification System

As an **admin**,
I want **to review and verify provider credentials before approving profiles for public listing**,
So that **we maintain high quality standards and patient trust in the directory**.

**Acceptance Criteria:**

**Given** A provider has submitted their profile for verification
**When** I access the admin verification dashboard
**Then** I see all pending provider profiles with key information displayed:
- Provider name and credentials
- License numbers and states
- Submitted verification documents
- Submission date and time in queue

**And** I can open individual profiles to review in detail:
- View all profile information
- Access uploaded verification documents (licenses, certificates)
- See automated verification checks (e.g., license format validation)
- View provider's user account details

**And** I have clear verification actions available:
- **Approve**: Publish profile, set verification_date, send approval email
- **Reject**: Provide rejection reason, send feedback email, allow resubmission
- **Request More Info**: Send specific document requests to provider

**And** When I approve a profile:
- Status changes to "verified"
- `verification_expiry_date` set to 365 days from approval
- Provider receives approval email with profile link
- Profile becomes publicly visible in search results

**And** When I reject a profile:
- Provider receives constructive feedback via email
- Profile remains in draft state
- Provider can edit and resubmit

**Prerequisites:** Story 4.2 (Provider Profile Creation), Story 6.1 (Admin Dashboard Foundation - will be created in Epic 6)

**Technical Notes:**
- Create admin-only route `/admin/provider-verification`
- Implement RLS policies restricting access to admin role
- Use PDF viewer component for document review (react-pdf or similar)
- Create notification email templates for approval/rejection scenarios
- Log all verification actions for audit trail
- Consider integration with third-party license verification APIs (future enhancement)

---

### Story 4.4: Provider Search and Filter Functionality

As a **patient**,
I want **to search and filter the provider directory to find mental health professionals that meet my specific needs**,
So that **I can discover qualified providers who match my preferences and requirements**.

**Acceptance Criteria:**

**Given** I am on the provider directory page
**When** I view the search interface
**Then** I see prominent search and filter controls including:
- Free-text search box (searches name, specialization, bio)
- Location filter (city, state, or distance radius)
- Specialization filter (multi-select: anxiety, depression, trauma, etc.)
- Insurance filter (multi-select: plans accepted)
- Consultation type filter (in-person, virtual, both)
- Language filter (languages spoken)
- "Accepting New Patients" toggle

**And** Search results display provider cards with key information:
- Provider name and credentials
- Primary specializations (max 3 displayed)
- Profile photo
- Location and consultation types
- "Accepting New Patients" indicator
- Years of experience

**And** Search operates with smart defaults:
- Initial load shows all verified, accepting patients providers
- Results sorted by relevance or recent verification date
- Pagination for performance (20 results per page)

**And** Filters can be combined for precise matching:
- Multiple filters applied with AND logic
- Filter selections persist during session
- Clear indication of active filters with "Clear All" option

**And** When no results match filters:
- Helpful message suggesting filter adjustments
- Option to broaden search criteria
- Link to contact support for assistance

**Prerequisites:** Story 4.3 (Provider Verification System), Story 1.5 (Core UI Component Library)

**Technical Notes:**
- Use Supabase full-text search (FTS) for bio/name search
- Implement database indexes on filter columns for performance
- Use query parameters for shareable search URLs
- Consider Algolia integration for advanced search (future enhancement)
- Lazy load images for provider cards (performance)
- Implement debounced search input (300ms delay)
- Use React Query for efficient data fetching and caching

---

### Story 4.5: Provider Detail Pages

As a **patient**,
I want **to view comprehensive details about a provider's practice, expertise, and approach**,
So that **I can make an informed decision about whether they're the right fit for my needs**.

**Acceptance Criteria:**

**Given** I have found a provider in the search results
**When** I click on their profile card
**Then** I am taken to a dedicated provider detail page showing:
- Header section: Name, credentials, profile photo, "Accepting Patients" status
- About section: Full bio, years of experience, educational background
- Specializations section: All areas of expertise with visual tags
- Approach section: Treatment modalities, therapeutic approaches
- Practical information: Consultation types, languages, insurance accepted
- Availability section: General hours, booking preferences (if provided)

**And** The page includes trust indicators:
- "Verified Provider" badge with verification date
- Credentials clearly displayed (e.g., "PhD, Licensed Psychologist")
- License state(s) noted

**And** The page includes clear call-to-action:
- Primary CTA: "View Contact Information" or "Request Consultation"
- Note about verification: "This provider's credentials have been verified by Project Psychage"

**And** If the provider is NOT accepting new patients:
- Status clearly indicated at top of page
- Contact button disabled or shows "Join Waitlist" option
- Suggestion to search for similar providers

**And** The page is accessible and responsive:
- Clean, readable layout on mobile and desktop
- WCAG 2.1 AA compliant
- Social share buttons for sharing provider profiles

**Prerequisites:** Story 4.4 (Provider Search and Filter)

**Technical Notes:**
- Use Next.js dynamic routes: `/providers/[providerId]`
- Implement Open Graph meta tags for social sharing
- Use structured data (JSON-LD) for SEO
- Cache provider detail pages with revalidation every 24 hours
- Implement "Report Profile" feature for quality control
- Show verification status prominently (trust signal)

---

### Story 4.6: Provider Dashboard and Analytics

As a **provider**,
I want **a dashboard showing my profile performance and patient engagement metrics**,
So that **I can understand how patients are discovering me and optimize my profile for better visibility**.

**Acceptance Criteria:**

**Given** I am a verified provider logged into my account
**When** I navigate to "My Dashboard"
**Then** I see a comprehensive dashboard displaying:
- Profile status card: Verification status, expiry date, "accepting patients" toggle
- Performance metrics (last 30 days):
  - Profile views count
  - Search appearances count
  - Contact button clicks
  - Most common search terms that led to my profile

**And** I see profile health indicators:
- Profile completeness score (e.g., "85% complete - Add specializations for better visibility")
- Suggestions for improvement (e.g., "Providers with profile photos get 40% more views")
- Last profile update date with "Update Profile" CTA

**And** I can take quick actions from the dashboard:
- Edit my profile
- Update "accepting patients" status (instant toggle)
- Upload new verification documents (for annual renewal)
- View my public profile as patients see it

**And** I receive proactive notifications:
- Verification expiry warnings (60 days, 30 days, 14 days before expiry)
- Profile performance insights (e.g., "Your profile views increased 25% this week")
- System updates or policy changes

**Prerequisites:** Story 4.5 (Provider Detail Pages), Story 4.3 (Provider Verification System)

**Technical Notes:**
- Create `/dashboard/provider` route with authentication guard
- Use Supabase Edge Functions to calculate analytics (daily aggregation)
- Store analytics in separate `provider_analytics` table (not real-time PHI)
- Implement simple line charts using Recharts for trends visualization
- Cache dashboard data for 15 minutes (balance freshness vs. performance)
- Do NOT track individual patient identities (HIPAA-exempt compliance)
- Use PostgreSQL window functions for "search appearances" calculation

---

### Story 4.7: Annual Re-verification Workflow

As a **provider**,
I want **to receive timely reminders and easily complete annual re-verification**,
So that **my profile remains active and I maintain verified status without interruption**.

**Acceptance Criteria:**

**Given** My verification expiry date is approaching
**When** 60 days before expiry
**Then** I receive an email reminder: "Your provider verification expires in 60 days - Update your credentials"

**And** Reminders continue on this schedule:
- 60 days before: Initial reminder email
- 30 days before: Second reminder email + dashboard notification badge
- 14 days before: Urgent reminder email + dashboard alert banner
- 7 days before: Final warning email + temporary "verification expiring soon" flag on public profile

**And** When verification expires without re-verification:
- Profile status changes to "expired"
- Profile is automatically hidden from public search results
- Provider receives expiration notification with re-verification instructions
- Profile data retained but not publicly visible

**And** I can complete re-verification from my dashboard:
- Prominent "Re-verify Now" button when within 60-day window
- Simplified re-verification form (only update changed information)
- Document upload for current license verification
- Submission triggers new verification review by admin

**And** When admin approves re-verification:
- Status returns to "verified"
- `verification_expiry_date` extended by 365 days from approval
- Profile becomes publicly visible again
- Confirmation email sent

**And** If my profile expires, I can still initiate re-verification:
- Access to dashboard maintained
- "Reactivate Profile" workflow available
- Same verification process as initial approval

**Prerequisites:** Story 4.6 (Provider Dashboard), Story 4.3 (Provider Verification System)

**Technical Notes:**
- Use Supabase cron jobs or Edge Functions to check expiry dates daily
- Create email templates for each reminder stage (60/30/14/7 days)
- Implement database query to filter expired profiles from public search
- Add `verification_reminder_sent_at` fields to track notification history
- Create audit log for verification status changes
- Allow admins to manually extend verification in special circumstances
- Consider grace period (7 days post-expiry) before full deactivation

---

### Story 4.8: Provider Listing Management and Quality Control

As an **admin**,
I want **to manage provider listings and maintain directory quality standards**,
So that **the directory remains trustworthy and provides value to patients seeking care**.

**Acceptance Criteria:**

**Given** I am an admin managing the provider directory
**When** I access the provider management dashboard
**Then** I can view all providers with filtering by status:
- All providers
- Active (verified, accepting patients)
- Verification pending
- Verification expiring soon (<30 days)
- Expired
- Inactive (not accepting patients)

**And** I can perform bulk actions:
- Export provider list to CSV
- Send bulk notifications (e.g., policy updates)
- Filter and sort by various fields (verification date, status, specialization)

**And** I can manage individual provider listings:
- Manually update verification expiry dates (special circumstances)
- Suspend profiles (quality issues, complaints)
- Permanently remove profiles (fraud, violations)
- Contact providers directly via in-app messaging

**And** I can access quality control tools:
- View "Report Profile" submissions from patients
- See profile completeness scores across all providers
- Identify duplicate or suspicious listings
- Review provider analytics to spot unusual patterns

**And** The system maintains an audit trail:
- All admin actions logged with timestamp and admin name
- Profile status change history visible
- Document access logs for compliance

**And** I have access to directory health metrics:
- Total verified providers
- Verification pending queue length
- Profiles expiring in next 30 days
- Average profile completeness score
- Top specializations represented

**Prerequisites:** Story 4.7 (Annual Re-verification), Story 6.1 (Admin Dashboard Foundation)

**Technical Notes:**
- Create `/admin/provider-management` route with admin-only access
- Implement Supabase RLS policies for admin data access
- Use React Table for sortable, filterable provider list
- Create audit logging table: `admin_actions` with full action history
- Implement soft deletes (never hard delete provider data)
- Add "Report Profile" button to public provider pages
- Store reports in `profile_reports` table for admin review
- Create email templates for admin → provider communications

---

**Key Deliverables**:
- Comprehensive provider profile schema with verification fields
- Multi-step profile creation flow with document upload
- Admin verification system with approval/rejection workflows
- Advanced search and filter functionality for patient discovery
- Rich provider detail pages with trust indicators
- Provider dashboard with analytics and performance metrics
- Automated annual re-verification workflow with timely reminders
- Admin tools for provider listing management and quality control

━━━━━━━━━━━━━━━━━━━━━━━

## Epic 5: User Management & Authentication

**Goal**: Provide comprehensive account management, profile customization, and data privacy controls for both patients and providers.

**Value**: Builds trust through transparent data practices, empowers users with control over their accounts, and ensures compliance with GDPR while maintaining HIPAA-exempt status.

---

### Story 5.1: Patient Profile and Preferences Management

As a **patient**,
I want **to manage my profile information and customize my experience preferences**,
So that **I can personalize my journey and control how the platform serves me**.

**Acceptance Criteria:**

**Given** I am a logged-in patient user
**When** I navigate to "My Profile"
**Then** I see a profile management interface with sections for:
- Basic information: Display name, email, profile photo (optional)
- Privacy preferences: Email notification settings, data sharing preferences
- Assessment preferences: Reminder frequency, preferred assessment times
- Content preferences: Favorite topics, saved articles
- Account settings: Password change, email change, account deletion

**And** I can update my basic information:
- Edit display name with validation (3-50 characters)
- Change profile photo (upload with size/format restrictions)
- Update email address (requires verification via confirmation link)
- Change password (requires current password, complexity validation)

**And** I can customize notification preferences:
- Toggle email notifications for: Assessment reminders, new content recommendations, platform updates
- Set reminder frequency for assessment retakes (weekly, monthly, custom)
- Unsubscribe from all non-essential emails (one-click)

**And** I can manage my content preferences:
- View and edit favorite topics/categories
- Access saved/bookmarked articles
- See my reading history (last 30 days)
- Clear reading history with confirmation

**And** All changes are:
- Saved with optimistic UI updates
- Confirmed with success messages
- Reflected across the platform immediately
- Logged for audit purposes

**Prerequisites:** Story 1.3 (Authentication Scaffold), Story 2.5 (Article Display)

**Technical Notes:**
- Create `/profile/patient` route with authentication guard
- Use React Hook Form for profile editing with validation
- Implement Supabase Storage for profile photo uploads (max 2MB, formats: jpg/png)
- Create `user_preferences` table for notification and content settings
- Implement email verification flow for email changes (prevent unauthorized changes)
- Add GDPR-compliant data export option (prepare for Story 5.6)
- Use Supabase RLS to ensure users can only edit their own profiles

---

### Story 5.2: Provider Account Management

As a **provider**,
I want **to manage my account settings separate from my public profile**,
So that **I can control my login credentials and account preferences independently from my professional listing**.

**Acceptance Criteria:**

**Given** I am a logged-in provider
**When** I navigate to "Account Settings" (separate from "My Provider Profile")
**Then** I see account management options including:
- Login credentials: Email, password, two-factor authentication (2FA)
- Notification preferences: Verification reminders, patient inquiries, analytics reports
- Communication settings: Preferred contact method, response time expectations
- Account status: Active, paused, deactivated

**And** I can update login credentials:
- Change account email (requires verification)
- Update password with strength requirements
- Enable/disable two-factor authentication via SMS or authenticator app
- View active sessions and revoke access from specific devices

**And** I can manage notification preferences:
- Toggle verification expiry reminders (cannot disable entirely - policy requirement)
- Set patient inquiry notification frequency (immediate, daily digest, weekly)
- Subscribe to monthly analytics reports via email
- Opt-in to platform updates and feature announcements

**And** I can control account status:
- **Pause Account**: Temporarily hide profile from search without losing data (vacation mode)
- **Deactivate Account**: Permanently remove profile from platform (requires admin review)
- View data retention policy and export options

**And** I see security features:
- Last login timestamp and location
- Password strength indicator
- Active sessions list with device/browser information
- Option to log out of all other sessions

**Prerequisites:** Story 1.3 (Authentication Scaffold), Story 4.6 (Provider Dashboard)

**Technical Notes:**
- Create `/account/settings` route for providers (distinct from `/dashboard/provider`)
- Implement Firebase Auth 2FA using Firebase Multi-Factor Authentication
- Store notification preferences in `provider_preferences` table
- Implement "pause account" feature: set `is_accepting_patients=false` and `profile_visibility='paused'`
- Create deactivation workflow that requires admin confirmation (prevent accidental deletions)
- Log all credential changes and security actions for audit trail
- Send email notifications for critical security actions (password change, 2FA toggle)

---

### Story 5.3: Assessment History and Progress Tracking

As a **patient**,
I want **to view my complete assessment history and track my mental health progress over time**,
So that **I can understand my journey and see how my Clarity Score evolves**.

**Acceptance Criteria:**

**Given** I am a logged-in patient who has taken assessments
**When** I navigate to "My Progress"
**Then** I see a comprehensive progress dashboard displaying:
- Current Clarity Score with visual indicator (gauge or progress bar)
- Score history chart showing trend over time (line chart, last 6 months)
- Total assessments taken count
- Date of most recent assessment
- Breakdown scores (anxiety, depression, stress) with individual trends

**And** I can view detailed assessment history:
- List of all past assessments with date, overall score, and status
- Ability to expand each assessment to see:
  - Full score breakdown (anxiety, depression, stress sub-scores)
  - Recommendations provided at that time
  - Crisis resources shown (if applicable)
  - Notes/reflections I added (if feature enabled)

**And** The progress visualization shows:
- Clear trend line (improving, stable, declining)
- Color-coded periods (green for improvement, yellow for stable, red for decline)
- Milestone markers (e.g., "First assessment", "6-month mark", "Best score achieved")
- Comparison to previous assessment with delta indicator (+5, -3, etc.)

**And** I can interact with my history:
- Retake assessment directly from progress page
- Export assessment history as PDF report (for personal records or sharing with provider)
- Add private notes to past assessments (reflection journaling)
- Delete individual assessments (with confirmation, but recommended against)

**And** I see helpful insights:
- Average time between assessments
- Suggested next assessment date based on score and patterns
- Encouraging messages for positive trends
- Gentle reminders if score is declining with links to resources

**Prerequisites:** Story 3.7 (Account-Based Score History), Story 1.5 (Core UI Component Library)

**Technical Notes:**
- Create `/progress` route with authentication guard
- Use Recharts for trend visualization (responsive line charts)
- Query `assessment_history` table with efficient date range filtering
- Implement PDF export using react-pdf or jsPDF (include disclaimer language)
- Cache assessment history data with 5-minute invalidation
- Show only last 12 months of data by default (performance), allow "View All History"
- Include prominent disclaimer: "This is not a diagnostic tool. Consult a qualified mental health professional."

---

### Story 5.4: Data Privacy Dashboard and Controls

As a **patient or provider**,
I want **clear visibility into what data is collected about me and control over how it's used**,
So that **I feel confident in the platform's data practices and can exercise my privacy rights**.

**Acceptance Criteria:**

**Given** I am any logged-in user (patient or provider)
**When** I navigate to "Privacy & Data"
**Then** I see a transparency dashboard showing:
- **Data We Collect**: Clear list of all data types collected (account info, assessment responses, usage analytics, etc.)
- **How We Use Your Data**: Plain language explanations of each use case
- **Who We Share With**: List of third-party services (Firebase, Supabase, Vercel, Sanity.io) with links to their privacy policies
- **Your Rights**: GDPR and CCPA rights explained in simple terms

**And** I can exercise data rights through self-service controls:
- **Access Data**: "Download My Data" button (exports all personal data as JSON)
- **Correct Data**: Link to profile/account settings for corrections
- **Delete Data**: "Request Account Deletion" workflow
- **Restrict Processing**: Opt-out of non-essential analytics/tracking
- **Portability**: Export data in machine-readable format (JSON)

**And** The data export includes:
- Account information (name, email, dates)
- For patients: All assessment history, saved articles, preferences
- For providers: Profile data, verification documents, analytics summary (no patient identities)
- Metadata: Account creation date, last login, data version

**And** The account deletion workflow:
- Clear explanation of what will be deleted vs. retained (compliance)
- Confirmation step requiring password re-entry
- 30-day grace period before permanent deletion (can cancel)
- Email confirmation with cancellation link
- Automatic anonymization of assessment data (retain for research, remove PII)

**And** I see privacy assurances:
- "HIPAA-Exempt Status" explanation (we don't handle PHI)
- "No Sale of Personal Data" policy statement
- Last updated date of Privacy Policy
- Contact information for privacy questions (DPO email)

**Prerequisites:** Story 5.1 (Patient Profile), Story 5.2 (Provider Account Management)

**Technical Notes:**
- Create `/privacy/dashboard` route accessible to all authenticated users
- Implement data export functionality using Supabase Edge Function to compile data
- Export format: ZIP file containing JSON files organized by data type
- Account deletion: Soft delete with `deleted_at` timestamp, actual deletion after 30 days via cron job
- Anonymization strategy: Replace PII with anonymized IDs for assessment data retention
- Create `data_requests` table to log all data exports and deletion requests (audit trail)
- Ensure GDPR compliance: respond to export requests within 30 days (automate)
- Include disclaimer: "Some data may be retained for legal compliance and fraud prevention"

---

### Story 5.5: Multi-Factor Authentication (2FA) for All Users

As a **patient or provider**,
I want **to enable two-factor authentication to secure my account**,
So that **my sensitive assessment data and account information are protected from unauthorized access**.

**Acceptance Criteria:**

**Given** I am a logged-in user (patient or provider)
**When** I navigate to "Security Settings"
**Then** I see options to enable 2FA using:
- SMS-based one-time passwords (OTP)
- Authenticator app (Google Authenticator, Authy, etc.)
- Backup codes (for account recovery)

**And** The 2FA setup flow for authenticator app includes:
- Generate QR code for scanning
- Display manual entry key for manual setup
- Verify setup by entering current OTP code
- Automatically generate and display 10 backup codes
- Prompt to save backup codes securely (download or print)

**And** The 2FA setup flow for SMS includes:
- Phone number entry with country code selection
- SMS verification (send test code to confirm number)
- Option to use as primary or fallback method
- Warning about SMS security limitations vs. authenticator apps

**And** When 2FA is enabled:
- Required at every login after password entry
- Option to "Trust this device for 30 days" checkbox
- Clear instructions during login ("Enter code from your authenticator app")
- Fallback to backup codes if primary method unavailable

**And** I can manage 2FA settings:
- View current 2FA status (enabled methods)
- Disable 2FA (requires password re-entry + current OTP code)
- Regenerate backup codes (invalidates previous codes)
- Change phone number for SMS 2FA
- View trusted devices and revoke trust

**And** Account recovery options when 2FA is locked:
- Use backup codes as alternative to OTP
- "Lost access to 2FA?" link triggers email-based recovery flow
- Recovery requires answering security questions + email verification
- Option to contact support for manual recovery (admin assistance)

**Prerequisites:** Story 5.2 (Provider Account Management), Story 1.3 (Authentication Scaffold)

**Technical Notes:**
- Use Firebase Auth Multi-Factor Authentication (MFA) feature
- Implement TOTP (Time-based One-Time Password) for authenticator apps
- Use `speakeasy` or `otplib` for generating QR codes and verifying TOTP
- Store encrypted backup codes in Supabase `user_2fa_backup_codes` table
- Implement device fingerprinting for "Trust this device" feature (store hashed fingerprints)
- Create recovery flow using Firebase custom tokens + email verification
- Log all 2FA events (enable, disable, failed attempts) for security monitoring
- Rate limit OTP verification attempts (max 5 attempts per 15 minutes to prevent brute force)

---

### Story 5.6: GDPR and CCPA Compliance Features

As a **platform operator**,
I want **built-in compliance features for GDPR and CCPA regulations**,
So that **we meet legal obligations and users can exercise their privacy rights seamlessly**.

**Acceptance Criteria:**

**Given** The platform serves users globally (including EU and California)
**When** Compliance features are implemented
**Then** The platform includes:
- **Cookie Consent Banner**: On first visit, clear consent request for analytics/non-essential cookies
- **Privacy Policy**: Comprehensive, up-to-date policy accessible from all pages
- **Terms of Service**: Clear terms with last-updated date
- **Data Processing Agreement (DPA)**: For providers (B2B relationship)

**And** Cookie consent management includes:
- Granular consent options: Essential, Analytics, Marketing (future)
- Ability to accept all, reject all, or customize
- Consent choices stored and respected across sessions
- Easy to modify consent preferences from footer link
- No non-essential tracking until consent granted

**And** Automated compliance workflows:
- Data export requests fulfilled automatically (Story 5.4 implementation)
- Deletion requests processed with 30-day grace period
- Email verification for sensitive data requests (prevent unauthorized access)
- Audit logs for all data access/export/deletion actions

**And** User rights documentation:
- "/privacy-rights" page explaining GDPR and CCPA rights in plain language
- Right to access, correct, delete, restrict, port data
- Right to opt-out of sale (with clear statement we don't sell data)
- Contact information for privacy officer (privacy@projectpsychage.com)

**And** Legal pages include:
- Privacy Policy: Data collection, usage, retention, sharing, rights
- Terms of Service: User responsibilities, disclaimers, liability limits
- Cookie Policy: Types of cookies, purposes, opt-out instructions
- HIPAA-Exempt Notice: Clear explanation of scope limitations

**And** For provider accounts (business users):
- Data Processing Agreement (DPA) acceptance required during profile creation
- DPA outlines data controller/processor relationship
- Clarifies that providers are controllers of their own professional data
- Platform is processor for authentication and profile hosting only

**And** Compliance monitoring:
- Admin dashboard showing data requests queue
- SLA tracking (30-day response time for GDPR requests)
- Audit logs accessible to compliance officer
- Automated reminders for policy annual reviews

**Prerequisites:** Story 5.4 (Data Privacy Dashboard), Story 6.1 (Admin Dashboard Foundation)

**Technical Notes:**
- Use cookie consent library (e.g., `react-cookie-consent` or `onetrust`)
- Store consent preferences in `user_consent` table with timestamp and version
- Block Google Analytics and non-essential scripts until consent granted
- Create legal pages using Sanity.io for easy updates by legal team
- Implement DPA as downloadable PDF + checkbox acceptance in provider signup
- Create `compliance_requests` table to track data subject requests
- Use Supabase Edge Functions for automated data export fulfillment
- Schedule cron job to check for stale deletion requests (30-day grace period expiry)
- Include geolocation detection to show relevant rights (GDPR for EU, CCPA for CA)

---

### Story 5.7: User Roles and Permissions System

As a **developer**,
I want **a flexible role-based access control (RBAC) system for managing user permissions**,
So that **patients, providers, and admins have appropriate access levels and the system is secure by design**.

**Acceptance Criteria:**

**Given** The platform has multiple user types with different access needs
**When** A user authenticates
**Then** Their role is determined and appropriate permissions are enforced:
- **Patient**: Access to Learn (articles), Tools (assessments), Connect (provider search), own profile/progress
- **Provider**: Patient permissions + provider profile management, dashboard/analytics, verification status
- **Admin**: All permissions + admin dashboard, user management, provider verification, content moderation, system configuration

**And** Roles are stored and enforced at multiple layers:
- Firebase Auth custom claims: `role: 'patient' | 'provider' | 'admin'`
- Supabase RLS policies: Row-level security based on user role
- Application layer: Route guards and UI component visibility

**And** Users can have multiple roles:
- A provider can also be a patient (take assessments, read articles)
- Role switching interface in navigation: "Switch to Patient View" / "Switch to Provider View"
- Default view based on primary role (set during account creation)

**And** Permission checks are granular:
- Read permissions: View own data, public content, role-specific content
- Write permissions: Edit own profile, create assessments (patients), manage provider profile (providers)
- Admin permissions: Approve/reject providers, access all user data (audit), modify system settings

**And** Role assignment workflows:
- New signups default to "patient" role
- Provider role requires completing provider profile creation (Story 4.2)
- Admin role assigned manually by existing admin (secure process)
- Role changes logged in audit trail with timestamp and assigning admin

**And** Security enforcement:
- API routes check Firebase custom claims before processing requests
- Supabase queries automatically filtered by RLS policies (users can only access own data)
- Unauthorized access attempts logged and blocked with 403 Forbidden
- Admin actions require additional authentication step (password re-entry)

**And** UI adapts to user role:
- Navigation menu shows role-appropriate links
- Provider features hidden from patients (and vice versa)
- Admin panel only visible to admin users
- Clear visual indicator of current role (badge or icon in header)

**Prerequisites:** Story 1.3 (Authentication Scaffold), Story 1.2 (Supabase Database Setup)

**Technical Notes:**
- Use Firebase Auth custom claims for role storage (set server-side only)
- Implement Supabase RLS policies on all tables checking `auth.jwt() -> 'role'`
- Create reusable `useRole()` hook for checking permissions in React components
- Implement `authorize` middleware for API routes to enforce role requirements
- Create database functions for common permission checks (e.g., `can_edit_profile(user_id)`)
- Store role change history in `user_role_history` table for audit compliance
- Implement route guards using Next.js middleware to redirect unauthorized users
- Consider future expansion: fine-grained permissions (e.g., "can_verify_providers", "can_moderate_content")

---

**Key Deliverables**:
- Patient profile and preferences management with customization options
- Provider account settings separate from public profiles
- Assessment history tracking with trend visualization
- Comprehensive data privacy dashboard with GDPR compliance
- Multi-factor authentication (2FA) for enhanced security
- Cookie consent and data rights management system
- Flexible role-based access control (RBAC) system

━━━━━━━━━━━━━━━━━━━━━━━

## Epic 6: Admin Operations & Management

**Goal**: Provide administrators with powerful tools to manage the platform, ensure quality standards, monitor health metrics, and maintain operational excellence.

**Value**: Enables efficient platform management, maintains trust through quality control, and provides visibility into platform health for data-driven decision making.

---

### Story 6.1: Admin Dashboard Foundation

As an **admin**,
I want **a centralized dashboard with key platform metrics and quick access to management tools**,
So that **I can efficiently oversee operations and quickly identify issues requiring attention**.

**Acceptance Criteria:**

**Given** I am logged in as an admin user
**When** I navigate to "/admin/dashboard"
**Then** I see a comprehensive admin dashboard with:
- **Platform Health Overview** panel showing:
  - Total users (patients, providers, admins) with growth trend
  - Active users (last 30 days)
  - Assessment completions (last 30 days)
  - Provider directory size (verified, pending verification)

- **Urgent Action Items** panel highlighting:
  - Provider verifications pending (count with link to queue)
  - Data subject requests pending (GDPR/CCPA compliance)
  - Reported content/profiles requiring review (count)
  - System errors or performance alerts (if any)

- **Quick Actions** panel with shortcuts to:
  - Provider verification queue
  - User management
  - Content moderation
  - Platform analytics
  - System configuration

**And** The dashboard displays time-series charts:
- User registrations trend (last 90 days) - line chart
- Assessment completions trend (last 90 days) - line chart
- Provider verifications processed (last 30 days) - bar chart

**And** I can see recent activity feed:
- Last 10 provider verifications (approved/rejected with timestamps)
- Recent user registrations (timestamp, role)
- Recent admin actions (who did what, when)

**And** The dashboard includes system status indicators:
- Database connection status (green/yellow/red)
- External services status (Firebase, Supabase, Sanity.io)
- Deployment environment (production/staging)
- Last deployment timestamp and version

**And** All metrics are:
- Cached appropriately (5-minute refresh for performance)
- Clickable to drill down into detailed views
- Exportable as CSV for reporting purposes

**Prerequisites:** Story 5.7 (User Roles and Permissions System), Story 1.2 (Supabase Database Setup)

**Technical Notes:**
- Create `/admin/dashboard` route protected by admin role guard
- Use Supabase Edge Functions for metric aggregation (scheduled daily)
- Store pre-calculated metrics in `platform_metrics` table for performance
- Implement real-time updates for urgent action items using Supabase Realtime
- Use Recharts for data visualization (responsive charts)
- Consider caching strategy: 5 minutes for metrics, real-time for urgent items
- Log all admin dashboard access for security audit

---

### Story 6.2: User Management and Moderation Tools

As an **admin**,
I want **comprehensive tools to manage user accounts and moderate user behavior**,
So that **I can maintain platform integrity, handle support requests, and enforce community standards**.

**Acceptance Criteria:**

**Given** I am an admin accessing user management tools
**When** I navigate to "/admin/users"
**Then** I see a searchable, filterable user list with:
- Search by: Email, name, user ID
- Filter by: Role (patient/provider/admin), account status (active/suspended/deleted), registration date range
- Sort by: Registration date, last active, name (alphabetical)

**And** Each user row displays:
- User ID (clickable to detail page)
- Name and email
- Role(s) with visual badges
- Account status (active, suspended, deleted)
- Registration date
- Last active timestamp
- Quick actions: View Details, Edit, Suspend, Delete

**And** I can view detailed user information by clicking a user:
- Full account details (name, email, phone, registration date)
- Authentication info (2FA enabled, last login, login method)
- Activity summary (assessments taken, articles read, provider searches)
- For providers: Link to provider profile and verification status
- Audit log of account changes (who modified, what changed, when)

**And** I can perform user management actions:
- **Edit User**: Modify email, name, phone (with admin confirmation)
- **Change Role**: Add/remove roles (patient, provider, admin)
- **Suspend Account**: Temporarily disable login with reason (misconduct, security)
- **Unsuspend Account**: Reactivate suspended account
- **Delete Account**: Initiate permanent deletion (30-day grace period)
- **Reset Password**: Send password reset email on behalf of user (support)
- **Disable 2FA**: Emergency access for locked-out users (log action)

**And** Bulk actions are available:
- Select multiple users for bulk operations
- Bulk export user data (CSV)
- Bulk email notifications (system announcements)

**And** All actions require confirmation:
- Two-step confirmation for destructive actions (suspend, delete)
- Reason field for suspensions (required, logged)
- Admin must re-enter password for critical actions
- All actions logged in audit trail with admin identity

**And** I can access support tools:
- View user's session history (login times, IPs, devices)
- See user's support ticket history (future integration)
- Impersonate user (view-only mode) to troubleshoot issues
- Send direct email to user from admin panel

**Prerequisites:** Story 5.7 (User Roles and Permissions System), Story 6.1 (Admin Dashboard Foundation)

**Technical Notes:**
- Create `/admin/users` route with pagination (50 users per page)
- Use React Table or similar for sortable, filterable table
- Implement Supabase RLS policies allowing admins full user read access
- Create `admin_actions` audit log table for all management actions
- Use Supabase Edge Functions for bulk operations (prevent timeouts)
- Implement "impersonate user" feature with view-only restrictions (no write actions)
- Rate limit bulk email sends (prevent spam/abuse)
- Ensure GDPR compliance: log all admin data access for audit purposes

---

### Story 6.3: Platform Analytics and Reporting

As an **admin**,
I want **detailed analytics about platform usage, user behavior, and business metrics**,
So that **I can make data-driven decisions about features, marketing, and business strategy**.

**Acceptance Criteria:**

**Given** I am an admin viewing platform analytics
**When** I navigate to "/admin/analytics"
**Then** I see comprehensive analytics organized into tabs:
- **Users**: Registration trends, demographics, engagement metrics
- **Content**: Article performance, popular topics, search queries
- **Assessments**: Completion rates, score distributions, drop-off analysis
- **Providers**: Directory growth, verification rates, profile views
- **Business**: Conversion funnel, provider subscription revenue (future)

**And** User analytics include:
- New user registrations by day/week/month (line chart)
- User retention: Day 1, Day 7, Day 30 retention rates
- Active users: Daily active users (DAU), Monthly active users (MAU)
- User role distribution (pie chart: patient vs. provider vs. admin)
- Top referral sources (how users find the platform)

**And** Content analytics include:
- Most viewed articles (top 20 with view counts)
- Average read time per article
- Articles by category performance
- Search queries: Top 50 search terms, zero-result searches
- Content effectiveness: Articles leading to provider searches or assessments

**And** Assessment analytics include:
- Total assessments completed (trend over time)
- Completion rate: Started vs. completed ratio
- Drop-off analysis: At which question users abandon
- Score distribution: Histogram of Clarity Scores
- Average scores by sub-dimension (anxiety, depression, stress)
- Anonymous vs. logged-in assessment ratio

**And** Provider analytics include:
- Total providers in directory (verified, pending, expired)
- Verification queue metrics: Average time to verify, approval/rejection rates
- Provider profile views distribution (identify top-viewed providers)
- Search-to-profile-view conversion rate
- Provider geographic distribution (map visualization)

**And** All analytics support:
- Date range selection (last 7 days, 30 days, 90 days, custom range)
- Comparison view (compare current period to previous period)
- Export to CSV/PDF for presentations
- Scheduled email reports (weekly digest for admin team)

**And** Real-time metrics dashboard:
- Users online right now (approximate)
- Assessments in progress
- Active sessions count
- Current system load and performance

**Prerequisites:** Story 6.1 (Admin Dashboard Foundation), Story 1.5 (Core UI Component Library)

**Technical Notes:**
- Create `/admin/analytics` route with role guard
- Use Supabase Edge Functions to pre-aggregate analytics data (daily cron job)
- Store aggregated data in `analytics_*` tables (users, content, assessments, providers)
- Use Recharts for all data visualizations
- Implement efficient date range queries with database indexes
- Consider integrating Google Analytics data via API for deeper web analytics
- Use Mapbox or similar for geographic distribution visualization
- Cache analytics data aggressively (15-minute refresh interval)
- Exclude admin/test accounts from analytics calculations

---

### Story 6.4: Content Management and Moderation

As an **admin**,
I want **tools to manage and moderate educational content and user-generated submissions**,
So that **I can ensure content quality, accuracy, and compliance with platform standards**.

**Acceptance Criteria:**

**Given** I am an admin managing content
**When** I navigate to "/admin/content"
**Then** I see content management interface with sections for:
- **Articles**: Manage Sanity.io educational articles
- **Expert Reviews**: Review submitted expert reviews (Story 2.8)
- **Reported Content**: Handle user reports of problematic content
- **Content Queue**: Articles pending approval (if approval workflow enabled)

**And** Article management features include:
- List all articles with: Title, author, category, publish date, status (published/draft)
- Filter by: Category, status, date range, author
- Search articles by title or content keywords
- Quick actions: Edit in Sanity, Unpublish, Delete, View Live

**And** I can manage article lifecycle:
- **Publish**: Make draft articles live
- **Unpublish**: Temporarily hide articles (outdated info, under review)
- **Archive**: Permanently remove from public view (keep for records)
- **Feature**: Mark articles as featured on homepage
- **Update**: Edit article metadata (title, description, categories, tags)

**And** Expert review moderation includes:
- View pending expert review submissions
- Review content: Expert name, credentials, review text, rating
- Verify expert credentials before approval
- Approve (publish with article), Reject (with feedback), Request Changes
- Track review quality metrics (approve/reject rates)

**And** Reported content queue displays:
- User reports with: Reported item (article/profile), reason, reporter (anonymous), date
- Report categories: Inaccurate information, harmful content, spam, other
- Review interface: View reported content, read report reason, take action
- Actions: Dismiss report (false positive), Edit content, Unpublish content, Ban reporter (if abuse)

**And** Content quality tools:
- Duplicate detection for articles (flag similar titles/content)
- Broken link checker for external citations
- Readability score for articles (Flesch-Kincaid grade level)
- SEO health check (meta descriptions, image alt text, headings)

**And** All moderation actions are logged:
- Audit trail of content changes (who modified what, when)
- Moderation decisions recorded (approve/reject with reasons)
- Content history: See all versions and revisions

**Prerequisites:** Story 2.2 (Article Content Schema), Story 2.8 (Expert Review Workflow), Story 6.1 (Admin Dashboard Foundation)

**Technical Notes:**
- Create `/admin/content` route with nested sections
- Integrate with Sanity.io Studio for article editing (embed or link out)
- Use Sanity GROQ queries to fetch articles with filters
- Create `content_reports` table for user reports
- Implement `content_moderation_log` for audit trail
- Use webhook from Sanity for real-time content updates
- Implement automated content checks: Grammarly API for spelling, broken link checker cron job
- Readability scoring using libraries like `textstat` or `readable`

---

### Story 6.5: System Configuration and Settings

As an **admin**,
I want **centralized system configuration management for platform settings**,
So that **I can adjust operational parameters without code deployments and maintain platform flexibility**.

**Acceptance Criteria:**

**Given** I am an admin managing system configuration
**When** I navigate to "/admin/settings"
**Then** I see organized configuration sections:
- **General Settings**: Platform name, logo, primary contact email
- **Feature Flags**: Enable/disable features dynamically
- **Assessment Configuration**: Scoring thresholds, crisis resource triggers
- **Provider Settings**: Verification policies, listing fees (future), directory rules
- **Email Settings**: SMTP configuration, email template management
- **Security Settings**: Session timeout, password policies, rate limits

**And** Feature flags allow me to:
- Toggle features on/off without deployments: 2FA enforcement, provider directory, expert reviews
- Enable beta features for testing: New assessment types, experimental UI features
- A/B test configurations: Different scoring algorithms, UI variations
- Schedule feature releases: Auto-enable features at specific date/time

**And** Assessment configuration includes:
- Crisis score threshold (e.g., scores below X trigger crisis resources)
- Customizable score ranges and labels (e.g., "High Clarity: 80-100")
- Enable/disable assessment dimensions (anxiety, depression, stress)
- Assessment reminder default frequency
- Max assessments per user per day (prevent spam)

**And** Provider settings include:
- Verification expiry duration (default 365 days, adjustable)
- Minimum profile completeness score for visibility (e.g., 70%)
- Max providers per search result page
- Provider listing fee (future monetization, currently $0)
- Auto-approve providers from verified institutions (whitelist)

**And** Email configuration includes:
- SMTP server settings (host, port, credentials)
- Default sender name and email
- Email template editor for: Welcome, password reset, verification approval/rejection, reminders
- Test email functionality (send test email to verify settings)
- Email sending rate limits (prevent spam classification)

**And** Security settings include:
- Session timeout duration (default 30 days for "remember me", 24 hours otherwise)
- Password requirements: Min length, complexity rules, expiry (optional)
- Rate limits: API requests per minute, login attempts per hour
- IP allowlist/blocklist for admin access
- Two-factor authentication enforcement for roles (require 2FA for providers/admins)

**And** All configuration changes:
- Require admin role with elevated privileges (re-authentication)
- Show preview/confirmation before applying
- Are versioned and logged (who changed what, when, previous value)
- Take effect immediately (no deployment required)
- Can be rolled back to previous versions

**And** I can export/import configurations:
- Export current configuration as JSON (backup)
- Import configuration from file (restore from backup)
- Compare configurations between environments (staging vs. production)

**Prerequisites:** Story 6.1 (Admin Dashboard Foundation), Story 5.7 (User Roles and Permissions System)

**Technical Notes:**
- Create `/admin/settings` route with nested sections
- Store configuration in `system_config` table with key-value structure
- Use Supabase Realtime to broadcast config changes to all active sessions
- Implement configuration caching with Redis (if available) or in-memory cache
- Create `config_history` table for versioning and rollback capability
- Use LaunchDarkly or similar for feature flag management (or build custom)
- Email template editor using rich text editor (TipTap or similar)
- Validate all configuration changes before applying (prevent breaking changes)
- Implement configuration schema validation using Zod

---

### Story 6.6: Audit Logs and Compliance Reporting

As an **admin or compliance officer**,
I want **comprehensive audit logs and compliance reporting tools**,
So that **I can track all system actions, investigate issues, and generate reports for regulatory compliance**.

**Acceptance Criteria:**

**Given** I am an admin accessing audit logs
**When** I navigate to "/admin/audit-logs"
**Then** I see a comprehensive audit log viewer with:
- Searchable, filterable log entries showing all system events
- Filters: Date range, event type, user/admin, severity level, entity type
- Search: Free-text search across event descriptions

**And** Each audit log entry displays:
- Timestamp (precise to milliseconds)
- Event type (user_created, provider_verified, content_moderated, config_changed, data_exported, etc.)
- Actor: Who performed the action (user ID, admin name, system/automated)
- Target: What was affected (user ID, provider profile, article, setting key)
- Action details: Specific changes made (before/after values for modifications)
- IP address and user agent (for security tracking)
- Result: Success, failure, partial (with error details if failed)

**And** High-priority events are flagged:
- Security events: Failed login attempts, password changes, 2FA changes, role modifications
- Data privacy events: Data exports, account deletions, GDPR requests
- Administrative actions: User suspensions, content removals, config changes
- System errors: Database connection failures, external service outages

**And** I can generate compliance reports:
- **GDPR Compliance Report**: All data access, export, deletion requests for specific user
- **Security Audit Report**: All authentication and authorization events
- **Provider Verification Report**: All provider approvals/rejections with timeline
- **Data Privacy Report**: Cookie consent data, data retention metrics
- **System Activity Report**: Platform-wide activity summary for date range

**And** Reports can be:
- Exported as PDF (formatted for presentation to regulators)
- Exported as CSV (for data analysis)
- Scheduled for automatic generation (weekly/monthly email delivery)
- Customized with filters and date ranges

**And** I can investigate specific incidents:
- Filter logs by user ID to see all actions by/on that user
- Filter by IP address to investigate suspicious activity
- View timeline of events leading up to specific incident
- Correlate multiple log entries (e.g., failed login followed by successful login from different IP)

**And** Retention and security:
- Audit logs retained for minimum 2 years (GDPR requirement)
- Logs are immutable (cannot be edited or deleted, only appended)
- Access to audit logs itself is logged (meta-audit)
- Export of audit logs requires admin re-authentication

**Prerequisites:** Story 6.2 (User Management), Story 5.6 (GDPR Compliance Features), Story 6.1 (Admin Dashboard Foundation)

**Technical Notes:**
- Create `/admin/audit-logs` route with heavy pagination (100 entries per page)
- Design `audit_logs` table with indexes on: timestamp, event_type, actor_id, target_id
- Use append-only log design with write-once storage (S3 or Supabase Storage)
- Implement log aggregation: Store detailed logs, aggregate daily for reporting
- Use Supabase Edge Functions for report generation (prevent frontend timeouts)
- Consider log rotation strategy: Archive logs older than 2 years to cold storage
- Implement real-time log streaming for critical events (admin dashboard alerts)
- Use structured logging format (JSON) for easy parsing and analysis
- Ensure PII is logged appropriately (hash sensitive data like SSNs, mask portions)

---

**Key Deliverables**:
- Centralized admin dashboard with platform health overview
- Comprehensive user management and moderation tools
- Detailed analytics and reporting across all platform areas
- Content management and moderation workflows
- System configuration management with feature flags
- Audit logs and compliance reporting for regulatory requirements

━━━━━━━━━━━━━━━━━━━━━━━

## Epic 7: Polish & Launch Readiness

**Goal**: Deliver a polished, accessible, performant, and SEO-optimized platform ready for public launch with the innovative Hub-and-Spoke homepage as the centerpiece.

**Value**: Creates an exceptional first impression, ensures discoverability through search engines, provides inclusive access for all users, and delivers a fast, reliable experience that builds trust and credibility.

---

### Story 7.1: Hub-and-Spoke Homepage Design and Implementation

As a **first-time visitor**,
I want **an intuitive, visually compelling homepage that clearly guides me to the platform's core capabilities**,
So that **I immediately understand Project Psychage's value and can easily navigate to what I need (Learn, Tools, Connect)**.

**Acceptance Criteria:**

**Given** I am a visitor landing on the homepage
**When** The page loads
**Then** I see the Hub-and-Spoke design featuring:
- **Central Hub**: Project Psychage brand identity, tagline ("Mental health clarity, your way"), and value proposition
- **Three Spokes**: Visual pathways to core capabilities:
  - **Learn Spoke**: "Understand your mind" - Educational content preview
  - **Tools Spoke**: "Assess your clarity" - Clarity Score assessment entry
  - **Connect Spoke**: "Find your provider" - Provider directory access

**And** The hub section includes:
- Logo and platform name prominently displayed
- Compelling hero message: "Mental health clarity, your way"
- Brief explanation (2-3 sentences) of what Project Psychage offers
- Visual trust indicators: "Evidence-based", "Private & Secure", "Free Assessment"

**And** Each spoke is visually distinct with:
- Icon representing the capability (book for Learn, clipboard for Tools, people for Connect)
- Clear label and one-sentence description
- Call-to-action button: "Explore Articles", "Take Assessment", "Find Providers"
- Subtle hover animation showing interactivity
- Preview content: Featured article count, average Clarity Score, provider count

**And** The design embodies "clarity without overwhelming":
- Clean, spacious layout with generous whitespace
- Calming color palette (blues, greens, neutrals)
- Typography hierarchy that's easy to scan
- Minimal text: concise, direct messaging
- Progressive disclosure: Details revealed on hover/click

**And** Navigation includes:
- Sticky header with: Logo, Login/Signup buttons, hamburger menu (mobile)
- Footer with: About, Privacy Policy, Terms, Contact, Social links

**And** The homepage is fully responsive:
- Desktop: Three spokes arranged radially around central hub
- Tablet: Stacked vertically with large touch targets
- Mobile: Single-column layout with swipeable spoke cards

**And** Accessibility features:
- All interactive elements keyboard-navigable (Tab order logical)
- ARIA labels for screen readers on all spokes
- Color contrast ratios meet WCAG 2.1 AA (4.5:1 minimum)
- Focus indicators clearly visible
- Skip-to-main-content link for keyboard users

**Prerequisites:** Story 1.6 (App Layout and Navigation), Story 1.5 (Core UI Component Library)

**Technical Notes:**
- Create `/app/page.tsx` as the homepage (Next.js App Router)
- Use Framer Motion for subtle animations (spokes expand on hover)
- Implement responsive design using Tailwind CSS breakpoints
- Use Next.js Image component for optimized image loading
- Implement lazy loading for below-the-fold content
- Add Open Graph and Twitter Card meta tags for social sharing
- Use CSS Grid or Flexbox for spoke layout (adjust based on screen size)
- Test with keyboard navigation and screen readers (NVDA, JAWS, VoiceOver)

---

### Story 7.2: SEO Optimization and Metadata Management

As a **potential user searching for mental health resources**,
I want **Project Psychage to appear in relevant search results with compelling descriptions**,
So that **I can discover the platform when I need mental health support**.

**Acceptance Criteria:**

**Given** The platform is live
**When** Search engines crawl the site
**Then** All pages include optimized SEO elements:
- **Title tags**: Unique, descriptive, 50-60 characters (e.g., "Project Psychage - Mental Health Clarity Assessment & Provider Directory")
- **Meta descriptions**: Compelling, 150-160 characters summarizing page content
- **Canonical URLs**: Prevent duplicate content issues
- **Open Graph tags**: Rich previews for social media sharing
- **Twitter Card tags**: Optimized Twitter sharing experience
- **Structured data (JSON-LD)**: Schema.org markup for articles, organizations, local business (providers)

**And** Technical SEO is implemented:
- **Sitemap.xml**: Comprehensive XML sitemap submitted to Google Search Console and Bing Webmaster Tools
- **Robots.txt**: Proper directives allowing crawler access to public content, blocking admin/private pages
- **Semantic HTML**: Proper heading hierarchy (H1 → H2 → H3), semantic tags (<article>, <nav>, <aside>)
- **Alt text**: All images have descriptive alt text for accessibility and image search
- **Internal linking**: Strategic links between related content (articles, assessments, providers)

**And** Performance metrics meet SEO requirements:
- **Core Web Vitals**:
  - Largest Contentful Paint (LCP) < 2.5s
  - First Input Delay (FID) < 100ms
  - Cumulative Layout Shift (CLS) < 0.1
- **Mobile-friendly**: Passes Google Mobile-Friendly Test
- **HTTPS**: All pages served over secure connection (Vercel provides SSL)

**And** Content is optimized for search:
- **Target keywords**: "mental health assessment", "find therapist", "anxiety screening", "depression test", "mental health provider directory"
- **Keyword placement**: Naturally integrated in titles, headings, first paragraphs
- **Content quality**: Original, valuable content (not duplicate or thin)
- **Fresh content**: Regular article publishing schedule (signals active site)

**And** Local SEO for provider directory:
- **Google Business Profile**: Claimed and optimized for project
- **Location pages**: Dedicated pages for major cities (if applicable)
- **Structured data**: LocalBusiness schema for each provider profile
- **NAP consistency**: Provider name, address, phone consistent across platform

**And** Monitoring and analytics:
- **Google Search Console**: Integrated to monitor crawl errors, search performance
- **Google Analytics 4**: Tracking organic traffic, user behavior, conversions
- **Bing Webmaster Tools**: Integrated for Bing search visibility
- **Rank tracking**: Monitor keyword rankings for target terms (monthly)

**Prerequisites:** Story 1.1 (Project Initialization), Story 7.1 (Hub-and-Spoke Homepage)

**Technical Notes:**
- Use Next.js Metadata API for page-level SEO
- Generate sitemap.xml dynamically using Next.js API route
- Implement structured data using `next-seo` or custom JSON-LD scripts
- Use Lighthouse CI in deployment pipeline to enforce SEO standards
- Configure Vercel edge config for robots.txt
- Implement canonical URL generation for all dynamic routes
- Use Next.js Image component (automatic WebP conversion, lazy loading)
- Monitor Core Web Vitals using Vercel Analytics or Web Vitals library
- Create reusable SEO component for consistent metadata across pages

---

### Story 7.3: WCAG 2.1 AA Accessibility Compliance

As a **user with disabilities**,
I want **the platform to be fully accessible using assistive technologies**,
So that **I can independently navigate, read content, take assessments, and find providers regardless of my abilities**.

**Acceptance Criteria:**

**Given** The platform is built with accessibility in mind
**When** I use assistive technologies
**Then** All WCAG 2.1 Level AA criteria are met:

**Perceivable**:
- **Color contrast**: All text meets 4.5:1 ratio (normal text), 3:1 ratio (large text, UI components)
- **Alternative text**: All images, icons, charts have descriptive alt text or ARIA labels
- **Audio/Video captions**: Any multimedia content includes captions/transcripts
- **Adaptable content**: Content structure is preserved when CSS is disabled
- **Non-text content**: Charts and graphs have text alternatives or data tables

**Operable**:
- **Keyboard navigation**: All functionality accessible via keyboard (Tab, Arrow keys, Enter, Space)
- **Focus indicators**: Visible focus outlines on all interactive elements (not disabled)
- **No keyboard traps**: Users can navigate away from all components using keyboard
- **Skip links**: "Skip to main content" link at top of every page
- **Link purpose**: Link text describes destination (avoid "click here" or "read more" without context)
- **No time limits**: Or time limits can be extended/disabled (assessment timeout warnings)

**Understandable**:
- **Page language**: HTML lang attribute set (e.g., `<html lang="en">`)
- **Navigation consistency**: Navigation order consistent across all pages
- **Form labels**: All form inputs have associated labels (visible or ARIA)
- **Error identification**: Form errors clearly identified with suggestions for correction
- **Instructions**: Complex forms include clear instructions before input
- **Predictable behavior**: UI components behave consistently (no unexpected pop-ups)

**Robust**:
- **Valid HTML**: No HTML parsing errors (validate with W3C Validator)
- **ARIA roles**: Proper ARIA roles for custom components (modals, tabs, accordions)
- **Name, Role, Value**: All UI components have accessible name and role for assistive tech
- **Status messages**: ARIA live regions for dynamic content updates

**And** Accessibility testing covers:
- **Screen readers**: Tested with NVDA (Windows), JAWS (Windows), VoiceOver (Mac, iOS)
- **Keyboard-only navigation**: Complete user journeys tested without mouse
- **Zoom testing**: Interface usable at 200% zoom (browser zoom)
- **Color blindness**: Interface tested with color blindness simulators
- **Automated testing**: axe DevTools, WAVE, Lighthouse Accessibility scans pass

**And** Specific accessibility features:
- **High contrast mode**: Design works with Windows High Contrast Mode
- **Reduced motion**: Respect `prefers-reduced-motion` media query (disable animations)
- **Screen reader announcements**: ARIA live regions for assessment progress, search results loading
- **Accessible data visualizations**: Charts include table alternatives, ARIA descriptions

**And** Documentation:
- **Accessibility statement**: Public page explaining accessibility features and contact for issues
- **Keyboard shortcuts**: Documented shortcuts for power users
- **VPAT (Voluntary Product Accessibility Template)**: Created for enterprise/government prospects

**Prerequisites:** All UI stories from Epics 1-6, Story 7.1 (Homepage)

**Technical Notes:**
- Use `eslint-plugin-jsx-a11y` for automated accessibility linting
- Implement `@testing-library/jest-dom` with `toBeAccessible()` assertions in tests
- Use Axe Core in Vitest/Playwright tests for automated accessibility testing
- Create reusable accessible components (Modal, Dropdown, Tabs) in component library
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, etc.) not just divs
- Implement focus management for modals and dynamic content
- Use ARIA live regions (`aria-live="polite"`) for status updates
- Test with keyboard navigation in every pull request (CI gate)
- Create accessibility checklist for dev team (mandatory for all features)

---

### Story 7.4: Performance Optimization and Lighthouse Scoring

As a **user on any device or network condition**,
I want **the platform to load quickly and respond instantly to my interactions**,
So that **I have a smooth, frustration-free experience even on slower connections**.

**Acceptance Criteria:**

**Given** The platform is fully built
**When** I run Lighthouse audits
**Then** All pages achieve scores ≥ 90 in all categories:
- **Performance**: ≥ 90 (target: 95+)
- **Accessibility**: ≥ 90 (target: 100)
- **Best Practices**: ≥ 90 (target: 100)
- **SEO**: ≥ 90 (target: 100)

**And** Performance metrics meet targets:
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s (good), < 4.0s (needs improvement)
- **Total Blocking Time (TBT)**: < 300ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Speed Index**: < 3.0s
- **Time to Interactive (TTI)**: < 3.8s

**And** Optimization techniques applied:
- **Code splitting**: Lazy load routes and heavy components (React.lazy, Next.js dynamic imports)
- **Image optimization**: WebP format, lazy loading, responsive images, proper sizing
- **Font optimization**: Subset fonts, preload critical fonts, use `font-display: swap`
- **Minification**: CSS, JavaScript minified in production (Terser, PostCSS)
- **Compression**: Gzip or Brotli compression for text assets (Vercel provides)
- **Caching**: Appropriate cache headers for static assets (immutable for versioned files)

**And** Bundle size optimized:
- **Main bundle**: < 200 KB (gzipped)
- **Vendor bundle**: < 300 KB (gzipped)
- **Tree shaking**: Unused code eliminated (check with webpack-bundle-analyzer)
- **Code splitting**: Separate bundles for different routes (Next.js automatic)
- **Remove unused dependencies**: Audit and remove unused npm packages

**And** Database and API optimization:
- **Query optimization**: Indexed columns used in WHERE clauses, JOINs
- **N+1 query prevention**: Use batch queries, eager loading where appropriate
- **API response caching**: Cache stable data (articles, provider profiles) with appropriate TTL
- **Pagination**: Limit query results, implement cursor-based pagination for large datasets
- **CDN caching**: Static assets served from Vercel Edge Network

**And** Third-party scripts optimized:
- **Async/defer loading**: Non-critical scripts loaded asynchronously
- **Self-hosting**: Consider self-hosting Google Fonts, analytics (reduce DNS lookups)
- **Minimal third-party scripts**: Audit and minimize external dependencies

**And** Monitoring in production:
- **Real User Monitoring (RUM)**: Track actual user performance metrics
- **Vercel Analytics**: Monitor Core Web Vitals in production
- **Performance budgets**: CI fails if bundle size exceeds limits
- **Lighthouse CI**: Run Lighthouse in every deployment, fail if scores drop

**Prerequisites:** All feature epics complete (1-6), Story 7.1 (Homepage), Story 7.2 (SEO)

**Technical Notes:**
- Use Next.js built-in optimization features (Image, Font optimization)
- Implement dynamic imports for heavy components: `const HeavyChart = dynamic(() => import('./HeavyChart'))`
- Use `@next/bundle-analyzer` to identify large dependencies
- Implement service worker for offline support and caching (consider next-pwa)
- Use Vercel Edge Functions for API routes requiring low latency
- Configure Supabase connection pooling for database performance
- Use React.memo, useMemo, useCallback to prevent unnecessary re-renders
- Implement virtual scrolling for long lists (provider search results)
- Add Lighthouse CI to GitHub Actions workflow

---

### Story 7.5: Cross-Browser and Device Testing

As a **user on any browser or device**,
I want **the platform to work consistently and reliably**,
So that **I have the same quality experience regardless of how I access Project Psychage**.

**Acceptance Criteria:**

**Given** The platform is ready for launch
**When** I test across browsers and devices
**Then** Full functionality works on:
- **Desktop browsers**:
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)
- **Mobile browsers**:
  - iOS Safari (latest 2 iOS versions)
  - Chrome on Android (latest 2 versions)
  - Samsung Internet (latest version)
- **Tablet browsers**:
  - iPad Safari (latest iPadOS)
  - Android tablets (Chrome)

**And** Core user journeys tested end-to-end:
- **Journey 1**: New user signup → Profile creation → Assessment completion → Results viewing
- **Journey 2**: Article browsing → Article reading → Related article discovery
- **Journey 3**: Provider search → Filter application → Profile viewing → Contact action
- **Journey 4**: Provider registration → Profile creation → Document upload → Verification status check
- **Journey 5**: Admin login → Provider verification → User management action

**And** Visual consistency verified:
- **Layout**: No broken layouts, elements properly aligned
- **Typography**: Fonts render correctly, no FOUT (Flash of Unstyled Text)
- **Images**: All images display, no broken links, proper aspect ratios
- **Interactive elements**: Buttons, forms, dropdowns function properly
- **Animations**: Smooth animations (or disabled if prefers-reduced-motion)

**And** Responsive design breakpoints tested:
- **Mobile**: 320px - 767px (iPhone SE to large phones)
- **Tablet**: 768px - 1023px (iPad, Android tablets)
- **Desktop**: 1024px - 1919px (laptops, desktops)
- **Large desktop**: 1920px+ (4K monitors)

**And** Touch interaction testing (mobile/tablet):
- **Touch targets**: Minimum 44x44px for all interactive elements
- **Swipe gestures**: Work where implemented (carousels, image galleries)
- **Pinch-to-zoom**: Enabled and functional (not disabled with maximum-scale=1)
- **Hover states**: Adapted for touch (no hover-only functionality)

**And** Performance tested on various network conditions:
- **Fast 3G**: Platform usable (Lighthouse throttling simulation)
- **Slow 3G**: Critical content loads within 5 seconds
- **Offline**: Graceful degradation or offline support message

**And** Browser-specific issues resolved:
- **Safari-specific**: Date pickers, file uploads, flex behavior
- **Firefox-specific**: Input autofill, CSS compatibility
- **IE11**: Not supported (show upgrade message if visited)
- **Mobile Safari**: Fixed position elements, 100vh issues

**And** Testing tools used:
- **BrowserStack**: Real device testing across browsers/OS combinations
- **Playwright**: Automated cross-browser E2E tests (Chromium, Firefox, WebKit)
- **Responsively App**: Visual testing across multiple device sizes simultaneously
- **Chrome DevTools Device Mode**: Mobile emulation during development

**And** Documented browser support policy:
- **Support matrix**: Published list of supported browsers with versions
- **Graceful degradation**: Older browsers receive functional but simpler experience
- **Upgrade messaging**: Outdated browser users see polite upgrade recommendation

**Prerequisites:** All epics complete (1-6), Story 7.4 (Performance Optimization)

**Technical Notes:**
- Use Autoprefixer to add vendor prefixes automatically (PostCSS plugin)
- Test with Playwright cross-browser suite in CI pipeline
- Use feature detection (Modernizr or custom) not browser detection
- Implement polyfills for newer APIs if needed (use @babel/preset-env)
- Test form handling on actual mobile devices (keyboard behavior, autofill)
- Use CSS feature queries (@supports) for progressive enhancement
- Set up BrowserStack account for manual real-device testing
- Create cross-browser testing checklist for QA team

---

### Story 7.6: Final QA, Bug Fixes, and Launch Preparation

As a **project stakeholder**,
I want **comprehensive quality assurance before launch to identify and fix any issues**,
So that **we launch with confidence, minimize post-launch bugs, and deliver a polished experience**.

**Acceptance Criteria:**

**Given** All features are implemented
**When** QA testing is performed
**Then** The following testing phases are completed:

**Phase 1: Functional Testing**
- **All user stories**: Acceptance criteria verified for every story in Epics 1-7
- **Happy paths**: All expected user journeys work end-to-end
- **Edge cases**: Boundary conditions, empty states, error conditions tested
- **Form validation**: All forms validate properly with helpful error messages
- **Authentication flows**: Signup, login, logout, password reset, 2FA work flawlessly
- **Role-based access**: Patient, provider, admin permissions properly enforced

**Phase 2: Integration Testing**
- **Supabase integration**: Database CRUD operations, real-time subscriptions, RLS policies
- **Firebase Auth**: Authentication, custom claims, session management
- **Sanity.io CMS**: Content fetching, image optimization, webhooks
- **Vercel deployment**: Edge functions, serverless API routes, environment variables
- **Email delivery**: All transactional emails deliver correctly (SendGrid/AWS SES)
- **External APIs**: Any third-party integrations tested (payment gateways, maps, etc.)

**Phase 3: Security Testing**
- **OWASP Top 10**: Common vulnerabilities checked (XSS, SQL injection, CSRF)
- **Authentication**: Session hijacking prevention, JWT validation, password security
- **Authorization**: No privilege escalation, proper RLS enforcement
- **Data privacy**: PII protected, no data leaks in logs or errors
- **API security**: Rate limiting, input validation, authentication required
- **Secrets management**: No hardcoded secrets, environment variables secure

**Phase 4: Usability Testing**
- **User testing sessions**: 5-10 users from target audience test platform
- **Task completion**: Users complete core tasks without assistance
- **Friction points**: Identify confusing UI, unclear messaging, usability issues
- **Mobile usability**: Test on actual devices with real users
- **Feedback collection**: Structured feedback forms, session recordings

**Phase 5: Regression Testing**
- **Automated test suite**: Run full Vitest + Playwright test suite (must pass)
- **Manual regression**: Test previously working features after final changes
- **Data integrity**: Verify database migrations didn't corrupt data
- **Backward compatibility**: Ensure updates don't break existing user data

**And** Bug tracking and triage:
- **Bug severity levels**:
  - **Critical (P0)**: Blocks launch, must fix immediately (login broken, data loss, security)
  - **High (P1)**: Major feature broken, must fix before launch (assessment doesn't submit)
  - **Medium (P2)**: Feature partially broken, fix before or immediately after launch
  - **Low (P3)**: Minor UI issue, can fix post-launch
- **Bug resolution**: All P0 and P1 bugs fixed and verified before launch
- **Known issues log**: P2 and P3 bugs documented in known issues list

**And** Launch preparation checklist:
- [ ] All critical bugs fixed (P0, P1)
- [ ] Production environment configured (env variables, secrets)
- [ ] Database migrations applied to production
- [ ] Monitoring and alerting configured (Sentry, Vercel, Supabase)
- [ ] Analytics configured (Google Analytics, Vercel Analytics)
- [ ] Backup strategy in place (database backups, code repository)
- [ ] Custom domain configured and SSL certificate valid
- [ ] Legal pages published (Privacy Policy, Terms of Service, Cookie Policy)
- [ ] Support channels ready (email, contact form, documentation)
- [ ] Team trained on admin tools and procedures
- [ ] Launch communication prepared (social media, email, blog post)
- [ ] Rollback plan documented (how to revert if critical issue)

**And** Post-launch monitoring plan:
- **First 24 hours**: Team on-call, monitor error rates, user feedback
- **First week**: Daily metrics review, rapid bug fixes, user support response
- **First month**: Weekly retrospectives, feature usage analysis, iteration planning

**Prerequisites:** All epics complete (1-7), Story 7.5 (Cross-Browser Testing)

**Technical Notes:**
- Use linear.app or Jira for bug tracking and sprint planning
- Set up error monitoring with Sentry (alerts for critical errors)
- Configure Supabase database backups (automated daily)
- Implement feature flags to disable problematic features quickly if needed
- Create runbook for common issues and troubleshooting steps
- Set up status page (statuspage.io or similar) for uptime communication
- Configure uptime monitoring (Pingdom, UptimeRobot)
- Schedule launch retrospective 1 week post-launch

---

**Key Deliverables**:
- Innovative Hub-and-Spoke homepage embodying "clarity without overwhelming"
- Comprehensive SEO optimization with Lighthouse scores ≥ 90
- Full WCAG 2.1 AA accessibility compliance with assistive technology support
- Optimized performance with fast load times and smooth interactions
- Cross-browser compatibility across all major browsers and devices
- Thorough QA with all critical bugs resolved and launch preparation complete

━━━━━━━━━━━━━━━━━━━━━━━

---

# Epic Breakdown Complete

**Project Psychage V1** has been decomposed into **7 epics** containing **54 total stories**, each sized for single-session completion by development agents.

## Summary by Epic:

1. **Epic 1: Foundation & Core Infrastructure** - 8 stories
2. **Epic 2: Learn - Educational Content System** - 10 stories
3. **Epic 3: Tools - Clarity Score Assessment** - 9 stories
4. **Epic 4: Connect - Provider Directory** - 8 stories
5. **Epic 5: User Management & Authentication** - 7 stories
6. **Epic 6: Admin Operations & Management** - 6 stories
7. **Epic 7: Polish & Launch Readiness** - 6 stories

**Total Stories: 54**

## Key Architectural Decisions:

- **Tech Stack**: Next.js 16 (App Router), TypeScript, Supabase, Firebase Auth, Sanity.io CMS, Vercel deployment
- **Navigation Pattern**: Hub-and-Spoke homepage for intuitive wayfinding
- **Compliance**: HIPAA-exempt status maintained, GDPR/CCPA compliance built-in
- **Accessibility**: WCAG 2.1 AA throughout, assistive technology support
- **Security**: Role-based access control, 2FA, comprehensive audit logging
- **Quality**: Lighthouse scores ≥ 90, cross-browser tested, production-ready

## Next Steps:

1. **Architecture Phase**: Use `/bmad:bmm:workflows:architecture` to create technical architecture document
2. **Story Creation**: Use `/bmad:bmm:workflows:create-story` to generate individual story implementation plans
3. **Sprint Planning**: Use `/bmad:bmm:workflows:sprint-planning` to organize stories into development sprints
4. **Development**: Use `/bmad:bmm:workflows:dev-story` to implement each story

---

_Generated by BMad Method Epic Decomposition Workflow_
_Date: 2025-11-12_
_Project: Project Psychage V1_
