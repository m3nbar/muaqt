import { logger } from "./logger";

export async function apiFetch<T>(baseUrl: string, path: string, options: RequestInit = {}): Promise<T> {
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, {
    ...options,
    signal: options.signal || AbortSignal.timeout(15000),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status}: ${text.slice(0, 200)}`);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

const GUERRILLA_API = "https://api.guerrillamail.com/ajax.php";

async function guerrillaPost(params: Record<string, string>): Promise<any> {
  const body = new URLSearchParams(params).toString();
  const res = await fetch(GUERRILLA_API, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Guerrilla Mail ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

export async function guerrillaCreateEmail(ip?: string, agent?: string): Promise<{
  email_addr: string;
  email_id: number;
  sid_token: string;
  alias: string;
}> {
  const params: Record<string, string> = { f: "get_email_address" };
  if (ip) params.ip = ip;
  if (agent) params.agent = agent;
  return guerrillaPost(params);
}

export async function guerrillaGetMessages(sidToken: string): Promise<{
  list: Array<{
    mail_id: number;
    mail_from: string;
    mail_subject: string;
    mail_excerpt: string;
    mail_timestamp: number;
    mail_read: number;
    mail_date: string;
    mail_from_addr?: { name: string; address: string };
    mail_to?: string;
  }>;
  count: string;
}> {
  return guerrillaPost({ f: "get_email_list", sid_token: sidToken });
}

export async function guerrillaGetMessage(sidToken: string, emailId: number): Promise<{
  mail_id: number;
  mail_from: string;
  mail_subject: string;
  mail_excerpt: string;
  mail_timestamp: number;
  mail_read: number;
  mail_date: string;
  mail_body: string;
  mail_from_addr?: { name: string; address: string };
  mail_to?: string;
}> {
  return guerrillaPost({ f: "fetch_email", sid_token: sidToken, email_id: String(emailId) });
}

export async function guerrillaForgetMe(sidToken: string): Promise<void> {
  await guerrillaPost({ f: "forget_me", sid_token: sidToken });
}
