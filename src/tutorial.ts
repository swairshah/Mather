import { CHAPTER_SEEDS } from "./chapters/index.js";
import {
  LEVELS,
  TUTORIAL_SOURCE_URL,
  type TutorialChapter,
} from "./chapters/shared.js";
export type { TutorialChapter, TutorialExercise } from "./chapters/shared.js";
export { TUTORIAL_SOURCE_URL } from "./chapters/shared.js";

export const TUTORIAL_CHAPTERS: TutorialChapter[] = CHAPTER_SEEDS.map((
  chapter,
  index,
) => ({
  id: chapter.id,
  bookNumber: index + 1,
  title: chapter.title,
  summary: chapter.summary,
  concepts: chapter.concepts,
  exerciseTheme: chapter.exerciseTheme,
  readingSections: buildReadingSections(chapter),
  starterCode: chapter.starterCode,
  sourceUrl: TUTORIAL_SOURCE_URL,
  exercises: chapter.exercisePrompts.map((prompt, index) => ({
    level: LEVELS[index],
    prompt,
  })),
}));

function buildReadingSections(
  chapter: typeof CHAPTER_SEEDS[number],
): TutorialChapter["readingSections"] {
  const conceptList = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(chapter.concepts);

  return [
    {
      heading: "Read",
      body:
        `${chapter.summary} The important move is to connect the chapter idea to code you can change and run, not just memorize the terminology.`,
    },
    {
      heading: "Key Ideas",
      body:
        `Focus on ${conceptList}. As you read the chapter, keep asking which parts are checked only by TypeScript, which parts still exist at runtime, and where the compiler needs a clearer signal from your code.`,
    },
    {
      heading: "Practice Goal",
      body:
        `By the end of this chapter, you should be able to use ${chapter.title} in a small TypeScript snippet, make an intentional mistake, recognize the compiler feedback, and repair the code without reaching for any.`,
    },
  ];
}

export function getChapter(id?: string | null): TutorialChapter {
  return TUTORIAL_CHAPTERS.find((chapter) => chapter.id === id) ??
    TUTORIAL_CHAPTERS[0];
}

export function buildChapterPrompt(id?: string | null): string {
  const chapter = getChapter(id);
  const concepts = chapter.concepts.join(", ");
  const exercises = chapter.exercises
    .map((exercise) => `${exercise.level}: ${exercise.prompt}`)
    .join(" | ");

  return [
    `Current tutorial chapter: ${chapter.bookNumber}. ${chapter.title}.`,
    `Source curriculum: The Concise TypeScript Book by gibbok; this app starts after the first introductory basics chapter.`,
    `Teaching goal: help the student understand ${chapter.title} through short spoken explanations and live code work.`,
    `Chapter summary: ${chapter.summary}`,
    `Core concepts to cover: ${concepts}.`,
    `Exercise theme: ${chapter.exerciseTheme}.`,
    `Targeted exercises, in increasing difficulty: ${exercises}.`,
    `Start by asking what the student wants to try, then suggest the warm-up if they are unsure.`,
    `Use the editor tools to show small, runnable TypeScript examples instead of giving long lectures.`,
    `When explaining code, highlight the exact symbol, branch, or type relationship being discussed.`,
    `Prefer questions that make the student predict TypeScript's behavior before you reveal the answer.`,
    `If the student's code is wrong, point to the smallest broken assumption and help them repair it.`,
    `When an exercise is complete, ask the student to summarize the rule in their own words.`,
    `Keep spoken responses brief; use the editor for code and structured examples.`,
  ].join("\n");
}
