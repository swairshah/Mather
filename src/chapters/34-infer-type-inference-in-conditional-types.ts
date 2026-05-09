import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch41-infer-type-inference",
  bookNumber: 41,
  title: "infer Type Inference in Conditional Types",
  summary:
    "Capture a type inside a conditional type and reuse it in the result.",
  concepts: ["infer", "array element extraction", "promise value extraction"],
  exerciseTheme: "Extracting hidden types",
  starterCode: starter(
    "infer Type Inference",
    `type ElementType<T> = T extends Array<infer Item> ? Item : T;

type Name = ElementType<string[]>;
type Count = ElementType<number>;`,
  ),
  exercisePrompts: [
    "In the editor, create PromiseValue<T> with infer and add console.log or type-level checks that prove it works.",
    "In the editor, implement code for this task: extract the first argument type from a function.",
    "In the editor, build a nested unwrap helper that handles Promise<Array<T>> and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
