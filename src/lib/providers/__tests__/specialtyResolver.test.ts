import { describe, it, expect } from 'vitest';
import { resolveSpecialtySlugs } from '../specialtyResolver';
import type { Specialty } from '../types';

const mockSpecialties: Specialty[] = [
  { id: '1', slug: 'anxiety', label: 'Anxiety', category: 'condition', psychage_condition_id: 'GAD', sort_order: 1 },
  { id: '2', slug: 'depression', label: 'Depression', category: 'condition', psychage_condition_id: 'MDE', sort_order: 2 },
  { id: '3', slug: 'ptsd', label: 'PTSD', category: 'condition', psychage_condition_id: 'PTSD', sort_order: 3 },
  { id: '4', slug: 'bipolar_disorder', label: 'Bipolar Disorder', category: 'condition', psychage_condition_id: null, sort_order: 4 },
  { id: '5', slug: 'cbt', label: 'CBT (Cognitive Behavioral Therapy)', category: 'treatment_approach', psychage_condition_id: null, sort_order: 1 },
  { id: '6', slug: 'emdr', label: 'EMDR', category: 'treatment_approach', psychage_condition_id: null, sort_order: 2 },
  { id: '7', slug: 'social_anxiety', label: 'Social Anxiety', category: 'condition', psychage_condition_id: null, sort_order: 5 },
  { id: '8', slug: 'panic_disorder', label: 'Panic Disorder', category: 'condition', psychage_condition_id: null, sort_order: 6 },
  { id: '9', slug: 'eating_disorders', label: 'Eating Disorders', category: 'condition', psychage_condition_id: null, sort_order: 7 },
  { id: '10', slug: 'children', label: 'Children', category: 'population', psychage_condition_id: null, sort_order: 1 },
];

describe('resolveSpecialtySlugs', () => {
  it('returns empty for empty query', () => {
    expect(resolveSpecialtySlugs('', mockSpecialties)).toEqual([]);
  });

  it('returns empty for single character (below min threshold)', () => {
    expect(resolveSpecialtySlugs('a', mockSpecialties)).toEqual([]);
  });

  it('matches label "anxiety" (includes partial matches)', () => {
    const result = resolveSpecialtySlugs('anxiety', mockSpecialties);
    expect(result).toContain('anxiety');
    expect(result).toContain('social_anxiety');
    expect(result).toHaveLength(2);
  });

  it('matches case-insensitively', () => {
    const result = resolveSpecialtySlugs('Anxiety', mockSpecialties);
    expect(result).toContain('anxiety');
    expect(resolveSpecialtySlugs('DEPRESSION', mockSpecialties)).toEqual(['depression']);
  });

  it('matches partial query "anx"', () => {
    const result = resolveSpecialtySlugs('anx', mockSpecialties);
    expect(result).toContain('anxiety');
    expect(result).toContain('social_anxiety');
  });

  it('matches slug "cbt"', () => {
    expect(resolveSpecialtySlugs('cbt', mockSpecialties)).toEqual(['cbt']);
  });

  it('matches partial label "disorder"', () => {
    const result = resolveSpecialtySlugs('disorder', mockSpecialties);
    expect(result).toContain('bipolar_disorder');
    expect(result).toContain('panic_disorder');
    expect(result).toContain('eating_disorders');
  });

  it('returns empty for non-matching query', () => {
    expect(resolveSpecialtySlugs('Dr. Smith', mockSpecialties)).toEqual([]);
  });

  it('returns empty for whitespace-only query', () => {
    expect(resolveSpecialtySlugs('   ', mockSpecialties)).toEqual([]);
  });

  it('matches via slug partial "social_anx"', () => {
    expect(resolveSpecialtySlugs('social_anx', mockSpecialties)).toEqual(['social_anxiety']);
  });

  it('matches "ptsd" exactly', () => {
    expect(resolveSpecialtySlugs('ptsd', mockSpecialties)).toEqual(['ptsd']);
  });

  it('returns empty for empty specialties array', () => {
    expect(resolveSpecialtySlugs('anxiety', [])).toEqual([]);
  });
});
