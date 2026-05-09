import { Hono } from "hono";
import WebSocket from "ws";
import { createHandler } from "./agent.js";
import { makeHeaders, makeUrl } from "../utils.js";

export interface ObserverHandler {
  onInit(): void;
  onTool(name: string, args: any, callItemId: string): void;
  onOutputAudioStarted(): void;
  onOutputAudioStopped(): void;
  onOutputAudioCleared(): void;
}

export class ObserverClient {
  private ws: WebSocket;
  private closeResolve: () => void = () => {};
  private closePromise: Promise<void>;
  private handler: ObserverHandler;

  constructor(callId: string) {
    const url = makeUrl(callId);
    this.ws = new WebSocket(url, { headers: makeHeaders() });
    this.ws.on("open", () => this.handleOpen());
    this.ws.on("message", (data) =>
      this.handleMessage(JSON.parse(data.toString()))
    );
    this.ws.on("error", (err) => this.handleError(err));
    this.ws.on("close", (code, reason) => this.handleClose(code, reason));
    this.closePromise = new Promise<void>((resolve) => {
      this.closeResolve = resolve;
    });
    this.handler = createHandler(this, callId);
  }

  createResponse() {
    this.sendMessage({ type: "response.create" });
  }

  submitToolOutput(callItemId: string, output: string) {
    this.sendMessage({
      type: "conversation.item.create",
      item: {
        type: "function_call_output",
        call_id: callItemId,
        output,
      },
    });
    this.createResponse();
  }

  async waitForClose() {
    await this.closePromise;
  }

  private sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }

  private handleOpen() {
    this.handler.onInit();
  }

  private async handleMessage(message: any) {
    switch (message.type) {
      case "response.function_call_arguments.done":
        this.handler.onTool(message.name, message.arguments, message.call_id);
        break;
      case "output_audio_buffer.started":
        this.handler.onOutputAudioStarted();
        break;
      case "output_audio_buffer.stopped":
        this.handler.onOutputAudioStopped();
        break;
      case "output_audio_buffer.cleared":
        this.handler.onOutputAudioCleared();
        break;
    }
  }

  private handleError(err: Error) {
    console.error(`websocket failed: ${err.message}`);
    this.closeResolve();
  }

  private handleClose(code: number, reason: Buffer) {
    console.log(`websocket closed: ${code} ${reason.toString()}`);
    this.closeResolve();
  }
}

const observer = new Hono();

observer.post("/:callId", async (c) => {
  const callId = c.req.param("callId");
  const client = new ObserverClient(callId);
  await client.waitForClose();
  return c.body(null, 204);
});

export default observer;
