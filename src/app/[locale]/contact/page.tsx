"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import AdsBanner from "@/components/AdsBanner";
import { openSmartlink } from "@/lib/smartlink";

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    openSmartlink();
    setSending(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-2">{t.contact.title}</h1>
      <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

      <AdsBanner id="contact-top" />
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">{t.contact.name}</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="input-glass w-full"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">{t.contact.email}</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="input-glass w-full"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">{t.contact.message}</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="input-glass w-full resize-none"
            placeholder="Your message..."
          />
        </div>

        <button type="submit" disabled={sending} className="btn-primary w-full">
          {sending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t.contact.send}...
            </span>
          ) : (
            t.contact.send
          )}
        </button>

        {status === "success" && (
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400">
            {t.contact.success}
          </div>
        )}
        {status === "error" && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {t.contact.error}
          </div>
        )}
      </form>
      <AdsBanner id="contact-bottom" />
    </div>
  );
}
