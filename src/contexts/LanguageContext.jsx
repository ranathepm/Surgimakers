"use client";

import { createContext, useContext, useMemo } from "react";
import translations from "../locales";

const LanguageContext = createContext();

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸", direction: "ltr" },
];

export function LanguageProvider({ children }) {
  const value = useMemo(() => {
    const t = (key) => {
      const keys = key.split(".");
      let current = translations.en;

      for (const item of keys) {
        if (current && Object.prototype.hasOwnProperty.call(current, item)) {
          current = current[item];
          continue;
        }

        return key;
      }

      return current || key;
    };

    return {
      language: "en",
      changeLanguage: () => {},
      t,
      LANGUAGES,
    };
  }, []);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}

export { LANGUAGES };
