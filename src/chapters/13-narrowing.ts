import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch20-narrowing",
  bookNumber: 20,
  title: "Narrowing",
  summary:
    "Use runtime checks to let TypeScript refine broad unions into precise types.",
  concepts: ["typeof", "truthiness", "equality", "in", "instanceof"],
  exerciseTheme: "Runtime checks that improve static types",
  starterCode: starter(
    "Narrowing",
    `function printId(id: string | number) {
  console.log(id);
}

printId("u1");`,
  ),
  exercisePrompts: [
    "In the editor, handle string and number ids differently with typeof and add console.log or type-level checks that prove it works.",
    "In the editor, create a union of objects and narrow it with the in operator and add console.log or type-level checks that prove it works.",
    "In the editor, implement code for this task: combine instanceof and equality narrowing in a function that accepts Date, string, or null.",
  ],
};

export default chapter;
