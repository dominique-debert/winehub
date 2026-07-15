import { z } from "zod";

export const RuntimeSchema = z.object({
  provider: z.string().min(1),
  version: z.string().min(1),
});
