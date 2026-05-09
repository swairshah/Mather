import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch55-generics",
  bookNumber: 55,
  title: "Generics",
  summary:
    "Write reusable functions, classes, and constraints that preserve the caller's type information.",
  concepts: [
    "generic functions",
    "generic classes",
    "constraints",
    "contextual narrowing",
  ],
  exerciseTheme: "Reusable type-preserving code",
  starterCode: starter(
    "Generics",
    `function identity<T>(value: T): T {
  return value;
}

const name = identity("Ada");`,
  ),
  exercisePrompts: [
    "In the editor, write a first<T> function for arrays and add console.log or type-level checks that prove it works.",
    "In the editor, add a constraint to read the length of generic values and add console.log or type-level checks that prove it works.",
    "In the editor, build a generic cache class that preserves value types by key and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
