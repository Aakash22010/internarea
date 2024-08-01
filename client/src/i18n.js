import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import hiTranslation from './locales/hi/translation.json';
import ptTranslation from './locales/pt/translation.json';
import zhTranslation from './locales/zh/translation.json';
import frTranslation from './locales/fr/translation.json';

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  hi: { translation: hiTranslation },
  pt: { translation: ptTranslation },
  zh: { translation: zhTranslation },
  fr: { translation: frTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;
