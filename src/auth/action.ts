"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaOtpSend = z.object({
  phoneNumber: z.string().min(3).max(20),
});

export async function sendOtpCode(formData: FormData) {
  const validatedFields = schemaOtpSend.safeParse({
    phoneNumber: formData.get("phone_number"),
  });

  if (!validatedFields.success) {
    console.log("INVALID REQUEST");
    return false;
  }

  const response = await fetch(
    process.env.BASE_URL_BACKEND + "/api/v2/dashboard/auth/code",
    {
      //@ts-ignore
      headers: process.env.NODE_ENV === 'development' ?
        { 'X-Debug-Token': process.env.REACT_APP_X_DEBUG_TOKEN }
        : {},
      method: "POST",
      body: formData,
    }
  );

  if (process.env.NODE_ENV === "development") {
    const code = response.headers.get("x-requested-user");
    console.info("OTP", code);
  }
}

const schemaAuthenticate = z.object({
    phoneNumber: z.string().min(3).max(20),
    code: z.string().min(3).max(20),
});

export async function authenticate(formData: FormData) {
  const validatedFields = schemaAuthenticate.safeParse({
    phoneNumber: formData.get("phone_number"),
    code: formData.get("code"),
  });

  if (!validatedFields.success) {
    console.log("INVALID REQUEST");
    return false;
  }

  const response = await fetch(
    process.env.BASE_URL_BACKEND + "/api/v2/dashboard/auth/login",
    {
      method: "POST",
      body: formData,
    }
  );
  const token = response.headers.get('authorization');
  if (token) {
    cookies().set("jwt", token, config);
    redirect("/dashboard");
  }
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/signin");
}
