import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ar", "en", "fr", "es", "de", "tr", "ru", "zh", "ja"];
const defaultLocale = "en";

function getPreferredLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE");
  if (cookie && locales.includes(cookie.value)) return cookie.value;

  const acceptLang = request.headers.get("Accept-Language");
  if (acceptLang) {
    const preferred = acceptLang
      .split(",")
      .map((l) => {
        const [lang, q = "q=1"] = l.trim().split(";");
        return { lang: lang.split("-")[0], q: parseFloat(q.replace("q=", "")) || 1 };
      })
      .sort((a, b) => b.q - a.q);
    for (const p of preferred) {
      if (locales.includes(p.lang)) return p.lang;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localePrefix = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (localePrefix) {
    const response = NextResponse.next();
    response.headers.set("x-locale", localePrefix);
    return response;
  }

  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
    return;
  }

  const locale = getPreferredLocale(request);
  const newPath = `/${locale}${pathname === "/" ? "" : pathname}`;
  const url = new URL(newPath, request.url);
  const response = NextResponse.redirect(url);
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/|favicon|manifest|icons|flags|\\..*).*)"],
};
