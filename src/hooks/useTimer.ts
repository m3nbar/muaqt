"use client";

import { useState, useEffect, useCallback } from "react";

export function useTimer(createdAt: number, expiresAt: number) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const total = expiresAt - createdAt;
  const remaining = Math.max(0, expiresAt - now);
  const percentage = total > 0 ? (remaining / total) * 100 : 0;

  const formatTime = useCallback((ms: number) => {
    const totalSecs = Math.ceil(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    remaining,
    percentage,
    formatted: formatTime(remaining),
    isExpired: remaining <= 0,
  };
}
