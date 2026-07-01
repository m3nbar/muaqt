"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useEmail } from "@/contexts/EmailContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Timer from "./Timer";
import { openSmartlink } from "@/lib/smartlink";

export default function Sidebar() {
  const { t, isRTL, localizePath } = useLanguage();
  const { session, messages, newCount, createNewEmail, loading } = useEmail();
  const pathname = usePathname();

  if (!session) return null;

  const sidebarLinks = [
    { href: "/inbox", label: t.nav.inbox, icon: "inbox" },
    { href: "/faq", label: t.nav.faq, icon: "help" },
    { href: "/contact", label: t.nav.contact, icon: "mail" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-4 px-3 gap-1">
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{t.inbox.title}</span>
          <span className="badge badge-accent text-xs">{messages.length}</span>
        </div>

        <div className="text-sm font-mono text-text-primary truncate mb-2" title={session.address}>
          {session.address}
        </div>

        <Timer
          createdAt={session.createdAt}
          expiresAt={session.expiresAt}
          className="mb-3"
        />

        <button
          onClick={() => { openSmartlink(); createNewEmail(); }}
          disabled={loading}
          className="btn-primary w-full text-sm py-2"
        >
          {loading ? t.hero.generating : t.inbox.newEmail}
        </button>
      </div>

      <div className="flex flex-col gap-0.5">
        {sidebarLinks.map((link) => {
          const localized = localizePath(link.href);
          return (
            <Link
              key={link.href}
              href={localized}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === localized
                  ? "text-primary bg-primary/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface"
              }`}
            >
              {link.label}
              {link.href === "/inbox" && newCount > 0 && (
                <span className="badge badge-new text-xs ml-auto">{newCount}</span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-4">
      </div>
    </aside>
  );
}
