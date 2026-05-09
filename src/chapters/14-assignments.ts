import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch21-assignments",
  bookNumber: 21,
  title: "Assignments",
  summary:
    "See how TypeScript checks assignments against declared types and control-flow narrowed types.",
  concepts: [
    "declared type",
    "observed type",
    "reassignment",
    "assignability",
  ],
  exerciseTheme: "Predicting valid assignments",
  starterCode: starter(
    "Assignments",
    `let value: string | number = "ready";
value = 42;

console.log(value);`,
  ),
  exercisePrompts: [
    "In the editor, add several assignments and predict which are valid before running type checking and add console.log or type-level checks that prove it works.",
    "In the editor, implement code for this task: narrow value, then reassign it and observe what TypeScript remembers.",
    "In the editor, create a reducer-like function where each assignment keeps the final state type valid and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
