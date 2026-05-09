import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch42-predefined-conditional-types",
  bookNumber: 42,
  title: "Predefined Conditional Types",
  summary:
    "Practice built-in utility types that are implemented with conditional types.",
  concepts: ["Exclude", "Extract", "NonNullable", "ReturnType", "Parameters"],
  exerciseTheme: "Using standard conditional helpers",
  starterCode: starter(
    "Predefined Conditional Types",
    `type Status = "idle" | "loading" | "success" | "error";
type FinishedStatus = Exclude<Status, "idle" | "loading">;`,
  ),
  exercisePrompts: [
    "In the editor, use Extract to keep only failure-like statuses and add console.log or type-level checks that prove it works.",
    "In the editor, use NonNullable on a nullable API value and add console.log or type-level checks that prove it works.",
    "In the editor, use Parameters and ReturnType to create a typed wrapper around a function and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
