// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const startTime = performance.now();
// Initialize Sentry immediately for router transition tracking
Sentry.init({
  dsn: process.env.SENTRY_DNS,

  // Reduce sample rate to improve performance
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  enabled: process.env.NODE_ENV === "production",

  // Performance optimizations
  beforeSend(event) {
    // Filter out non-critical events to reduce overhead
    if (event.level === 'info' && event.exception) {
      return null;
    }
    return event;
  },

  // Reduce bundle size by disabling unused integrations
  integrations: [
    // Only include essential integrations - empty array means use defaults
  ],

  // Lazy load heavy features
  beforeBreadcrumb(breadcrumb) {
    // Filter out noisy breadcrumbs
    if (breadcrumb.category === 'console') {
      return null;
    }
    return breadcrumb;
  },

  // Additional performance optimizations
  maxBreadcrumbs: 10, // Reduce breadcrumb storage
  attachStacktrace: false, // Disable stack traces in development
  sendDefaultPii: false, // Disable PII collection
});
const totalTime = performance.now() - startTime;

if (process.env.NODE_ENV === 'development') {
  console.log(`Sentry client initialization took ${totalTime}ms`);
}

// Export the required router transition hook
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
