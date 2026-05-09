import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch57-namespacing",
  bookNumber: 57,
  title: "Namespacing",
  summary:
    "Understand TypeScript namespaces, modern module alternatives, and when legacy namespaces appear.",
  concepts: ["namespace", "modules", "scoping", "legacy code"],
  exerciseTheme: "Organizing related values and types",
  starterCode: starter(
    "Namespacing",
    `namespace MathTools {
  export function double(value: number) {
    return value * 2;
  }
}

console.log(MathTools.double(4));`,
  ),
  exercisePrompts: [
    "In the editor, add an exported type inside the namespace and use it outside and add console.log or type-level checks that prove it works.",
    "In the editor, refactor the namespace idea into plain ES module-style objects and add console.log or type-level checks that prove it works.",
    "Implement the same helper once with a namespace and once with a plain module-style object, then call both versions.",
  ],
};

export default chapter;
