export function formatDate(dateStr: string, locale: string = "en"): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return locale === "ar"
      ? "الآن"
      : locale === "fr"
      ? "à l'instant"
      : locale === "es"
      ? "ahora"
      : locale === "de"
      ? "gerade eben"
      : locale === "tr"
      ? "şimdi"
      : locale === "ru"
      ? "только что"
      : locale === "zh"
      ? "刚刚"
      : locale === "ja"
      ? "たった今"
      : "just now";
  }

  if (diffMins < 60) {
    const rtf = new Intl.RelativeTimeFormat(locale === "ar" ? "ar" : locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : locale, { numeric: "auto" });
    return rtf.format(-diffMins, "minute");
  }

  if (diffHours < 24) {
    const rtf = new Intl.RelativeTimeFormat(locale === "ar" ? "ar" : locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : locale, { numeric: "auto" });
    return rtf.format(-diffHours, "hour");
  }

  if (diffDays < 7) {
    const rtf = new Intl.RelativeTimeFormat(locale === "ar" ? "ar" : locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : locale, { numeric: "auto" });
    return rtf.format(-diffDays, "day");
  }

  return date.toLocaleDateString(
    locale === "ar" ? "ar" : locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : locale === "ru" ? "ru" : locale,
    { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
  );
}

export function timeAgo(dateStr: string): number {
  const date = new Date(dateStr);
  return date.getTime();
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + "...";
}
