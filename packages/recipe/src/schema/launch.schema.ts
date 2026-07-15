import { z } from "zod";

export const LaunchSchema = z.object({
  executable: z.string().min(1),

  arguments: z.array(z.string()).optional(),

  workingDirectory: z.string().optional(),
});
