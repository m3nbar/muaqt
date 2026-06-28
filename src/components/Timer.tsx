"use client";

import { useTimer } from "@/hooks/useTimer";
import { cn } from "@/utils/cn";

interface TimerProps {
  createdAt: number;
  expiresAt: number;
  className?: string;
}

export default function Timer({ createdAt, expiresAt, className }: TimerProps) {
  const { remaining, percentage, formatted } = useTimer(createdAt, expiresAt);

  const getColor = () => {
    if (percentage > 50) return "bg-accent";
    if (percentage > 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg className="w-4 h-4 text-text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-xs font-medium text-text-secondary">{formatted}</span>
      <div className="w-16 h-1.5 rounded-full bg-surface overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-1000", getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
