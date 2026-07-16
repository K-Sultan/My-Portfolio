"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  translations,
  type Language,
  type TranslationKey,
} from "../lib/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Load saved language preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Language | null;
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    if (!mounted) return;

    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem("portfolio-lang", language);
  }, [language, mounted]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  // Prevent flash of wrong language direction
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
