"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useEmail } from "@/contexts/EmailContext";
import Sidebar from "@/components/Sidebar";
import InboxView from "@/components/InboxView";

export default function InboxPage() {
  const { t } = useLanguage();
  const { session } = useEmail();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-bold text-text-primary mb-6">{t.inbox.title}</h1>
        <InboxView />
      </div>
    </div>
  );
}
