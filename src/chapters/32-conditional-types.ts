import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch39-conditional-types",
  bookNumber: 39,
  title: "Conditional Types",
  summary: "Choose one type or another based on assignability relationships.",
  concepts: [
    "extends condition",
    "true branch",
    "false branch",
    "generic logic",
  ],
  exerciseTheme: "Type-level branching",
  starterCode: starter(
    "Conditional Types",
    `type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;
type B = IsString<number>;`,
  ),
  exercisePrompts: [
    "In the editor, create IsArray<T> and test it with several types and add console.log or type-level checks that prove it works.",
    "In the editor, write MessageOf<T> that extracts a message field when present and add console.log or type-level checks that prove it works.",
    "In the editor, build an ApiResult<T> conditional that treats error payloads differently from success payloads and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
