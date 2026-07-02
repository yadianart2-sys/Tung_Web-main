import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar archivos de traducción
import en from './locales/en.json';
import es from './locales/es.json';

/**
 * Configuración de i18next para TUNG
 * Soporta inglés (en) y español (es)
 * Detecta automáticamente el idioma del navegador
 * Guarda la preferencia en localStorage
 */
i18n
  // Detecta el idioma del navegador
  .use(LanguageDetector)
  // Inicializa react-i18next
  .use(initReactI18next)
  .init({
    // Recursos de traducción
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    // Idioma por defecto si no se detecta ninguno
    fallbackLng: 'en',
    // No escapar valores (confiamos en nuestro contenido)
    interpolation: {
      escapeValue: false,
    },
    // Opciones del detector
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'tung-lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
