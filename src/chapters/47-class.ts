import { type ChapterSeed, starter } from "./shared.js";

const chapter: ChapterSeed = {
  id: "ch54-class",
  bookNumber: 54,
  title: "Class",
  summary:
    "Practice TypeScript's class features: constructors, access modifiers, generics, inheritance, statics, and decorators.",
  concepts: [
    "constructors",
    "private/protected",
    "getters/setters",
    "abstract classes",
    "generics",
    "statics",
  ],
  exerciseTheme: "Typed object-oriented design",
  starterCode: starter(
    "Class",
    `class Counter {
  private value = 0;

  increment() {
    this.value += 1;
  }

  get count() {
    return this.value;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.count);`,
  ),
  exercisePrompts: [
    "In the editor, add a constructor parameter that sets the initial count and add console.log or type-level checks that prove it works.",
    "In the editor, create an abstract Store class and a concrete MemoryStore subclass and add console.log or type-level checks that prove it works.",
    "In the editor, build a generic Repository<T> with private storage, static helpers, and method overloads and add console.log or type-level checks that prove it works.",
  ],
};

export default chapter;
