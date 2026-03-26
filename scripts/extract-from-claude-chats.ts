#!/usr/bin/env tsx
/**
 * Extract article HTML content from Claude chat history
 */

import * as fs from 'fs';
import * as path from 'path';

const CLAUDE_DIR = path.join(process.env.HOME!, '.claude/projects/-Users-raiyanabdullah-Desktop-psychage-v2');
const OUTPUT_DIR = path.join(process.cwd(), 'recovered-articles');

// Map of conversation files to their session numbers
const SESSION_FILES: Record<string, number> = {
  '2ab56368-4d8c-45e3-80f2-552615dfd491.jsonl': 1,
  'da22661c-998b-4951-a5f5-b8f6bb82255d.jsonl': 2,
  'c61efec8-f88c-4553-a5b7-6531cd4f1ef5.jsonl': 3,
  'a1378fb3-44a7-4497-8aae-de9f078f270d.jsonl': 4,
  '6ef3ea81-4da9-4b3f-985e-44891f18a3c0.jsonl': 5,
  '4bab6b7b-f958-463f-968f-ced94a3ec405.jsonl': 6,
  '347ceb2e-cabe-4e19-b705-3ec8cc1e92a6.jsonl': 7,
  'b6117f55-ceff-47de-bccb-547f1a0b9c00.jsonl': 8,
  'feea80d3-5e3e-4f0c-8f48-febec1b682ca.jsonl': 9,
  '783b732b-7e9c-4901-888c-f16539328974.jsonl': 10,
  'e36c7276-2bc0-49f5-9903-0069c3ecb353.jsonl': 11,
  'b4595a10-e39e-43d9-9e3b-0d0bd92a6094.jsonl': 12,
  'e9987632-e447-4fa8-b9be-c9b06953ce63.jsonl': 13,
  'a64429d7-4b2e-4cfa-ba41-ce98342b1831.jsonl': 15,
  '58848afb-93bf-4d6f-a9a1-ec96d85b556a.jsonl': 16,
};

interface Message {
  role: string;
  content: any;
}

function extractText(content: any): string {
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .filter(c => c.type === 'text')
      .map(c => c.text || '')
      .join('\n');
  }
  return '';
}

function extractArticles(text: string): Map<string, string> {
  const articles = new Map<string, string>();

  // Pattern 1: <!-- ARTICLE: CATXX-XXX --> followed by <div>content</div>
  const pattern1 = /<!--\s*ARTICLE:\s*(CAT\d+-\d+)\s*-->\s*<div>([\s\S]*?)(?=<!--\s*ARTICLE:|$)/gi;
  let match;

  while ((match = pattern1.exec(text)) !== null) {
    const id = match[1];
    let html = `<div>${match[2]}`;

    // Clean up the HTML - remove trailing content after closing </div>
    const closingDivIndex = html.lastIndexOf('</div>');
    if (closingDivIndex !== -1) {
      html = html.substring(0, closingDivIndex + 6);
    }

    articles.set(id, html);
  }

  // Pattern 2: Article sections with headers
  if (articles.size === 0) {
    const pattern2 = /(CAT\d+-\d+)[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>/gi;
    while ((match = pattern2.exec(text)) !== null) {
      const id = match[1];
      const html = `<div>${match[2]}</div>`;
      if (!articles.has(id) && html.length > 1000) {
        articles.set(id, html);
      }
    }
  }

  return articles;
}

async function main() {
  console.log('🔍 Extracting Articles from Claude Chat History...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let totalArticles = 0;
  const sessionResults: Record<number, string[]> = {};

  for (const [filename, sessionNum] of Object.entries(SESSION_FILES)) {
    const filepath = path.join(CLAUDE_DIR, filename);

    if (!fs.existsSync(filepath)) {
      console.log(`⚠️  Session ${sessionNum}: File not found`);
      continue;
    }

    console.log(`📂 Session ${String(sessionNum).padStart(2, '0')}: Processing ${filename}...`);

    const content = fs.readFileSync(filepath, 'utf-8');
    const lines = content.split('\n').filter(l => l.trim());

    let allText = '';

    for (const line of lines) {
      try {
        const msg: Message = JSON.parse(line);
        if (msg.role === 'assistant') {
          allText += extractText(msg.content) + '\n\n';
        }
      } catch (e) {
        // Skip invalid JSON
      }
    }

    const articles = extractArticles(allText);

    if (articles.size > 0) {
      console.log(`   ✅ Found ${articles.size} articles`);

      sessionResults[sessionNum] = [];

      for (const [id, html] of articles) {
        const outputFile = path.join(OUTPUT_DIR, `${id}.html`);
        fs.writeFileSync(outputFile, html, 'utf-8');
        sessionResults[sessionNum].push(id);
        totalArticles++;
      }

      console.log(`   📝 Articles: ${Array.from(articles.keys()).join(', ')}`);
    } else {
      console.log(`   ❌ No articles found`);
    }
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`📊 Extraction Summary:`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Total articles extracted: ${totalArticles}`);
  console.log(`Sessions processed: ${Object.keys(sessionResults).length}`);

  console.log(`\n📋 Articles by Session:`);
  for (const session of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) {
    const articles = sessionResults[session];
    if (articles && articles.length > 0) {
      console.log(`  Session ${String(session).padStart(2, '0')}: ${articles.join(', ')}`);
    } else {
      console.log(`  Session ${String(session).padStart(2, '0')}: ❌ NOT FOUND`);
    }
  }

  console.log(`\n✅ Articles saved to: ${OUTPUT_DIR}/`);

  // Show which articles are still missing
  const allExpected: string[] = [];
  for (let i = 1; i <= 80; i++) {
    allExpected.push(`CAT01-${String(i).padStart(3, '0')}`);
  }

  const recovered = new Set<string>();
  for (const articles of Object.values(sessionResults)) {
    articles.forEach(id => recovered.add(id));
  }

  const missing = allExpected.filter(id => !recovered.has(id));

  console.log(`\n⚠️  Missing Articles (${missing.length}/80):`);
  if (missing.length > 0 && missing.length <= 20) {
    console.log(`   ${missing.join(', ')}`);
  } else if (missing.length > 20) {
    console.log(`   ${missing.slice(0, 20).join(', ')} ... and ${missing.length - 20} more`);
  } else {
    console.log(`   🎉 ALL ARTICLES RECOVERED!`);
  }
}

main();
