import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch51-overloads",
  bookNumber: 51,
  title: "Overloads",
  summary:
    "Define multiple call signatures for one implementation when inputs determine output types.",
  concepts: [
    "overload signatures",
    "implementation signature",
    "call-site precision",
  ],
  exerciseTheme: "Precise function call contracts",
  starterCode: starter(
    "Overloads",
    `function parse(input: string): string[];
function parse(input: number): number[];
function parse(input: string | number) {
  return typeof input === "string" ? input.split(",") : [input];
}`,
  ),
  exercisePrompts: [
    "In the editor, call parse with string and number, then assign each result to a typed variable that verifies the overload result.",
    "In the editor, add a boolean overload and update the implementation and add console.log or type-level checks that prove it works.",
    "In the editor, design overloads for a small fetchValue API that returns different shapes by key and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
