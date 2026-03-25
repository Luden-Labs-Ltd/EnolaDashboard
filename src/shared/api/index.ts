"use server";
import { getAuthToken } from "entities/auth/token";
import { isInputSafe } from "shared/security/server-action-protection";

export const fetchInstance = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<Response | null> => {
  try {
    // Security: Validate URL to prevent SSRF and command injection
    const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    
    // For URLs, we need more specific checks - only block actual command injection patterns
    // URLs can contain legitimate characters like :, /, ?, &, etc.
    if (urlString && typeof urlString === 'string') {
      // Check for command injection patterns in URL (not just any special characters)
      const dangerousUrlPatterns = [
        /\|\s*bash/i,
        /\|\s*sh/i,
        /;\s*(wget|curl|bash|sh)/i,
        /`[^`]*(wget|curl|bash|sh)/i,
        /\$\([^)]*(wget|curl|bash|sh)/i,
      ];
      
      for (const pattern of dangerousUrlPatterns) {
        if (pattern.test(urlString)) {
          console.error('[SECURITY] CVE-2025-55182: Dangerous URL pattern detected in fetchInstance:', urlString.substring(0, 200));
          throw new Error('Invalid URL: potentially dangerous characters detected');
        }
      }
    }

    // Security: Validate headers
    if (init?.headers) {
      for (const [key, value] of Object.entries(init.headers)) {
        if (typeof value === 'string' && (!isInputSafe(key) || !isInputSafe(value))) {
          console.error('[SECURITY] CVE-2025-55182: Dangerous header detected:', { key, value: value.substring(0, 100) });
          throw new Error('Invalid header: potentially dangerous characters detected');
        }
      }
    }

    const token = await getAuthToken() ?? 'token not found';
    const { headers, ...rest } = init ?? {}
    const response = await fetch(input, {
      headers: {
        Authorization: token,
        ...headers,
      },
      ...rest,
    });

    return response
  } catch (error) {
    console.error(error);
    return null;
  }
};
