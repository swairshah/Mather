import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch56-erased-structural-types",
  bookNumber: 56,
  title: "Erased Structural Types",
  summary:
    "Remember that TypeScript types are erased at runtime and compatibility is based on structure.",
  concepts: [
    "type erasure",
    "runtime checks",
    "structural compatibility",
    "branding",
  ],
  exerciseTheme: "Bridging compile-time and runtime",
  starterCode: starter(
    "Erased Structural Types",
    `type UserId = string;
const id: UserId = "u1";

console.log(typeof id);`,
  ),
  exercisePrompts: [
    "Add runtime console.log checks for UserId and plain string values, then add a branded constructor to make accidental assignment harder.",
    "In the editor, create a runtime validator for data that TypeScript cannot verify after fetch and add console.log or type-level checks that prove it works.",
    "In the editor, add a branded type for UserId and write a safe constructor for it and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
