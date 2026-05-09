import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch29-named-tuple-type",
  bookNumber: 29,
  title: "Named Tuple Type (Labeled)",
  summary:
    "Add labels to tuple positions so function signatures explain each slot.",
  concepts: ["labeled tuples", "readability", "rest parameters"],
  exerciseTheme: "Readable tuple signatures",
  starterCode: starter(
    "Named Tuple Type",
    `type Range = [start: number, end: number];

const range: Range = [5, 10];
console.log(range);`,
  ),
  exercisePrompts: [
    "In the editor, create a labeled tuple for latitude and longitude and add console.log or type-level checks that prove it works.",
    "In the editor, use a labeled tuple as a rest parameter in a function and add console.log or type-level checks that prove it works.",
    "In the editor, model a command bus whose handler args use labeled tuples for clarity and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
