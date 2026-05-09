import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch58-symbols",
  bookNumber: 58,
  title: "Symbols",
  summary:
    "Use symbols for unique property keys and understand their typing behavior.",
  concepts: [
    "symbol",
    "unique symbol",
    "computed keys",
    "well-known symbols",
  ],
  exerciseTheme: "Unique typed keys",
  starterCode: starter(
    "Symbols",
    `const secret = Symbol("secret");

const record = {
  [secret]: "hidden",
  visible: "shown",
};

console.log(record[secret]);`,
  ),
  exercisePrompts: [
    "In the editor, implement code for this task: type the record so the symbol-keyed field is known.",
    "In the editor, create a unique symbol and use it as a branded property and add console.log or type-level checks that prove it works.",
    "In the editor, implement an object with Symbol.iterator and type the yielded values and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
