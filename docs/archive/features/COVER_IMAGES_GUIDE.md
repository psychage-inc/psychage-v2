# Cover Images Guide

Complete guide for adding cover images to your articles.

## Overview

Your database already has everything set up for cover images:
- **Database fields**: `hero_image_url`, `hero_image_alt`
- **Storage bucket**: `article-images` (public, already configured)
- **Table**: `article_images` (for advanced multi-image management)

## Quick Start

### Option 1: Use External URLs (Fastest)

If you already have images hosted (Unsplash, Cloudinary, your own CDN):

1. Edit `scripts/update-article-cover-images.ts`
2. Update the `COVER_IMAGES` array with your URLs:

```typescript
const COVER_IMAGES: CoverImage[] = [
  {
    articleId: 'CAT01-014',
    imageUrl: 'https://images.unsplash.com/photo-xyz...',
    altText: 'Person practicing emotional regulation'
  },
  // Add more...
];
```

3. Run:
```bash
npx tsx scripts/update-article-cover-images.ts
```

### Option 2: Upload Local Files to Supabase Storage

If you have local image files:

1. Create directory and add images:
```bash
mkdir -p assets/article-covers
# Add images named: CAT01-014.jpg, CAT01-054.png, etc.
```

2. (Optional) Customize alt text in `scripts/upload-cover-images-to-storage.ts`:
```typescript
function generateAltText(articleId: string): string {
  const altTexts: Record<string, string> = {
    'CAT01-014': 'Your custom alt text here',
    // ...
  };
  return altTexts[articleId] || `Cover image for article ${articleId}`;
}
```

3. Run:
```bash
npx tsx scripts/upload-cover-images-to-storage.ts
```

## Image Specifications

### Recommended Dimensions
- **Width**: 1200px minimum (1920px ideal for retina displays)
- **Height**: 600-800px (16:9 or 3:2 aspect ratio)
- **Format**: WebP (best), JPEG, or PNG
- **File size**: Under 300KB (optimize with tools like TinyPNG, Squoosh)

### Accessibility Requirements
- **Always provide alt text** that describes the image content
- Use descriptive, specific alt text (not generic like "cover image")
- Keep alt text under 125 characters for screen readers

### SEO Best Practices
- Use semantic file names: `emotional-regulation-strategies.webp`
- Include relevant keywords in alt text naturally
- Ensure fast loading (compress images)

## Free Image Sources

### Recommended Platforms
- **Unsplash** (unsplash.com) - High-quality, free-to-use
- **Pexels** (pexels.com) - Curated stock photos
- **Pixabay** (pixabay.com) - Large variety
- **Burst by Shopify** (burst.shopify.com) - Business-focused

### Search Tips for Mental Health Content
- "therapy session"
- "mental wellness"
- "mindfulness meditation"
- "emotional connection"
- "brain neural pathways"
- "generational family"
- "self-care wellness"

## Database Schema Reference

```sql
-- Direct fields on articles table (simpler approach)
ALTER TABLE articles ADD COLUMN hero_image_url TEXT;
ALTER TABLE articles ADD COLUMN hero_image_alt TEXT;

-- OR use article_images table (more structured)
CREATE TABLE article_images (
  id UUID PRIMARY KEY,
  article_id UUID REFERENCES articles(id),
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  width INTEGER,
  height INTEGER,
  purpose TEXT CHECK (purpose IN ('hero', 'inline', 'infographic', 'thumbnail')),
  display_order INTEGER DEFAULT 0
);
```

## Bulk Operations

### Update Multiple Articles at Once

```typescript
const images = [
  { id: 'CAT01-001', url: '...', alt: '...' },
  { id: 'CAT01-002', url: '...', alt: '...' },
  // ... add all 80 articles
];

for (const img of images) {
  await supabase
    .from('articles')
    .update({ hero_image_url: img.url, hero_image_alt: img.alt })
    .eq('article_production_id', img.id);
}
```

### Generate Placeholder Images

Use a service like:
- **Placeholder.com**: `https://via.placeholder.com/1200x600/4F46E5/ffffff?text=Article+Title`
- **Unsplash Source**: `https://source.unsplash.com/1200x600/?mental-health,wellness`

## Troubleshooting

### Images not showing in admin panel?
1. Check database: `SELECT article_production_id, hero_image_url FROM articles WHERE hero_image_url IS NOT NULL`
2. Verify URL is accessible: Open in browser
3. Check CORS if using external CDN

### Upload fails?
1. Verify Supabase credentials in `.env`
2. Check Storage bucket exists: `article-images`
3. Verify bucket is public
4. Check file size (max 50MB by default)

### Want to see images in frontend?
Update your article display component to show `hero_image_url`:

```tsx
{article.hero_image_url && (
  <img
    src={article.hero_image_url}
    alt={article.hero_image_alt || article.title}
    className="w-full h-64 object-cover rounded-lg"
  />
)}
```

## Next Steps

1. **For now**: Use external URLs (Option 1) to quickly add images
2. **Later**: Set up automated image optimization pipeline
3. **Future**: Integrate with Sanity CMS for visual asset management

## Questions?

- Check `/supabase/migrations/20260315000001_article_command_center.sql` for schema
- Storage policies in `/supabase/migrations/20260316000003_fix_article_admin_rls.sql`
- Article types defined in `src/lib/admin/types.ts`
