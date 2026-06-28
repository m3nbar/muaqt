"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function FAQPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <AdPlaceholder className="w-full mb-6" />
      <h1 className="text-3xl font-bold text-text-primary mb-2">{t.faq.title}</h1>
      <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

      <div className="flex flex-col gap-3">
        {t.faq.items.map((item, i) => (
          <details key={i} className="glass-card group overflow-hidden">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-text-primary font-medium hover:text-primary transition-colors">
              <span>{item.q}</span>
              <svg
                className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border pt-3">
              {item.a}
            </div>
          </details>
        ))}
      </div>
      <AdPlaceholder className="w-full mt-8" />
    </div>
  );
}
