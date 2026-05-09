import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch15-extending-types",
  bookNumber: 15,
  title: "Extending Types",
  summary:
    "Compose object shapes through extension and intersection without duplicating fields.",
  concepts: ["extends", "intersection", "composition", "shared fields"],
  exerciseTheme: "Composing reusable object models",
  starterCode: starter(
    "Extending Types",
    `type Entity = { id: string };
type User = Entity & { name: string };

const user: User = { id: "u1", name: "Ada" };
console.log(user);`,
  ),
  exercisePrompts: [
    "In the editor, add a Timestamped type and compose it into User and add console.log or type-level checks that prove it works.",
    "In the editor, rewrite the same shape with interfaces and extends and add console.log or type-level checks that prove it works.",
    "In the editor, design base and specialized event types without repeating common metadata and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
