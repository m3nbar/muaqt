const requestCounts = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 1000;
const MAX_REQUESTS = 8;

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetAt) {
    requestCounts.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

export function getRateLimitHeaders(identifier: string): Record<string, string> {
  const record = requestCounts.get(identifier);
  if (!record) {
    return {
      "X-RateLimit-Limit": String(MAX_REQUESTS),
      "X-RateLimit-Remaining": String(MAX_REQUESTS),
    };
  }

  const remaining = Math.max(0, MAX_REQUESTS - record.count);
  return {
    "X-RateLimit-Limit": String(MAX_REQUESTS),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(record.resetAt),
  };
}
