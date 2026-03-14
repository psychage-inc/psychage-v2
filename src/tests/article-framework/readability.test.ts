import { describe, it, expect } from 'vitest';
import { analyzeReadability } from '@/lib/article-framework/readability';

describe('analyzeReadability', () => {
  it('returns basic metrics for simple text', () => {
    const result = analyzeReadability('The cat sat on the mat. It was a good day.');
    expect(result.wordCount).toBe(11);
    expect(result.sentenceCount).toBe(2);
    expect(result.avgWordsPerSentence).toBe(5.5);
    expect(result.fleschKincaidGrade).toBeGreaterThanOrEqual(0);
    expect(result.fleschReadingEase).toBeGreaterThan(0);
  });

  it('handles empty string', () => {
    const result = analyzeReadability('');
    expect(result.wordCount).toBe(0);
    expect(result.sentenceCount).toBeGreaterThanOrEqual(1); // minimum 1
    expect(result.fleschKincaidGrade).toBe(0);
  });

  it('scores simple sentences as low grade level', () => {
    const simple = 'I like cats. Dogs are fun. The sun is warm. We play outside. It is nice.';
    const result = analyzeReadability(simple);
    // Simple sentences = low grade level (easy to read)
    expect(result.fleschKincaidGrade).toBeLessThan(5);
    expect(result.fleschReadingEase).toBeGreaterThan(70);
  });

  it('scores complex clinical text as higher grade level', () => {
    const complex =
      'The psychopharmacological intervention demonstrated significant therapeutic efficacy ' +
      'in ameliorating symptomatology associated with treatment-resistant major depressive disorder, ' +
      'particularly when administered concomitantly with cognitive-behavioral psychotherapy.';
    const result = analyzeReadability(complex);
    // Complex clinical jargon = higher grade level
    expect(result.fleschKincaidGrade).toBeGreaterThan(10);
    expect(result.fleschReadingEase).toBeLessThan(40);
  });

  it('handles mental health terminology correctly', () => {
    const text =
      'Schizophrenia is a psychiatric disorder. Cognitive behavioral therapy helps with anxiety. ' +
      'Depression affects many people worldwide. Dissociative disorders involve identity disruption.';
    const result = analyzeReadability(text);
    expect(result.wordCount).toBeGreaterThan(15);
    expect(result.syllableCount).toBeGreaterThan(result.wordCount); // multi-syllable words
  });

  it('handles paragraph breaks as sentence boundaries', () => {
    const text = 'First paragraph here\n\nSecond paragraph here\n\nThird paragraph here';
    const result = analyzeReadability(text);
    expect(result.sentenceCount).toBeGreaterThanOrEqual(3);
  });

  it('keeps FK grade and reading ease within valid ranges', () => {
    const texts = [
      'Go.',
      'The quick brown fox jumps over the lazy dog.',
      'Psychoneuroimmunological investigations have elucidated the bidirectional communication pathways between the central nervous system and peripheral immune responses, demonstrating that chronic psychological stress fundamentally alters immunological surveillance mechanisms.',
    ];

    for (const text of texts) {
      const result = analyzeReadability(text);
      expect(result.fleschKincaidGrade).toBeGreaterThanOrEqual(0);
      expect(result.fleschReadingEase).toBeGreaterThanOrEqual(0);
      expect(result.fleschReadingEase).toBeLessThanOrEqual(100);
    }
  });

  it('counts syllables accurately for common mental health terms', () => {
    // The syllable counting is heuristic, but should be reasonable
    const text = 'anxiety depression bipolar schizophrenia cognitive behavioral therapeutic psychiatric';
    const result = analyzeReadability(text);
    // 8 words, all multi-syllable — syllables should exceed word count significantly
    expect(result.syllableCount).toBeGreaterThan(result.wordCount * 2);
  });

  it('calculates avg words per sentence correctly', () => {
    const text = 'One two three four. Five six. Seven eight nine ten eleven twelve thirteen fourteen.';
    const result = analyzeReadability(text);
    expect(result.sentenceCount).toBe(3);
    // 14 words / 3 sentences ≈ 4.7
    expect(result.avgWordsPerSentence).toBeCloseTo(4.7, 0);
  });
});
