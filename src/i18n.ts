import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LenguageDetector from 'i18next-browser-languagedetector';

import en from '@/locales/en/translation.json';
import es from '@/locales/es/translation.json';


i18n
  .use(LenguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {translation: en},
      es: {translation: es},
    },
  })

export default i18n;
