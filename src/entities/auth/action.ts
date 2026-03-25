"use server";
import { z } from "zod";
import { setCookie, deleteCookie } from "shared/utils/cookies";
import { redirect } from "next/navigation";
import { handleNetworkError } from "shared/utils/network-error";
import { validateFormDataSecurity, isInputSafe } from "shared/security/server-action-protection";
import { detectAttackAttempt, logAttackAttempt } from "shared/security/attack-detection";

const schemaOtpSend = z.object({
  phoneNumber: z.string().min(6).max(20),
});

const schemaAuthenticate = z.object({
  phoneNumber: z.string().min(6).max(20),
  code: z.string().min(6),
});

export async function testAction(prevState: any, formData: FormData) {
  const validatedFields = schemaAuthenticate.safeParse({
    phoneNumber: formData.get("phone_number"),
    code: formData.get("code"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiError: null,
      data: "false",
      message: "Missing Fields. Failed to Register.",
    };
  }

  const result = await authenticate(formData);

  if (result.error || !result.token) {
    return {
      ...prevState,
      apiError: result.error,
      showOtpPart: false,
      zodErrors: null,
      data: "false",
    };
  }
  await setCookie("jwt", result.token);
  return redirect("/dashboard");
}

export async function sendOtpCode(formData: FormData) {
  // Security: Validate FormData for command injection (CVE-2025-55182)
  try {
    validateFormDataSecurity(formData);
  } catch (error) {
    console.error('[SECURITY] CVE-2025-55182: Invalid FormData in sendOtpCode', error);
    // Don't reveal security error details
    return { error: "Invalid input" };
  }

  // Validate schema (business logic validation)
  const validatedFields = schemaOtpSend.safeParse({
    phoneNumber: formData.get("phone_number"),
  });

  if (!validatedFields.success) {
    throw new Error("invalid phone");
  }

  try {
    const response = await fetch(
      process.env.BASE_URL_BACKEND + "/api/v2/dashboard/auth/code",
      {
        //@ts-ignore
        headers:
          process.env.NODE_ENV === "development"
            ? { "X-Debug-Token": process.env.REACT_APP_X_DEBUG_TOKEN }
            : {},
        method: "POST",
        body: formData,
      }
    );

    const jsonResponse = await response.json();

    if (jsonResponse.error) {
      return {
        error: jsonResponse.error + " " + "phone:" + validatedFields.data.phoneNumber
      }
    }

    if (process.env.NODE_ENV === "development") {
      const code = response.headers.get("x-requested-user");
      console.info("OTP", code);
      if (code) {
        await setCookie("OTP", code);
      }
    }

    return { error: null };
  } catch (error) {
    // Security: Detect attack attempts in errors
    if (error instanceof Error) {
      const attackAttempt = detectAttackAttempt(error.message, { path: '/signin' });
      if (attackAttempt) {
        logAttackAttempt(attackAttempt);
        // Don't reveal error details to potential attackers
        return { error: 'Request failed' };
      }
    }
    const networkError = handleNetworkError(error);
    return { error: networkError };
  }
}

export async function authenticate(formData: FormData): Promise<{
  error: string | null;
  token: string | null;
}> {
  // Security: Validate FormData for command injection (CVE-2025-55182)
  try {
    validateFormDataSecurity(formData);
  } catch (error) {
    console.error('[SECURITY] CVE-2025-55182: Invalid FormData in authenticate', error);
    // Don't reveal security error details
    return {
      token: null,
      error: "Invalid input",
    };
  }

  try {
    const backendUrl = process.env.BASE_URL_BACKEND;
    if (!backendUrl || !isInputSafe(backendUrl)) {
      throw new Error('Invalid backend URL configuration');
    }

    const response = await fetch(
      backendUrl + "/api/v2/dashboard/auth/login",
      {
        method: "POST",
        body: formData,
      }
    );
    const token = response.headers.get("authorization");
    if (token) {
      return {
        token,
        error: null,
      };
    }
    return {
      token: null,
      error: "Login unsuccessful",
    };
  } catch (error) {
    // Security: Detect attack attempts in errors
    if (error instanceof Error) {
      const attackAttempt = detectAttackAttempt(error.message, { path: '/signin' });
      if (attackAttempt) {
        logAttackAttempt(attackAttempt);
        // Don't reveal error details to potential attackers
        return {
          token: null,
          error: 'Authentication failed',
        };
      }
    }
    const networkError = handleNetworkError(error);
    return {
      token: null,
      error: networkError,
    };
  }
}

export async function logoutAction() {
  await deleteCookie("jwt");
  redirect("/signin");
}
