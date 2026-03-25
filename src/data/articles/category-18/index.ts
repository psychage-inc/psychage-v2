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

// Re-export all articles as a flat array
export const category18Articles: Article[] = [
  ...subcategory01a, // Articles 1-5
  ...subcategory01b, // Articles 6-10
  ...subcategory02a, // Articles 11-15
  ...subcategory02b, // Articles 16-20
  ...subcategory03a, // Articles 21-25
  ...subcategory03b, // Articles 26-30
];
