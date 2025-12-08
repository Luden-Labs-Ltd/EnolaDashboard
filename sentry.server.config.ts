// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { detectAttackAttempt, detectKnownAttackPatterns, logAttackAttempt } from "shared/security/attack-detection";

Sentry.init({
  dsn: process.env.SENTRY_DNS,

  // Reduce sample rate to improve performance
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  enabled: process.env.NODE_ENV === "production",

  // Security: Detect and block attack attempts (CVE-2025-55182)
  beforeSend(event, hint) {
    if (event.exception) {
      const error = hint.originalException;
      if (error instanceof Error) {
        // Detect known attack patterns
        const attackDetection = detectKnownAttackPatterns(error);
        if (attackDetection.detected) {
          // Log the attack attempt with full context
          const attackAttempt = detectAttackAttempt(error.message, {
            path: event.request?.url,
            ip: event.request?.headers?.['x-forwarded-for'] || event.request?.headers?.['x-real-ip'],
          });
          
          if (attackAttempt) {
            logAttackAttempt(attackAttempt);
          }

          // Don't send attack attempts to Sentry to avoid:
          // 1. Leaking attack patterns
          // 2. Filling Sentry with noise
          // 3. Alerting attackers that their attempts are being logged
          return null;
        }

        // Filter out file system access errors (expected in containerized environments)
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('eacces') ||
          errorMessage.includes('permission denied') ||
          errorMessage.includes('/root') ||
          errorMessage.includes('/etc/') ||
          errorMessage.includes('scandir') ||
          errorMessage.includes('shadow')
        ) {
          // These are likely attack attempts or expected errors - don't send to Sentry
          return null;
        }

        // Filter out command execution errors (likely attack attempts)
        if (
          errorMessage.includes('command failed') ||
          errorMessage.includes('wget') ||
          errorMessage.includes('curl') ||
          errorMessage.includes('bash')
        ) {
          // Log locally but don't send to Sentry
          console.error('[SECURITY] Command execution attempt blocked:', errorMessage.substring(0, 200));
          return null;
        }
      }
    }

    // Filter out non-critical events
    if (event.level === 'info' && event.exception) {
      return null;
    }
    return event;
  },
});
