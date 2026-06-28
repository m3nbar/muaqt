"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/formatDate";
import { sanitizeHtml } from "@/lib/sanitize";
import type { MessageDetail as MessageDetailType } from "@/types";

interface Props {
  message: MessageDetailType;
  onClose: () => void;
  onDelete: () => void;
}

export default function MessageDetail({ message, onClose, onDelete }: Props) {
  const { t, locale } = useLanguage();

  const htmlContent = message.html && message.html.length > 0
    ? sanitizeHtml(message.html.join(""))
    : null;

  const verificationLinks: string[] = [];
  if (htmlContent) {
    const linkRegex = /https?:\/\/[^\s<"']+/g;
    const matches = htmlContent.match(linkRegex);
    if (matches) {
      matches.forEach((link) => {
        if (
          link.includes("verify") ||
          link.includes("confirm") ||
          link.includes("activate") ||
          link.includes("verification") ||
          link.includes("activation") ||
          link.includes("reset") ||
          link.includes("signup") ||
          link.includes("welcome") ||
          link.includes("auth") ||
          link.includes("token") ||
          link.includes("email_verify")
        ) {
          if (!verificationLinks.includes(link)) {
            verificationLinks.push(link);
          }
        }
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="glass-card w-full max-w-2xl max-h-[85vh] flex flex-col fade-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-text-primary text-lg truncate">
            {message.subject || t.inbox.noSubject}
          </h3>
          <div className="flex items-center gap-2">
            <button onClick={onDelete} className="btn-ghost p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10" title={t.inbox.deleteMessage}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button onClick={onClose} className="btn-ghost p-2" title={t.inbox.close}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-border bg-surface/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-text-muted text-xs">{t.inbox.sender}: </span>
              <span className="text-text-primary">{message.from?.name || message.from?.address || t.inbox.noSender}</span>
              {message.from?.name && (
                <span className="text-text-muted text-xs block">&lt;{message.from.address}&gt;</span>
              )}
            </div>
            <div className="sm:text-right">
              <span className="text-text-muted text-xs">{t.inbox.date}: </span>
              <span className="text-text-secondary text-xs">{formatDate(message.createdAt, locale)}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {verificationLinks.length > 0 && (
            <div className="mb-4 p-3 rounded-xl bg-accent/5 border border-accent/20">
              <p className="text-xs font-semibold text-accent mb-2">{t.inbox.verifyingLinks}</p>
              <div className="flex flex-wrap gap-2">
                {verificationLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-1.5 px-3 inline-block"
                  >
                    {t.inbox.clickToVerify} #{i + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          {htmlContent ? (
            <div
              className="message-html-content text-sm text-text-primary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
              {message.text || "(No content)"}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
