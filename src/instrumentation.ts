import * as Sentry from '@sentry/nextjs';

export async function register() {
  const startTime = performance.now();

  try {
    // Only import what's needed for the current runtime
    const runtime = process.env.NEXT_RUNTIME;

    if (runtime === 'nodejs') {
      await import('../sentry.server.config');
    } else if (runtime === 'edge') {
      await import('../sentry.edge.config');
    }

  } catch (error) {
    console.error('Instrumentation registration error:', error);
  }

  const totalTime = performance.now() - startTime;
  if (process.env.NODE_ENV === 'development') {
    console.log(`Total instrumentation registration took ${totalTime}ms`);
  }
}

export const onRequestError = Sentry.captureRequestError;
