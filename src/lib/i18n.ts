import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../locales/en/translation.json';
import ptTranslation from '../locales/pt/translation.json';
import esTranslation from '../locales/es/translation.json';
import svTranslation from '../locales/sv/translation.json';
import frTranslation from '../locales/fr/translation.json';

const resources = {
    en: { translation: enTranslation },
    pt: { translation: ptTranslation },
    es: { translation: esTranslation },
    sv: { translation: svTranslation },
    fr: { translation: frTranslation },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already escapes
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
