import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch24-discriminated-unions",
  bookNumber: 24,
  title: "Discriminated Unions",
  summary:
    "Model variants with a shared literal field so each branch has precise payloads.",
  concepts: [
    "discriminant",
    "tagged union",
    "payload narrowing",
    "state machines",
  ],
  exerciseTheme: "Variant data models",
  starterCode: starter(
    "Discriminated Unions",
    `type Result =
  | { status: "ok"; value: number }
  | { status: "error"; message: string };

function show(result: Result) {
  console.log(result.status);
}`,
  ),
  exercisePrompts: [
    "In the editor, update show to handle each status and return output that uses the correct payload field.",
    "In the editor, add a loading variant and update all branches and add console.log or type-level checks that prove it works.",
    "In the editor, design a checkout state union that prevents reading payment data before payment exists and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
