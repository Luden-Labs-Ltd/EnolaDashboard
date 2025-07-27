"use server";
import { z } from "zod";
import { setCookie, deleteCookie } from "shared/utils/cookies";
import { redirect } from "next/navigation";

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
  const validatedFields = schemaOtpSend.safeParse({
    phoneNumber: formData.get("phone_number"),
  });

  if (!validatedFields.success) {
    throw new Error("invalid phone");
  }

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
}

export async function authenticate(formData: FormData): Promise<{
  error: string | null;
  token: string | null;
}> {
  try {
    const response = await fetch(
      process.env.BASE_URL_BACKEND + "/api/v2/dashboard/auth/login",
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
    return {
      token: null,
      error: "Login unsuccessful",
    };
  }
}

export async function logoutAction() {
  await deleteCookie("jwt");
  redirect("/signin");
}
