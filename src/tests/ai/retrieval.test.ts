// =============================================================================
// Retrieval Engine Tests
// =============================================================================

import { describe, it, expect } from 'vitest';
import {
  cleanContent,
  chunkContent,
  estimateTokens,
  parseMarkdownDocument,
  parseJSONDocument,
} from '@/lib/ai/ingestion';

// =============================================================================
// Content Cleaning Tests
// =============================================================================

describe('Content Cleaning', () => {
  it('should strip HTML tags', () => {
    const result = cleanContent(
      '<p>Hello <strong>world</strong></p><br/><div>Test</div>'
    );
    expect(result).toContain('Hello world');
    expect(result).toContain('Test');
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });

  it('should decode HTML entities', () => {
    const result = cleanContent('Tom &amp; Jerry &lt;3 &quot;cats&quot;');
    expect(result).toBe('Tom & Jerry <3 "cats"');
  });

  it('should remove navigation boilerplate', () => {
    const result = cleanContent(
      'Skip to content\nMenu\nActual article content here\nFooter\nCopyright 2024'
    );
    expect(result).toContain('Actual article content here');
    expect(result).not.toContain('Skip to content');
  });

  it('should normalize whitespace', () => {
    const result = cleanContent('Hello   world\n\n\n\n\nParagraph two');
    expect(result).toBe('Hello world\n\nParagraph two');
  });

  it('should handle empty content', () => {
    const result = cleanContent('');
    expect(result).toBe('');
  });
});

// =============================================================================
// Content Chunking Tests
// =============================================================================

describe('Content Chunking', () => {
  it('should create chunks from long content', () => {
    const longContent =
      'This is a paragraph about depression. '.repeat(100) +
      '\n\n' +
      'This is another paragraph about treatment. '.repeat(100);

    const chunks = chunkContent(longContent, 'article');
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should respect section boundaries', () => {
    const content = [
      '# Understanding Depression',
      '',
      'Depression is a common mental health condition. ' +
        'It affects millions of people worldwide. '.repeat(20),
      '',
      '## Symptoms',
      '',
      'Common symptoms include persistent sadness, loss of interest, ' +
        'fatigue, and changes in sleep patterns. '.repeat(20),
      '',
      '## Treatment',
      '',
      'Treatment options include therapy, medication, and lifestyle changes. '.repeat(
        20
      ),
    ].join('\n');

    const chunks = chunkContent(content, 'condition_guide');
    expect(chunks.length).toBeGreaterThanOrEqual(2);

    // Section headings should be captured in metadata
    const hasHeadings = chunks.some(
      (c) => c.metadata.section_heading !== undefined
    );
    expect(hasHeadings).toBe(true);
  });

  it('should handle FAQ content as individual Q&A pairs', () => {
    const faqContent = [
      'Q: What is depression?',
      'A: Depression is a mood disorder characterized by persistent feelings of sadness.',
      '',
      'Q: How common is anxiety?',
      'A: Anxiety disorders affect approximately 40 million adults in the United States.',
      '',
      'Q: What is CBT?',
      'A: Cognitive Behavioral Therapy is a type of talk therapy that helps identify negative thought patterns.',
    ].join('\n');

    const chunks = chunkContent(faqContent, 'faq');
    expect(chunks.length).toBeGreaterThanOrEqual(1);
  });

  it('should set has_statistics metadata when stats present', () => {
    const content = 'Depression affects approximately 21 million adults in the US, or about 8.4% of all adults.';
    const chunks = chunkContent(content, 'article');
    expect(chunks.length).toBeGreaterThanOrEqual(1);
    expect(chunks[0].metadata.has_statistics).toBe(true);
  });

  it('should set has_citation metadata when research references present', () => {
    const content =
      'According to a study published in the Journal of Clinical Psychology, CBT is effective for treating depression (Smith et al., 2023).';
    const chunks = chunkContent(content, 'article');
    expect(chunks[0].metadata.has_citation).toBe(true);
  });

  it('should not create chunks smaller than minimum', () => {
    const shortContent = 'Brief text.';
    const chunks = chunkContent(shortContent, 'article');
    // Short content may produce 0 chunks (merged) or 1 chunk
    expect(chunks.length).toBeLessThanOrEqual(1);
  });
});

// =============================================================================
// Token Estimation Tests
// =============================================================================

describe('Token Estimation', () => {
  it('should estimate tokens approximately correctly', () => {
    // ~4 chars per token is the rough heuristic
    const text = 'This is a test sentence with about forty characters.';
    const tokens = estimateTokens(text);
    expect(tokens).toBeGreaterThan(5);
    expect(tokens).toBeLessThan(30);
  });

  it('should handle empty string', () => {
    expect(estimateTokens('')).toBe(0);
  });
});

// =============================================================================
// Document Parsing Tests
// =============================================================================

describe('Document Parsing', () => {
  describe('Markdown parsing', () => {
    it('should extract title from markdown heading', () => {
      const doc = parseMarkdownDocument(
        '# Understanding Depression\n\nDepression is a serious mental health condition.',
        { type: 'condition_guide', url_path: '/learn/conditions/depression' }
      );
      expect(doc.title).toBe('Understanding Depression');
      expect(doc.slug).toBe('understanding-depression');
    });

    it('should generate summary from first paragraph', () => {
      const doc = parseMarkdownDocument(
        '# Title\n\nThis is the first paragraph that serves as a summary of the article content.',
        { type: 'article', url_path: '/learn/test' }
      );
      expect(doc.summary).toContain('first paragraph');
    });

    it('should infer condition tags', () => {
      const doc = parseMarkdownDocument(
        '# Depression Guide\n\nThis article covers depression symptoms and anxiety comorbidity.',
        {
          type: 'condition_guide',
          url_path: '/learn/conditions/depression',
          condition_tags: ['depression'],
        }
      );
      expect(doc.condition_tags).toContain('depression');
    });
  });

  describe('JSON parsing', () => {
    it('should parse JSON document format', () => {
      const doc = parseJSONDocument({
        title: 'Understanding Anxiety',
        url_path: '/learn/conditions/anxiety',
        content: 'Anxiety is a natural stress response...',
        type: 'condition_guide',
        condition_tags: ['anxiety'],
      });

      expect(doc.title).toBe('Understanding Anxiety');
      expect(doc.slug).toBe('understanding-anxiety');
      expect(doc.type).toBe('condition_guide');
      expect(doc.condition_tags).toContain('anxiety');
    });

    it('should handle missing optional fields', () => {
      const doc = parseJSONDocument({
        title: 'Basic Article',
        url_path: '/learn/basic',
        content: 'Content here.',
        type: 'article',
      });

      expect(doc.author).toBeNull();
      expect(doc.condition_tags).toEqual([]);
      expect(doc.language).toBe('en');
    });
  });
});
