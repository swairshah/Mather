import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch45-unknown-type",
  bookNumber: 45,
  title: "Unknown type",
  summary: "Use unknown for values whose type must be proven before use.",
  concepts: ["unknown", "narrowing", "safe parsing", "guards"],
  exerciseTheme: "Safely consuming uncertain data",
  starterCode: starter(
    "Unknown type",
    `const input: unknown = JSON.parse('{"count":3}');

if (typeof input === "object" && input !== null) {
  console.log("object input");
}`,
  ),
  exercisePrompts: [
    "In the editor, implement code for this task: narrow input enough to safely read count.",
    "In the editor, write a predicate for a CountPayload type and add console.log or type-level checks that prove it works.",
    "In the editor, build a parseJson helper that returns unknown and forces callers to validate and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
