import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch49-built-in-type-primitives",
  bookNumber: 49,
  title: "Built-in Type Primitives",
  summary:
    "Use TypeScript's built-in primitive types accurately and avoid boxed object types.",
  concepts: [
    "string vs String",
    "number vs Number",
    "boolean vs Boolean",
    "symbol",
  ],
  exerciseTheme: "Primitive precision",
  starterCode: starter(
    "Built-in Type Primitives",
    `const label: string = "total";
const amount: number = 42;

console.log(label, amount);`,
  ),
  exercisePrompts: [
    "In the editor, add examples for boolean, bigint, and symbol and add console.log or type-level checks that prove it works.",
    "Create a function that accepts string, pass primitive and boxed values through it, then fix the code to use only lowercase primitive types.",
    "In the editor, create a validator that returns primitive values instead of boxed objects and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
