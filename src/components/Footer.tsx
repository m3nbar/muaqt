"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const { t, locale, localizePath } = useLanguage();

  const footerLinks = [
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
    { href: "/privacy", label: t.nav.privacy },
    { href: "/terms", label: t.nav.terms },
  ];

  return (
    <footer className="relative border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo size="sm" className="mb-3" />
            <p className="text-sm text-text-secondary leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizePath(link.href)}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">{t.footer.legal}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Muaqt &copy; {new Date().getFullYear()}. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
