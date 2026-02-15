import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../../types/models';

interface RelatedContentProps {
    articles: Article[];
    title?: string;
}

const RelatedContent: React.FC<RelatedContentProps> = ({ articles, title = "Related Articles" }) => {
    if (!articles || articles.length === 0) return null;

    return (
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="font-display font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-teal-600" />
                {title}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        to={`/learn/${article.category.slug}/${article.slug}`}
                        className="group bg-white p-4 rounded-xl border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 block">
                                {article.category.name}
                            </span>
                            <h4 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors mb-2 line-clamp-2">
                                {article.title}
                            </h4>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-4 group-hover:text-teal-600 font-medium">
                            Read Article <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedContent;
