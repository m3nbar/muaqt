"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getBrowserLocale, setStoredLocale, getTranslation, getDirection, isRTL } from "@/i18n";
import type { SupportedLocale, Translation } from "@/types";

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: Translation;
  dir: "ltr" | "rtl";
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");

  useEffect(() => {
    setLocaleState(getBrowserLocale());
  }, []);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
  }, []);

  const t = getTranslation(locale);
  const dir = getDirection(locale);
  const rtl = isRTL(locale);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale === "ar" ? "ar" : locale;
  }, [dir, locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir, isRTL: rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
