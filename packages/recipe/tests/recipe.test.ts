import { describe, expect, it } from "vitest";

import { validateRecipe } from "../src";

describe("Recipe validation", () => {
  it("should validate a minimal recipe", () => {
    const recipe = validateRecipe({
      schemaVersion: 1,

      runtime: {
        provider: "proton-ge",
        version: "GE-Proton10-5",
      },

      launch: {
        executable: "Diablo IV.exe",
      },
    });

    expect(recipe.runtime.provider).toBe("proton-ge");
  });
});
