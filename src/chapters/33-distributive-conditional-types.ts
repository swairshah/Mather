import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch40-distributive-conditional-types",
  bookNumber: 40,
  title: "Distributive Conditional Types",
  summary:
    "Understand how conditional types distribute over unions and how to disable that behavior.",
  concepts: ["union distribution", "naked type parameter", "tuple wrapping"],
  exerciseTheme: "Controlling union transforms",
  starterCode: starter(
    "Distributive Conditional Types",
    `type ToArray<T> = T extends unknown ? T[] : never;

type Distributed = ToArray<string | number>;`,
  ),
  exercisePrompts: [
    "Create values for both distributed and non-distributed array types, then add assignments that make the difference visible in code.",
    "In the editor, implement code for this task: disable distribution by wrapping T in a tuple.",
    "In the editor, create a conditional helper that filters union members by a property and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
