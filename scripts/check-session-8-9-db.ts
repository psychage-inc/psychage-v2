#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

for (const line of envContent.split('\n')) {
  const match = line.match(/^([A-Z_]+)=(.+)$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
}

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const targetArticles = [
    'CAT01-036', 'CAT01-037', 'CAT01-038', 'CAT01-039', 'CAT01-040', // Session 8
    'CAT01-041', 'CAT01-042', 'CAT01-043', 'CAT01-044', 'CAT01-045'  // Session 9
  ];

  console.log('\n🔍 Checking Session 8 & 9 Articles in Database...\n');

  for (const id of targetArticles) {
    const { data, error } = await supabase
      .from('articles')
      .select('article_production_id, title, word_count, content_format, content')
      .eq('article_production_id', id)
      .single();

    if (error || !data) {
      console.log(`❌ ${id}: NOT FOUND`);
      continue;
    }

    const contentLength = data.content?.length || 0;
    const wordCount = data.word_count || 0;
    const hasContent = contentLength > 0;
    const isRewritten = wordCount >= 1500;

    console.log(`${isRewritten ? '✅' : '⚠️ '} ${id}: ${wordCount} words (${isRewritten ? 'REWRITTEN' : 'ORIGINAL'})`);
  }
}

main();
