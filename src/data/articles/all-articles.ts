/**
 * All Articles Aggregator
 * Imports and combines all article arrays from all 31 categories
 * Used by articleService.ts as mock data fallback
 */

import type { Article } from '@/types/models';

// Import category modules (1-21: original, 23-31: expanded)
// Note: Cat 22 was merged into Cat 31 (both used slug 'spirituality-meaning')
import * as cat01 from './category-01';
import * as cat02 from './category-02';
import * as cat03 from './category-03';
import * as cat04 from './category-04';
import * as cat05 from './category-05';
import * as cat06 from './category-06';
import * as cat07 from './category-07';
import * as cat08 from './category-08';
import * as cat09 from './category-09';
import * as cat10 from './category-10';
import * as cat11 from './category-11';
import * as cat12 from './category-12';
import * as cat13 from './category-13';
import * as cat14 from './category-14';
import * as cat15 from './category-15';
import * as cat16 from './category-16';
import * as cat17 from './category-17';
import * as cat18 from './category-18';
import * as cat19 from './category-19';
import * as cat20 from './category-20';
import * as cat21 from './category-21';
import * as cat23 from './category-23';
import * as cat24 from './category-24';
import * as cat25 from './category-25';
import * as cat26 from './category-26';
import * as cat27 from './category-27';
import * as cat28 from './category-28';
import * as cat29 from './category-29';
import * as cat30 from './category-30';
import * as cat31 from './category-31';
import * as eatingBody from './eating-body';

/**
 * Flatten a category module into an array of articles
 * Each module exports multiple named arrays (e.g., understandingEmotionsArticles)
 */
function flattenCategoryModule(categoryModule: Record<string, unknown>): Article[] {
  const articles: Article[] = [];

  for (const value of Object.values(categoryModule)) {
    if (Array.isArray(value)) {
      articles.push(...value);
    }
  }

  return articles;
}

// Combine all articles from all categories
export const allArticles: Article[] = [
  ...flattenCategoryModule(cat01),
  ...flattenCategoryModule(cat02),
  ...flattenCategoryModule(cat03),
  ...flattenCategoryModule(cat04),
  ...flattenCategoryModule(cat05),
  ...flattenCategoryModule(cat06),
  ...flattenCategoryModule(cat07),
  ...flattenCategoryModule(cat08),
  ...flattenCategoryModule(cat09),
  ...flattenCategoryModule(cat10),
  ...flattenCategoryModule(cat11),
  ...flattenCategoryModule(cat12),
  ...flattenCategoryModule(cat13),
  ...flattenCategoryModule(cat14),
  ...flattenCategoryModule(cat15),
  ...flattenCategoryModule(cat16),
  ...flattenCategoryModule(cat17),
  ...flattenCategoryModule(cat18),
  ...flattenCategoryModule(cat19),
  ...flattenCategoryModule(cat20),
  ...flattenCategoryModule(cat21),
  ...flattenCategoryModule(cat23),
  ...flattenCategoryModule(cat24),
  ...flattenCategoryModule(cat25),
  ...flattenCategoryModule(cat26),
  ...flattenCategoryModule(cat27),
  ...flattenCategoryModule(cat28),
  ...flattenCategoryModule(cat29),
  ...flattenCategoryModule(cat30),
  ...flattenCategoryModule(cat31),
  ...flattenCategoryModule(eatingBody),
];
