import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch30-fixed-length-tuple",
  bookNumber: 30,
  title: "Fixed Length Tuple",
  summary:
    "Prevent accidental extra or missing elements when sequence length matters.",
  concepts: ["fixed length", "optional tuple slots", "readonly tuples"],
  exerciseTheme: "Length-safe arrays",
  starterCode: starter(
    "Fixed Length Tuple",
    `type Vec3 = [number, number, number];

const velocity: Vec3 = [0, 1, 0];
console.log(velocity);`,
  ),
  exercisePrompts: [
    "In the editor, write a function that adds two Vec3 values and add console.log or type-level checks that prove it works.",
    "In the editor, create a readonly tuple for a constant matrix row and add console.log or type-level checks that prove it works.",
    "In the editor, build a parser that returns a fixed tuple only after validating input length and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
