"use client";

import { useEffect, useRef } from "react";

export default function AdPlaceholder({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    (window as any).atOptions = {
      key: "c32c2d55f578be8017401bd0b459c5c7",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://www.highperformanceformat.com/c32c2d55f578be8017401bd0b459c5c7/invoke.js";
    script.async = true;
    el.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center ${className}`}
      style={{ minHeight: "90px" }}
    />
  );
}
