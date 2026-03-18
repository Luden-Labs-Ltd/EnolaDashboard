import { z } from "zod";

export const editResourceScheme = z.object({
  name: z.string().min(3).max(50),
  provider: z.string().max(50),
  contact_name: z.string().max(50).optional(),
  terms_of_service: z.string().max(50).optional(),
  access_requirements: z.string().max(50).optional(),
  phone_number: z.string().max(50).or(z.literal("")).optional(),
  email: z.string().email().or(z.literal('')).optional(),
  link: z.string().url().or(z.literal('')).optional(),
  address: z.string().max(50).optional(),
  category_id: z.string(),
});

export type EditResourceValues = z.infer<typeof editResourceScheme>;
