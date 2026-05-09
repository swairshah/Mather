import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch25-the-never-type",
  bookNumber: 25,
  title: "The never Type",
  summary:
    "Use never for impossible values, unreachable code, and functions that do not return.",
  concepts: ["impossible states", "unreachable paths", "throwing functions"],
  exerciseTheme: "Making impossible states explicit",
  starterCode: starter(
    "The never Type",
    `function fail(message: string): never {
  throw new Error(message);
}

fail("stop here");`,
  ),
  exercisePrompts: [
    "In the editor, write a function that returns string or throws with never and add console.log or type-level checks that prove it works.",
    "In the editor, create a union and an exhaustive branch where the remaining variable has type never.",
    "In the editor, use never in a helper that rejects impossible branches in a switch and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
