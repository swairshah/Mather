import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch53-differences-type-interface",
  bookNumber: 53,
  title: "Differences between Type and Interface",
  summary:
    "Choose type aliases or interfaces based on unions, primitives, object extension, and merging behavior.",
  concepts: [
    "object models",
    "unions",
    "intersections",
    "merging",
    "readability",
  ],
  exerciseTheme: "API design choices",
  starterCode: starter(
    "Differences between Type and Interface",
    `interface Service {
  start(): void;
}

type ServiceState = "idle" | "running" | "failed";`,
  ),
  exercisePrompts: [
    "In the editor, add a type alias that cannot be expressed as an interface and add console.log or type-level checks that prove it works.",
    "In the editor, implement code for this task: extend Service with an interface and with an intersection type.",
    "In the editor, design public types for a small SDK and justify interface vs type choices and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
