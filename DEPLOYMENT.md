# Psychage Frontend Deployment Guide

## Prerequisites

- Node.js 18+ and npm
- Backend server ready to serve static files

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
GEMINI_API_KEY=your_actual_api_key
```

### 3. Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### 4. Preview Locally (Optional)

```bash
npm run preview
```

Access <http://localhost:4173> to verify the build.

---

## Integrating with Backend

### Option A: Copy dist folder to backend

```bash
# Copy the entire dist folder to your backend's static directory
cp -r dist/* /path/to/backend/public/
```

### Option B: Configure backend to serve dist

Point your backend's static file serving to the `dist/` directory.

**Express.js example:**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

---

## Build Output Structure

```
dist/
├── index.html          # Main HTML entry point
├── favicon.svg         # Site favicon
├── assets/             # JS, CSS bundles (hashed filenames)
│   ├── index-[hash].js
│   └── index-[hash].css
└── images/             # Static images
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | API key for Gemini AI features |

---

## Troubleshooting

### Blank page after deployment

- Ensure your server is configured to handle SPA routing (serve `index.html` for all routes)
- Check browser console for errors

### Assets not loading

- Verify the `base` path in `vite.config.ts` matches your deployment URL
- Check that all files from `dist/` were copied correctly

### API not working

- Confirm `GEMINI_API_KEY` is set in the build environment
- Check CORS settings if API is on a different domain
