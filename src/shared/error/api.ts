export type HandelServerObj = {
  nextError: string;
  statusCode: number;
};

import * as Sentry from "@sentry/nextjs";

// ERROR HANDLERS
export function handleServerError(error: any): HandelServerObj {
  if (error.message) {
    console.error("Request API Failed: ", error.message);

    if (error.message.includes("Unauthorized")) {
      console.log("[handleServerError] unauthorized");
      return { nextError: error.message, statusCode: 401 };
    }

    return { nextError: error.message, statusCode: 500 };
  } else {
    console.error(error);
    Sentry.captureException(error);

    console.error("Request API Failed: ", error);

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
