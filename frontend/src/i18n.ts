// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en";
import esTranslation from "./locales/es";
import hiTranslation from "./locales/hi";
import idTranslation from "./locales/id";
import jaTranslation from "./locales/ja";
import kmTranslation from "./locales/km";
import koTranslation from "./locales/ko";
import loTranslation from "./locales/lo";
import msTranslation from "./locales/ms";
import myTranslation from "./locales/my";
import thTranslation from "./locales/th";
import tlTranslation from "./locales/tl";
import viTranslation from "./locales/vi";
import zhTranslation from "./locales/zh";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    es: {
      translation: esTranslation,
    },
    hi: {
      translation: hiTranslation,
    },
    id: {
      translation: idTranslation,
    },
    ja: {
      translation: jaTranslation,
    },
    km: {
      translation: kmTranslation,
    },
    ko: {
      translation: koTranslation,
    },
    lo: {
      translation: loTranslation,
    },
    ms: {
      translation: msTranslation,
    },
    my: {
      translation: myTranslation,
    },
    th: {
      translation: thTranslation,
    },
    tl: {
      translation: tlTranslation,
    },
    vi: {
      translation: viTranslation,
    },
    zh: {
      translation: zhTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
