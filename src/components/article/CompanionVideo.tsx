import React, { useState } from 'react';
import { Play, ChevronDown, ChevronUp, Film, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CompanionVideoProps {
    videoUrl?: string;
    videoPlatform?: 'youtube' | 'vimeo' | 'bunny' | 'self_hosted';
    videoStatus?: 'none' | 'planned' | 'scripted' | 'recorded' | 'published';
    videoDurationSeconds?: number;
    videoTranscript?: string;
    articleTitle: string;
    className?: string;
}

function extractYouTubeId(url: string): string | null {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? match[1] : null;
}

function extractVimeoId(url: string): string | null {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? match[1] : null;
}

function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const VideoPlayer: React.FC<{
    videoUrl: string;
    videoPlatform?: string;
    articleTitle: string;
}> = ({ videoUrl, videoPlatform, articleTitle }) => {
    if (videoPlatform === 'youtube' || (!videoPlatform && videoUrl.includes('youtu'))) {
        const id = extractYouTubeId(videoUrl);
        if (!id) return null;
        return (
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
                title={`Video: ${articleTitle}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
            />
        );
    }

    if (videoPlatform === 'vimeo' || (!videoPlatform && videoUrl.includes('vimeo'))) {
        const id = extractVimeoId(videoUrl);
        if (!id) return null;
        return (
            <iframe
                src={`https://player.vimeo.com/video/${id}?dnt=1`}
                title={`Video: ${articleTitle}`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
            />
        );
    }

    // Self-hosted or bunny CDN
    return (
        <video
            src={videoUrl}
            controls
            preload="metadata"
            className="absolute inset-0 w-full h-full object-contain bg-black"
            aria-label={`Video: ${articleTitle}`}
        >
            <track kind="captions" />
        </video>
    );
};

const ComingSoonPlaceholder: React.FC = () => (
    <div className="bg-surface-hover rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Film size={28} className="text-primary" />
        </div>
        <h4 className="text-lg font-bold text-text-primary mb-2">
            Video Coming Soon
        </h4>
        <p className="text-sm text-text-secondary mb-1 max-w-sm mx-auto">
            A companion video for this article is currently in production.
        </p>
        <p className="text-xs text-text-tertiary mb-4">
            Narrated by Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology
        </p>
        <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
            onClick={() => {
                // Future: newsletter/notification signup
            }}
        >
            <Bell size={14} />
            Notify Me
        </button>
    </div>
);

const CompanionVideo: React.FC<CompanionVideoProps> = ({
    videoUrl,
    videoPlatform,
    videoStatus = 'none',
    videoDurationSeconds,
    videoTranscript,
    articleTitle,
    className = '',
}) => {
    const [showTranscript, setShowTranscript] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Don't render anything if no video is planned
    if (videoStatus === 'none' && !videoUrl) return null;

    const isPublished = videoStatus === 'published' && videoUrl;

    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            id="companion-video"
            className={`not-prose my-10 scroll-mt-32 ${className}`}
        >
            <div className="flex items-center gap-2 mb-4">
                <Play size={18} className="text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                    Companion Video
                </h3>
                {isPublished && videoDurationSeconds && (
                    <span className="text-xs text-text-tertiary ml-auto">
                        {formatDuration(videoDurationSeconds)}
                    </span>
                )}
            </div>

            {isPublished ? (
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                    <div className="relative aspect-video bg-black">
                        <VideoPlayer
                            videoUrl={videoUrl}
                            videoPlatform={videoPlatform}
                            articleTitle={articleTitle}
                        />
                    </div>
                </div>
            ) : (
                <ComingSoonPlaceholder />
            )}

            {/* Transcript toggle */}
            {isPublished && (
                <div className="mt-3">
                    <button
                        onClick={() => setShowTranscript(!showTranscript)}
                        className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        aria-expanded={showTranscript}
                    >
                        {showTranscript ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
                    </button>
                    {showTranscript && (
                        <div className="mt-3 p-4 bg-surface rounded-xl border border-border max-h-64 overflow-y-auto text-sm leading-relaxed text-text-secondary">
                            {videoTranscript || (
                                <p className="text-text-tertiary italic">
                                    Transcript coming soon.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default CompanionVideo;
