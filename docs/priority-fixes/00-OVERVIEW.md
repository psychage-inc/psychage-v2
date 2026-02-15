# Psychage V2 - Priority Fix Plan

## Project Status: ~98% Complete

This document outlines the prioritized tasks needed to bring Psychage V2 to production-ready status. Each priority level has its own detailed file with specific prompts you can use.

---

## Priority Levels

| Level | Description | Files | Est. Effort |
|-------|-------------|-------|-------------|
| **P0 - Critical** | Must fix before any deployment | [01-P0-CRITICAL.md](./01-P0-CRITICAL.md) | 1-2 days |
| **P1 - High** | Required for MVP launch | [02-P1-HIGH.md](./02-P1-HIGH.md) | 3-5 days |
| **P2 - Medium** | Important for quality | [03-P2-MEDIUM.md](./03-P2-MEDIUM.md) | 1-2 weeks |
| **P3 - Low** | Nice to have | [04-P3-LOW.md](./04-P3-LOW.md) | Ongoing |
| **NAV - Navigation** | Navigation UX overhaul | [05-NAVIGATION-REDESIGN.md](./05-NAVIGATION-REDESIGN.md) | 3-4 days |

---

## Quick Start

1. Start with **P0 - Critical** issues first
2. Each task has a checkbox `[ ]` - mark as `[x]` when complete
3. Each task includes a **Prompt** you can copy/paste to Claude
4. Work through tasks in order within each priority level

---

## Progress Tracker

### P0 - Critical (5/5 complete) ✅
- [x] Fix ContactPage form submission ✅
- [x] Fix ToolsLandingPage dynamic Tailwind classes ✅
- [x] Add basic E2E tests for auth ✅
- [x] Verify backend API connectivity ✅ (see docs/api-status.md)
- [x] Configure production environment ✅ (see docs/deployment-checklist.md)

### P1 - High Priority (8/8 complete) ✅
- [x] Complete ProviderDashboard integration ✅ (already functional)
- [x] Complete ProviderProfileEditor ✅ (already functional)
- [x] Complete ProviderAnalytics page ✅ (already functional)
- [x] Implement Share/PDF buttons or remove ✅
- [x] Add loading skeletons to UserDashboard ✅
- [x] Complete provider service stubs ✅
- [x] Add error UI states to pages ✅
- [x] Add aria-live to Toast component ✅

### P2 - Medium Priority (8/8 complete) ✅

- [x] Add unit tests for services ✅
- [x] Implement OAuth sign-in ✅
- [x] Add backend search API ✅
- [x] Complete admin dashboard ✅
- [x] Add file validation to uploads ✅
- [x] Optimize bundle size ✅
- [x] Fix assessment details button ✅
- [x] Standardize error handling ✅

### P3 - Low Priority (0/6 complete)
- [ ] Add Storybook stories
- [ ] Implement request caching
- [ ] Add analytics tracking
- [ ] Add real-time notifications
- [ ] Complete i18n translations
- [ ] Add bulk bookmark actions

### NAV - Navigation Redesign (0/25 complete)
**Phase 1: Immediate Fixes**
- [ ] Fix provider dashboard path bug (Navigation.tsx, MobileMenu.tsx)
- [ ] Remove non-existent provider routes from sidebar
- [ ] Add RoleGuard to patient sub-routes

**Phase 2: Configuration**
- [ ] Create navigation config (src/config/navigation.ts)
- [ ] Create sidebar config (src/config/sidebars.ts)
- [ ] Create breadcrumb config (src/config/breadcrumbs.ts)
- [ ] Create useNavigation hook
- [ ] Create useBreadcrumbs hook

**Phase 3: Component Updates**
- [ ] Refactor Navigation.tsx to use config
- [ ] Rewrite MobileMenu.tsx with accordion sections
- [ ] Refactor NavMenu.tsx to use config
- [ ] Update UserSidebar.tsx with new labels
- [ ] Update ProviderSidebar.tsx (remove broken links)
- [ ] Update AdminSidebar.tsx with new labels

**Phase 4: Breadcrumbs**
- [ ] Add breadcrumbs to all dashboard pages (13 files)

**Phase 5: Route Cleanup**
- [ ] Add redirect routes for old URLs
- [ ] Rename files (ProfileSettings → AccountSettings, etc.)

**Phase 6: Flow Improvements**
- [ ] Update NotFoundPage with contextual suggestions
- [ ] Add RelatedContent component to articles
- [ ] Add NextSteps component to tool completion
- [ ] Add empty state components

---

## How to Use These Prompts

Each prompt is designed to be self-contained. Copy the entire prompt block and paste it to Claude Code. The prompts include:

1. **Context**: What the issue is
2. **Requirements**: What needs to be done
3. **Acceptance Criteria**: How to verify it's fixed
4. **Files to Modify**: Where to make changes

---

## Files Structure

```
docs/priority-fixes/
├── 00-OVERVIEW.md          # This file
├── 01-P0-CRITICAL.md       # Must fix before deployment
├── 02-P1-HIGH.md           # Required for MVP
├── 03-P2-MEDIUM.md         # Quality improvements
└── 04-P3-LOW.md            # Nice to have
```

---

Last Updated: 2025-02-15
