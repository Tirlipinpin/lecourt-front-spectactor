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
            WELCOME_TO_LECOURT: 'Welcome to Lecourt!',
            LOOK_AT_OUR_SHORTS: 'Have a look at our shorts, it\'s quick',
            HOMEPAGE_BUTTON: 'Homepage',
            SEARCH_BAR_PLACEHOLDER: 'Search for a short...',
            LOGOUT: 'Logout',
            YOUR_RECOMMENDATIONS: 'Your recommendations',
            OUR_SELECTION: 'Our selection',
            LATEST_SHORTS: 'Latest shorts',
            DURATION: 'Duration',
            RESULT_QUALITY: 'Result quality',
            YOU_SEARCHED_FOR: 'You searched for',
            OUR_MOVIES_FOR_THIS_GENRE: 'Our shorts for this genre',
            FOOTER: 'Lecourt ©2019 Created with love by the best developers ever',
            REGISTER: 'Register',
            LOGIN: 'Sign in',
            RESULT_RELEVANT: 'This result might be relevant for you',
            GENRES: 'Genres',
            BROWSE_OUR_GENRES: 'Browse our genres',
            WE_HOPE_YOU_FIND_YOUR_PERFECT_MATCH: 'We hope you\'ll find your perfect match',
            AUTH_NO_ACCOUNT: `Don't have an account yet?`,
            AUTH_REGISTER: `Register!`,
        }
      },
      fr: {
        translations: {
            WELCOME_TO_LECOURT: 'Bienvenue sur Lecourt !',
            LOOK_AT_OUR_SHORTS: 'Jetez un œil à nos courts, c\'est rapide',
            HOMEPAGE_BUTTON: 'Accueil',
            SEARCH_BAR_PLACEHOLDER: 'Recherchez...',
            LOGOUT: 'Déconnexion',
            YOUR_RECOMMENDATIONS: 'Vos recommandations',
            OUR_SELECTION: 'Notre sélection',
            LATEST_SHORTS: 'Les derniers courts métrages',
            DURATION: 'Durée',
            RESULT_QUALITY: 'Qualité du résultat',
            YOU_SEARCHED_FOR: 'Vous avez recherché',
            OUR_MOVIES_FOR_THIS_GENRE: 'Nos courts pour cette catégorie',
            FOOTER: 'Lecourt ©2019 Créé avec amour par les meilleurs développeurs',
            REGISTER: 'Inscription',
            LOGIN: 'Accéder à Lecourt',
            RESULT_RELEVANT: 'Ce résultat peut correspondre à ce que vous cherchez',
            GENRES: 'Catégories',
            BROWSE_OUR_GENRES: 'Naviguez dans nos catégories',
            WE_HOPE_YOU_FIND_YOUR_PERFECT_MATCH: 'Nous espérons que vous trouverez la catégorie parfaite pour vous',
            AUTH_NO_ACCOUNT: `Pas encore inscrit ?`,
            AUTH_REGISTER: `Inscrivez-vous !`,
        }
      }
    },
    lng: navigator.language,
    fallbackLng: "fr",

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
