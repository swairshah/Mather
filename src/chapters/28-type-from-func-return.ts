import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch35-type-from-func-return",
  bookNumber: 35,
  title: "Type from Func Return",
  summary:
    "Use ReturnType and helper functions to keep result shapes synchronized.",
  concepts: ["ReturnType", "factory functions", "inferred result types"],
  exerciseTheme: "Deriving return contracts",
  starterCode: starter(
    "Type from Func Return",
    `function createUser(name: string) {
  return { id: crypto.randomUUID(), name };
}

type User = ReturnType<typeof createUser>;`,
  ),
  exercisePrompts: [
    "In the editor, add fields to createUser and confirm User follows and add console.log or type-level checks that prove it works.",
    "In the editor, write a function that consumes User without repeating its shape and add console.log or type-level checks that prove it works.",
    "In the editor, create a factory for request states and derive a union from multiple return types and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
