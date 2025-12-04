import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';
import { NoiseTexture } from '../home/hero/HeroAssets';

interface CategoryCardProps {
    category: Category;
    onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 cursor-pointer h-full flex flex-col"
            onClick={onClick}
        >
            <NoiseTexture opacity={0.03} />

            {/* Header / Visual Area */}
            <div className={`h-32 ${category.color} relative overflow-hidden`}>
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
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {category.description}
                </p>

                <div className="flex items-center text-teal-600 dark:text-teal-400 font-bold text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform mt-auto">
                    Explore <ArrowRight size={16} className="ml-2" />
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryCard;
