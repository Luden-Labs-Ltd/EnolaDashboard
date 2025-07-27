"use server";
import { z } from "zod";
import { setCookie } from "shared/utils/cookies";

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
  await setCookie("currentLanguage", language);
}
