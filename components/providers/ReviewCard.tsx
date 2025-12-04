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
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
            <User size={20} />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{review.author}</div>
            <div className="text-xs text-gray-400">{review.date}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} 
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        "{review.text}"
      </p>
    </div>
  );
};

export default ReviewCard;