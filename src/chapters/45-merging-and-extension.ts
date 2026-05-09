import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch52-merging-and-extension",
  bookNumber: 52,
  title: "Merging and Extension",
  summary:
    "Understand declaration merging and extension rules so augmented types stay intentional.",
  concepts: [
    "declaration merging",
    "interface extension",
    "module augmentation",
  ],
  exerciseTheme: "Extending types deliberately",
  starterCode: starter(
    "Merging and Extension",
    `interface Preferences {
  theme: "light" | "dark";
}

interface Preferences {
  fontSize: number;
}

const prefs: Preferences = { theme: "dark", fontSize: 14 };`,
  ),
  exercisePrompts: [
    "Add a function that accepts Preferences, then add a third merged field and update the object until the code compiles.",
    "In the editor, use extends to create a specialized preferences interface and add console.log or type-level checks that prove it works.",
    "In the editor, model a plugin registry where merging is useful, then document the risk and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
