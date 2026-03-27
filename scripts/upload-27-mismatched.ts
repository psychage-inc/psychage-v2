#!/usr/bin/env tsx

/**
 * Upload 26 mismatched cover images from /Downloads/27/
 * - Uploads each image to the topically correct article in Supabase Storage
 * - Renames the article title in the DB to match the poster title
 * - Updates hero_image_url and hero_image_alt
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = '/Users/raiyanabdullah/Downloads/27';
const BUCKET_NAME = 'article-images';

/**
 * Corrected mapping: poster title → target article ID
 * Each image is matched to the article whose CONTENT covers the same topic.
 * The article title will be RENAMED to match the poster title.
 */
const MAPPING: Array<{ imageTitle: string; articleId: string; reason: string }> = [
  { imageTitle: 'The Name It to Tame It Technique', articleId: 'CAT01-005', reason: 'Both about naming/labelling emotions' },
  { imageTitle: 'How to Sit with Uncomfortable Feelings', articleId: 'CAT01-016', reason: 'Both about sitting with difficult feelings' },
  { imageTitle: 'The Pause Technique', articleId: 'CAT01-034', reason: 'Both about pausing before reacting' },
  { imageTitle: 'Distress Tolerance Skills', articleId: 'CAT01-020', reason: 'Both about managing uncontrollable emotions' },
  { imageTitle: 'How to Use Opposite Action', articleId: 'CAT01-050', reason: 'Opposite action = building new responses' },
  { imageTitle: 'How to Build Genuine Self-Awareness', articleId: 'CAT01-021', reason: 'Both about self-awareness' },
  { imageTitle: 'Why Self-Reflection Feels Hard', articleId: 'CAT01-030', reason: 'Self-reflection hard due to self-judgment' },
  { imageTitle: 'Recognizing Your Emotional Defaults', articleId: 'CAT01-041', reason: 'Emotional defaults = emotional habits' },
  { imageTitle: 'What Your Recurring Emotions Are Trying to Tell You', articleId: 'CAT01-042', reason: 'Recurring emotions = same reactions' },
  { imageTitle: 'The Difference Between Self-Awareness and Overthinking', articleId: 'CAT01-025', reason: 'Observer self = watching vs consumed' },
  { imageTitle: 'The Thought Record Explained', articleId: 'CAT01-024', reason: 'Thought records track thought-feeling patterns' },
  { imageTitle: 'Managing Your Emotions in High-Stakes Conversations', articleId: 'CAT01-039', reason: 'High-stakes = difficult conversations' },
  { imageTitle: 'The Link Between Emotional Intelligence and Mental Health', articleId: 'CAT01-031', reason: 'EI overview article' },
  { imageTitle: 'Developing Emotional Intelligence as an Adult', articleId: 'CAT01-035', reason: 'Adult EI = professional settings' },
  { imageTitle: 'When Emotional Intelligence Is Used Manipulatively', articleId: 'CAT01-037', reason: 'Emotional contagion = manipulation mechanism' },
  { imageTitle: 'The Negativity Bias', articleId: 'CAT01-048', reason: 'Negativity bias drives rumination' },
  { imageTitle: 'How the Prefrontal Cortex Regulates Emotion', articleId: 'CAT01-051', reason: 'Both about brain + emotions' },
  { imageTitle: 'The Vagus Nerve and Emotional Regulation', articleId: 'CAT01-054', reason: 'Same topic' },
  { imageTitle: 'Emotions in Older Adults', articleId: 'CAT01-065', reason: 'Same topic' },
  { imageTitle: 'Grief Across the Lifespan', articleId: 'CAT01-066', reason: 'Grief = major life transition' },
  { imageTitle: 'How Culture Shapes the Way You Experience Emotions', articleId: 'CAT01-036', reason: 'Culture shapes empathy/emotion expression' },
  { imageTitle: 'The Paradox of Emotional Pain', articleId: 'CAT01-043', reason: 'Avoidance paradox = running from pain makes it louder' },
  { imageTitle: 'The Role of Vulnerability in Emotional Strength', articleId: 'CAT01-074', reason: 'Vulnerability builds resilience' },
  { imageTitle: 'The Difference Between Emotional Regulation and Suppression', articleId: 'CAT01-079', reason: 'Regulation vs suppression = mastery vs control' },
  { imageTitle: 'Finding Meaning in Difficult Emotions', articleId: 'CAT01-071', reason: 'Finding meaning = emotional agility' },
  { imageTitle: 'How Acceptance Changes Your Relationship With Emotions', articleId: 'CAT01-078', reason: 'Both about radical acceptance' },
];

function loadEnvVars() {
  const envPath = join(__dirname, '../.env');
  const envFile = readFileSync(envPath, 'utf-8');
  const lines = envFile.split('\n');
  const vars: Record<string, string> = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) vars[key] = valueParts.join('=');
    }
  }
  return vars;
}

const env = loadEnvVars();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

function extractTitleFromFilename(filename: string): string {
  const withoutExt = filename.replace(/\.jpeg$/i, '');
  const parts = withoutExt.split('—').map(p => p.trim());
  return parts.length >= 2 ? parts[1] : withoutExt;
}

// Build a lookup from imageTitle → mapping entry
const mappingByTitle = new Map(MAPPING.map(m => [m.imageTitle, m]));

async function main() {
  console.log('Uploading 26 images + renaming article titles to match posters\n');

  // 1. Fetch all Category 1 articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, article_production_id, title, slug')
    .like('article_production_id', 'CAT01-%')
    .order('article_production_id');

  if (error || !articles) {
    console.error('Failed to fetch articles:', error);
    return;
  }

  const articleMap = new Map(articles.map(a => [a.article_production_id, a]));
  console.log(`Loaded ${articles.length} articles\n`);

  // 2. Read image files
  const imageFiles = readdirSync(IMAGES_DIR).filter(f => /\.jpeg$/i.test(f)).sort();
  console.log(`Found ${imageFiles.length} images\n`);
  console.log('='.repeat(100));

  let successCount = 0;
  let failCount = 0;

  for (const filename of imageFiles) {
    const imageTitle = extractTitleFromFilename(filename);
    const mapping = mappingByTitle.get(imageTitle);

    if (!mapping) {
      console.log(`  SKIP: "${imageTitle}" — no mapping\n`);
      failCount++;
      continue;
    }

    const article = articleMap.get(mapping.articleId);
    if (!article) {
      console.log(`  ERROR: ${mapping.articleId} not in DB\n`);
      failCount++;
      continue;
    }

    const storagePath = `covers/${mapping.articleId}.jpeg`;
    const imagePath = join(IMAGES_DIR, filename);

    console.log(`  ${mapping.articleId} [${mapping.reason}]`);
    console.log(`    Old title: "${article.title}"`);
    console.log(`    New title: "${imageTitle}"`);

    try {
      // Upload image to storage
      const fileBuffer = readFileSync(imagePath);
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        console.log(`    UPLOAD FAILED: ${uploadError.message}\n`);
        failCount++;
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);

      // Update DB: image URL + rename title
      const { error: updateError } = await supabase
        .from('articles')
        .update({
          title: imageTitle,
          hero_image_url: publicUrl,
          hero_image_alt: `Cover image for ${imageTitle}`,
          updated_at: new Date().toISOString(),
        })
        .eq('article_production_id', mapping.articleId);

      if (updateError) {
        console.log(`    DB FAILED: ${updateError.message}\n`);
        failCount++;
        continue;
      }

      console.log(`    OK -> ${publicUrl}\n`);
      successCount++;
    } catch (err) {
      console.error(`    ERROR: ${err}\n`);
      failCount++;
    }
  }

  console.log('='.repeat(100));
  console.log(`\nDONE: ${successCount} uploaded + renamed, ${failCount} failed`);
  console.log('='.repeat(100));
}

main();
