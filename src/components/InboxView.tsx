"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useEmail } from "@/contexts/EmailContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";
import MessageDetail from "./MessageDetail";
import { openSmartlink } from "@/lib/smartlink";

export default function InboxView() {
  const { t, locale } = useLanguage();
  const {
    session, messages, selectedMessage, loading, refreshing,
    newCount, error, refreshMessages, selectMessage, deleteMsg,
    createNewEmail, clearSession, clearSelectedMessage,
  } = useEmail();
  const [copied, setCopied] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const expiredRef = useRef(false);

  useEffect(() => {
    if (!session) {
      expiredRef.current = false;
      return;
    }
    expiredRef.current = false;
    const update = () => {
      const remaining = Math.max(0, Math.floor((session.expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0 && !expiredRef.current) {
        expiredRef.current = true;
        createNewEmail();
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [session, createNewEmail]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = session ? timeLeft / (10 * 60) : 0;
  const isLow = timeLeft < 60;

  const copyEmail = useCallback(async () => {
    if (!session) return;
    try {
      await navigator.clipboard.writeText(session.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = session.address;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [session]);

  const openMessage = async (id: string) => {
    await selectMessage(id);
    setDetailOpen(true);
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        {error && (
          <div className="glass-card p-3 mb-4 border-red-500/20 bg-red-500/5 max-w-md w-full">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
        <div className="glass-card p-8 max-w-md">
          <div className="text-6xl mb-4">📬</div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">{t.inbox.title}</h2>
          <p className="text-text-secondary text-sm mb-6">{t.hero.subtitle}</p>
          <button onClick={() => { openSmartlink(); createNewEmail(); }} disabled={loading} className="btn-primary">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t.hero.generating}
              </span>
            ) : t.hero.createEmail}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <label className="text-xs text-text-muted mb-1 block">{t.inbox.title}</label>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono text-text-primary truncate bg-surface px-3 py-1.5 rounded-lg flex-1">
                {session.address}
              </code>
              <button
                onClick={copyEmail}
                className="btn-secondary text-xs py-1.5 px-3 shrink-0"
              >
                {copied ? t.inbox.copied : t.inbox.copy}
              </button>
              <button
                onClick={clearSession}
                className="btn-ghost p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0"
                title={t.inbox.delete}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <button
            onClick={refreshMessages}
            disabled={refreshing}
            className="btn-secondary text-sm py-2 px-3 shrink-0"
            title={t.inbox.refresh}
          >
            <svg className={cn("w-4 h-4", refreshing && "animate-spin")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="glass-card p-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-muted">{t.inbox.expiresIn}</span>
              <span className={cn("text-xs font-mono tabular-nums", isLow ? "text-red-400" : "text-text-secondary")}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-surface overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-1000", isLow ? "bg-red-500" : "bg-gradient-to-r from-primary to-accent")}
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => { openSmartlink(); createNewEmail(); }}
            disabled={loading}
            className="btn-primary text-xs py-1.5 px-3 shrink-0"
          >
            {loading ? t.hero.generating : t.inbox.newEmail}
          </button>
        </div>
      </div>

      {newCount > 0 && (
        <div className="glass-card p-3 bg-accent/5 border-accent/20 text-center">
          <span className="text-sm text-accent font-medium">
            {newCount} {t.inbox.newMessages}
          </span>
        </div>
      )}

      {error && (
        <div className="glass-card p-3 border-red-500/20 bg-red-500/5">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="glass-card p-4">
              <div className="skeleton h-4 w-1/3 mb-2" />
              <div className="skeleton h-3 w-2/3 mb-2" />
              <div className="skeleton h-3 w-1/4" />
            </div>
          ))
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4 opacity-30">📭</div>
            <h3 className="text-lg font-medium text-text-primary mb-1">{t.inbox.empty}</h3>
            <p className="text-sm text-text-muted">{t.inbox.emptyDesc}</p>
          </div>
        ) : (
          messages.flatMap((msg, idx) => [
            <button
              key={msg.id}
              onClick={() => openMessage(msg.id)}
              className="glass-hover rounded-xl p-4 text-left w-full fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.seen && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    <span className={cn(
                      "text-sm truncate",
                      !msg.seen ? "font-semibold text-text-primary" : "text-text-secondary"
                    )}>
                      {msg.from?.name || msg.from?.address || t.inbox.noSender}
                    </span>
                  </div>
                  <p className={cn("text-sm truncate mb-1", !msg.seen ? "text-text-primary" : "text-text-muted")}>
                    {msg.subject || t.inbox.noSubject}
                  </p>
                  <p className="text-xs text-text-muted truncate">{msg.intro}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs text-text-muted whitespace-nowrap">{formatDate(msg.createdAt, locale)}</span>
                  {msg.hasAttachments && (
                    <svg className="w-3 h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  )}
                </div>
              </div>
            </button>,
          ])
        )}
      </div>

      {selectedMessage && detailOpen && (
        <MessageDetail message={selectedMessage} onClose={() => { setDetailOpen(false); clearSelectedMessage(); }} onDelete={() => { deleteMsg(selectedMessage.id); setDetailOpen(false); }} />
      )}
    </div>
  );
}
