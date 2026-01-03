# Backend Integration Context

> **Purpose**: This document provides all the context needed for backend developers to build APIs that integrate with the Psychage frontend.

---

## 🏗️ Project Overview

**Psychage** is a mental health education and wellness platform featuring:

- Educational articles and videos
- Provider directory for finding therapists
- Interactive wellness tools (mood journal, sleep tracker)
- AI-powered symptom checker
- Clarity Score assessment

**Tech Stack**: React 18 + TypeScript + Vite + TailwindCSS + Framer Motion

---

## 📊 Data Models

All TypeScript interfaces are defined in `src/types/models.ts`.

### Provider

```typescript
interface Provider {
  id: number;
  name: string;
  role: string;                    // e.g., "Psychiatrist", "Therapist"
  image: string;                   // URL to profile image
  rating: number;                  // 1-5 scale
  reviews: number;                 // Count of reviews
  specialties: string[];           // e.g., ["Anxiety", "Depression"]
  location: string;
  availability: string;            // e.g., "Available Today"
  insurance: string[];             // Accepted insurance providers
  verified: boolean;
  bio: string;
  education: string[];
  languages: string[];
  approach: string;                // Therapeutic approach description
  yearsExperience: number;
  reviewsList: Review[];
  nextAvailable?: string;          // e.g., "Tomorrow at 2pm"
  isVideoVisit?: boolean;
}

interface Review {
  id: string;
  user: string;
  date: string;                    // ISO date string
  rating: number;
  comment: string;
}
```

### Article

```typescript
interface Article {
  id: number | string;
  slug: string;                    // URL-friendly identifier
  title: string;
  description: string;
  image: string;
  category: Category;
  readTime: number;                // Minutes
  author: Author;
  publishedAt: string;             // ISO date
  updatedAt?: string;
  reviewedBy?: Author;             // Medical reviewer
  tags: string[];
  content: ReactNode;              // Note: Currently JSX, needs markdown/HTML for API
  citations?: Citation[];
  relatedArticles?: string[];      // Slugs of related articles
  featured?: boolean;
}

interface Author {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface Citation {
  id: string;
  text: string;
  link?: string;
  source: string;
  year?: string;
}
```

### Category

```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: ReactNode;                // Note: Needs icon name for API
  color?: string;                  // e.g., "bg-blue-500" or hex
  image?: string;
  subTopics?: string[];
  group?: 'condition' | 'wellness' | 'life' | 'therapy' | 'identity' | 'family';
}
```

### Video

```typescript
interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: number;                // Seconds
  views: number;
  category: string;
}
```

### Tool

```typescript
interface Tool {
  id: number;
  name: string;
  description: string;
  iconName: string;                // Lucide icon name
  category: string;
  color: 'teal' | 'amber' | 'indigo' | 'sky' | 'rose' | 'red';
  features: string[];
}
```

### Question (for assessments)

```typescript
interface Question {
  id: number;
  text: string;
  dimension: 'anxiety' | 'mood' | 'stress' | 'sleep';
  options: {
    text: string;
    value: number;
  }[];
}
```

---

## 🔌 Required API Endpoints

Based on current service patterns in `src/services/`, these APIs are needed:

### Articles API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | List all articles |
| GET | `/api/articles/:id` | Get article by ID |
| GET | `/api/articles/slug/:slug` | Get article by slug |
| GET | `/api/articles?category=:slug` | Filter by category |
| GET | `/api/articles?featured=true` | Get featured articles |

### Providers API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/providers` | List all providers |
| GET | `/api/providers/:id` | Get provider by ID |
| GET | `/api/providers?specialty=:name` | Filter by specialty |
| GET | `/api/providers?location=:city` | Filter by location |

### Categories API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:slug` | Get category by slug |

### Videos API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/videos` | List all videos |
| GET | `/api/videos/:id` | Get video by ID |
| GET | `/api/videos?category=:name` | Filter by category |

### Tools API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tools` | List all tools |
| GET | `/api/tools/:id` | Get tool by ID |

### Symptom Checker API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/symptoms/check` | Submit symptoms for analysis |

**Request Body:**

```json
{
  "symptomIds": ["anxiety-1", "sleep-issues", "fatigue"]
}
```

**Response:**

```json
{
  "conditions": [
    {
      "id": "anxiety",
      "name": "Generalized Anxiety Disorder",
      "matchRate": 85,
      "description": "...",
      "recommendedAction": "...",
      "articleId": 1
    }
  ],
  "isCrisis": false
}
```

### Assessment API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assessments/:type/questions` | Get assessment questions |
| POST | `/api/assessments/:type/submit` | Submit assessment answers |

---

## 🛣️ Frontend Routes

The frontend expects these routes:

```
/                           # Home page
/learn                      # Articles listing
/learn/:categorySlug        # Articles by category
/learn/article/:id          # Single article
/watch/:id                  # Video player
/find-care                  # Provider directory
/find-care/provider/:id     # Provider profile
/tools                      # Tools listing
/tools/mood-journal         # Mood journal tool
/tools/sleep-architect      # Sleep tracker tool
/category/:category         # Category page
/search                     # Search results
/clarity-score              # Clarity assessment
/about                      # About page
/contact                    # Contact page
/legal/privacy              # Privacy policy
/legal/terms                # Terms of service
```

---

## 🔐 Authentication (Future)

The project has placeholder auth structure at `src/pages/auth/`:

- Login page
- Registration page
- Password reset

**Contexts available:**

- `BookmarkContext` - For saving articles/providers
- `ThemeContext` - Light/dark mode
- `ToastContext` - Notifications

---

## 📁 Key Directories

```
src/
├── components/          # UI components (78 files)
│   ├── home/           # Homepage sections
│   ├── layout/         # Navigation, Footer
│   ├── ui/             # Reusable UI elements
│   └── ...
├── data/               # Mock data (to be replaced)
├── services/           # API service layer (modify these)
├── pages/              # Page components
├── context/            # React contexts
├── types/              # TypeScript definitions
└── hooks/              # Custom hooks
```

---

## ⚠️ Important Notes

1. **Article Content**: Currently stored as React JSX. For backend, use Markdown or sanitized HTML.

2. **Icons**: Components use Lucide React icons. Store icon names (e.g., "Heart", "Brain") in DB, render on frontend.

3. **Images**: All image URLs are placeholders. Implement proper image storage/CDN.

4. **Crisis Detection**: The symptom checker has crisis detection. Ensure backend flags these for immediate resources.

5. **Environment Variables**: See `.env.example`:
   - `GEMINI_API_KEY` - For AI chat features

---

## 🚀 Quick Start for Backend Dev

1. Review the TypeScript models in `src/types/models.ts`
2. Look at mock data patterns in `src/data/`
3. Modify service files in `src/services/` to call your API
4. Update `.env` with your API base URL

**Current mock service pattern:**

```typescript
// src/services/articleService.ts
export const articleService = {
  getAll: async (): Promise<Article[]> => {
    // Replace with: const res = await fetch('/api/articles');
    // return res.json();
    return mockArticles;
  }
};
```
