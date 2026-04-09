# Homepage UX Audit & System-Level UI Redesign Plan

## Core Objective
Unify the Psychage homepage into a cohesive, emotionally resonant, and production-ready design system. This plan replaces all previous fragmented UI suggestions with a strict, intent-driven architectural guide that prioritizes the user's emotional state over decorative filler.

---

## Part 1: Unified UI/UX Diagnosis

### 1. The Core Problems
The current homepage (`src/pages/home/HomePage.tsx`) and its constituent components (`HeroSection`, `ContentWorld`, `NavigatorShowcase`, etc.) suffer from the following system-level issues:

*   **Visual Hierarchy & Cognitive Overload:** The page acts as a catalog rather than a journey. By presenting eight major sections equally (`TrustStrip`, `ToolsEcosystem`, `ContentWorld`, `NavigatorShowcase`), it creates a "what should I do first?" paradox. For an anxious user, this sheer volume of choices induces decision fatigue rather than providing clarity.
*   **Component Inconsistency (The Dark Background Violation):** Certain sections, or the transition into them, feel disjointed. If `ContentWorld` or other sections introduce dark, heavy background tokens across the full viewport width, they break the open, airy gallery metaphor essential to the brand.
*   **Fragmented Emotional Tone:** The page oscillates between clinical ("Evidence-based articles") and structural ("Trust Foundation"). The emotional thread—that the user is seen, supported, and guided—is lost in the mechanics of explaining the platform's features.
*   **Interaction & Feedback Disconnect:** The current animations lack a unified duration scale or easing curve. Some fade, some slide sharply, making the page feel mechanical rather than organic.

### 2. The Emotional Breakpoint
The experience breaks emotionally right after the Hero section. The user arrives feeling overwhelmed, seeking a safe place. The Hero acknowledges this ("Explore what you're feeling"). However, immediately after, they are hit with a barrage of disparate options (a Trust Strip, an isolated Navigator showcase, a wall of articles). The page stops "holding their hand" and instead hands them a map, expecting them to navigate themselves.

---

## Part 2: Enforced Design Rules (NON-NEGOTIABLE)

### Rule 1: Figure Placement Requires Emotional Justification
*   **Enforcement:** No figure will be used as "filler" to balance a layout.
*   **Example:** A figure turning inward (`SCENES.turning`) is placed precisely at the Symptom Navigator section because the visitor is being asked to look inward at their own symptoms. If a figure's posture does not mirror the user's required emotional state at that specific scroll depth, it will be removed in favor of whitespace.

### Rule 2: Homepage Must Feel Open (Light Background System)
*   **Enforcement:** The global homepage background MUST remain light (warm, off-white: e.g., `bg-[#FAF9F6]`).
*   **Violation Fix:** Any section currently using dark background wraps (e.g., `bg-gray-900`) will be stripped of its background color. Dark backgrounds are strictly contained *inside* the Article Cards (`ContentWorld`), acting as editorial "paintings" on the light "gallery wall."

### Rule 3: Hero Must Be CSS-Composed (Not Flattened)
*   **Enforcement:** The Hero section MUST be a React component driven by an array configuration of individual clay figures.
*   **Architecture:**
    ```typescript
    const heroFigures = [
      { id: 'listener', src: FIGURES.listener, zIndex: 10, scale: 1, x: 0, y: 0, delay: 0.2 },
      { id: 'supporter', src: FIGURES.supporter, zIndex: 5, scale: 0.8, x: -120, y: -40, delay: 0.4 }
    ];
    ```
    This allows responsive rearrangement via CSS grid/absolute positioning, independent breathing animations, and prevents the hero from becoming a static, flattened photograph.

### Rule 4: CTA Must Feel Like an Invitation
*   **Enforcement:** All CTAs will be audited for pressure.
*   **Approved Lexicon:** "Explore what you're feeling," "Browse articles," "See provider profiles."
*   **Banned Lexicon:** "Start now," "Get started," "Take assessment."
*   **Interaction:** Hover states will feature a subtle `-translate-y-0.5` and soft shadow (`shadow-md`). No glowing, pulsing, or aggressive scaling.

### Rule 5: Page Must Work Without Images
*   **Enforcement:** The typographical hierarchy (H1, H2, body) and flex/grid layouts must gracefully handle missing image assets without collapsing. The layout relies on structural spacing (padding, gaps), not image dimensions.

---

## Part 3: Motion & Interaction System

We will implement a **Gentle Rhythm (Fade + Translate)** system to respect the user's reading flow while keeping the interface feeling alive but unhurried.

*   **Page Load (Hero):**
    *   Text: Staggered fade in + slight upward translate (`y: 18` -> `y: 0`), duration `0.7s`, `delay: 0, 0.06, 0.12`.
    *   Figures: Fade in + independent breathing (`y` oscillation of `4-6px` over `4s-6s`).
*   **Scroll Behavior (Section Reveals):**
    *   Each major section enters via a soft fade + `y: 14` translation.
    *   Trigger: `whileInView`, `viewport: { once: true, amount: 0.2 }`.
    *   Duration: `0.8s`. Easing: `ease.decelerate` (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
*   **Microinteractions:**
    *   Article Cards: Hover elevates the card by `4px` and darkens the shadow. The internal image scales slowly (`1.03` over `0.5s`).
*   **Motion Tokens:**
    *   `duration-fast`: `200ms` (hover states)
    *   `duration-base`: `500ms` (card entrances)
    *   `duration-slow`: `800ms` (section reveals)
    *   `easing-calm`: `cubic-bezier(0.2, 0.8, 0.2, 1)`

---

## Part 4: Cohesive Redesign (The Sequential Narrative)

The homepage structure will be streamlined into a guided, sequential narrative:

1.  **`HeroSection` (The Arrival):**
    *   **Purpose:** Acknowledge the user's state. Composed CSS figures (The Listener front and center).
    *   **Action:** Primary CTA "Explore what you're feeling" anchors the page.
2.  **`NavigatorShowcase` (Step 1: Look Inward):**
    *   **Purpose:** For the anxious, unsure user. The figure turning inward accompanies the prompt to map symptoms.
    *   **Flow:** Directly follows the Hero as the logical first step if they don't know where else to go.
3.  **`ContentWorld` (Step 2: Learn & Understand):**
    *   **Purpose:** For the user seeking validation through information.
    *   **Design:** Light gallery background. The article cards are the dark focal points. Staggered fade-in rhythm for the grid.
4.  **`ToolsEcosystem` (Step 3: Action & Coping):**
    *   **Purpose:** Introducing active, private tools (Mood Journal, Clarity Score).
    *   **Design:** Spacious layout, relying on subtle symbolic objects (ambient clay forms) drifting in the background margins.
5.  **`ProviderHighlight` & `ClosingSection` (Step 4: Reaching Out):**
    *   **Purpose:** The final, open-ended invitation to connect with a professional when ready. Medium-scale clay figure signifying open availability.

*(Note: The standalone `TrustStrip` and `TrustFoundation` sections will be dismantled. Trust badges/logos will be subtly integrated into the footer or a small inline row beneath the Hero, removing the defensive "we are trustworthy" posture.)*

---

## Part 5: Implementation Guidance

### Actionable Steps for Developers

1.  **Refactor `HomePage.tsx` Structure:**
    *   Remove `<TrustStrip />` and `<TrustFoundation />`.
    *   Reorder components: `<HeroSection />` -> `<NavigatorShowcase />` -> `<ContentWorld />` -> `<ToolsEcosystem />` -> `<ProviderHighlight />` -> `<ClosingSection />`.
2.  **Enforce Background Tokens:**
    *   Ensure the wrapper `<div>` in `HomePage.tsx` uses a strict light theme class: `bg-[var(--color-background-primary)]` or Tailwind `bg-stone-50`.
    *   Strip background colors from `section` wrappers in `ContentWorld.tsx` and `ToolsEcosystem.tsx` if they override the light theme.
3.  **Hero React Architecture:**
    *   Update `HeroSection.tsx` to map over a configuration array for the clay figures, applying absolute positioning, z-indexes, and unique Framer Motion delay/duration props to each figure to create the "sculpture garden" depth.
4.  **Unify Motion with Framer Motion:**
    *   Create a shared `animations.ts` file exporting the standard `fadeTranslate` variants to ensure all sections animate exactly the same way across the homepage.

### Token Suggestions
*   **Spacing Scale:** Use ample vertical padding. Sections should use `py-24` or `py-32` (`96px` to `128px`) to allow the user to breathe between steps.
*   **Typography:** Headlines (`font-display`) should use tight tracking (`tracking-tight`) and tight leading (`leading-[1.15]`). Body copy (`font-sans`) should be highly legible (`leading-[1.7]`, `text-[var(--color-text-secondary)]`).
*   **Colors:**
    *   `--color-homepage-bg`: `#FAF9F6` (Warm Off-White)
    *   `--color-text-primary`: `#1A1A1A`
    *   `--color-text-secondary`: `#4A4A4A`
    *   `--color-primary`: `#1A9B8C` (Calm Teal for primary actions)
