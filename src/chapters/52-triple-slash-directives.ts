import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch59-triple-slash-directives",
  bookNumber: 59,
  title: "Triple-Slash Directives",
  summary:
    "Recognize triple-slash directives in declaration files and older projects.",
  concepts: ["reference directives", "types directives", "declaration files"],
  exerciseTheme: "Reading legacy type hints",
  starterCode: starter(
    "Triple-Slash Directives",
    `// Triple-slash directives usually appear in .d.ts files.
// This exercise focuses on recognizing what they communicate.

type LibraryConfig = {
  globalName: string;
  includesDomTypes: boolean;
};`,
  ),
  exercisePrompts: [
    "Build a small Directive type plus two directive objects that model reference path and reference types entries.",
    "Implement a needsDirective(checklist) function that returns true only when a declaration-file directive is still required.",
    "In the editor, refactor a pretend legacy global type setup into explicit module imports and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
