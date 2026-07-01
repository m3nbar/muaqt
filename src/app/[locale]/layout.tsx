import type { Metadata } from "next";
import { seoTranslations } from "@/i18n/seo";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/i18n";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://muaqt.vercel.app";

function generateHreflang(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/${DEFAULT_LOCALE}${pathname}`,
  };
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = `${baseUrl}/${l}${pathname}`;
  }
  return languages;
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = SUPPORTED_LOCALES.includes(locale as any) ? locale : DEFAULT_LOCALE;
  const seo = seoTranslations[lang as keyof typeof seoTranslations] || seoTranslations.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: lang === "ar" ? "ar_SA" : `${lang}_${lang.toUpperCase()}`,
      siteName: lang === "ar" ? "مؤقت" : "Muaqt",
      url: `${baseUrl}/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: generateHreflang(""),
    },
    robots: "index, follow",
    metadataBase: new URL(baseUrl),
  };
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
