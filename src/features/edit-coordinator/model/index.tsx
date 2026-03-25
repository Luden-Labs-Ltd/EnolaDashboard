import { z } from "zod";

export const editCoordinatorScheme = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  role: z.enum(["manager", "admin"]),
  program_id: z.string().optional(),
});

export type EditCoordinatorValues = z.infer<typeof editCoordinatorScheme>;
