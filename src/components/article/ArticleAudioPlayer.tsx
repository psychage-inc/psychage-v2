import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleAudioPlayerProps {
    /** Pre-recorded audio URL (mp3/m4a). If absent, TTS mode is used. */
    audioUrl?: string;
    /** Plain-text content for TTS fallback */
    articleText?: string;
    articleTitle?: string;
    className?: string;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

/** Split text into chunks at sentence boundaries to avoid Chrome TTS silent-failure on long text */
function chunkText(text: string, maxLen = 800): string[] {
    const chunks: string[] = [];
    let remaining = text.trim();
    while (remaining.length > 0) {
        if (remaining.length <= maxLen) {
            chunks.push(remaining);
            break;
        }
        let splitAt = -1;
        // Prefer sentence boundaries
        for (const sep of ['. ', '! ', '? ', '.\n', '!\n', '?\n']) {
            const idx = remaining.lastIndexOf(sep, maxLen);
            if (idx > splitAt) splitAt = idx + sep.length;
        }
        // Fall back to comma, then space
        if (splitAt <= 0) {
            const commaIdx = remaining.lastIndexOf(', ', maxLen);
            if (commaIdx > 0) splitAt = commaIdx + 2;
            else {
                const spaceIdx = remaining.lastIndexOf(' ', maxLen);
                splitAt = spaceIdx > 0 ? spaceIdx + 1 : maxLen;
            }
        }
        chunks.push(remaining.slice(0, splitAt));
        remaining = remaining.slice(splitAt);
    }
    return chunks;
}

const ArticleAudioPlayer: React.FC<ArticleAudioPlayerProps> = ({
    audioUrl,
    articleText,
    articleTitle,
    className = '',
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
    const [isTTS, _setIsTTS] = useState(!audioUrl);

    const audioRef = useRef<HTMLAudioElement>(null);
    const ttsChunksRef = useRef<string[]>([]);
    const ttsChunkIndexRef = useRef(0);
    const ttsStartTimeRef = useRef<number>(0);
    const ttsActiveRef = useRef(false);

    // --- Pre-recorded audio handlers ---
    const togglePlayAudio = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const skipAudio = useCallback(
        (seconds: number) => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
        },
        [],
    );

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || isTTS) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress(audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0);
        };
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [isTTS]);

    useEffect(() => {
        if (audioRef.current && !isTTS) {
            audioRef.current.playbackRate = speed;
        }
    }, [speed, isTTS]);

    // --- TTS: speak a single chunk, then advance to the next ---
    const speakChunk = useCallback((index: number, rate: number) => {
        const chunks = ttsChunksRef.current;
        if (index >= chunks.length || !ttsActiveRef.current) {
            ttsActiveRef.current = false;
            setIsPlaying(false);
            setProgress(100);
            return;
        }
        ttsChunkIndexRef.current = index;
        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        utterance.rate = rate;
        utterance.onend = () => speakChunk(index + 1, rate);
        utterance.onerror = () => {
            ttsActiveRef.current = false;
            setIsPlaying(false);
        };
        speechSynthesis.speak(utterance);
    }, []);

    // --- TTS handlers ---
    const togglePlayTTS = useCallback(() => {
        if (!('speechSynthesis' in window)) return;

        if (isPlaying) {
            speechSynthesis.cancel();
            ttsActiveRef.current = false;
            setIsPlaying(false);
            return;
        }

        const text = (articleText || '').trim();
        if (!text) return;

        // Cancel any lingering speech (fixes Chrome stuck-state bug)
        speechSynthesis.cancel();

        const chunks = chunkText(text);
        ttsChunksRef.current = chunks;
        ttsChunkIndexRef.current = 0;
        ttsStartTimeRef.current = Date.now();
        ttsActiveRef.current = true;

        // Estimate total duration based on average speaking rate (150 words/min at 1x)
        const wordCount = text.split(/\s+/).length;
        const estimatedSeconds = (wordCount / 150) * 60;
        setDuration(estimatedSeconds);

        speakChunk(0, speed);
        setIsPlaying(true);
    }, [isPlaying, articleText, speed, speakChunk]);

    // Chrome workaround: speechSynthesis pauses after ~15s — periodically nudge it
    useEffect(() => {
        if (!isPlaying || !isTTS) return;
        const interval = setInterval(() => {
            if (speechSynthesis.speaking && !speechSynthesis.paused) {
                speechSynthesis.pause();
                speechSynthesis.resume();
            }
        }, 10_000);
        return () => clearInterval(interval);
    }, [isPlaying, isTTS]);

    // TTS progress tracking
    useEffect(() => {
        if (!isPlaying || !isTTS || duration === 0) return;

        const interval = setInterval(() => {
            const elapsed = (Date.now() - ttsStartTimeRef.current) / 1000 / speed;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);
            setCurrentTime(elapsed);
        }, 250);

        return () => clearInterval(interval);
    }, [isPlaying, isTTS, duration, speed]);

    // Cleanup TTS on unmount
    useEffect(() => {
        return () => {
            ttsActiveRef.current = false;
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
        };
    }, []);

    const handleToggle = isTTS ? togglePlayTTS : togglePlayAudio;

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const cycleSpeed = () => {
        const idx = SPEEDS.indexOf(speed);
        const next = SPEEDS[(idx + 1) % SPEEDS.length];
        setSpeed(next);
        if (isTTS && isPlaying) {
            // Restart TTS from current chunk with new speed
            speechSynthesis.cancel();
            ttsActiveRef.current = true;
            speakChunk(ttsChunkIndexRef.current, next);
        }
    };

    return (
        <div
            className={cn(
                'flex items-center gap-3 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-sm',
                className,
            )}
            role="region"
            aria-label={`Audio player: ${articleTitle || 'Article narration'}`}
        >
            {!isTTS && audioUrl && (
                <audio ref={audioRef} src={audioUrl} preload="metadata" />
            )}

            <Volume2 size={16} className="text-primary shrink-0" />

            {/* Skip back (only for pre-recorded) */}
            {!isTTS && (
                <button
                    onClick={() => skipAudio(-15)}
                    className="p-1 text-gray-500 hover:text-primary transition-colors"
                    aria-label="Skip back 15 seconds"
                >
                    <SkipBack size={14} />
                </button>
            )}

            {/* Play/Pause */}
            <button
                onClick={handleToggle}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            {/* Skip forward (only for pre-recorded) */}
            {!isTTS && (
                <button
                    onClick={() => skipAudio(15)}
                    className="p-1 text-gray-500 hover:text-primary transition-colors"
                    aria-label="Skip forward 15 seconds"
                >
                    <SkipForward size={14} />
                </button>
            )}

            {/* Progress bar */}
            <div className="flex-1 min-w-0">
                <div className="relative h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Time */}
            <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">
                {formatTime(currentTime)}
                {duration > 0 && ` / ${formatTime(duration)}`}
            </span>

            {/* Speed */}
            <button
                onClick={cycleSpeed}
                className="px-2 py-0.5 text-xs font-bold text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors whitespace-nowrap"
                aria-label={`Playback speed: ${speed}x`}
            >
                {speed}x
            </button>

            {/* TTS notice */}
            {isTTS && (
                <span className="hidden lg:inline text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    Device TTS
                </span>
            )}
        </div>
    );
};

export default ArticleAudioPlayer;
