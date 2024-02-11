// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";
import hiTranslation from "./locales/hi.json";
import idTranslation from "./locales/id.json";
import jaTranslation from "./locales/ja.json";
import kmTranslation from "./locales/km.json";
import koTranslation from "./locales/ko.json";
import loTranslation from "./locales/lo.json";
import msTranslation from "./locales/ms.json";
import myTranslation from "./locales/my.json";
import thTranslation from "./locales/th.json";
import tlTranslation from "./locales/tl.json";
import viTranslation from "./locales/vi.json";
import zhTranslation from "./locales/zh.json";

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
