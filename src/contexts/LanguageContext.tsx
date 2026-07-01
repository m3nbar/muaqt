"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTranslation, getDirection, isRTL, getLocaleFromPathname, localizePath } from "@/i18n";
import type { SupportedLocale, Translation } from "@/types";

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: Translation;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  localizePath: (pathname: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocaleState] = useState<SupportedLocale>("en");

  useEffect(() => {
    const urlLocale = getLocaleFromPathname(pathname);
    setLocaleState(urlLocale);
  }, [pathname]);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    const withoutLocale = getPathWithoutLocale(pathname);
    const newPath = localizePath(withoutLocale, newLocale);
    router.push(newPath);
  }, [pathname, router]);

  const t = getTranslation(locale);
  const dir = getDirection(locale);
  const rtl = isRTL(locale);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale === "ar" ? "ar" : locale;
  }, [dir, locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir, isRTL: rtl, localizePath: (p: string) => localizePath(p, locale) }}>
      {children}
    </LanguageContext.Provider>
  );
}

function getPathWithoutLocale(pathname: string): string {
  const locales = ["ar", "en", "fr", "es", "de", "tr", "ru", "zh", "ja"];
  for (const l of locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
