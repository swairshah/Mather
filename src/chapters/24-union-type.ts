import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch31-union-type",
  bookNumber: 31,
  title: "Union Type",
  summary:
    "Represent values that may be one of several types and narrow before using type-specific behavior.",
  concepts: [
    "union members",
    "shared operations",
    "narrowing",
    "variant values",
  ],
  exerciseTheme: "Handling multiple possible types",
  starterCode: starter(
    "Union Type",
    `type Id = string | number;

function stringifyId(id: Id) {
  return String(id);
}`,
  ),
  exercisePrompts: [
    "In the editor, add boolean to the Id union and update stringifyId and add console.log or type-level checks that prove it works.",
    "In the editor, create a function that handles string arrays or single strings and add console.log or type-level checks that prove it works.",
    "In the editor, design a response union that distinguishes cache hits, network hits, and failures and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
