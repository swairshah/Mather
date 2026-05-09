import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch18-strict-null-checks",
  bookNumber: 18,
  title: "strictNullChecks",
  summary:
    "Treat null and undefined as values that must be handled explicitly.",
  concepts: ["null", "undefined", "guards", "optional chaining", "defaults"],
  exerciseTheme: "Eliminating unsafe nullable access",
  starterCode: starter(
    "strictNullChecks",
    `type Session = { user?: { name: string } };

const session: Session = {};
console.log(session.user?.name);`,
  ),
  exercisePrompts: [
    "In the editor, add a safe greeting that handles a missing user and add console.log or type-level checks that prove it works.",
    "In the editor, write a requireUser function that returns the user or throws and add console.log or type-level checks that prove it works.",
    "In the editor, model an API response with nullable data and handle every case before rendering and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
