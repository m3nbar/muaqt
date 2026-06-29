"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useEmail } from "@/contexts/EmailContext";
import type { SupportedLocale } from "@/types";
import { SUPPORTED_LOCALES } from "@/i18n";

function Flag({ locale }: { locale: SupportedLocale }) {
  if (locale === "ar") {
    return <img src="/flags/arabian.svg" alt="" className="inline-block w-[18px] h-[18px]" />;
  }
  const emojis: Record<Exclude<SupportedLocale, "ar">, string> = {
    en: "🇬🇧",
    fr: "🇫🇷",
    es: "🇪🇸",
    de: "🇩🇪",
    tr: "🇹🇷",
    ru: "🇷🇺",
    zh: "🇨🇳",
    ja: "🇯🇵",
  };
  return <span className="text-base">{emojis[locale as Exclude<SupportedLocale, "ar">]}</span>;
}

const localeNames: Record<SupportedLocale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  tr: "Türkçe",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
};

export default function Header() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const { isDark, toggle } = useTheme();
  const { session, createNewEmail, loading } = useEmail();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/inbox", label: t.nav.inbox },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {session && pathname !== "/" && (
            <button
              onClick={createNewEmail}
              disabled={loading}
              className="btn-primary text-sm px-4 py-2 hidden sm:block"
            >
              {loading ? t.hero.generating : t.inbox.newEmail}
            </button>
          )}

          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="btn-ghost text-sm px-2 py-2 rounded-lg flex items-center gap-1"
            >
              <Flag locale={locale} />
              <span className="hidden sm:inline text-xs text-text-secondary">{locale.toUpperCase()}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 glass-card p-1 min-w-[160px] scale-in z-50">
                {SUPPORTED_LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      locale === l
                        ? "bg-primary/10 text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface"
                    }`}
                  >
                    <Flag locale={l} />
                    <span>{localeNames[l]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggle}
            className="btn-ghost p-2 rounded-lg"
            title={isDark ? t.theme.light : t.theme.dark}
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden btn-ghost p-2 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border p-4 fade-in">
          <nav className="flex flex-col gap-1 mb-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm text-text-muted hover:text-text-secondary"
          >
            {t.nav.privacy}
          </Link>
          <Link
            href="/terms"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm text-text-muted hover:text-text-secondary"
          >
            {t.nav.terms}
          </Link>
        </div>
      )}
    </header>
  );
}
