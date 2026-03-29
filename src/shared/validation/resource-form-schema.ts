import { z } from "zod";

const RESOURCE_SHORT_CODE = /^\*\d{3,6}$/;
const RESOURCE_PHONE_CHARS = /^[\d\s()+-]+$/;

function normalizePhone(raw: string) {
  return raw.replace(/[\s()-]/g, "");
}

function isValidResourcePhone(raw: string) {
  const value = raw.trim();
  if (!value) return true;

  if (RESOURCE_SHORT_CODE.test(value)) return true;
  if (value.startsWith("*")) return false;
  if (!RESOURCE_PHONE_CHARS.test(value)) return false;

  const normalized = normalizePhone(value);

  return (
    /^\+972\d{8,9}$/.test(normalized) ||
    /^972\d{8,9}$/.test(normalized) ||
    /^0\d{8,9}$/.test(normalized)
  );
}

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
      .refine(isValidResourcePhone, { message: phoneInvalidFormat }),
    email: z.string().max(255).optional(),
    link: z.string().max(2048).optional(),
    address: z.string().max(50).optional(),
    category_id: z.string(),
  });
}

export type ResourceFormValues = z.infer<
  ReturnType<typeof buildResourceFormSchema>
>;
