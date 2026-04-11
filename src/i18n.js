import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

// Get the saved language from localStorage, default to English ('en')
const savedLanguage = localStorage.getItem('solo-lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
    },
    lng: savedLanguage, // Current language
    fallbackLng: 'en',  // Fallback if key not found
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
