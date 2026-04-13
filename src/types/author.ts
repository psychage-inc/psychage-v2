import type { Author } from './models';

export interface AuthorProfile extends Author {
  slug: string;
  credentials?: string;
  specialties?: string[];
  affiliations?: string[];
  isAdvisoryBoard?: boolean;
}
