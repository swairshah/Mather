import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch17-literal-inference",
  bookNumber: 17,
  title: "Literal Inference",
  summary:
    "Control when TypeScript widens values and when it preserves exact literal information.",
  concepts: ["widening", "const assertions", "as const", "inferred literals"],
  exerciseTheme: "Keeping exact values when they matter",
  starterCode: starter(
    "Literal Inference",
    `const route = {
  method: "GET",
  path: "/users",
};

console.log(route.method);`,
  ),
  exercisePrompts: [
    'Add a handleGet(method: "GET") function, make route.method fail first, then fix the route object so the call compiles.',
    "In the editor, create both a normal array and an as const tuple, then add assignments that only the tuple version allows.",
    "In the editor, build a route registry whose keys and methods produce useful literal unions and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
