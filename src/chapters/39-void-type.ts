import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch46-void-type",
  bookNumber: 46,
  title: "Void type",
  summary:
    "Use void for functions where callers should not depend on a returned value.",
  concepts: ["void returns", "callbacks", "ignored values", "side effects"],
  exerciseTheme: "Return values that should be ignored",
  starterCode: starter(
    "Void type",
    `function logMessage(message: string): void {
  console.log(message);
}

logMessage("saved");`,
  ),
  exercisePrompts: [
    "In the editor, create a callback type that returns void and pass a function to it and add console.log or type-level checks that prove it works.",
    "Implement one callback typed with void and one function returning undefined, then add call sites that compile only for the correct return contract.",
    "In the editor, design an event emitter API where handlers may return values but the emitter ignores them and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
