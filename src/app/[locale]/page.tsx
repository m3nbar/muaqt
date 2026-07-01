"use client";

import { useEffect } from "react";
import { useEmail } from "@/contexts/EmailContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import Logo from "@/components/Logo";
import InboxView from "@/components/InboxView";
import AdsBanner from "@/components/AdsBanner";
import { openSmartlink } from "@/lib/smartlink";

export default function HomePage() {
  const { session, loading, createNewEmail, messages, newCount } = useEmail();
  const { t, locale } = useLanguage();
  const { isDark } = useTheme();

  useEffect(() => {
    if (!session && !loading) {
      createNewEmail();
    }
  }, [session, loading, createNewEmail]);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="relative overflow-x-clip">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col items-center text-center mb-8">
            <Logo size="lg" className="mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
              <span className="text-gradient">{t.hero.title}</span>
            </h1>
            <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto mb-6">
              {t.hero.subtitle}
            </p>

            {!session && !loading && (
              <button onClick={() => { openSmartlink(); createNewEmail(); }} className="btn-primary text-lg px-8 py-3">
                {t.hero.createEmail}
              </button>
            )}

            {loading && (
              <div className="flex items-center gap-2 btn-primary text-lg px-8 py-3 opacity-80 cursor-wait">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t.hero.generating}
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto">
            <AdsBanner />
            <InboxView />
            <AdsBanner />
          </div>
        </div>
      </section>
    </div>
  );
}
