import { z } from "zod";

export const createResourceScheme = z.object({
  name: z.string().min(3).max(50),
  provider: z.string().min(3).max(50),
  contact_name: z.string().min(3).max(50),
  phone_number: z.string().min(3).max(50),
  terms_of_service: z.string().min(3).max(50),
  email: z.string().email(),
  link: z.string().url(),
  category_id: z.string(),
});

export type CreateResourceValues = z.infer<typeof createResourceScheme>;

