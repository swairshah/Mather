import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch23-type-predicates",
  bookNumber: 23,
  title: "Type Predicates",
  summary:
    "Write reusable boolean functions that teach TypeScript how to narrow values.",
  concepts: ["value is Type", "custom guards", "filtering arrays"],
  exerciseTheme: "Reusable type guards",
  starterCode: starter(
    "Type Predicates",
    `type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return "swim" in pet;
}`,
  ),
  exercisePrompts: [
    "In the editor, use isFish to call swim safely and add console.log or type-level checks that prove it works.",
    "In the editor, create an isNonNull predicate and use it with Array.filter and add console.log or type-level checks that prove it works.",
    "In the editor, validate unknown JSON into a typed domain object with nested predicates and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
