import React from 'react';
import { Phone, MessageSquare, Globe } from 'lucide-react';

const CrisisResources: React.FC = () => {
    return (
        <div className="bg-rose-50 dark:bg-rose-950/30 border-t border-rose-100 dark:border-rose-900/50 py-12 px-6">
            <div className="container mx-auto max-w-4xl text-center">
                <h3 className="text-2xl font-display font-bold text-rose-900 dark:text-rose-100 mb-4">
                    In Crisis? Help is Available.
                </h3>
                <p className="text-rose-800/80 dark:text-rose-200/80 mb-8 max-w-2xl mx-auto">
                    If you or someone you know is struggling or in immediate danger, please reach out to these free, confidential support services available 24/7.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="tel:988" className="flex flex-col items-center p-6 bg-white dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800 hover:shadow-lg hover:border-rose-200 transition-all group">
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-200 mb-4 group-hover:scale-110 transition-transform">
                            <Phone size={24} />
                        </div>
                        <div className="font-bold text-rose-900 dark:text-rose-100 text-lg mb-1">988</div>
                        <div className="text-sm text-rose-700 dark:text-rose-300">Suicide & Crisis Lifeline</div>
                    </a>

                    <a href="sms:741741" className="flex flex-col items-center p-6 bg-white dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800 hover:shadow-lg hover:border-rose-200 transition-all group">
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-200 mb-4 group-hover:scale-110 transition-transform">
                            <MessageSquare size={24} />
                        </div>
                        <div className="font-bold text-rose-900 dark:text-rose-100 text-lg mb-1">Text HOME to 741741</div>
                        <div className="text-sm text-rose-700 dark:text-rose-300">Crisis Text Line</div>
                    </a>

                    <a href="https://findtreatment.gov" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-white dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800 hover:shadow-lg hover:border-rose-200 transition-all group">
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-200 mb-4 group-hover:scale-110 transition-transform">
                            <Globe size={24} />
                        </div>
                        <div className="font-bold text-rose-900 dark:text-rose-100 text-lg mb-1">FindTreatment.gov</div>
                        <div className="text-sm text-rose-700 dark:text-rose-300">Treatment Locator</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CrisisResources;
