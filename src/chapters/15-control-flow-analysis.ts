import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch22-control-flow-analysis",
  bookNumber: 22,
  title: "Control Flow Analysis",
  summary:
    "Follow how TypeScript tracks paths through returns, throws, branches, and loops.",
  concepts: ["reachability", "returns", "throws", "branch narrowing"],
  exerciseTheme: "Using code paths to prove types",
  starterCode: starter(
    "Control Flow Analysis",
    `function format(value: string | number) {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}

console.log(format("done"));`,
  ),
  exercisePrompts: [
    "In the editor, add a boolean case and update the control flow safely and add console.log or type-level checks that prove it works.",
    "In the editor, write a function that throws for invalid input and uses the narrowed value afterward and add console.log or type-level checks that prove it works.",
    "In the editor, create a parser that returns early for failures and keeps success data strongly typed and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
