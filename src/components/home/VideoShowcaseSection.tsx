import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Clock, ArrowRight } from 'lucide-react';
import { videos } from '../../data/videos';
import { Display, Text } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const VideoShowcaseSection: React.FC = () => {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

    return (
        <section ref={scrollRef} className="py-24 bg-gray-50 text-gray-900 overflow-hidden relative">
            <div className="container mx-auto px-6 md:px-12 mb-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
                    <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">
                            Video Library
                        </span>
                        <Display className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            Watch & Learn
                        </Display>
                        <Text className="text-gray-600 max-w-xl text-lg">
                            Expert-led video series, guided meditations, and educational content.
                        </Text>
                    </div>
                    <Button
                        variant="outline"
                        rightIcon={<ArrowRight size={18} />}
                        className="border-gray-200 hover:bg-gray-100 text-gray-900"
                        onClick={() => navigate('/videos')}
                    >
                        View All Series
                    </Button>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative w-full overflow-x-auto pb-12 hide-scrollbar pl-6 md:pl-12">
                <div className="flex gap-6 w-max">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative w-[300px] md:w-[360px] flex-shrink-0 cursor-pointer"
                            onClick={() => navigate(`/watch/${video.id}`)}
                        >
                            <div className="aspect-video rounded-xl overflow-hidden relative mb-4 bg-gray-200">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                        <Play size={20} className="text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-[10px] font-bold text-white flex items-center gap-1">
                                    <Clock size={10} />
                                    {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                                </div>
                            </div>

                            <div className="pr-4">
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{video.category}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:underline decoration-gray-300 underline-offset-4 transition-all line-clamp-2">
                                    {video.title}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {new Intl.NumberFormat('en-US', { notation: "compact" }).format(video.views)} views
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoShowcaseSection;
