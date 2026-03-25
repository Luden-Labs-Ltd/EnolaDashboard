import { z } from "zod";

/** Digits, shortcodes (*), international (+), # (extensions), common separators — no letters */
const RESOURCE_PHONE_CHARS = /^[\d\s*+().#-]+$/;

export function buildResourceFormSchema(phoneInvalidFormat: string) {
  return z.object({
    name: z.string().min(3).max(50),
    provider: z.string().max(50),
    contact_name: z.string().max(50).optional(),
    terms_of_service: z.string().max(50).optional(),
    access_requirements: z.string().max(50).optional(),
    phone_number: z
      .string()
      .max(64)
      .refine(
        (s) => !s.trim() || RESOURCE_PHONE_CHARS.test(s),
        { message: phoneInvalidFormat }
      ),
    email: z.string().max(255).optional(),
    link: z.string().max(2048).optional(),
    address: z.string().max(50).optional(),
    category_id: z.string(),
  });
}

export type ResourceFormValues = z.infer<
  ReturnType<typeof buildResourceFormSchema>
>;
