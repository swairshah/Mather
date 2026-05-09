import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch32-intersection-types",
  bookNumber: 32,
  title: "Intersection Types",
  summary:
    "Combine multiple type requirements so a value must satisfy all of them.",
  concepts: ["A & B", "composition", "conflicting fields", "mixins"],
  exerciseTheme: "Combining capabilities",
  starterCode: starter(
    "Intersection Types",
    `type HasId = { id: string };
type HasName = { name: string };
type NamedEntity = HasId & HasName;

const entity: NamedEntity = { id: "1", name: "Ada" };`,
  ),
  exercisePrompts: [
    "In the editor, add a Timestamped type and compose it with NamedEntity and add console.log or type-level checks that prove it works.",
    "In the editor, create two intersected capability types with methods and add console.log or type-level checks that prove it works.",
    "Create an intersection with a conflicting property, then replace it with a discriminated union that models the same domain safely.",
  ],
};

export default chapter;
