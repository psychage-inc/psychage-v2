import React from 'react';
import { Headphones } from 'lucide-react';
import ArticleAudioPlayer from '@/components/article/ArticleAudioPlayer';

interface ConditionListenControlProps {
    /** Condition name, used as the spoken title + player a11y label. */
    title: string;
    /** Already-assembled, plain-text reading of the condition's filled sections. */
    text: string;
}

/**
 * An elegant "Listen" control for the condition page. Reuses the article audio player
 * (Web Speech API narration) — rendered only when a definition exists.
 */
const ConditionListenControl: React.FC<ConditionListenControlProps> = ({ title, text }) => (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary">
            <Headphones size={16} className="text-primary" aria-hidden="true" />
            Listen
        </span>
        <ArticleAudioPlayer articleText={text} articleTitle={title} className="sm:max-w-md" />
    </div>
);

export default ConditionListenControl;
