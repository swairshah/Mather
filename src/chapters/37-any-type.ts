import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch44-any-type",
  bookNumber: 44,
  title: "Any type",
  summary:
    "Recognize how any disables type safety and contain it at unsafe boundaries.",
  concepts: ["any", "unsafe calls", "boundary typing", "migration"],
  exerciseTheme: "Replacing any with safer boundaries",
  starterCode: starter(
    "Any type",
    `let payload: any = { name: "Ada" };
console.log(payload.name.toUpperCase());`,
  ),
  exercisePrompts: [
    "In the editor, add an unsafe any call that throws at runtime, then replace it with a checked version that runs safely.",
    "In the editor, replace any with unknown and add narrowing and add console.log or type-level checks that prove it works.",
    "In the editor, write a small adapter that confines any to one line and returns a safe type and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
