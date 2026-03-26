// ============================================================================
// Category 18 — Women's Mental Health | Article Index
// ============================================================================

import { Article } from '../../../types';

// Subcategory 01: Reproductive Mental Health (Articles 1-10)
import { articles as subcategory01a } from './01a-reproductive-mental-health';
import { articles as subcategory01b } from './01b-reproductive-mental-health';

// Subcategory 02: Perinatal and Postpartum Mental Health (Articles 11-20)
import { articles as subcategory02a } from './02a-perinatal-postpartum';
import { articles as subcategory02b } from './02b-perinatal-postpartum';

// Subcategory 03: Menopause and Perimenopause (Articles 21-30)
import { articles as subcategory03a } from './03a-menopause-perimenopause';
import { articles as subcategory03b } from './03b-menopause-perimenopause';

// Subcategory 04: Trauma and PTSD in Women (Articles 31-40)
import { articles as subcategory04a } from './04a-trauma-ptsd';
import { articles as subcategory04b } from './04b-trauma-ptsd';

// Subcategory 05: Eating Disorders (Articles 41-50)
import { articles as subcategory05a } from './05a-eating-disorders';
import { articles as subcategory05b } from './05b-eating-disorders';

// Subcategory 06: Depression and Anxiety in Women (Articles 51-60)
import { articles as subcategory06a } from './06a-depression-anxiety';
import { articles as subcategory06b } from './06b-depression-anxiety';

// Subcategory 07: Sociocultural Factors (Articles 61-66)
import { articles as subcategory07 } from './07-sociocultural-factors';

// Re-export all articles as a flat array
export const category18Articles: Article[] = [
  ...subcategory01a, // Articles 1-5
  ...subcategory01b, // Articles 6-10
  ...subcategory02a, // Articles 11-15
  ...subcategory02b, // Articles 16-20
  ...subcategory03a, // Articles 21-25
  ...subcategory03b, // Articles 26-30
  ...subcategory04a, // Articles 31-35
  ...subcategory04b, // Articles 36-40
  ...subcategory05a, // Articles 41-45
  ...subcategory05b, // Articles 46-50
  ...subcategory06a, // Articles 51-55
  ...subcategory06b, // Articles 56-60
  ...subcategory07, // Articles 61-66
];
