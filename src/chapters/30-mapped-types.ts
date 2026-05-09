import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch37-mapped-types",
  bookNumber: 37,
  title: "Mapped Types",
  summary:
    "Transform every property in a type with a reusable mapping expression.",
  concepts: [
    "keyof",
    "in",
    "property transformation",
    "generic mapped types",
  ],
  exerciseTheme: "Systematic property transforms",
  starterCode: starter(
    "Mapped Types",
    `type Flags<T> = {
  [K in keyof T]: boolean;
};

type UserFlags = Flags<{ name: string; email: string }>;`,
  ),
  exercisePrompts: [
    "In the editor, create a Flags value and verify each key is required and add console.log or type-level checks that prove it works.",
    "In the editor, write a Nullable<T> mapped type and add console.log or type-level checks that prove it works.",
    "In the editor, build a form state mapped type that stores value, touched, and error for every field and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
