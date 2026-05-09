import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch50-common-built-in-js-objects",
  bookNumber: 50,
  title: "Common Built-in JS Objects",
  summary:
    "Type common runtime objects such as Date, Map, Set, RegExp, Error, and Promise.",
  concepts: ["Date", "Map", "Set", "RegExp", "Error", "Promise"],
  exerciseTheme: "Typing JavaScript runtime objects",
  starterCode: starter(
    "Common Built-in JS Objects",
    `const seen = new Set<string>();
seen.add("typescript");

const counts = new Map<string, number>();
counts.set("runs", 1);`,
  ),
  exercisePrompts: [
    "In the editor, add Date and RegExp examples with typed helper functions and add console.log or type-level checks that prove it works.",
    "In the editor, write a function that converts a Map<string, number> into sorted entries and add console.log or type-level checks that prove it works.",
    "In the editor, create an async function that returns Promise<Result> and handles Error objects explicitly and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
