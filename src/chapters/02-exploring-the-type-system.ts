import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch09-exploring-type-system",
  bookNumber: 9,
  title: "Exploring the Type System",
  summary:
    "Learn how TypeScript compares shapes, infers values, widens literals, and narrows unions.",
  concepts: [
    "structural typing",
    "type inference",
    "type widening",
    "freshness",
    "type narrowing",
  ],
  exerciseTheme: "Reasoning about assignability",
  starterCode: starter(
    "Exploring the Type System",
    `type User = { id: string; name: string };

const candidate = { id: "u1", name: "Ada", role: "admin" };
const user: User = candidate;

console.log(user);`,
  ),
  exercisePrompts: [
    "Add a printUser(user: User) function, pass candidate into it, then add a second direct object literal call that shows the excess-property check.",
    "In the editor, create a union of loading, ready, and failed states and narrow it with conditionals and add console.log or type-level checks that prove it works.",
    "In the editor, add a user-defined type guard that proves unknown data is a User before using it and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
