import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch34-type-from-value",
  bookNumber: 34,
  title: "Type from Value",
  summary: "Use typeof and const data to derive types from runtime values.",
  concepts: [
    "typeof",
    "as const",
    "derived unions",
    "single source of truth",
  ],
  exerciseTheme: "Runtime data as type source",
  starterCode: starter(
    "Type from Value",
    `const roles = ["admin", "editor", "viewer"] as const;
type Role = typeof roles[number];

const role: Role = "admin";`,
  ),
  exercisePrompts: [
    "In the editor, add a new role and confirm the Role type updates automatically and add console.log or type-level checks that prove it works.",
    "In the editor, create a settings object and derive a union of its keys and add console.log or type-level checks that prove it works.",
    "In the editor, build a typed permissions map derived from a const feature list and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
