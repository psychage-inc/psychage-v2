# Project: Psychage Web

This document provides a comprehensive overview of the Psychage web application, its architecture, and development practices.

## Project Overview

Psychage Web is a modern, responsive, and feature-rich web application built with React, Vite, TypeScript, and Tailwind CSS. It serves as the front-end for the Psychage platform, an AI-powered mental wellness platform.

The application is designed to be a "one-stop-shop" for mental wellness, providing users with a variety of tools, resources, and support. It includes features such as:

-   A "Learn" section with articles and videos on various mental health topics.
-   A "Tools" section with a variety of interactive tools, including a mood journal, sleep architect, and a "Clarity Score" assessment.
-   A "MindMate" AI chatbot that can provide users with support and guidance.
-   A provider directory to help users find mental health professionals.
-   User and provider dashboards for managing accounts and accessing features.

## Architecture

The application is built on a modern front-end stack, with a focus on performance, scalability, and developer experience.

-   **Framework:** React
-   **Build Tool:** Vite
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Routing:** React Router
-   **Data Fetching:** TanStack Query
-   **State Management:** React Context and TanStack Query
-   **Testing:** Vitest and Playwright

The application is architected to be a single-page application (SPA), with a separate admin panel. It uses a variety of modern development practices, including:

-   **Code Splitting:** Lazy loading of routes and components to improve initial load times.
-   **Component-Based Architecture:** The UI is built using a library of reusable React components.
-   **Type Safety:** TypeScript is used throughout the application to ensure type safety and improve developer productivity.
-   **Atomic Design:** The application follows the principles of atomic design, with a clear separation of concerns between components.

## Building and Running

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm (v8 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/psychage/psychage-web.git
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running the Application

1.  Create a `.env` file and add the required environment variables. You can use `.env.example` as a template.
2.  Run the development server:
    ```bash
    pnpm dev
    ```
3.  Open your browser and navigate to `http://localhost:5173`.

### Testing

The application has a comprehensive suite of tests, including unit, integration, and end-to-end tests.

-   Run all tests:
    ```bash
    pnpm test
    ```
-   Run tests in watch mode:
    ```bash
    pnpm test:watch
    ```
-   Run end-to-end tests:
    ```bash
    pnpm test:e2e
    ```

## Development Conventions

The application follows a set of development conventions to ensure code quality and consistency.

-   **Linting:** ESLint is used to enforce a consistent coding style.
-   **Formatting:** Prettier is used to automatically format code.
--   **Commits:** The application follows the Conventional Commits specification for commit messages.
-   **Branching:** The application uses a GitFlow-style branching model.
-   **Testing:** All new features and bug fixes should be accompanied by tests.
-   **Documentation:** All new components and features should be documented in the Storybook.

## Design Philosophy: The Clay Figures

The following is a guide to the design philosophy behind the clay figures used throughout the Psychage platform. It is essential that all developers and designers understand and adhere to these principles to maintain the integrity of the brand and the emotional safety of our users.

### The figures are mirrors, not pictures.
When someone lands on Psychage, they are in some form of emotional state — confused, scared, curious, worried about someone they love, or just quietly wondering if what they feel is normal. A photograph would show them someone else's face. An illustration would show them someone else's interpretation. The faceless clay figure shows them themselves.
The absence of a face is the most important design decision on the entire homepage. It is not a limitation. It is the mechanism by which the page becomes personal. A figure with its hand on its chest is not "a person touching their chest." It is the visitor touching their own chest. A figure in self-embrace is not "someone hugging themselves." It is the visitor holding themselves. The facelessness creates a space where the visitor's own identity fills in what's missing. Every person who looks at these figures sees themselves.
This means the figures must never be treated as decorative. Every figure on the homepage should be placed because its posture communicates something specific to the visitor at that moment in their scroll. The Listener in the hero is there because the very first thing the page says is "we see that you're trying to understand yourself." The Supporter is there because some visitors are here for someone else. The Resting figure in the breathing pause is there because after processing the hero, the visitor needs permission to pause. The Open figure at the end is there because the last feeling the visitor takes with them should be "this place is available to me whenever I'm ready."
If you place a figure somewhere just because the space needs a visual, you've broken the system. Every figure earns its place by doing emotional work.

### Posture is the only language.
Without faces, the figures communicate entirely through the body — the angle of a spine, the openness of a hand, the tilt of a head, whether the weight is forward or settled. This is a more universal language than facial expression. A smile means different things in different cultures. A furrowed brow is ambiguous. But a body curled in on itself means the same thing everywhere on earth. A hand placed gently on someone's back means the same thing in every language.
On the homepage, this means the figures should be chosen and positioned to create a postural narrative — a story told through bodies as the visitor scrolls. The hero shows multiple postures simultaneously (listening, supporting, seeking, resting, rising) because the visitor doesn't know which one they are yet. As the page unfolds, the postures become more specific. The Navigator section shows turning inward. The closing shows openness and availability. The visitor doesn't read this narrative consciously. They feel it. The page moves from "many possible states" to "turning inward" to "here when you're ready" — and the body language of the figures is what carries that arc.

### The symbolic objects are the figures' inner world made visible.
In the article cover system, every figure interacts with symbolic objects — a thin amber thread extending from the chest, floating geometric forms representing health domains, seed-like shapes representing potential. These objects are how the clay system makes invisible experiences visible. Anxiety isn't something you can photograph. But a constellation of gentle forms floating around a figure, some close and some far — that's what anxiety feels like from the inside.
On the homepage, the Category B objects serve a different but related purpose. They are fragments of that inner world, scattered through the whitespace of the page. A small sphere cluster near the hero. A thin arc between sections. A floating disc in the margin. They are not attached to any figure. They exist in the space of the page itself — as if the visitor has walked into a room where the inner world is externalized. The clay world is not confined to the images. It leaks into the page.
This is what transforms the homepage from "a page with some clay illustrations" into "an environment built from the clay figure world." The distinction is critical. Illustrations sit on a page. An environment surrounds you. The symbolic objects, at 30-80px and 15-40% opacity, are too small and too faint to consciously study. But they register. They make the page feel inhabited. Alive in a way that is quiet rather than animated. Like walking into a room where someone has arranged things with care — you feel the care before you identify any specific object.
The rule for placing them: they go in the spaces where the page breathes. Between sections. In the margins of columns. Near figures but not touching them. They should never overlap text, never interfere with CTAs, never compete with content. They are the background hum of the visual system. If you notice them, they're too prominent. If you remove them and the page suddenly feels sterile, they were doing their job.

### Light backgrounds, not dark.
The article covers use dark backgrounds because they are editorial objects — small, contained, viewed in context alongside other content. The dark backgrounds make the white figures pop and create the visual identity that makes the article library feel curated.
The homepage is a different context. It is the entry point. The first breath. The article covers are paintings in a gallery. The homepage is the gallery itself — the space you walk through. And that space needs to be light, open, and airy. Dark walls in a gallery can work. A dark foyer tells you "this is serious and exclusive." A light foyer tells you "come in, there's room for you."
The clay figures work on light backgrounds because they are sculptural. Think of a museum with white walls and soft natural lighting — the white clay figures in that space are the sculptures. The warm off-white of the page background is the museum wall. The gentle shadows beneath each figure ground them. The soft upper-left lighting gives them dimension. They don't need a dark background to be visible. They need space.
This means the homepage has a visual rhythm: the page is light and warm, the article cover cards in the Content World section are dark (their category-specific backgrounds), and then the page returns to light. That contrast is intentional. The dark article cards are windows into the content world — portals into the deeper editorial identity. The light page is the space between those windows. The visitor moves through light, encounters darkness (the articles), and returns to light. That rhythm mirrors the emotional experience: you start in openness, you encounter something real and specific (the content), and you return to openness with new understanding.

### The composition in the hero is a sculpture garden, not a photograph.
Most hero images are single photographs or illustrations. The Psychage hero is a CSS composition of multiple individually-rendered figures. This is unusual and it's worth understanding why.
A single composed image is static. It has one viewing angle, one scale relationship, one fixed arrangement. A CSS composition of individual figures can respond to the viewport. On desktop, five figures create a rich, layered scene with depth and parallax. On tablet, three figures maintain the emotional message with less complexity. On mobile, two figures deliver the core feeling without clutter. The composition adapts not by cropping a big image, but by thoughtfully reducing the scene to its essential elements.
This also means the figures exist at different z-levels and scales. The closest figure is the largest and sharpest. Figures further back are smaller, and can be slightly reduced in opacity to create atmospheric depth — the way objects in real space become softer with distance. The symbolic objects float between the figures at even smaller scales. The result is not flat. It has spatial depth. It feels like looking into a space rather than looking at a picture.
The arrangement should be organic, not geometric. Real people in a shared space don't stand in a grid. They cluster, they leave gaps, they orient differently. The figures in the hero should feel like they arrived at different times and settled into their own positions. The spacing is uneven. Some figures are close together (the supporter pair). Some are isolated (the resting figure). The asymmetry is what makes it feel human.

### Scale communicates importance and intimacy.
The figures appear at different scales throughout the page. In the hero, the primary figure (The Listener) is the largest — maybe 250-300px tall. In the breathing pause, the single figure is tiny — maybe 60-80px. In the closing, the figure is medium — maybe 100-120px.
These scale choices are not arbitrary. A large figure commands attention and creates a sense of presence. A tiny figure in vast space communicates humility and gentleness. A medium figure at the end communicates steady, approachable availability.
The symbolic objects are always the smallest elements — 30-80px. They are the fine detail. The grain of the wood. You notice them last, if at all, but they contribute to the overall texture that makes the page feel rich rather than sparse.
The scale hierarchy across the page should feel like a breathing pattern: big (hero figures) → tiny (breathing pause) → medium (navigator scene) → small-to-medium (article cards, which are the existing covers) → medium (closing figure). In → out → in → out → in. The page expands and contracts.

### Animation must match the clay's material truth.
Clay is solid, still, and grounded. It does not bounce, stretch, pop, or spring. Animations on the clay figures must respect the material they represent. A figure can fade in (emerging from stillness). A figure can slide gently into position (arriving in a space). A figure cannot bounce (clay doesn't bounce), scale up with a spring effect (clay doesn't grow), or rotate dramatically (clay doesn't spin).
The symbolic objects have slightly more freedom — they can drift, float gently, and oscillate slowly — because their positioning in the page suggests suspension in space. But even their animation should feel like objects in still water, not objects in a physics simulation. Slow. Gentle. Barely perceptible.
The single most important animation rule: if someone with anxiety is watching this page load, every animation should make them feel calmer, not more stimulated. If an animation creates even a tiny spike of "whoa that moved fast," it's wrong for this page. The motion language of the homepage should match the pace of someone taking a deep breath: inhale (fade in), pause (settle), exhale (rest). Repeat.

### The figures create a brand moat that no competitor can copy.
Headspace has its animated blob character. Calm has nature photography. BetterHelp has stock photos of people on laptops. These are aesthetic choices that any competitor can replicate.
The Psychage clay figure system is a 2,000-image production pipeline with a 10-section prompt architecture, 30 category-specific color palettes, and a set of absolute rules that produce visual coherence at a scale no other mental health platform has attempted. When the homepage displays the same visual language as the article covers, which match the social media templates, which match the email headers, which match the tool interfaces — the accumulated effect is a brand identity so consistent and so distinctive that it becomes unmistakable.
A visitor who has seen one Psychage article cover will recognize the homepage. A visitor who has seen the homepage will recognize a Psychage post in a Facebook feed. A visitor who has seen the Facebook post will recognize a Psychage email. The clay figures are not just a homepage design. They are the visual thread that stitches every touchpoint into a single, recognizable identity.
On the homepage specifically, this means the figures should be used generously but thoughtfully. Not one hero image and done. Not four decorative placements. The figures should be woven through every section, at every scale, in every transition — creating the unmistakable feeling that you have entered the Psychage world. When the visitor leaves, they should be able to close their eyes and see the white clay figures in warm light. That image should stay with them. That is the brand.
