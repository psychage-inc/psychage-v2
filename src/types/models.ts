import React from 'react';

export interface ProviderReview {
    id: string;
    user: string;
    date: string;
    rating: number;
    comment: string;
}

export interface Provider {
    id: number | string;
    name: string;
    role: string;
    image: string;
    specialties: string[];
    location: string;
    availability: string;
    insurance: string[];
    verified: boolean;
    bio: string;
    education: string[];
    languages: string[];
    approach: string;
    yearsExperience: number;
    nextAvailable?: string;
    isVideoVisit?: boolean;
    status?: string; // e.g., 'pending', 'active', 'suspended', 'rejected'
    email?: string;
    rating?: number;
    reviews?: number;
    reviewsList?: ProviderReview[];
}

export interface TranscriptSegment {
    timestamp: string;
    text: string;
}

export interface Video {
    id: number;
    title: string;
    thumbnail: string;
    duration: number; // in seconds
    views: number;
    category: string;
    videoUrl?: string; // YouTube or Vimeo URL
    videoType?: 'youtube' | 'vimeo' | 'direct';
    description?: string;
    transcript?: TranscriptSegment[];
}

export interface Tool {
    id: number;
    name: string;
    description: string;
    iconName: string;
    category: string;
    color: 'teal' | 'amber' | 'indigo' | 'sky' | 'rose' | 'red';
    features: string[];
}

export interface Question {
    id: number;
    text: string;
    dimension: 'anxiety' | 'mood' | 'stress' | 'sleep';
    options: {
        text: string;
        value: number;
    }[];
}

export interface Author {
    id: string;
    name: string;
    role: string;
    image: string;
    bio?: string;
    social?: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
}

export interface Citation {
    id: string;
    text?: string;
    /** Alternative prop name used by some articles */
    title?: string;
    link?: string;
    source: string;
    year?: string;
    tier?: import('@/lib/article-framework/types').SourceTier;
    sourceType?: import('@/lib/article-framework/types').ExpandedSourceType;
    doi?: string;
    authors?: string[];
    journalName?: string;
    accessDate?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon?: React.ReactNode;
    color?: string; // e.g., 'bg-blue-500' or hex
    image?: string;
    subTopics?: string[];
    group?: 'condition' | 'wellness' | 'life' | 'therapy' | 'identity' | 'family';
}

export interface KeyFact {
    text: string;
    citationIndex?: number;
}

export interface ExerciseStep {
    title?: string;
    description?: string;
    content?: string;
    instruction?: string;
    details?: string;
}

export interface ArticleExercise {
    title: string;
    steps: ExerciseStep[];
    toolLink?: string;
    toolLabel?: string;
}

export interface Article {
    id: number | string;
    slug: string;
    title: string;
    description?: string;
    image?: string;
    category: Category;
    readTime?: number;
    author?: Author;
    publishedAt?: string;
    updatedAt?: string;
    reviewedBy?: Author;
    tags: string[];
    content: React.ReactNode;
    citations?: Citation[];
    relatedArticles?: string[];
    featured?: boolean;
    views?: number;
    status?: string;
    // Phase 2: Article enrichment fields
    subtitle?: string;
    summary?: string;
    keyFacts?: KeyFact[];
    sparkMoment?: string;
    practicalExercise?: ArticleExercise;
    hero_image_url?: string;
    /** Flat-format fields used by some article content files */
    author_name?: string | Author;
    published_at?: string;
    word_count?: number;
    seo_description?: string;
    // Video fields
    videoUrl?: string;
    videoPlatform?: 'youtube' | 'vimeo' | 'bunny' | 'self_hosted';
    videoStatus?: 'none' | 'planned' | 'scripted' | 'recorded' | 'published';
    videoDurationSeconds?: number;
    videoTranscript?: string;
    // Audio fields
    audioUrl?: string;
    audioStatus?: 'tts_only' | 'planned' | 'recorded' | 'published';
    audioDurationSeconds?: number;
}
