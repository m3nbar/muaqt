import translations from "./translations";
import type { SupportedLocale, Translation } from "@/types";

const STORAGE_KEY = "wahmi-locale";
const DEFAULT_LOCALE: SupportedLocale = "en";

const SUPPORTED_LOCALES: SupportedLocale[] = ["ar", "en", "fr", "es", "de", "tr", "ru", "zh", "ja"];

const RTL_LOCALES: SupportedLocale[] = ["ar"];

export function getBrowserLocale(): SupportedLocale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
    if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
  } catch {}

  const browserLang = navigator.language.split("-")[0] as SupportedLocale;
  if (SUPPORTED_LOCALES.includes(browserLang)) return browserLang;
  return DEFAULT_LOCALE;
}

export function setStoredLocale(locale: SupportedLocale): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  }
}

export function isRTL(locale: SupportedLocale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function getTranslation(locale: SupportedLocale): Translation {
  return translations[locale] || translations[DEFAULT_LOCALE];
}

export function getDirection(locale: SupportedLocale): "ltr" | "rtl" {
  return isRTL(locale) ? "rtl" : "ltr";
}

export function getPathWithoutLocale(pathname: string): string {
  for (const l of SUPPORTED_LOCALES) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export function localizePath(pathname: string, locale: string): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function getLocaleFromPathname(pathname: string): SupportedLocale {
  const match = SUPPORTED_LOCALES.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  return match || DEFAULT_LOCALE;
}

export type { SupportedLocale };
export { SUPPORTED_LOCALES, DEFAULT_LOCALE };
