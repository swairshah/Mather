import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch38-mapped-type-modifiers",
  bookNumber: 38,
  title: "Mapped Type Modifiers",
  summary:
    "Add or remove readonly and optional modifiers while transforming object types.",
  concepts: ["+readonly", "-readonly", "+?", "-?", "modifier control"],
  exerciseTheme: "Changing property mutability and optionality",
  starterCode: starter(
    "Mapped Type Modifiers",
    `type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type ReadonlyPoint = { readonly x: number; readonly y: number };
type Point = Mutable<ReadonlyPoint>;`,
  ),
  exercisePrompts: [
    "In the editor, create a Concrete<T> type that removes optional modifiers and add console.log or type-level checks that prove it works.",
    "In the editor, use Mutable<T> to update a copied readonly object and add console.log or type-level checks that prove it works.",
    "In the editor, build a Draft<T> helper for editing an immutable persisted model and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
