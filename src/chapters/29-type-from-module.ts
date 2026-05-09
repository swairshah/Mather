import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch36-type-from-module",
  bookNumber: 36,
  title: "Type from Module",
  summary:
    "Import and reuse types from modules while separating value imports from type imports.",
  concepts: ["import type", "module types", "exported contracts"],
  exerciseTheme: "Module boundary types",
  starterCode: starter(
    "Type from Module",
    `export type ApiUser = {
  id: string;
  name: string;
};

const example: ApiUser = { id: "u1", name: "Ada" };
console.log(example);`,
  ),
  exercisePrompts: [
    "Create two tiny module-shaped sections in the editor, then wire a formatter to a type-only API contract and a runtime helper value.",
    "In the editor, create an exported response type and a local formatter that uses it and add console.log or type-level checks that prove it works.",
    "In the editor, design a module boundary where implementation details stay private but return types remain reusable and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
