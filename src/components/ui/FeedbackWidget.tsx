import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { submitFeedback } from '@/services/feedbackService';

interface FeedbackWidgetProps {
  contentType: 'article' | 'tool-result';
  contentId: string;
  className?: string;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  contentType,
  contentId,
  className = '',
}) => {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const handleVote = async (helpful: boolean) => {
    const v = helpful ? 'up' : 'down';
    setVote(v);
    setShowComment(true);
    await submitFeedback({
      content_type: contentType,
      content_id: contentId,
      helpful,
    });
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      setSubmitted(true);
      return;
    }
    await submitFeedback({
      content_type: contentType,
      content_id: contentId,
      helpful: vote === 'up',
      comment: comment.trim(),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-2 py-4 border-t border-border/40 ${className}`}>
        <span className="text-sm text-primary font-medium">
          Thanks for your feedback
        </span>
      </div>
    );
  }

  return (
    <div className={`py-4 border-t border-border/40 ${className}`}>
      {!vote ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-secondary">Was this helpful?</span>
          <button
            onClick={() => handleVote(true)}
            className="p-2.5 rounded-full hover:bg-surface-hover transition-colors text-text-tertiary hover:text-primary"
            aria-label="Yes, this was helpful"
          >
            <ThumbsUp size={16} />
          </button>
          <button
            onClick={() => handleVote(false)}
            className="p-2.5 rounded-full hover:bg-surface-hover transition-colors text-text-tertiary hover:text-text-primary"
            aria-label="No, this was not helpful"
          >
            <ThumbsDown size={16} />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {vote === 'up' ? (
              <ThumbsUp size={14} className="text-primary" />
            ) : (
              <ThumbsDown size={14} className="text-text-tertiary" />
            )}
            <span className="text-sm text-text-secondary">
              {showComment && !submitted
                ? 'Anything you\'d like to add? (optional)'
                : ''}
            </span>
          </div>
          <div className="flex gap-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={2}
              className="flex-1 rounded-xl border border-border bg-surface py-3 px-4 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
            />
            <button
              onClick={handleSubmitComment}
              className="p-2.5 rounded-full hover:bg-surface-hover transition-colors text-text-tertiary hover:text-primary self-end"
              aria-label="Submit feedback"
            >
              <Send size={16} />
            </button>
          </div>
          <button
            onClick={() => setSubmitted(true)}
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget;
