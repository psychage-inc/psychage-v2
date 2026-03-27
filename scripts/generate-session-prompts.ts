#!/usr/bin/env tsx

/**
 * SESSION PROMPT GENERATOR
 * Converts rewrite-plan.json into copy-paste ready session prompts (5 articles each)
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read .env
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

const ARTICLES_PER_SESSION = 5;

interface RewritePlan {
  metadata: {
    totalArticles: number;
    batchSize: number;
    batchCount: number;
  };
  batches: Array<{
    batchId: number;
    articles: Array<{
      articleId: string;
      title: string;
      category: string;
      originalWordCount: number;
      targetWordCount: number;
      gapSummary: string[];
      proposedStructure: string[];
      mandatoryAdditions: string[];
      expansionInstructions: string[];
    }>;
  }>;
}

async function main() {
  console.log('\n' + '='.repeat(120));
  console.log('SESSION PROMPT GENERATOR — Creating Copy-Paste Ready Prompts');
  console.log('='.repeat(120));
  console.log();

  // Read rewrite plan
  const planPath = path.join(process.cwd(), 'rewrite-plan.json');
  if (!fs.existsSync(planPath)) {
    console.error('❌ rewrite-plan.json not found. Run generate-rewrite-plan.ts first.');
    return;
  }

  const plan: RewritePlan = JSON.parse(fs.readFileSync(planPath, 'utf-8'));

  // Flatten all articles from all batches
  const allArticles = plan.batches.flatMap(b => b.articles);
  console.log(`📊 Total articles to rewrite: ${allArticles.length}`);

  // Create sessions of 5 articles
  const sessions: Array<Array<typeof allArticles[0]>> = [];
  for (let i = 0; i < allArticles.length; i += ARTICLES_PER_SESSION) {
    sessions.push(allArticles.slice(i, i + ARTICLES_PER_SESSION));
  }

  console.log(`📦 Creating ${sessions.length} sessions (${ARTICLES_PER_SESSION} articles each)`);
  console.log();

  // Create output directory
  const outputDir = path.join(process.cwd(), 'session-prompts');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Fetch all article content in bulk
  console.log('🔄 Fetching article content from database...');
  const articleIds = allArticles.map(a => a.articleId);
  const { data: dbArticles, error } = await supabase
    .from('articles')
    .select('article_production_id, title, content')
    .in('article_production_id', articleIds);

  if (error || !dbArticles) {
    console.error('❌ Error fetching articles:', error);
    return;
  }

  // Create lookup map
  const contentMap = new Map(
    dbArticles.map(a => [a.article_production_id, a.content])
  );

  console.log(`✅ Fetched content for ${dbArticles.length} articles`);
  console.log();
  console.log('📝 Generating session prompt files...');
  console.log();

  // Generate prompts for each session
  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i];
    const sessionNum = i + 1;
    const sessionId = `session-${String(sessionNum).padStart(3, '0')}`;

    let prompt = '';
    prompt += `# ARTICLE REWRITE SESSION ${sessionNum}\n\n`;
    prompt += `You are rewriting ${session.length} mental health articles to meet quality standards.\n\n`;
    prompt += `## CRITICAL REQUIREMENTS\n`;
    prompt += `- Target: 1600-1800 words per article\n`;
    prompt += `- Format: HTML with Tailwind CSS classes (match existing format exactly)\n`;
    prompt += `- Preserve original titles EXACTLY (no changes)\n`;
    prompt += `- Add practical exercises section (MANDATORY - 2-3 step-by-step exercises)\n`;
    prompt += `- Include 3-5 concrete real-world examples\n`;
    prompt += `- Maintain 7+ research citations (weave naturally into text)\n`;
    prompt += `- Readability: ≤8th grade level (clear, accessible language)\n`;
    prompt += `- Tone: Professional, empathetic, evidence-based\n\n`;
    prompt += `## IMPORTANT NOTES\n`;
    prompt += `- Add DEPTH, not fluff\n`;
    prompt += `- Focus on practical value and actionable insights\n`;
    prompt += `- Preserve all existing Tailwind CSS class names\n`;
    prompt += `- Keep HTML structure semantically correct\n`;
    prompt += `- Do NOT add images or charts (text and HTML only)\n\n`;
    prompt += `═════════════════════════════════════════════════════════════════════════\n\n`;

    // Add each article
    for (let j = 0; j < session.length; j++) {
      const article = session[j];
      const articleNum = j + 1;
      const content = contentMap.get(article.articleId) || '<p>Content not found</p>';

      prompt += `## ARTICLE ${articleNum}/${session.length}: ${article.articleId}\n\n`;
      prompt += `**Title:** ${article.title}\n\n`;
      prompt += `**Current:** ${article.originalWordCount} words → **Target:** ${article.targetWordCount} words\n\n`;

      prompt += `**Identified Gaps:**\n`;
      for (const gap of article.gapSummary) {
        prompt += `- ${gap}\n`;
      }
      prompt += `\n`;

      prompt += `**Proposed Structure:**\n`;
      for (const section of article.proposedStructure) {
        prompt += `- ${section}\n`;
      }
      prompt += `\n`;

      prompt += `**Mandatory Additions:**\n`;
      for (const addition of article.mandatoryAdditions) {
        prompt += `- ${addition}\n`;
      }
      prompt += `\n`;

      prompt += `**Current Article Content (HTML):**\n`;
      prompt += `\`\`\`html\n`;
      prompt += content;
      prompt += `\n\`\`\`\n\n`;

      if (j < session.length - 1) {
        prompt += `─────────────────────────────────────────────────────────────────────────\n\n`;
      }
    }

    prompt += `═════════════════════════════════════════════════════════════════════════\n\n`;
    prompt += `## OUTPUT FORMAT\n\n`;
    prompt += `For each article, output the complete rewritten HTML.\n\n`;
    prompt += `Use these exact markers:\n\n`;
    prompt += `\`\`\`html\n`;
    prompt += `<!-- ARTICLE: ${session[0].articleId} -->\n`;
    prompt += `<div>\n`;
    prompt += `  <!-- Your rewritten content here -->\n`;
    prompt += `</div>\n`;
    prompt += `<!-- END ARTICLE: ${session[0].articleId} -->\n`;
    prompt += `\`\`\`\n\n`;
    prompt += `**Output all ${session.length} articles in one response.**\n`;
    prompt += `**Separate each article with the marker comments shown above.**\n`;
    prompt += `**Do NOT include any explanatory text, only the HTML.**\n\n`;
    prompt += `═════════════════════════════════════════════════════════════════════════\n`;

    // Write to file
    const filename = `${sessionId}.txt`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, prompt);

    console.log(`✅ ${sessionId}.txt — ${session.map(a => a.articleId).join(', ')}`);
  }

  console.log();
  console.log('='.repeat(120));
  console.log('✅ SESSION PROMPTS GENERATED');
  console.log('='.repeat(120));
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`📄 Total files: ${sessions.length}`);
  console.log(`📊 Articles per file: ${ARTICLES_PER_SESSION}`);
  console.log();
  console.log('NEXT STEPS:');
  console.log(`1. Open ${sessions.length} Claude sessions (or run in batches)`);
  console.log(`2. Copy-paste each session-XXX.txt file into a separate Claude session`);
  console.log(`3. Collect HTML output from each session`);
  console.log(`4. Run collect-rewrites.ts to update database`);
  console.log('='.repeat(120));
  console.log();
}

main();
