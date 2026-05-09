import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch27-object-types",
  bookNumber: 27,
  title: "Object Types",
  summary:
    "Describe object shapes, method properties, nested structures, and object parameter contracts.",
  concepts: ["object shapes", "methods", "nested types", "excess properties"],
  exerciseTheme: "Typed object APIs",
  starterCode: starter(
    "Object Types",
    `type UserCard = {
  id: string;
  name: string;
  render: () => string;
};

const card: UserCard = {
  id: "u1",
  name: "Ada",
  render: () => "Ada",
};`,
  ),
  exercisePrompts: [
    "In the editor, add nested profile data and update render to use it and add console.log or type-level checks that prove it works.",
    "In the editor, write a function that accepts a UserCard and returns display metadata and add console.log or type-level checks that prove it works.",
    "In the editor, create a typed object API for a small settings panel with readonly and optional fields and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
