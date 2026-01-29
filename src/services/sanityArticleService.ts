/**
 * Sanity Article Service
 *
 * Fetches article content from Sanity CMS using GROQ queries.
 * This service provides the raw Sanity data - use articleService for
 * the unified interface that falls back to mock data.
 */

import { sanityClient, urlFor, isSanityConfigured } from '../lib/sanityClient';
import type { PortableTextBlock } from '@portabletext/types';

// ============================================================================
// Types
// ============================================================================

export interface SanityArticle {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  summary: string;
  body: PortableTextBlock[];
  category: SanityCategory | null;
  author: SanityClinician | null;
  reviewer: SanityClinician | null;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  readTime: number;
  status: string;
  references: SanityCitation[];
  ogImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  metaTitle?: string;
  metaDescription?: string;
}

export interface SanityCategory {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  order?: number;
  icon?: {
    asset: { _ref: string };
    alt?: string;
  };
}

export interface SanityClinician {
  _id: string;
  name: string;
  credentials?: string;
  bio?: string;
  image?: {
    asset: { _ref: string };
    alt?: string;
  };
}

export interface SanityCitation {
  _id: string;
  sourceType: 'WHO' | 'CDC' | 'APA' | 'NIMH' | 'PeerReviewed' | 'Book';
  title: string;
  authors?: string[];
  publicationDate?: string;
  url: string;
  doi?: string;
  journalName?: string;
  publisher?: string;
}

// ============================================================================
// GROQ Queries
// ============================================================================

/**
 * Base article fields to fetch
 */
const articleFields = `
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  summary,
  body,
  publishedAt,
  updatedAt,
  featured,
  status,
  metaTitle,
  metaDescription,
  ogImage {
    asset,
    alt
  },
  category->{
    _id,
    name,
    slug,
    description,
    order,
    icon {
      asset,
      alt
    }
  },
  author->{
    _id,
    name,
    credentials,
    bio,
    image {
      asset,
      alt
    }
  },
  reviewer->{
    _id,
    name,
    credentials,
    image {
      asset,
      alt
    }
  },
  references[]->{
    _id,
    sourceType,
    title,
    authors,
    publicationDate,
    url,
    doi,
    journalName,
    publisher
  }
`;

/**
 * Query for all published articles
 */
const allArticlesQuery = `
  *[_type == "article" && status == "published"] | order(publishedAt desc) {
    ${articleFields}
  }
`;

/**
 * Query for a single article by slug
 */
const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    ${articleFields}
  }
`;

/**
 * Query for featured articles
 */
const featuredArticlesQuery = `
  *[_type == "article" && status == "published" && featured == true] | order(publishedAt desc) {
    ${articleFields}
  }
`;

/**
 * Query for articles by category
 */
const articlesByCategoryQuery = `
  *[_type == "article" && status == "published" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    ${articleFields}
  }
`;

/**
 * Query for all categories
 */
const allCategoriesQuery = `
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    order,
    icon {
      asset,
      alt
    }
  }
`;

/**
 * Query for a category by slug
 */
const categoryBySlugQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    order,
    icon {
      asset,
      alt
    }
  }
`;

// ============================================================================
// Service Functions
// ============================================================================

export const sanityArticleService = {
  /**
   * Check if Sanity is configured and available
   */
  isAvailable: (): boolean => {
    return isSanityConfigured();
  },

  /**
   * Fetch all published articles
   */
  getAll: async (): Promise<SanityArticle[]> => {
    if (!isSanityConfigured()) {
      throw new Error('Sanity is not configured');
    }
    return sanityClient.fetch<SanityArticle[]>(allArticlesQuery);
  },

  /**
   * Fetch a single article by slug
   */
  getBySlug: async (slug: string): Promise<SanityArticle | null> => {
    if (!isSanityConfigured()) {
      throw new Error('Sanity is not configured');
    }
    return sanityClient.fetch<SanityArticle | null>(articleBySlugQuery, { slug });
  },

  /**
   * Fetch featured articles
   */
  getFeatured: async (): Promise<SanityArticle[]> => {
    if (!isSanityConfigured()) {
      throw new Error('Sanity is not configured');
    }
    return sanityClient.fetch<SanityArticle[]>(featuredArticlesQuery);
  },

  /**
   * Fetch articles by category slug
   */
  getByCategory: async (categorySlug: string): Promise<SanityArticle[]> => {
    if (!isSanityConfigured()) {
      throw new Error('Sanity is not configured');
    }
    return sanityClient.fetch<SanityArticle[]>(articlesByCategoryQuery, { categorySlug });
  },

  /**
   * Fetch all categories
   */
  getAllCategories: async (): Promise<SanityCategory[]> => {
    if (!isSanityConfigured()) {
      throw new Error('Sanity is not configured');
    }
    return sanityClient.fetch<SanityCategory[]>(allCategoriesQuery);
  },

  /**
   * Fetch a category by slug
   */
  getCategoryBySlug: async (slug: string): Promise<SanityCategory | null> => {
    if (!isSanityConfigured()) {
      throw new Error('Sanity is not configured');
    }
    return sanityClient.fetch<SanityCategory | null>(categoryBySlugQuery, { slug });
  },

  /**
   * Get image URL from Sanity image reference
   */
  getImageUrl: (image: { asset: { _ref: string } } | undefined, width?: number, height?: number): string | undefined => {
    if (!image?.asset) return undefined;
    let builder = urlFor(image);
    if (width) builder = builder.width(width);
    if (height) builder = builder.height(height);
    return builder.url();
  },

  /**
   * Calculate read time from body content
   */
  calculateReadTime: (body: PortableTextBlock[] | undefined): number => {
    if (!body || !Array.isArray(body)) return 5; // Default 5 min

    const wordCount = body
      .filter((block) => block._type === 'block')
      .flatMap((block) => (block.children as { _type: string; text?: string }[]) || [])
      .filter((child) => child._type === 'span')
      .reduce((count, span) => {
        const text = span.text || '';
        return count + text.split(/\s+/).filter(Boolean).length;
      }, 0);

    return Math.max(1, Math.ceil(wordCount / 200));
  },
};

export default sanityArticleService;
