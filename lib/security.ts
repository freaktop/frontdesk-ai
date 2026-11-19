// In-memory rate limiter (per process). Suitable for single-instance deployments;
// swap for Redis-backed store when scaling beyond one instance.
const store = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const hits = (store.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    store.set(key, hits);
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)) };
  }
  hits.push(now);
  store.set(key, hits);
  return { allowed: true, retryAfterSec: 0 };
}

export const WIDGET_RATE_LIMIT = { max: 20, windowMs: 60 * 1000 };

// Control characters / prompt-injection-ish patterns are stripped/normalized.
export function sanitizeVisitorMessage(input: unknown, maxLen = 1000): string {
  const raw = typeof input === "string" ? input : "";
  const cleaned = raw
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length > maxLen) return cleaned.slice(0, maxLen);
  return cleaned;
}

export function isInjectionAttempt(text: string): boolean {
  const t = text.toLowerCase();
  const patterns = [
    "ignore previous",
    "ignore all",
    "disregard",
    "system prompt",
    "you are now",
    "pretend you are",
    "act as dan",
    "jailbreak",
  ];
  return patterns.some((p) => t.includes(p));
}
