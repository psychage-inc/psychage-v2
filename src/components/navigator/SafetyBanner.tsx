import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
    return (
        <div className="bg-red-50 dark:bg-crisis-red/5 border-b border-red-200 dark:border-crisis-red/20 relative z-40">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-start sm:items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-crisis-red flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                    Your safety is our priority. If you are in immediate danger or experiencing a medical emergency, please call{' '}
                    <a href="tel:911" className="underline font-bold text-red-600 dark:text-red-400">911</a>{' '}
                    (or your local emergency number) immediately.
                </p>
            </div>
        </div>
    );
};
