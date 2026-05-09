import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch28-tuple-type-anonymous",
  bookNumber: 28,
  title: "Tuple Type (Anonymous)",
  summary:
    "Use tuples for fixed-position values where each slot has a specific meaning.",
  concepts: ["tuple positions", "fixed order", "array contrast"],
  exerciseTheme: "Position-based data",
  starterCode: starter(
    "Tuple Type (Anonymous)",
    `const point: [number, number] = [10, 20];
console.log(point[0], point[1]);`,
  ),
  exercisePrompts: [
    "In the editor, create a tuple for RGB color and print each channel and add console.log or type-level checks that prove it works.",
    "In the editor, write a function that returns a [success, value] tuple and add console.log or type-level checks that prove it works.",
    "Rewrite the tuple as an object with named fields, then update the calling code to use the clearer object version.",
  ],
};

export default chapter;
