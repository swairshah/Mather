import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch11-type-annotations",
  bookNumber: 11,
  title: "Type Annotations",
  summary:
    "Use annotations only where they improve clarity or constrain public contracts.",
  concepts: [
    "variable annotations",
    "function parameters",
    "return types",
    "inference boundaries",
  ],
  exerciseTheme: "Balancing inference and explicit contracts",
  starterCode: starter(
    "Type Annotations",
    `function subtotal(price: number, quantity: number) {
  return price * quantity;
}

console.log(subtotal(12, 4));`,
  ),
  exercisePrompts: [
    "In the editor, add an explicit return type to subtotal, then add two typed call sites that compile and one commented-out bad call.",
    "In the editor, create a public function whose return type protects callers from implementation changes and add console.log or type-level checks that prove it works.",
    "In the editor, refactor an over-annotated block so inference handles local variables but exported shapes stay typed and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
