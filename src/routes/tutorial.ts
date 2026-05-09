import { Hono } from "hono";
import { buildChapterPrompt, TUTORIAL_CHAPTERS } from "../tutorial.js";

const tutorial = new Hono();

tutorial.get("/", (c) => {
  return c.json({
    chapters: TUTORIAL_CHAPTERS.map((chapter) => ({
      ...chapter,
      voicePrompt: buildChapterPrompt(chapter.id),
    })),
  });
});

export default tutorial;
