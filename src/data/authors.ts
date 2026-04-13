import type { AuthorProfile } from '@/types/author';

export const AUTHORS: AuthorProfile[] = [
  // ── Editorial Team ──
  {
    id: 'psychage-team',
    slug: 'psychage-team',
    name: 'Psychage Team',
    role: 'Clinical Editorial Team',
    image: '/images/authors/author-team.svg',
    bio: 'The Psychage Clinical Editorial Team is a multidisciplinary group of mental health professionals, researchers, and writers dedicated to producing evidence-based, accessible mental health content. Every article is reviewed against our 11-point quality gate before publication.',
    credentials: 'Multidisciplinary Editorial Team',
    specialties: ['Evidence-based content', 'Mental health education', 'Clinical review'],
  },
  {
    id: 'clinical-board',
    slug: 'clinical-review-board',
    name: 'Clinical Review Board',
    role: 'Medical Review',
    image: '/images/authors/author-team.svg',
    bio: 'The Psychage Clinical Review Board oversees the medical accuracy of all published content. The board ensures that clinical claims are supported by peer-reviewed evidence and that crisis and safety content meets the highest standards of care.',
    credentials: 'Clinical Review Panel',
    specialties: ['Clinical accuracy', 'Medical review', 'Crisis content oversight'],
    isAdvisoryBoard: true,
  },

  // ── Advisory Board Members ──
  {
    id: 'dr-lena-dobson',
    slug: 'dr-lena-dobson',
    name: 'Dr. Lena Dobson',
    role: 'Founder & Chief Science Officer',
    image: '/images/authors/author-team.svg',
    bio: 'Dr. Lena Dobson is a clinical neuropsychologist with over 15 years of experience in cognitive assessment and mental health research. She founded Psychage to bridge the gap between clinical research and public understanding, believing that evidence-based mental health education should be freely accessible to everyone.',
    credentials: 'Ph.D. in Clinical Neuropsychology',
    specialties: ['Cognitive assessment', 'Neuropsychology', 'Mental health literacy'],
    affiliations: ['American Psychological Association', 'International Neuropsychological Society'],
    isAdvisoryBoard: true,
  },
  {
    id: 'dr-marcus-chen',
    slug: 'dr-marcus-chen',
    name: 'Dr. Marcus Chen',
    role: 'Clinical Psychology Advisor',
    image: '/images/authors/author-team.svg',
    bio: 'Dr. Marcus Chen is a licensed clinical psychologist specializing in anxiety disorders and evidence-based therapies. He advises on treatment content, therapeutic frameworks, and the clinical accuracy of self-help resources on the platform.',
    credentials: 'Psy.D., Licensed Clinical Psychologist',
    specialties: ['Anxiety disorders', 'CBT', 'Exposure therapy', 'Treatment guides'],
    affiliations: ['Association for Behavioral and Cognitive Therapies'],
    isAdvisoryBoard: true,
  },
  {
    id: 'dr-amara-osei',
    slug: 'dr-amara-osei',
    name: 'Dr. Amara Osei',
    role: 'Psychiatric Medicine Advisor',
    image: '/images/authors/author-team.svg',
    bio: 'Dr. Amara Osei is a board-certified psychiatrist with expertise in psychopharmacology and mood disorders. She reviews medication-related content and ensures that information about psychiatric treatments reflects current clinical guidelines.',
    credentials: 'M.D., Board-Certified Psychiatrist',
    specialties: ['Psychopharmacology', 'Mood disorders', 'Depression', 'Medication guides'],
    affiliations: ['American Psychiatric Association', 'National Medical Association'],
    isAdvisoryBoard: true,
  },
  {
    id: 'dr-sarah-ikeda',
    slug: 'dr-sarah-ikeda',
    name: 'Dr. Sarah Ikeda',
    role: 'Trauma & Crisis Content Advisor',
    image: '/images/authors/author-team.svg',
    bio: 'Dr. Sarah Ikeda is a clinical psychologist specializing in trauma-informed care and crisis intervention. She oversees all crisis and safety content on Psychage, ensuring it meets the highest standards of clinical sensitivity and provides clear, actionable guidance.',
    credentials: 'Ph.D., Licensed Clinical Psychologist',
    specialties: ['PTSD', 'Trauma-informed care', 'Crisis intervention', 'Safety planning'],
    affiliations: ['International Society for Traumatic Stress Studies'],
    isAdvisoryBoard: true,
  },
  {
    id: 'prof-david-reyes',
    slug: 'prof-david-reyes',
    name: 'Prof. David Reyes',
    role: 'Research Methodology Advisor',
    image: '/images/authors/author-team.svg',
    bio: 'Professor David Reyes is a research methodologist specializing in mental health epidemiology. He advises on the interpretation of clinical studies cited in Psychage articles and ensures that research digests accurately represent study findings, limitations, and implications.',
    credentials: 'Ph.D., Professor of Psychiatric Epidemiology',
    specialties: ['Research methodology', 'Epidemiology', 'Statistical analysis', 'Research digests'],
    affiliations: ['Society for Research in Psychopathology'],
    isAdvisoryBoard: true,
  },
];

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorById(id: string): AuthorProfile | undefined {
  return AUTHORS.find((a) => a.id === id);
}

export function getAdvisoryBoard(): AuthorProfile[] {
  return AUTHORS.filter((a) => a.isAdvisoryBoard);
}
