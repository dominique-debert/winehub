import { z } from "zod";

export const RecipeSchema = z.object({
  schemaVersion: z.literal(1),

  runtime: z.object({
    provider: z.string().min(1),
    version: z.string().min(1),
  }),

  launch: z.object({
    executable: z.string().min(1),

    arguments: z.array(z.string()).optional(),

    workingDirectory: z.string().optional(),
  }),
});

export type Recipe = z.infer<typeof RecipeSchema>;
