export type HandelServerObj = {
  nextError: string;
  statusCode: number;
};

import * as Sentry from "@sentry/nextjs";
import { detectAttackAttempt, logAttackAttempt, isAttackError } from "shared/security/attack-detection";

// ERROR HANDLERS
export function handleServerError(error: any): HandelServerObj {
  if (error.message) {
    // Security: Check for attack attempts before processing error
    if (isAttackError(error.message)) {
      const attackAttempt = detectAttackAttempt(error.message);
      if (attackAttempt) {
        logAttackAttempt(attackAttempt);
      }
      // Don't reveal error details to potential attackers
      return {
        nextError: "Request failed",
        statusCode: 400,
      };
    }

    console.error("Request API Failed: ", error.message);

    if (error.message.includes("Unauthorized")) {
      console.log("[handleServerError] unauthorized");
      return { nextError: error.message, statusCode: 401 };
    }

    return { nextError: error.message, statusCode: 500 };
  } else {
    // Security: Check for attack attempts in error object
    const errorString = String(error);
    if (isAttackError(errorString)) {
      const attackAttempt = detectAttackAttempt(errorString);
      if (attackAttempt) {
        logAttackAttempt(attackAttempt);
      }
      // Don't send attack attempts to Sentry
      return {
        nextError: "Request failed",
        statusCode: 400,
      };
    }

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
