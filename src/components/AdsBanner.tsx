"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const DESKTOP_KEY = "c32c2d55f578be8017401bd0b459c5c7";
const MOBILE_KEY = "5ea2a11b2db1bbd4bc96ee33434bd6de";

export default function AdsBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll("iframe, script[src*='invoke.js']").forEach((el) => el.remove());

    const key = isDesktop ? DESKTOP_KEY : MOBILE_KEY;
    (window as any).atOptions = {
      key,
      format: "iframe",
      width: isDesktop ? 728 : 320,
      height: isDesktop ? 90 : 50,
      params: {},
    };

    const script = document.createElement("script");
    script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.querySelectorAll("iframe, script[src*='invoke.js']").forEach((el) => el.remove());
    };
  }, [mounted, isDesktop]);

  return (
    <>
      <Script id="adsterra-config" strategy="afterInteractive">
        {`window.atOptions=window.atOptions||{key:'${DESKTOP_KEY}',format:'iframe',width:728,height:90,params:{}}`}
      </Script>
      <div className="flex justify-center items-center my-4 overflow-hidden">
        <div ref={containerRef} className="w-full min-h-[50px] md:min-h-[90px]" />
      </div>
    </>
  );
}
