import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch61-others",
  bookNumber: 61,
  title: "Others",
  summary:
    "Survey practical TypeScript features that appear across modern projects, from async iteration to satisfies and import attributes.",
  concepts: [
    "assertion functions",
    "optional chaining",
    "nullish coalescing",
    "satisfies",
    "type-only imports",
    "using declarations",
  ],
  exerciseTheme: "Modern TypeScript feature fluency",
  starterCode: starter(
    "Others",
    `const config = {
  mode: "prod",
  retries: 3,
} satisfies { mode: "dev" | "prod"; retries: number };

console.log(config.mode, config.retries ?? 0);`,
  ),
  exercisePrompts: [
    "In the editor, use optional chaining and nullish coalescing on a nested settings object and add console.log or type-level checks that prove it works.",
    "In the editor, write an assertion function that proves a value is present and add console.log or type-level checks that prove it works.",
    "In the editor, use satisfies to validate a config object while preserving literal inference and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
