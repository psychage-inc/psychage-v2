# Troubleshooting: Images Not Showing

## ✅ Verified Working

The diagnostic scripts confirm:
- ✅ All 80 articles have cover images uploaded to Supabase Storage
- ✅ Image URLs are accessible (HTTP 200 OK, CORS enabled)
- ✅ Database has `hero_image_url` field populated
- ✅ Code mapping (`hero_image_url` → `image`) is correct
- ✅ Articles are published and have correct category

## 🔧 Fix Steps

### 1. **Restart Dev Server** (MOST IMPORTANT)

The code changes to `articleService.ts` require a restart:

```bash
# In your terminal, stop the dev server
Ctrl + C

# Start it again
npm run dev
```

### 2. **Clear Browser Cache**

After restarting, hard refresh your browser:

- **Chrome/Edge**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- **Firefox**: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
- **Safari**: `Cmd + Option + R`

### 3. **Check Browser Console**

Open DevTools (F12) and check Console tab for errors:

```javascript
// You should see articles being fetched
// No errors about CORS or 404s
```

### 4. **Check Network Tab**

1. Open DevTools (F12) → Network tab
2. Filter by "Img"
3. Refresh the page
4. You should see requests to:
   ```
   https://ozourhqyqtpppvpbhphw.supabase.co/storage/v1/object/public/article-images/covers/CAT01-001.jpeg
   ```

5. Click on any image request - should show:
   - **Status**: 200 OK ✅
   - **Type**: jpeg ✅
   - **Size**: ~400-500 KB ✅

### 5. **Verify Article Data in Browser**

Open browser console and run:

```javascript
// Fetch an article
fetch('http://localhost:5173/api/articles')
  .then(r => r.json())
  .then(data => {
    console.log('First article:', data[0]);
    console.log('Has image?', !!data[0]?.image);
    console.log('Image URL:', data[0]?.image);
  });
```

You should see:
```json
{
  "image": "https://ozourhqyqtpppvpbhphw.supabase.co/storage/...",
  "title": "What Are Emotions, Really?...",
  ...
}
```

## 🐛 Still Not Working?

### Test Direct Image Access

Open these URLs directly in browser - they should show images:

1. https://ozourhqyqtpppvpbhphw.supabase.co/storage/v1/object/public/article-images/covers/CAT01-001.jpeg
2. https://ozourhqyqtpppvpbhphw.supabase.co/storage/v1/object/public/article-images/covers/CAT01-002.jpeg
3. https://ozourhqyqtpppvpbhphw.supabase.co/storage/v1/object/public/article-images/covers/CAT01-003.jpeg

If these work, the issue is in the frontend code.

### Check for Content Security Policy

If you see CSP errors in console, add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               img-src 'self' data: https://ozourhqyqtpppvpbhphw.supabase.co;
               ...">
```

### Check articleService.ts Changes Are Applied

Verify the mapping in `src/services/articleService.ts`:

```typescript
// Line 73-74 should look like this:
description: data.description || data.seo_description || '',
image: data.image || data.hero_image_url || '',
```

If not, the git changes might not be applied. Run:

```bash
git status
git diff src/services/articleService.ts
```

### Nuclear Option: Clear Everything

```bash
# Stop dev server
Ctrl + C

# Clear all caches
rm -rf node_modules/.vite
rm -rf dist

# Reinstall and restart
npm install
npm run dev
```

## 📊 Expected Behavior

After following steps 1-2:

1. **Homepage** (`/`): Should show featured articles with cover images
2. **Learn Page** (`/learn`): Should show article grid with cover images
3. **Category Page** (`/learn/emotional-regulation`): Should show 80 Category 1 articles with cover images
4. **Article Page** (`/learn/emotional-regulation/[slug]`): Should show hero image at top

## ✅ Success Indicators

- [ ] Images load on article cards
- [ ] No broken image icons (📷❌)
- [ ] No 404 errors in Network tab
- [ ] No CORS errors in Console
- [ ] Image URLs start with `https://ozourhqyqtpppvpbhphw.supabase.co/storage/...`

## 🆘 If Still Broken

Run diagnostic scripts:

```bash
# Test database data
npx tsx scripts/test-cat1-articles.ts

# Test image URLs
npx tsx scripts/check-image-urls.ts

# Test frontend fetch
npx tsx scripts/test-article-fetch.ts
```

All should show ✅ green checkmarks.

If everything shows ✅ but images still don't appear in browser, share:
1. Browser console screenshot
2. Network tab screenshot
3. Output of diagnostic scripts
