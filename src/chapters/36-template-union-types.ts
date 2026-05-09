import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch43-template-union-types",
  bookNumber: 43,
  title: "Template Union Types",
  summary:
    "Use template literal types to generate string patterns from unions.",
  concepts: [
    "template literal types",
    "string unions",
    "event names",
    "patterns",
  ],
  exerciseTheme: "Typed string patterns",
  starterCode: starter(
    "Template Union Types",
    `type Field = "name" | "email";
type ChangeEvent = \`\${Field}Changed\`;

const eventName: ChangeEvent = "nameChanged";`,
  ),
  exercisePrompts: [
    "In the editor, add another field and verify the event union expands and add console.log or type-level checks that prove it works.",
    "In the editor, create route strings like /users/:id from resource names and add console.log or type-level checks that prove it works.",
    "In the editor, build a typed analytics event naming scheme from action and entity unions and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
