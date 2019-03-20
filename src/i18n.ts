import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
            HOMEPAGE_BUTTON: 'Homepage',
            SEARCH_BAR_PLACEHOLDER: 'Search for a short...',
            LOGOUT: 'Logout',
            YOUR_RECOMMENDATIONS: 'Your recommendations',
            OUR_SELECTION: 'Our selection',
            LATEST_SHORTS: 'Latest shorts',
        }
      },
      fr: {
        translations: {
            HOMEPAGE_BUTTON: 'Accueil',
            SEARCH_BAR_PLACEHOLDER: 'Recherchez un court métrage...',
            LOGOUT: 'Déconnexion',
            YOUR_RECOMMENDATIONS: 'Vos recommandations',
            OUR_SELECTION: 'Notre sélection',
            LATEST_SHORTS: 'Les derniers courts métrages',
        }
      }
    },
    fallbackLng: "fr",
    debug: true,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
