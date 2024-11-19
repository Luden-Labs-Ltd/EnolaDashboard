"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaLanguage = z.object({
  language: z.string(),
});

export async function changeLanguage(formData: FormData) {
  const validatedFields = schemaLanguage.safeParse({
    language: formData.get("language"),
  });

  if (!validatedFields.success) {
    return false;
  }
  const language = validatedFields.data.language;
  await cookies().set("currentLanguage", language, config);
}
