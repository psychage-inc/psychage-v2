import { Category, Author } from '../../../types';

export const CATEGORY_WOMENS_HEALTH: Category = {
  id: 'womens-mental-health',
  name: `Women's Mental Health`,
  slug: 'womens-mental-health',
  description: `Comprehensive coverage of mental health issues affecting women across the lifespan, from reproductive health to gender-specific risk factors, treatment considerations, and sociocultural influences on women's psychological well-being.`,
  image: '/images/categories/womens-mental-health.svg',
  subTopics: [
    'Reproductive Mental Health',
    'Perinatal and Postpartum Mental Health',
    'Menopause and Perimenopause',
    'Trauma and PTSD in Women',
    'Eating Disorders',
    'Depression and Anxiety in Women',
    'Sociocultural Factors',
  ],
};

export const PRIMARY_AUTHOR: Author = {
  id: 'psychage-editorial',
  name: 'Psychage Editorial Team',
  role: 'Mental Health Education',
  image: '/images/authors/author-team.svg',
};

export const CLINICAL_REVIEWER: Author = {
  id: 'dr-dobson',
  name: 'Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology',
  role: 'Clinical Neuropsychology',
  image: '/images/authors/author-female-2.svg',
};

export const catId = (n: number): string => `cat18-${String(n).padStart(3, '0')}`;
