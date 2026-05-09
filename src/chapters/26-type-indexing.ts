import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch33-type-indexing",
  bookNumber: 33,
  title: "Type Indexing",
  summary:
    "Read property types from existing types to avoid duplicated annotations.",
  concepts: ["indexed access", "keyof", "property type reuse"],
  exerciseTheme: "Deriving types from existing shapes",
  starterCode: starter(
    "Type Indexing",
    `type Account = {
  id: string;
  plan: "free" | "pro";
};

type Plan = Account["plan"];`,
  ),
  exercisePrompts: [
    "In the editor, create a variable of type Plan and try an invalid value and add console.log or type-level checks that prove it works.",
    "In the editor, use keyof Account to write a property reader and add console.log or type-level checks that prove it works.",
    "In the editor, build a generic pluck function that returns the correct property type and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
