import { Hono } from "hono";
import { makeSession } from "./agent.js";
import { getErrorText, makeHeaders, makeUrl } from "../utils.js";

const rtc = new Hono();

rtc.post("/", async (c) => {
  const model = c.req.query("model");
  const chapter = c.req.query("chapter");

  const fd = new FormData();
  fd.set("sdp", await c.req.text());
  fd.set("session", JSON.stringify(makeSession(model, chapter)));

  const resp = await fetch(makeUrl(), {
    method: "POST",
    headers: makeHeaders(),
    body: fd,
  });

  if (!resp.ok) {
    console.error(`start call failed: ${await getErrorText(resp)}`);
    return c.text("Internal error", 500);
  }

  const contentType = resp.headers.get("Content-Type");
  const location = resp.headers.get("Location");
  const callId = location?.split("/").pop();

  const selfUrl = new URL(c.req.url);
  if (callId) {
    fetch(`${selfUrl.origin}/observer/${callId}`, { method: "POST" }).catch((e) =>
      console.error("observer start failed:", e)
    );
  }

  const responseHeaders: Record<string, string> = {};
  if (contentType) responseHeaders["Content-Type"] = contentType;
  if (location) responseHeaders["Location"] = location;
  return c.newResponse(resp.body, { headers: responseHeaders });
});

export default rtc;
