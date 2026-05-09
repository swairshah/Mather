import { app, BrowserWindow, dialog } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startLocalServer, type StartedServer } from "./server.js";

let mainWindow: BrowserWindow | null = null;
let localServer: StartedServer | null = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createMainWindow(port: number) {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 760,
    title: "aide",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(`http://127.0.0.1:${port}`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

async function bootstrap() {
  const appRoot = path.resolve(__dirname, "..");

  localServer = startLocalServer({
    appRoot,
    userDataPath: app.getPath("userData"),
    port: 3399,
  });

  createMainWindow(localServer.port);

  if (!process.env.OPENAI_API_KEY) {
    dialog.showMessageBox({
      type: "warning",
      title: "OPENAI_API_KEY missing",
      message:
        "OPENAI_API_KEY is not set. You can still browse lessons, but voice/live mode will fail until you launch with OPENAI_API_KEY in your environment.",
    });
  }
}

app.whenReady().then(bootstrap);

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    if (localServer) await localServer.close();
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0 && localServer) {
    createMainWindow(localServer.port);
  }
});

app.on("before-quit", async () => {
  if (localServer) await localServer.close();
});
