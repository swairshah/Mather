import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch47-never-type",
  bookNumber: 47,
  title: "Never type",
  summary:
    "Revisit never as the type of impossible results and exhausted unions.",
  concepts: [
    "never",
    "exhaustion",
    "impossible assignments",
    "non-returning functions",
  ],
  exerciseTheme: "Using never in real APIs",
  starterCode: starter(
    "Never type",
    `type Command = { type: "save" } | { type: "load" };

function assertNever(value: never): never {
  throw new Error("Unexpected value: " + value);
}`,
  ),
  exercisePrompts: [
    "In the editor, write a switch over Command and call assertNever in the default branch and add console.log or type-level checks that prove it works.",
    "In the editor, add a command variant and use the error to find missing logic and add console.log or type-level checks that prove it works.",
    "In the editor, create a Result type where invalid combinations collapse to never and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
