export type RateLimitInfo = {
  count: number;
  resetTime: number;
};

// Simple in-memory tracker
const rateLimitMap = new Map<string, RateLimitInfo>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // Max 60 requests per minute per IP

export function checkRateLimit(ip: string): { success: boolean; headers: Record<string, string> } {
  const now = Date.now();
  const info = rateLimitMap.get(ip) || { count: 0, resetTime: now + WINDOW_MS };

  if (now > info.resetTime) {
    // Reset window
    info.count = 1;
    info.resetTime = now + WINDOW_MS;
  } else {
    // Increment count
    info.count++;
  }

  rateLimitMap.set(ip, info);

  // Periodic cleanup to avoid memory leak
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  const success = info.count <= MAX_REQUESTS;
  
  return {
    success,
    headers: {
      'X-RateLimit-Limit': MAX_REQUESTS.toString(),
      'X-RateLimit-Remaining': Math.max(0, MAX_REQUESTS - info.count).toString(),
      'X-RateLimit-Reset': info.resetTime.toString(),
    }
  };
}
