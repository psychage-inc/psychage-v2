import React, { useMemo } from 'react';

interface VideoPlayerProps {
    videoUrl?: string;
    videoType?: 'youtube' | 'vimeo' | 'direct';
    title: string;
    className?: string;
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
function getYouTubeId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

/**
 * Extracts Vimeo video ID from various Vimeo URL formats
 */
function getVimeoId(url: string): string | null {
    const patterns = [
        /vimeo\.com\/(\d+)/,
        /vimeo\.com\/video\/(\d+)/,
        /player\.vimeo\.com\/video\/(\d+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, videoType, title, className = '' }) => {
    const embedUrl = useMemo(() => {
        if (!videoUrl) return null;

        // Auto-detect video type if not specified
        const type = videoType || (
            videoUrl.includes('youtube') || videoUrl.includes('youtu.be') ? 'youtube' :
            videoUrl.includes('vimeo') ? 'vimeo' : 'direct'
        );

        switch (type) {
            case 'youtube': {
                const videoId = getYouTubeId(videoUrl);
                if (videoId) {
                    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
                }
                break;
            }
            case 'vimeo': {
                const videoId = getVimeoId(videoUrl);
                if (videoId) {
                    return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
                }
                break;
            }
            case 'direct':
                return videoUrl;
        }
        return null;
    }, [videoUrl, videoType]);

    if (!embedUrl) {
        return (
            <div className={`w-full h-full flex items-center justify-center bg-gray-900 text-gray-400 ${className}`}>
                <p className="text-center">Video unavailable</p>
            </div>
        );
    }

    // For direct video files
    if (videoType === 'direct' || (!videoUrl?.includes('youtube') && !videoUrl?.includes('vimeo') && !videoUrl?.includes('youtu.be'))) {
        return (
            <video
                className={`w-full h-full object-cover ${className}`}
                controls
                autoPlay
                title={title}
            >
                <source src={embedUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

    // For YouTube/Vimeo embeds
    return (
        <iframe
            className={`w-full h-full ${className}`}
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        />
    );
};

export default VideoPlayer;
