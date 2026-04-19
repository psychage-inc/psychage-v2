import { describe, it, expect } from 'vitest';
import {
  getTrustBadgeType,
  shouldShowFeaturedBadge,
  isProviderVerified,
} from '@/lib/providers/trust-badge';

describe('getTrustBadgeType', () => {
  it('returns verified when verified_at is set AND status is active', () => {
    expect(getTrustBadgeType({ status: 'active', verified_at: '2026-01-01' })).toBe('verified');
  });

  it('returns verified when verified_at is set AND status is verified', () => {
    expect(getTrustBadgeType({ status: 'verified', verified_at: '2026-01-01' })).toBe('verified');
  });

  it('does NOT return verified when status is active but verified_at is null (AND logic)', () => {
    expect(getTrustBadgeType({ status: 'active', verified_at: null })).toBeNull();
  });

  it('does NOT return verified when verified_at is set but status is seeded (AND logic)', () => {
    // A seeded provider with verified_at should show unclaimed, not verified
    expect(getTrustBadgeType({ status: 'seeded', verified_at: '2026-01-01' })).toBe('unclaimed');
  });

  it('returns claimed for claimed status without verification', () => {
    expect(getTrustBadgeType({ status: 'claimed', verified_at: null })).toBe('claimed');
  });

  it('returns unclaimed for seeded status', () => {
    expect(getTrustBadgeType({ status: 'seeded', verified_at: null })).toBe('unclaimed');
  });

  it('returns null for submitted status', () => {
    expect(getTrustBadgeType({ status: 'submitted', verified_at: null })).toBeNull();
  });

  it('returns null for suspended status', () => {
    expect(getTrustBadgeType({ status: 'suspended', verified_at: null })).toBeNull();
  });

  it('returns null for rejected status', () => {
    expect(getTrustBadgeType({ status: 'rejected', verified_at: null })).toBeNull();
  });
});

describe('shouldShowFeaturedBadge', () => {
  it('returns true for pro tier', () => {
    expect(shouldShowFeaturedBadge({ tier: 'pro' })).toBe(true);
  });

  it('returns true for elite tier', () => {
    expect(shouldShowFeaturedBadge({ tier: 'elite' })).toBe(true);
  });

  it('returns false for free tier', () => {
    expect(shouldShowFeaturedBadge({ tier: 'free' })).toBe(false);
  });

  it('returns false for null tier', () => {
    expect(shouldShowFeaturedBadge({ tier: null })).toBe(false);
  });
});

describe('isProviderVerified (legacy compat)', () => {
  it('returns true only when verified_at AND active/verified status', () => {
    expect(isProviderVerified('active', '2026-01-01')).toBe(true);
    expect(isProviderVerified('verified', '2026-01-01')).toBe(true);
  });

  it('returns false when active but no verified_at (AND logic)', () => {
    expect(isProviderVerified('active', null)).toBe(false);
  });

  it('returns false when seeded with verified_at', () => {
    expect(isProviderVerified('seeded', '2026-01-01')).toBe(false);
  });
});
