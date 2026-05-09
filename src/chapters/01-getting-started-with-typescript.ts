import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch08-getting-started",
  bookNumber: 8,
  title: "Getting Started With TypeScript",
  summary:
    "Set up a TypeScript mental model: compiler options, project boundaries, and gradual migration from JavaScript.",
  concepts: [
    "installation choices",
    "tsconfig targets",
    "strict mode",
    "module resolution",
    "migration strategy",
  ],
  exerciseTheme: "Configuration and migration decisions",
  starterCode: starter(
    "Getting Started With TypeScript",
    `// Pretend this came from a small JavaScript file you are migrating.
// TypeScript's first job is to make assumptions visible.
type Profile = {
  name: string;
  birthYear?: number;
};

const thisYear = new Date().getFullYear();

function describeProfile(profile: Profile) {
  const age = profile.birthYear === undefined
    ? "unknown age"
    : thisYear - profile.birthYear;

  return \`\${profile.name}: \${age}\`;
}

console.log(describeProfile({ name: "Ada", birthYear: 1815 }));
console.log(describeProfile({ name: "Grace" }));`,
  ),
  exercisePrompts: [
    "Modify describeProfile to handle missing birthYear in code, then add two console.log calls that prove both paths work.",
    "In the editor, add a second optional field, then update describeProfile without using any or unsafe assertions and add console.log or type-level checks that prove it works.",
    "In the editor, create a typed migration checklist array and a function that prints the strictness fixes in priority order.",
  ],
};

export default chapter;
