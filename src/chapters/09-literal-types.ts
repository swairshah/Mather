import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch16-literal-types",
  bookNumber: 16,
  title: "Literal Types",
  summary:
    "Use exact values as types to restrict APIs to known modes, actions, and states.",
  concepts: [
    "string literals",
    "number literals",
    "boolean literals",
    "unions",
  ],
  exerciseTheme: "Constrained values",
  starterCode: starter(
    "Literal Types",
    `type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  console.log("theme", theme);
}

applyTheme("dark");`,
  ),
  exercisePrompts: [
    "In the editor, add a third allowed theme and call applyTheme with it and add console.log or type-level checks that prove it works.",
    "In the editor, create a function that accepts only valid HTTP methods and add console.log or type-level checks that prove it works.",
    "In the editor, model a command system where each command has a literal kind and typed payload and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
