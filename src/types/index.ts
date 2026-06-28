export interface Domain {
  "@id": string;
  "@type": string;
  "@context": string;
  id: string;
  domain: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DomainsResponse {
  "hydra:member": Domain[];
  "hydra:totalItems": number;
}

export interface Account {
  "@context": string;
  "@id": string;
  "@type": string;
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  retentionAt: string;
  updatedAt: string;
}

export interface TokenResponse {
  id: string;
  token: string;
}

export interface EmailAddress {
  name: string;
  address: string;
}

export interface Message {
  "@id": string;
  "@type": string;
  "@context": string;
  id: string;
  accountId: string;
  msgid: string;
  from: EmailAddress;
  to: EmailAddress[];
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessagesResponse {
  "hydra:member": Message[];
  "hydra:totalItems": number;
  "hydra:view": {
    "@id": string;
    "@type": string;
    "hydra:first": string;
    "hydra:last": string;
    "hydra:previous"?: string;
    "hydra:next"?: string;
  };
}

export interface Attachment {
  id: string;
  filename: string;
  contentType: string;
  disposition: string;
  transferEncoding: string;
  related: boolean;
  size: number;
  downloadUrl: string;
}

export interface MessageDetail {
  "@context": string;
  "@id": string;
  "@type": string;
  id: string;
  accountId: string;
  msgid: string;
  from: EmailAddress;
  to: EmailAddress[];
  cc: string[];
  bcc: string[];
  subject: string;
  seen: boolean;
  flagged: boolean;
  isDeleted: boolean;
  verifications: string[];
  retention: boolean;
  retentionDate: string;
  text: string;
  html: string[];
  hasAttachments: boolean;
  attachments: Attachment[];
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionData {
  accountId: string;
  address: string;
  token: string;
  password: string;
  provider: string;
  createdAt: number;
  expiresAt: number;
}

export interface GuerrillaSession {
  email_addr: string;
  email_id: number;
  sid_token: string;
  alias: string;
}

export interface GuerrillaMessage {
  mail_id: number;
  mail_from: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_timestamp: number;
  mail_read: number;
  mail_date: string;
  mail_body?: string;
  mail_from_addr?: { name: string; address: string };
  mail_to?: string;
}

export type SupportedLocale = "ar" | "en" | "fr" | "es" | "de" | "tr" | "ru" | "zh" | "ja";

export interface Translation {
  nav: {
    home: string;
    inbox: string;
    faq: string;
    contact: string;
    privacy: string;
    terms: string;
  };
  hero: {
    title: string;
    subtitle: string;
    createEmail: string;
    generating: string;
  };
  inbox: {
    title: string;
    empty: string;
    emptyDesc: string;
    newMessages: string;
    refresh: string;
    copy: string;
    copied: string;
    delete: string;
    newEmail: string;
    expiresIn: string;
    sender: string;
    subject: string;
    date: string;
    noSubject: string;
    noSender: string;
    messageDetail: string;
    close: string;
    markRead: string;
    deleteMessage: string;
    loading: string;
    verifyingLinks: string;
    clickToVerify: string;
    emailCopied: string;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    legal: string;
    rights: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  errors: {
    rateLimited: string;
    serverError: string;
    networkError: string;
    tryAgain: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export type Translations = Record<SupportedLocale, Translation>;
