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
            DURATION: 'Duration',
            RESULT_QUALITY: 'Result quality',
            YOU_SEARCHED_FOR: 'You searched for',
            FOOTER: 'Lecourt ©2019 Created with love by the best developers ever',
            REGISTER: 'Register',
            LOGIN: 'Sign in',
        }
      },
      fr: {
        translations: {
            HOMEPAGE_BUTTON: 'Accueil',
            SEARCH_BAR_PLACEHOLDER: 'Recherchez...',
            LOGOUT: 'Déconnexion',
            YOUR_RECOMMENDATIONS: 'Vos recommandations',
            OUR_SELECTION: 'Notre sélection',
            LATEST_SHORTS: 'Les derniers courts métrages',
            DURATION: 'Durée',
            RESULT_QUALITY: 'Qualité du résultat',
            YOU_SEARCHED_FOR: 'Vous avez recherché',
            FOOTER: 'Lecourt ©2019 Créé avec amour par les meilleurs développeurs',
            REGISTER: 'Inscription',
            LOGIN: 'Connexion',
        }
      }
    },
    fallbackLng: "fr",

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
