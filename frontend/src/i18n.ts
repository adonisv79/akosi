// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import jaTranslation from './locales/ja.json';
import koTranslation from './locales/ko.json';
import thTranslation from './locales/th.json';
import tlTranslation from './locales/tl.json';
import zhTranslation from './locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
      ja: {
        translation: jaTranslation,
      },
      ko: {
        translation: koTranslation,
      },
      th: {
        translation: thTranslation,
      },
      tl: {
        translation: tlTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
