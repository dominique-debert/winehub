import { RecipeSchema, type Recipe } from "../schema";

export function validateRecipe(data: unknown): Recipe {
  return RecipeSchema.parse(data);
}
