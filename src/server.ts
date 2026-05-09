import { serve, type ServerType } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import path from "node:path";
import { createSessionsRoute } from "./routes/sessions.js";
import rtc from "./routes/rtc.js";
import observer from "./routes/observer.js";
import tutorial from "./routes/tutorial.js";

export interface StartedServer {
  port: number;
  close: () => Promise<void>;
}

export function startLocalServer(opts: {
  appRoot: string;
  userDataPath: string;
  port?: number;
}): StartedServer {
  const { appRoot, userDataPath, port = 3399 } = opts;
  const frontendRoot = path.join(appRoot, "frontend");
  const sessionsPath = path.join(userDataPath, "sessions.json");

  const app = new Hono();

  app.route("/rtc", rtc);
  app.route("/observer", observer);
  app.route("/tutorial", tutorial);
  app.route("/sessions", createSessionsRoute(sessionsPath));

  app.get("/source", (c) => c.redirect("https://github.com"));

  app.get(
    "/favicon.ico",
    serveStatic({
      root: frontendRoot,
      path: "favicon.ico",
    }),
  );

  app.use(
    "*",
    serveStatic({
      root: frontendRoot,
      rewriteRequestPath: (requestPath) => {
        if (requestPath === "/") return "index.html";
        return requestPath;
      },
    }),
  );

  const server: ServerType = serve({ fetch: app.fetch, port });

  return {
    port,
    close: async () => {
      await new Promise<void>((resolve, reject) => {
        server.close((err?: Error) => {
          if (err) reject(err);
          else resolve();
        });
      });
    },
  };
}
