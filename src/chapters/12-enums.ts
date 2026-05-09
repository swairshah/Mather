import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch19-enums",
  bookNumber: 19,
  title: "Enums",
  summary:
    "Understand TypeScript enums and when literal unions are a better fit.",
  concepts: [
    "numeric enums",
    "string enums",
    "const enums",
    "reverse mapping",
  ],
  exerciseTheme: "Representing named constants",
  starterCode: starter(
    "Enums",
    `enum Status {
  Pending = "pending",
  Done = "done",
}

console.log(Status.Pending);`,
  ),
  exercisePrompts: [
    "In the editor, add another status and write a function that formats each enum value and add console.log or type-level checks that prove it works.",
    "In the editor, rewrite Status as a literal union, then update the formatter and call sites to use the union version.",
    "In the editor, create a small state machine using enum values and exhaustive switching and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
