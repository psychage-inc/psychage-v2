# Psychage V2 Design System

This document outlines the design principles, tokens, and components that make up the Psychage V2 user interface.

## Core Principles

1. **Calm & Trustworthy**: Colors and interactions should be soothing, safe, and professional.
2. **Adaptive**: The interface adapts to user preferences (Dark Mode, Reduced Motion).
3. **Content-First**: Typography and spacing frame the content, making it readable and accessible.
4. **Premium Feel**: Subtle animations, glassmorphism, and depth create a high-quality experience.

## Design Tokens

### Colors

Defined in `src/styles/tokens.css`.

| Token | Variable | Role |
| :--- | :--- | :--- |
| **Primary** | `--color-primary` | Main brand color (Teal/Ecru) |
| **Background** | `--color-background` | Page background |
| **Surface** | `--color-surface` | Card and container background |
| **Surface Hover** | `--color-surface-hover` | Interactive element hover state |
| **Surface Active** | `--color-surface-active` | Interactive element pressed state |
| **Text Primary** | `--color-text-primary` | High contrast text |
| **Text Secondary** | `--color-text-secondary` | Medium contrast text |
| **Text Tertiary** | `--color-text-tertiary` | Low contrast / placeholder text |
| **Border** | `--color-border` | Subtle dividers and borders |
| **Success** | `--color-success` | Positive feedback (Green) |
| **Error** | `--color-error` | Negative feedback (Red) |
| **Warning** | `--color-warning` | Cautionary feedback (Yellow) |

### Typography

- **Display Font**: `Outfit` (Headings)
- **Body Font**: `Inter` (UI text, readability)

### Spacing & Radius

- **Base Unit**: `4px`
- **Radius**: `var(--radius-md) = 8px`, `var(--radius-lg) = 12px`, `var(--radius-xl) = 16px`

## Components

### Button

Reusable button component supporting variants and states.

\`\`\`tsx
import Button from '@/components/ui/Button';

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Ghost Action</Button>
<Button variant="outline">Outline Action</Button>
\`\`\`

### Card

Container component with built-in depth and glassmorphism support.

\`\`\`tsx
import { Card } from '@/components/ui/Card';

<Card>Standard Card</Card>
<Card variant="glass" hoverEffect>Glass Card with Hover</Card>
\`\`\`

### Modal

Dialog component for focused tasks.

\`\`\`tsx
import Modal from '@/components/ui/Modal';

<Modal isOpen={isOpen} onClose={close} title="Dialog Title">
  <p>Modal content goes here.</p>
</Modal>
\`\`\`

### Toast

Feedback system for transient messages.

\`\`\`tsx
import { useToast } from '@/context/ToastContext';

const { success, error } = useToast();
success('Operation successful');
\`\`\`

## Visual Effects

### Glassmorphism

Use the `.glass` utility class or `Card variant="glass"` to apply the frosted glass effect.

### Backgrounds

- **GrainOverlay**: Subtle noise texture (`src/components/ui/GrainOverlay.tsx`).
- **GradientMesh**: Animated ambient background blobs (`src/components/ui/GradientMesh.tsx`).

### Motion

- **Page Transitions**: Standard `framer-motion` page variants.
- **Reduced Motion**: Respects user system preferences via `useReducedMotion` hook.
