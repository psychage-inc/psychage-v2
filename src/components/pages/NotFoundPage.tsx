import React from 'react';
import { Home, Search, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">

                <div className="relative w-48 h-48 mx-auto mb-8">
                    <div className="absolute inset-0 bg-teal-100 rounded-full animate-pulse opacity-50" />
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                        <div className="text-8xl font-display font-bold text-teal-600">404</div>
                    </div>
                </div>

                <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">
                    Page not found.
                </h1>
                <p className="text-gray-500 mb-10 leading-relaxed">
                    The page you're looking for might have been moved, deleted, or possibly never existed.
                </p>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => navigate('/')}
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        leftIcon={<Home size={18} />}
                    >
                        Return Home
                    </Button>

                    <Button
                        onClick={() => navigate('/search')}
                        variant="outline"
                        className="w-full"
                        leftIcon={<Search size={18} />}
                    >
                        Search Psychage
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Popular Pages</p>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => navigate('/learn')} className="text-sm font-medium text-gray-600 hover:text-teal-600 flex items-center justify-center gap-1 group transition-colors">
                            Articles Library <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button onClick={() => navigate('/tools/clarity-score')} className="text-sm font-medium text-gray-600 hover:text-teal-600 flex items-center justify-center gap-1 group transition-colors">
                            Clarity Score Tool <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button onClick={() => navigate('/providers')} className="text-sm font-medium text-gray-600 hover:text-teal-600 flex items-center justify-center gap-1 group transition-colors">
                            Find Providers <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button onClick={() => navigate('/crisis')} className="text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center justify-center gap-1 group transition-colors mt-2">
                            Emergency Help <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NotFoundPage;