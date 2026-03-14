/**
 * Sanity CMS Write Client
 *
 * Separate client with a write token for admin operations
 * (status updates, image uploads, article breakdown creation).
 * The main sanityClient.ts is read-only.
 */

import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';
const writeToken = import.meta.env.VITE_SANITY_API_TOKEN;

export const sanityWriteClient = createClient({
  projectId: projectId || '',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: false,
  token: writeToken || '',
});

export function isSanityWriteConfigured(): boolean {
  return Boolean(projectId && dataset && writeToken);
}
