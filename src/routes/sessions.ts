import { Hono } from "hono";
import { promises as fs } from "node:fs";
import path from "node:path";

interface SessionRecord {
  id: string;
  started_at: number;
  stopped_at: number;
  events: unknown[];
  final_editor: string | null;
}

const MAX_PAYLOAD_BYTES = 1_000_000;

async function ensureStore(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf8");
  }
}

async function readAll(filePath: string): Promise<SessionRecord[]> {
  await ensureStore(filePath);
  const raw = await fs.readFile(filePath, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(filePath: string, sessions: SessionRecord[]) {
  await fs.writeFile(filePath, JSON.stringify(sessions), "utf8");
}

export function createSessionsRoute(filePath: string) {
  const sessions = new Hono();

  sessions.post("/", async (c) => {
    let body: any;
    try {
      body = await c.req.json();
    } catch {
      return c.text("invalid json body", 400);
    }

    const id = typeof body?.id === "string" && body.id
      ? body.id
      : crypto.randomUUID();
    const startedAt = Number(body?.startedAt) || Date.now();
    const stoppedAt = Number(body?.stoppedAt) || Date.now();
    const events = Array.isArray(body?.events) ? body.events : [];
    const finalEditor = typeof body?.finalEditor === "string"
      ? body.finalEditor
      : null;

    const eventsJson = JSON.stringify(events);
    if (eventsJson.length > MAX_PAYLOAD_BYTES) {
      return c.text("session payload too large", 413);
    }

    const all = await readAll(filePath);
    const record: SessionRecord = {
      id,
      started_at: startedAt,
      stopped_at: stoppedAt,
      events,
      final_editor: finalEditor,
    };

    const existingIndex = all.findIndex((item) => item.id === id);
    if (existingIndex >= 0) {
      all[existingIndex] = record;
    } else {
      all.push(record);
    }

    await writeAll(filePath, all);
    return c.json({ id, eventCount: events.length });
  });

  sessions.get("/", async (c) => {
    const limit = Math.min(Number(c.req.query("limit")) || 50, 200);
    const all = await readAll(filePath);
    const rows = [...all]
      .sort((a, b) => b.started_at - a.started_at)
      .slice(0, limit)
      .map((session) => ({
        id: session.id,
        started_at: session.started_at,
        stopped_at: session.stopped_at,
        bytes: JSON.stringify(session.events).length,
      }));

    return c.json({ sessions: rows });
  });

  sessions.get("/:id", async (c) => {
    const id = c.req.param("id");
    const all = await readAll(filePath);
    const found = all.find((session) => session.id === id);
    if (!found) return c.text("not found", 404);

    return c.json(found);
  });

  return sessions;
}
