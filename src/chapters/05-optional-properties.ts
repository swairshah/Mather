import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch12-optional-properties",
  bookNumber: 12,
  title: "Optional Properties",
  summary: "Model properties that may be absent and handle them before use.",
  concepts: ["optional fields", "undefined", "safe access", "default values"],
  exerciseTheme: "Safely reading optional object fields",
  starterCode: starter(
    "Optional Properties",
    `type Profile = {
  name: string;
  nickname?: string;
};

const profile: Profile = { name: "Grace" };
console.log(profile.nickname);`,
  ),
  exercisePrompts: [
    "In the editor, implement code for this task: print nickname only when it exists, otherwise print the name.",
    "In the editor, add an optional settings object and safely read a nested value and add console.log or type-level checks that prove it works.",
    "In the editor, write a normalizeProfile function that returns a version with all optional fields filled in and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
