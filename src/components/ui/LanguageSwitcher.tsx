import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    const handleLanguageChange = (code: string) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-text-secondary text-sm font-medium border border-border rounded-full px-4 py-2 hover:border-text-tertiary hover:text-text-primary transition-colors cursor-pointer bg-transparent"
                aria-label="Select Language"
            >
                <Globe size={16} />
                <span>{currentLanguage.name}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-0 mb-2 w-48 bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    >
                        <div className="py-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-surface-hover transition-colors ${i18n.language === lang.code ? 'text-primary font-medium' : 'text-text-secondary'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-base">{lang.flag}</span>
                                        {lang.name}
                                    </span>
                                    {i18n.language === lang.code && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
