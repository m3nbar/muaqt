import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { EmailProvider } from "@/contexts/EmailContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicTitle from "@/components/DynamicTitle";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://muaqt.vercel.app";

export const metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('wahmi-theme');
                  if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-bg-dark text-text-primary min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <DynamicTitle />
            <EmailProvider>
              <Header />
              <main className="flex-1 pt-16">
                {children}
              </main>
              <Footer />
            </EmailProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
