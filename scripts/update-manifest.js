#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sessions to mark as complete (from lock files with status: "done")
const completedSessions = [37, 38, 39, 41, 42, 105, 223, 255, 257, 258, 259, 260];

// Completion timestamps from lock files
const completionTimestamps = {
  37: "2026-03-27T21:05:00Z",
  38: "2026-03-27T22:15:00.000Z",
  39: "2026-03-27T22:20:00.000Z",
  41: "2026-03-27T22:25:00.000Z",
  42: "2026-03-27T23:49:51Z",
  105: "2026-03-27T18:15:00Z",
  223: "2026-03-27T22:45:00.000Z",
  255: "2026-03-27T21:15:30Z",
  257: "2026-03-27T22:47:30Z",
  258: "2026-03-27T22:58:33Z",
  259: "2026-03-28T00:42:36Z",
  260: "2026-03-27T23:17:00Z"
};

const manifestPath = path.join(__dirname, '..', 'article-rewrite-manifest.json');

console.log('Reading manifest...');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let updatedCount = 0;
let articlesUpdated = 0;

completedSessions.forEach(sessionNum => {
  const sessionKey = String(sessionNum);
  const session = manifest.sessions[sessionKey];

  if (!session) {
    console.warn(`⚠️  Session ${sessionNum} not found in manifest`);
    return;
  }

  if (session.status === 'complete') {
    console.log(`ℹ️  Session ${sessionNum} already marked as complete`);
    return;
  }

  // Update session status
  session.status = 'complete';
  session.completedAt = completionTimestamps[sessionNum];

  // Update all articles in this session
  session.articles.forEach(article => {
    if (article.status !== 'complete') {
      article.status = 'complete';
      articlesUpdated++;
    }
  });

  updatedCount++;
  console.log(`✅ Updated session ${sessionNum} (${session.articles.length} articles)`);
});

// Update completed sessions count
const newCompletedSessions = manifest.completedSessions + updatedCount;
console.log(`\n📊 Completed sessions: ${manifest.completedSessions} → ${newCompletedSessions}`);
manifest.completedSessions = newCompletedSessions;

// Save manifest
console.log('\nSaving manifest...');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`\n✨ Done! Updated ${updatedCount} sessions (${articlesUpdated} articles)`);
