import { useTranslation } from 'react-i18next';
import { articles as enArticles } from './en';
import { articles as esArticles } from './es';
// Import other languages as they are created

export const useArticles = () => {
    const { i18n } = useTranslation();

    switch (i18n.language) {
        case 'es':
            return esArticles;
        case 'pt':
            return enArticles; // Fallback to EN for now
        case 'sv':
            return enArticles; // Fallback to EN for now
        case 'fr':
            return enArticles; // Fallback to EN for now
        default:
            return enArticles;
    }
};
