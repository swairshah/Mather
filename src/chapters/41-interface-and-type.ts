import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch48-interface-and-type",
  bookNumber: 48,
  title: "Interface and Type",
  summary:
    "Compare interfaces and type aliases for object models, unions, intersections, and extension.",
  concepts: [
    "interface",
    "type alias",
    "declaration merging",
    "unions",
    "extension",
  ],
  exerciseTheme: "Choosing interface or type alias",
  starterCode: starter(
    "Interface and Type",
    `interface User {
  id: string;
  name: string;
}

type UserId = User["id"];`,
  ),
  exercisePrompts: [
    "In the editor, rewrite User as a type alias, then add an AdminUser extension using an intersection type.",
    "In the editor, create a union that requires a type alias rather than an interface and add console.log or type-level checks that prove it works.",
    "In the editor, use interface merging to add one field, then write a createUser function that requires the merged shape.",
  ],
};

export default chapter;
