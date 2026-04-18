import React from 'react';
import { Star, User } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-tertiary">
            <User size={20} />
          </div>
          <div>
            <div className="font-bold text-text-primary text-sm">{review.author}</div>
            <div className="text-xs text-text-tertiary">{review.date}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-border text-border"}
            />
          ))}
        </div>
      </div>
      <p className="text-text-secondary text-sm leading-relaxed">
        "{review.text}"
      </p>
    </div>
  );
};

export default ReviewCard;