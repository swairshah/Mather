import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch13-readonly-properties",
  bookNumber: 13,
  title: "Readonly Properties",
  summary:
    "Use readonly to communicate immutability at the type level and avoid accidental mutation.",
  concepts: ["readonly fields", "Readonly<T>", "mutation", "object copies"],
  exerciseTheme: "Preserving immutable data",
  starterCode: starter(
    "Readonly Properties",
    `type Point = {
  readonly x: number;
  readonly y: number;
};

const point: Point = { x: 2, y: 4 };
console.log(point);`,
  ),
  exercisePrompts: [
    "In the editor, try to mutate point.x, read the error, then replace the mutation with a copy, observe the type error, then replace it with a compiling immutable update.",
    "In the editor, create a readonly array of scores and write a function that returns a sorted copy and add console.log or type-level checks that prove it works.",
    "In the editor, model an immutable Todo and implement toggleTodo without mutating the original and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
