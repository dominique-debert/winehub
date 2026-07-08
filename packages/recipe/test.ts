import { validateRecipe } from "./src";

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

console.log(recipe);
