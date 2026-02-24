import React from 'react';
import { AlertCircle } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
    return (
        <div className="bg-sage-50 dark:bg-sage-900/10 border-b border-sage-200 dark:border-sage-800/50 relative z-40">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-start sm:items-center gap-3">
                <AlertCircle className="w-5 h-5 text-sage-600 dark:text-sage-400 flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
                <p className="text-sm text-charcoal-700 dark:text-charcoal-300 font-medium">
                    Your safety is our priority. If you are in immediate danger or experiencing a medical emergency, please call your local emergency services immediately.
                </p>
            </div>
        </div>
    );
};
