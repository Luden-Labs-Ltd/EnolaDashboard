/**
 * Security: Protection for React Server Actions against CVE-2025-55182 (React2Shell)
 * 
 * This module provides utilities to validate and sanitize inputs in Server Actions
 * to prevent command injection attacks through React Server Components.
 */

import { z } from "zod";

/**
 * Internal Next.js/React values that should be excluded from security checks
 */
const INTERNAL_FRAMEWORK_PREFIXES = [
  '$ACTION_',      // Next.js Server Action references
  '$REACT_',       // React internal values
  '$RSC_',         // React Server Component references
  '$NEXT_',        // Next.js internal values
  '__nextjs_',     // Next.js internal
  '__react_',      // React internal
];

/**
 * Check if input is an internal framework value (should be excluded from security checks)
 */
function isInternalFrameworkValue(input: string): boolean {
  return INTERNAL_FRAMEWORK_PREFIXES.some(prefix => input.startsWith(prefix));
}

/**
 * Dangerous patterns that could be used for command injection in Server Actions
 * Note: These patterns are more specific to avoid false positives
 */
const DANGEROUS_PATTERNS = [
  // Command execution with actual commands (not just symbols)
  /;\s*(wget|curl|bash|sh|python|perl|ruby|node|powershell)/i,
  /\|\s*(bash|sh|python|perl|ruby|node|powershell)/i,
  // Command substitution with actual commands
  /\$\([^)]*(wget|curl|bash|sh|python|perl|ruby|node|powershell)/i,
  /`[^`]*(wget|curl|bash|sh|python|perl|ruby|node|powershell)/i,
  // Shell redirection with commands
  />\s*(wget|curl|bash|sh|python|perl|ruby|node|powershell)/i,
  // Environment variable injection with commands
  /\$\{[^}]*(wget|curl|bash|sh|python|perl|ruby|node|powershell)/i,
  // Direct command execution patterns
  /wget\s+-qO-.*\|\s*bash/i,
  /curl\s+.*\|\s*bash/i,
  /bash\s+-c/i,
  /sh\s+-c/i,
  /powershell\s+-enc/i,
  /powershell\s+-c/i,
  /node\s+-e/i,
  // URL patterns that could be used for RCE (with suspicious IPs or ports)
  /http:\/\/\d+\.\d+\.\d+\.\d+:\d+.*\|\s*bash/i,
  /https:\/\/\d+\.\d+\.\d+\.\d+:\d+.*\|\s*bash/i,
  // File system access attempts
  /\/etc\/(shadow|passwd)/i,
  /\/root/i,
  /scandir.*\/root/i,
  /open.*\/etc\/shadow/i,
];

/**
 * Validates that a string doesn't contain command injection patterns
 * Excludes internal framework values (Next.js, React internal references)
 */
export function isInputSafe(input: string | null | undefined): boolean {
  if (!input || typeof input !== 'string') {
    return true;
  }

  // Skip security checks for internal framework values
  if (isInternalFrameworkValue(input)) {
    return true;
  }

  // Check for dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(input)) {
      console.error('[SECURITY] CVE-2025-55182: Dangerous pattern detected in Server Action input:', {
        input: input.substring(0, 100),
        pattern: pattern.toString(),
        timestamp: new Date().toISOString(),
      });
      return false;
    }
  }

  return true;
}

/**
 * Sanitizes a string to prevent command injection
 * Throws error if dangerous patterns are found
 */
export function sanitizeServerActionInput(input: string | null | undefined): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  if (!isInputSafe(input)) {
    throw new Error('Invalid input: potentially dangerous characters detected');
  }

  return input.trim();
}

/**
 * Enhanced Zod string schema with command injection protection
 */
export function safeStringSchema(minLength = 0, maxLength = 1000) {
  return z.string()
    .min(minLength)
    .max(maxLength)
    .refine(
      (val) => isInputSafe(val),
      {
        message: 'Input contains potentially dangerous characters',
      }
    );
}

/**
 * Validates FormData security (command injection protection)
 * Returns true if safe, throws error if dangerous patterns found
 */
export function validateFormDataSecurity(formData: FormData): void {
  // Extract and check all form data for dangerous patterns
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      if (!isInputSafe(key) || !isInputSafe(value)) {
        console.error('[SECURITY] CVE-2025-55182: Dangerous pattern in FormData:', {
          key: key.substring(0, 100),
          value: value.substring(0, 100),
        });
        throw new Error('FormData contains potentially dangerous characters');
      }
    } else if (value instanceof File) {
      // Validate file name
      if (!isInputSafe(value.name)) {
        console.error('[SECURITY] CVE-2025-55182: Dangerous pattern in file name:', value.name.substring(0, 100));
        throw new Error('File name contains potentially dangerous characters');
      }
    }
  }
}

/**
 * Validates FormData from Server Actions (legacy function for backward compatibility)
 * @deprecated Use validateFormDataSecurity for security checks, then validate schema separately
 */
export function validateFormData(formData: FormData, schema: z.ZodSchema) {
  // First check security
  validateFormDataSecurity(formData);
  
  // Then extract data for schema validation
  const data: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Use safeParse to avoid throwing errors
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error('FormData validation failed');
  }
  
  return result.data;
}

/**
 * Wrapper for Server Actions to add security validation
 */
export function secureServerAction<T extends (...args: any[]) => Promise<any>>(
  action: T,
  inputValidator?: (args: Parameters<T>) => boolean
): T {
  return (async (...args: Parameters<T>) => {
    // Validate inputs if validator provided
    if (inputValidator && !inputValidator(args)) {
      throw new Error('Server Action input validation failed');
    }

    // Additional validation: check all string arguments
    for (const arg of args) {
      if (typeof arg === 'string' && !isInputSafe(arg)) {
        throw new Error('Server Action contains potentially dangerous input');
      }
      if (arg instanceof FormData) {
        for (const [key, value] of arg.entries()) {
          if (typeof value === 'string' && (!isInputSafe(key) || !isInputSafe(value))) {
            throw new Error('FormData contains potentially dangerous input');
          }
        }
      }
    }

    return action(...args);
  }) as T;
}
