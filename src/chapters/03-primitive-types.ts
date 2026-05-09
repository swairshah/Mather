import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch10-primitive-types",
  bookNumber: 10,
  title: "Primitive Types",
  summary:
    "Practice TypeScript's primitive types and the differences between safe types, any, arrays, null, and undefined.",
  concepts: [
    "string",
    "number",
    "boolean",
    "bigint",
    "symbol",
    "array",
    "any",
  ],
  exerciseTheme: "Choosing precise primitive types",
  starterCode: starter(
    "Primitive Types",
    `const productName = "notebook";
const quantity = 3;
const inStock = true;

console.log(productName, quantity, inStock);`,
  ),
  exercisePrompts: [
    "In the editor, implement code for this task: annotate each primitive value and add an array of product tags.",
    "In the editor, add null and undefined examples, then write a function that handles both safely and add console.log or type-level checks that prove it works.",
    "In the editor, replace an any value with unknown and prove its type before calling a string method and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
