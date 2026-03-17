"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import translations from '../locales';

const LanguageContext = createContext();

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', direction: 'ltr' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', direction: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', direction: 'ltr' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', direction: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', direction: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', direction: 'rtl' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳', direction: 'ltr' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩', direction: 'ltr' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', direction: 'ltr' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', direction: 'ltr' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', direction: 'ltr' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', direction: 'ltr' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', direction: 'ltr' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', direction: 'ltr' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮', direction: 'ltr' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', direction: 'ltr' },
  { code: 'ro', name: 'Română', flag: '🇷🇴', direction: 'ltr' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿', direction: 'ltr' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', direction: 'ltr' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', direction: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', direction: 'ltr' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾', direction: 'ltr' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', direction: 'ltr' },
  { code: 'he', name: 'עברית', flag: '🇮🇱', direction: 'rtl' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷', direction: 'rtl' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺', direction: 'ltr' },
  { code: 'bg', name: 'Български', flag: '🇧🇬', direction: 'ltr' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸', direction: 'ltr' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷', direction: 'ltr' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰', direction: 'ltr' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮', direction: 'ltr' },
  { code: 'ca', name: 'Català', flag: '🇪🇸', direction: 'ltr' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪', direction: 'ltr' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻', direction: 'ltr' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹', direction: 'ltr' },
  { code: 'mt', name: 'Malti', flag: '🇲🇹', direction: 'ltr' },
  { code: 'cy', name: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', direction: 'ltr' },
  { code: 'is', name: 'Íslenska', flag: '🇮🇸', direction: 'ltr' },
  { code: 'sq', name: 'Shqip', flag: '🇦🇱', direction: 'ltr' },
  { code: 'mk', name: 'Македонски', flag: '🇲🇰', direction: 'ltr' },
];

const GOOGLE_LANG_MAP = {
  zh: 'zh-CN',
  he: 'iw',
};

function getGoogleLang(code) {
  return GOOGLE_LANG_MAP[code] || code;
}

function waitForGoogleCombo(maxAttempts = 40) {
  return new Promise((resolve) => {
    let attempts = 0;
    const timer = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo');
      attempts += 1;
      if (combo || attempts >= maxAttempts) {
        clearInterval(timer);
        resolve(combo || null);
      }
    }, 150);
  });
}

function ensureGoogleTranslateLoaded() {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.__googleTranslateReadyPromise) {
    return window.__googleTranslateReadyPromise;
  }

  window.__googleTranslateReadyPromise = new Promise((resolve) => {
    const existing = document.getElementById('google-translate-script');
    if (existing) {
      resolve();
      return;
    }

    if (!document.getElementById('google_translate_element')) {
      const host = document.createElement('div');
      host.id = 'google_translate_element';
      document.body.appendChild(host);
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      }
      resolve();
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });

  return window.__googleTranslateReadyPromise;
}

async function applyFullPageTranslation(langCode) {
  if (typeof window === 'undefined') {
    return;
  }

  await ensureGoogleTranslateLoaded();
  const combo = await waitForGoogleCombo();
  if (!combo) {
    return;
  }

  const targetLang = getGoogleLang(langCode);
  const current = combo.value;
  if (current === targetLang) {
    return;
  }

  combo.value = targetLang;
  combo.dispatchEvent(new Event('change'));
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && LANGUAGES.some((lang) => lang.code === savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    const currentLang = LANGUAGES.find((lang) => lang.code === language);
    document.documentElement.dir = currentLang?.direction || 'ltr';
    document.documentElement.lang = currentLang?.code || 'en';
    const target = currentLang?.code || 'en';
    applyFullPageTranslation(target);

    // Re-apply for route transitions and async-rendered blocks.
    const retries = [350, 900, 1700];
    const timers = retries.map((ms) =>
      setTimeout(() => {
        applyFullPageTranslation(target);
      }, ms)
    );

    return () => {
      timers.forEach((id) => clearTimeout(id));
    };
  }, [language, pathname]);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations['en'];
        for (const k of keys) {
          if (value && value[k]) {
            value = value[k];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

export { LANGUAGES };
