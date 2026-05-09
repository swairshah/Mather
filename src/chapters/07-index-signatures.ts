import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch14-index-signatures",
  bookNumber: 14,
  title: "Index Signatures",
  summary:
    "Represent objects with dynamic keys while keeping the value types constrained.",
  concepts: ["string index", "number index", "Record", "dynamic keys"],
  exerciseTheme: "Typed dictionaries",
  starterCode: starter(
    "Index Signatures",
    `type Inventory = {
  [sku: string]: number;
};

const stock: Inventory = { pen: 12, notebook: 4 };
console.log(stock.pen);`,
  ),
  exercisePrompts: [
    "In the editor, add a function that reads stock by SKU and returns zero for missing keys and add console.log or type-level checks that prove it works.",
    "In the editor, refactor Inventory to use Record<string, number>, then update the read and write helpers to compile with the new type.",
    "In the editor, create a dictionary of feature flags where each key maps to a structured object and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
