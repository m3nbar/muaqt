import { cn } from "@/utils/cn";
import { useLanguage } from "@/contexts/LanguageContext";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const { locale } = useLanguage();
  const name = locale === "ar" ? "مؤقت" : "Muaqt";
  const sizeMap = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
  };

  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <rect x="2" y="10" width="44" height="30" rx="6" fill="url(#logo-grad)" fillOpacity="0.15" stroke="url(#logo-grad)" strokeWidth="3" />
          <path d="M4 14L24 28L44 14" stroke="url(#logo-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="url(#logo-grad)" fillOpacity="0.15" />
          <circle cx="24" cy="18" r="3" fill="url(#logo-grad)" />
          <path d="M14 35L34 35" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 40L30 40" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 35L24 40" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight",
            s.text,
            "bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent"
          )}
        >
          {name}
        </span>
      )}
    </div>
  );
}
