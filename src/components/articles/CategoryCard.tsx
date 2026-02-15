import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';
import { NoiseTexture } from '../home/hero/HeroAssets';
import InteractiveCard from '../ui/InteractiveCard';

interface CategoryCardProps {
    category: Category;
    onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
    return (
        <InteractiveCard
            className="group h-full flex flex-col cursor-pointer border-white/5 bg-white/5 backdrop-blur-sm dark:bg-white/5 dark:border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all duration-300"
            onClick={onClick}
            spotlightColor="rgba(20, 184, 166, 0.15)" // Teal spotlight
        >
            <NoiseTexture opacity={0.03} />

            {/* Header / Visual Area */}
            <div className={`h-32 ${category.color} relative overflow-hidden rounded-t-2xl`}>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 dark:from-white/5 dark:to-black/40" />

                {/* Large Vector Background */}
                <div className="absolute -bottom-6 -right-6 text-white opacity-20 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 ease-out">
                    {React.cloneElement(category.icon as React.ReactElement, { size: 140, strokeWidth: 1.5 })}
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-6 text-white z-10">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl inline-flex mb-2 shadow-sm border border-white/10">
                        {React.cloneElement(category.icon as React.ReactElement, { size: 20, className: "text-white" })}
                    </div>
                    <h3 className="font-display font-bold text-2xl tracking-tight text-white shadow-black/5 drop-shadow-sm">
                        {category.name}
                    </h3>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-grow relative">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                    {category.description}
                </p>

                <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform mt-auto">
                    Explore <ArrowRight size={16} className="ml-2" />
                </div>
            </div>
        </InteractiveCard>
    );
};

export default CategoryCard;
