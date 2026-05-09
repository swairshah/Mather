import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch26-exhaustiveness-checking",
  bookNumber: 26,
  title: "Exhaustiveness checking",
  summary: "Force switch and if chains to handle every member of a union.",
  concepts: ["exhaustive switch", "assertNever", "discriminated unions"],
  exerciseTheme: "Catching missing cases at compile time",
  starterCode: starter(
    "Exhaustiveness checking",
    `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
  }
}`,
  ),
  exercisePrompts: [
    "In the editor, add an assertNever helper to the area function and add console.log or type-level checks that prove it works.",
    "In the editor, add a rectangle variant and observe what breaks until it is handled and add console.log or type-level checks that prove it works.",
    "In the editor, build an exhaustive formatter for a request lifecycle union and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
