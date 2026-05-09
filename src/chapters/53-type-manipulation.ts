import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch60-type-manipulation",
  bookNumber: 60,
  title: "Type Manipulation",
  summary:
    "Combine indexed access, mapped types, conditional types, and utility types into practical type transformations.",
  concepts: [
    "indexed access",
    "utility types",
    "mapped types",
    "conditional types",
    "template literals",
  ],
  exerciseTheme: "Composing type-level tools",
  starterCode: starter(
    "Type Manipulation",
    `type ApiUser = {
  id: string;
  name: string;
  email: string;
};

type PublicUser = Pick<ApiUser, "id" | "name">;`,
  ),
  exercisePrompts: [
    "In the editor, use Omit to create a type that hides email and add console.log or type-level checks that prove it works.",
    "In the editor, create a DeepReadonly-like type for one nested level and add console.log or type-level checks that prove it works.",
    "In the editor, build a typed event emitter where event names and payloads are derived from one source map and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
