import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ArticleStructuredData {
    headline: string;
    description: string;
    image?: string;
    authorName?: string;
    datePublished?: string;
    dateModified?: string;
    categoryName?: string;
    categorySlug?: string;
    url?: string;
    reviewedByName?: string;
    reviewedByRole?: string;
    tags?: string[];
    isMedical?: boolean;
}

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    canonical?: string;
    article?: ArticleStructuredData;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Psychage | Mental Health Intelligence',
    description = 'The first adaptive operating system for mental health. Explore your mental wellness with evidence-informed tools and AI-powered support.',
    image = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
    type = 'website',
    canonical,
    article,
}) => {
    const isMedical = article?.isMedical !== false; // Default true for articles
    const schemaType = isMedical ? 'MedicalWebPage' : 'Article';

    const articleJsonLd = article ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': schemaType,
        headline: article.headline,
        description: article.description,
        image: article.image,
        author: {
            '@type': 'Organization',
            name: 'Psychage',
            url: 'https://psychage.com',
        },
        ...(article.reviewedByName && {
            reviewedBy: {
                '@type': 'Person',
                name: article.reviewedByName,
                jobTitle: article.reviewedByRole || 'Clinical Neuropsychology',
            },
        }),
        publisher: {
            '@type': 'Organization',
            name: 'Psychage',
            url: 'https://psychage.com',
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': article.url || canonical,
        },
    }) : null;

    const breadcrumbJsonLd = article?.categoryName ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://psychage.com/' },
            { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://psychage.com/learn' },
            { '@type': 'ListItem', position: 3, name: article.categoryName, item: `https://psychage.com/learn/${article.categorySlug}` },
            { '@type': 'ListItem', position: 4, name: article.headline },
        ],
    }) : null;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Canonical */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Psychage" />
            {canonical && <meta property="og:url" content={canonical} />}

            {/* Article-specific OG tags */}
            {article?.datePublished && <meta property="article:published_time" content={article.datePublished} />}
            {article?.dateModified && <meta property="article:modified_time" content={article.dateModified} />}
            {article && <meta property="article:author" content="Psychage" />}
            {article?.categoryName && <meta property="article:section" content={article.categoryName} />}
            {article?.tags?.map((tag, i) => (
                <meta key={i} property="article:tag" content={tag} />
            ))}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data */}
            {articleJsonLd && (
                <script type="application/ld+json">{articleJsonLd}</script>
            )}
            {breadcrumbJsonLd && (
                <script type="application/ld+json">{breadcrumbJsonLd}</script>
            )}
        </Helmet>
    );
};

export default SEO;
