"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const AD_KEY = "c32c2d55f578be8017401bd0b459c5c7";

export default function AdsBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cleanupRef.current) return;

    cleanupRef.current = true;

    (window as any).atOptions = {
      key: AD_KEY,
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    const script = document.createElement("script");
    script.src = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;
    script.async = true;
    container.appendChild(script);

    return () => {
      cleanupRef.current = false;
      container.querySelectorAll("iframe, script[src*='invoke.js']").forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <Script id="adsterra-config" strategy="afterInteractive">
        {`window.atOptions={key:'${AD_KEY}',format:'iframe',height:90,width:728,params:{}}`}
      </Script>
      <div className="hidden md:flex justify-center items-center my-4 overflow-hidden">
        <div ref={containerRef} className="w-full min-h-[90px]" />
      </div>
    </>
  );
}
