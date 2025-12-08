// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
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
          // Log the attack attempt
          const attackAttempt = detectAttackAttempt(error.message, {
            path: event.request?.url,
            ip: event.request?.headers?.['x-forwarded-for'] || event.request?.headers?.['x-real-ip'],
          });
          
          if (attackAttempt) {
            logAttackAttempt(attackAttempt);
          }

          // Don't send attack attempts to Sentry
          return null;
        }

        // Filter out file system and command execution errors
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('eacces') ||
          errorMessage.includes('permission denied') ||
          errorMessage.includes('/root') ||
          errorMessage.includes('/etc/') ||
          errorMessage.includes('scandir') ||
          errorMessage.includes('shadow') ||
          errorMessage.includes('command failed') ||
          errorMessage.includes('wget') ||
          errorMessage.includes('curl') ||
          errorMessage.includes('bash')
        ) {
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
