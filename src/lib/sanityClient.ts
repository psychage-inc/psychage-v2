/**
 * Sanity CMS Client Configuration
 *
 * Connects to the Sanity CMS for fetching article content,
 * categories, and other managed content.
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity image source type (simplified)
type SanityImageSource = {
  asset?: { _ref?: string; _id?: string };
  _type?: string;
} | string;

// Sanity configuration from environment variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

if (!projectId || !dataset) {
  console.warn('Missing Sanity environment variables. Content will fall back to mock data.');
}

/**
 * Sanity client instance
 * Used for fetching content via GROQ queries
 */
export const sanityClient = createClient({
  projectId: projectId || '',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: false, // Always fetch latest content (no caching)
  // No token needed for public read access
});

/**
 * Image URL builder for Sanity images
 */
const builder = imageUrlBuilder(sanityClient);

/**
 * Generate optimized image URLs from Sanity image references
 *
 * @param source - Sanity image reference
 * @returns Image URL builder for chaining transformations
 *
 * @example
 * urlFor(article.ogImage).width(800).height(600).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Check if Sanity client is properly configured
 */
export function isSanityConfigured(): boolean {
  return Boolean(projectId && dataset);
}
