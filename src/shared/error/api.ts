export type HandelServerObj = {
  nextError: string;
  statusCode: number;
};

import * as Sentry from "@sentry/nextjs";

// ERROR HANDLERS
export function handleServerError(error: any): HandelServerObj {
  Sentry.captureException(error);
  if (error.message) {
    return { nextError: error.message, statusCode: 500 };
  } else {
    return {
      nextError:
        "Unknown server error, Please try again later or contact support.",
      statusCode: 500,
    };
  }
}

export type ActionError<E extends object = Record<string, unknown>> = {
  nextError: string;
  statusCode: number;
} & E;
export type ServerActionResponse<
  T,
  E extends object = Record<string, unknown>
> = ActionError<E> | T;

export function isActionError(error: any): error is ActionError {
  return (
    error && typeof error === "object" && error.nextError
  );
}
