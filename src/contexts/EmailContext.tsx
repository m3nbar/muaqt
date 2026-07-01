"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import type { Message, MessageDetail, SessionData } from "@/types";

interface EmailContextType {
  session: SessionData | null;
  messages: Message[];
  selectedMessage: MessageDetail | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  newCount: number;
  createNewEmail: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  selectMessage: (id: string) => Promise<void>;
  deleteMsg: (id: string) => Promise<void>;
  clearSession: () => void;
  clearSelectedMessage: () => void;
}

const EmailContext = createContext<EmailContextType | null>(null);

const SESSION_KEY = "wahmi-session";
const EMAIL_DURATION_MS = 10 * 60 * 1000;

function getStoredSession(): SessionData | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const data: SessionData = JSON.parse(stored);
    if (Date.now() > data.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function storeSession(session: SessionData): void {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {}
  }
}

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previousMessageCount, setPreviousMessageCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMessageIdsRef = useRef<Set<string>>(new Set());

  const clearSession = useCallback(() => {
    if (session) {
      fetch("/api/email/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: session.accountId,
          token: session.token,
          provider: session.provider,
        }),
      }).catch(() => {});
    }
    setSession(null);
    setMessages([]);
    setSelectedMessage(null);
    setNewCount(0);
    setPreviousMessageCount(0);
    lastMessageIdsRef.current = new Set();
    if (typeof window !== "undefined") {
      try { sessionStorage.removeItem(SESSION_KEY); } catch {}
    }
  }, [session]);

  const createNewEmail = useCallback(async () => {

    setLoading(true);
    setError(null);
    setSelectedMessage(null);
    setNewCount(0);
    lastMessageIdsRef.current = new Set();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const res = await fetch("/api/email/generate", {
        method: "POST",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error (${res.status})`);
      }

      const data = await res.json();
      const newSession: SessionData = {
        accountId: data.accountId,
        address: data.address,
        token: data.token,
        password: data.password,
        provider: data.provider,
        createdAt: Date.now(),
        expiresAt: Date.now() + EMAIL_DURATION_MS,
      };
      setSession(newSession);
      storeSession(newSession);
      setMessages([]);
      setPreviousMessageCount(0);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Request timed out. Check your internet connection.");
      } else {
        setError(err instanceof Error ? err.message : "Failed to create email");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshMessages = useCallback(async () => {
    if (!session) return;
    setRefreshing(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/email/inbox?token=${encodeURIComponent(session.token)}&provider=${encodeURIComponent(session.provider)}`,
        { signal: AbortSignal.timeout(15000) }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to fetch (${res.status})`);
      }

      const data = await res.json();
      let rawMsgs: any[] = Array.isArray(data) ? data : (data["hydra:member"] || data.messages || data.list || []);

      if (session.provider === "guerrillamail") {
        rawMsgs = rawMsgs.map((m: any) => ({
          id: String(m.mail_id),
          from: { name: m.mail_from || "", address: m.mail_from || "" },
          to: m.mail_to ? [{ name: m.mail_to, address: m.mail_to }] : [],
          subject: m.mail_subject || "",
          intro: m.mail_excerpt || "",
          seen: m.mail_read === 1,
          createdAt: m.mail_date || new Date(m.mail_timestamp * 1000).toISOString(),
        }));
      }

      const currentIds = new Set(rawMsgs.map((m: any) => m.id));
      const prevIds = lastMessageIdsRef.current;
      if (prevIds.size > 0) {
        const newMessages = rawMsgs.filter((m: any) => !prevIds.has(m.id));
        if (newMessages.length > 0) {
          setNewCount((c) => c + newMessages.length);
        }
      }
      lastMessageIdsRef.current = currentIds;

      setMessages(rawMsgs as Message[]);
      setPreviousMessageCount(rawMsgs.length);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Request timed out");
      } else {
        setError(err instanceof Error ? err.message : "Failed to fetch messages");
      }
    } finally {
      setRefreshing(false);
    }
  }, [session]);

  const selectMessage = useCallback(async (id: string) => {
    if (!session) return;
    setError(null);

    try {
      const res = await fetch(
        `/api/email/message?token=${encodeURIComponent(session.token)}&id=${encodeURIComponent(id)}&provider=${encodeURIComponent(session.provider)}`,
        { signal: AbortSignal.timeout(15000) }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to fetch message");
      }

      const data = await res.json();
      setSelectedMessage(data);

      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, seen: true } : m))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch message");
    }
  }, [session]);

  const deleteMsg = useCallback(async (id: string) => {
    if (!session) return;
    setError(null);

    try {
      const res = await fetch("/api/email/message", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: session.token,
          messageId: id,
          provider: session.provider,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete message");
      }

      setMessages((prev) => prev.filter((m) => m.id !== id));
      setSelectedMessage((prev) => (prev?.id === id ? null : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message");
    }
  }, [session]);

  const clearSelectedMessage = useCallback(() => {
    setSelectedMessage(null);
  }, []);

  useEffect(() => {
    const stored = getStoredSession();
    if (stored) {
      setSession(stored);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      refreshMessages();
      intervalRef.current = setInterval(refreshMessages, 8000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [session, refreshMessages]);

  return (
    <EmailContext.Provider
      value={{
        session,
        messages,
        selectedMessage,
        loading,
        refreshing,
        error,
        newCount,
        createNewEmail,
        refreshMessages,
        selectMessage,
        deleteMsg,
        clearSession,
        clearSelectedMessage,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const ctx = useContext(EmailContext);
  if (!ctx) throw new Error("useEmail must be used within EmailProvider");
  return ctx;
}
