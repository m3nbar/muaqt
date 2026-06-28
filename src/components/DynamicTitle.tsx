"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const titles: Record<string, string> = {
  ar: "مؤقت | بريد عربي مؤقت",
  en: "Muaqt | Temporary Disposable Email Service",
  fr: "Muaqt | Service d'Email Temporaire",
  es: "Muaqt | Servicio de Email Temporal",
  de: "Muaqt | Temporärer E-Mail-Dienst",
  tr: "Muaqt | Geçici E-posta Hizmeti",
  ru: "Muaqt | Временная Почта",
  zh: "Muaqt | 临时邮箱服务",
  ja: "Muaqt | 使い捨てメールサービス",
};

export default function DynamicTitle() {
  const { locale } = useLanguage();

  useEffect(() => {
    document.title = titles[locale] || titles.en;
  }, [locale]);

  return null;
}
