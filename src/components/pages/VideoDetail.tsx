import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, ThumbsUp, Share2, Bookmark, CheckCircle } from 'lucide-react';
import { videoService } from '../../services/videoService';
import { Video } from '../../types/models';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../SEO';
import VideoPlayer from '../video/VideoPlayer';

const VideoDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | undefined>();
    const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(true);
                try {
                    const foundVideo = await videoService.getById(Number(id));
                    setVideo(foundVideo);

                    const allVideos = await videoService.getAll();
                    setRelatedVideos(allVideos.filter(v => v.id !== Number(id)).slice(0, 3));
                } catch (error) {
                    console.error("Failed to fetch video", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsPlaying(false);
    }, [video]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!video) {
        return <div className="min-h-screen flex items-center justify-center">Video not found</div>;
    }

    return (
        <div className="min-h-screen bg-surface">
            <SEO
                title={`${video.title} | Psychage`}
                description={`Watch ${video.title} on Psychage.`}
                image={video.thumbnail}
                type="video.other"
            />
            {/* Sticky Header */}
            <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4">
                <div className="container mx-auto max-w-content flex items-center gap-4">
                    <button onClick={() => navigate('/')} aria-label="Go back" className="p-2 hover:bg-surface-hover rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-text-secondary" />
                    </button>
                    <h1 className="text-sm font-bold text-text-primary truncate flex-grow">
                        {video.title}
                    </h1>
                    <Button size="sm" variant="primary" className="h-9 px-4 rounded-full">Subscribe</Button>
                </div>
            </div>

            <main className="container mx-auto max-w-content px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Player & Info */}
                    <div className="lg:col-span-8">
                        {/* Player Container */}
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-6 group">
                            {!isPlaying ? (
                                <>
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsPlaying(true)}
                                            aria-label={`Play video: ${video.title}`}
                                            className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-white/30 transition-all"
                                        >
                                            <Play size={32} fill="currentColor" className="ml-1" />
                                        </motion.button>
                                    </div>
                                </>
                            ) : (
                                <VideoPlayer
                                    videoUrl={video.videoUrl}
                                    videoType={video.videoType}
                                    title={video.title}
                                />
                            )}
                        </div>

                        {/* Video Header */}
                        <h1 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
                            {video.title}
                        </h1>

                        {/* Stats & Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-border pb-6 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">
                                    PS
                                </div>
                                <div>
                                    <div className="font-bold text-text-primary">Psychage Studios</div>
                                    <div className="text-xs text-text-secondary">{video.views.toLocaleString()} views • 2 days ago</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button aria-label="Like this video" className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-hover text-sm font-bold text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    <ThumbsUp size={16} /> 12K
                                </button>
                                <button aria-label="Share this video" className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-hover text-sm font-bold text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    <Share2 size={16} /> Share
                                </button>
                                <button aria-label="Save this video" className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-hover text-sm font-bold text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    <Bookmark size={16} /> Save
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-surface-hover rounded-2xl p-6 mb-8">
                            <div className="text-sm font-bold text-text-primary mb-2">About this video</div>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                {video.description || `In this session, we explore topics related to ${video.category.toLowerCase()} to help you on your mental wellness journey.`}
                            </p>
                            <div className="flex gap-2 text-xs font-bold text-teal-600">
                                <span>#{video.category}</span>
                                <span>#MentalHealth</span>
                                <span>#SelfCare</span>
                            </div>
                        </div>

                        {/* Transcript */}
                        <div>
                            <h3 className="font-bold text-text-primary mb-4">Transcript</h3>
                            <div className="h-64 overflow-y-auto border border-border rounded-xl p-4 text-sm text-text-secondary leading-relaxed space-y-4">
                                {video.transcript && video.transcript.length > 0 ? (
                                    video.transcript.map((segment, index) => (
                                        <p key={index}>
                                            <span className="text-teal-600 font-mono text-xs mr-2">{segment.timestamp}</span>
                                            {segment.text}
                                        </p>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
                                        <CheckCircle size={24} className="mb-2 opacity-50" />
                                        <p className="italic">Transcript coming soon...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Related */}
                    <div className="lg:col-span-4">
                        <h3 className="font-bold text-text-primary mb-6">Up Next</h3>
                        <div className="flex flex-col gap-4">
                            {relatedVideos.map((rel) => (
                                <Link
                                    key={rel.id}
                                    to={`/watch/${rel.id}`}
                                    className="group flex gap-3"
                                >
                                    <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-surface-hover shrink-0">
                                        <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 rounded text-[10px] font-bold text-white">
                                            {Math.floor(rel.duration / 60)}:{(rel.duration % 60).toString().padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-text-primary leading-tight mb-1 line-clamp-2 group-hover:text-teal-600 transition-colors">
                                            {rel.title}
                                        </h4>
                                        <div className="text-xs text-text-secondary">{rel.category}</div>
                                        <div className="text-xs text-text-tertiary mt-1">15K views</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VideoDetail;