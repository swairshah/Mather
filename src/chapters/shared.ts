export type TutorialExercise = {
  level: "Warm-up" | "Practice" | "Challenge";
  prompt: string;
};

export type TutorialReadingSection = {
  heading: string;
  body: string;
};

export type TutorialChapter = {
  id: string;
  bookNumber: number;
  title: string;
  summary: string;
  concepts: string[];
  exerciseTheme: string;
  readingSections: TutorialReadingSection[];
  starterCode: string;
  sourceUrl: string;
  exercises: TutorialExercise[];
};

export type ChapterSeed =
  & Omit<
    TutorialChapter,
    "sourceUrl" | "exercises" | "readingSections"
  >
  & {
    exercisePrompts: [string, string, string];
  };

export const TUTORIAL_SOURCE_URL =
  "https://gibbok.github.io/typescript-book/book/table-of-contents/";

export const LEVELS: TutorialExercise["level"][] = [
  "Warm-up",
  "Practice",
  "Challenge",
];

export function starter(title: string, body: string): string {
  return `// ${title}
// Work through the exercises for this chapter in this editor.
// Run with Cmd+R / Ctrl+R and ask the voice tutor to review your reasoning.

${body}
`;
}
