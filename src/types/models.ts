import React from 'react';

export interface Review {
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
    rating: number;
    reviews: number;
    specialties: string[];
    location: string;
    availability: string;
    insurance: string[];
    verified: boolean;
    // New fields for profile
    bio: string;
    education: string[];
    languages: string[];
    approach: string;
    yearsExperience: number;
    reviewsList: Review[];
    nextAvailable?: string;
    isVideoVisit?: boolean;
    status?: string; // e.g., 'pending', 'active', 'suspended', 'rejected'
    email?: string;
}

export interface TranscriptSegment {
    timestamp: string;
    text: string;
}

export interface Video {
    id: number | string;
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
    text: string;
    link?: string;
    source: string;
    year?: string;
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

export interface Article {
    id: number | string;
    slug: string;
    title: string;
    description: string;
    image: string;
    category: Category;
    readTime: number;
    author: Author;
    publishedAt: string;
    updatedAt?: string;
    reviewedBy?: Author;
    tags: string[];
    content: React.ReactNode;
    citations?: Citation[];
    relatedArticles?: string[];
    featured?: boolean;
    views?: number;
}
