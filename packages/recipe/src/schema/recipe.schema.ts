import { z } from "zod";

import { RuntimeSchema } from "./runtime.schema";
import { LaunchSchema } from "./launch.schema";

export const RecipeSchema = z.object({
  schemaVersion: z.literal(1),

  runtime: RuntimeSchema,

  launch: LaunchSchema,
});

export type Recipe = z.infer<typeof RecipeSchema>;
