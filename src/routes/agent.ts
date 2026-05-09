import { ObserverClient, ObserverHandler } from "./observer.js";
import { getErrorText, makeHeaders, makeUrl } from "../utils.js";
import { buildChapterPrompt } from "../tutorial.js";

const MODEL = "gpt-realtime-2";
const TRANSCRIBE_MODEL = "gpt-realtime-whisper";
const NR_TYPE = "near_field";
const VOICE = "marin";

const INSTRUCTIONS = `
You are a programming language tutor. Be concise unless user asks for details.
When you connect initially say hi and mention we'll learn in aide.
The user starts in TypeScript mode, but can ask for other languages.

You have access to tools:
- read_editor
- write_editor
- replace_in_editor
- highlight_in_editor
- read_notes
- highlight_in_notes
- run_editor
- end_call

Use highlight_in_editor when explaining specific code in the editor.
Use read_notes to inspect the currently visible lesson/notes panel.
Use highlight_in_notes when explaining specific lesson notes, concepts, or exercises.
Use run_editor when user asks to run/test code.
When user says goodbye, say a short goodbye then call end_call.
`;

const HANGUP_TOOL = {
  type: "function",
  name: "end_call",
  description: "Hang up the call when the user says goodbye.",
};

const GET_CURRENT_TIME_TOOL = {
  type: "function",
  name: "get_current_time",
  description: "Returns the current date and time in UTC.",
};

const WEB_SEARCH_TOOL = {
  type: "function",
  name: "web_search",
  description: "Search the web and return a short summary.",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string" },
    },
    required: ["query"],
  },
};

const FETCH_URL_TOOL = {
  type: "function",
  name: "fetch_url",
  description: "Fetch readable text from a URL.",
  parameters: {
    type: "object",
    properties: {
      url: { type: "string" },
    },
    required: ["url"],
  },
};

const READ_EDITOR_TOOL = {
  type: "function",
  name: "read_editor",
  description: "Reads full editor text.",
};

const WRITE_EDITOR_TOOL = {
  type: "function",
  name: "write_editor",
  description: "Replaces full editor text.",
  parameters: {
    type: "object",
    properties: {
      content: { type: "string" },
    },
    required: ["content"],
  },
};

const REPLACE_IN_EDITOR_TOOL = {
  type: "function",
  name: "replace_in_editor",
  description: "Replace exact text in editor.",
  parameters: {
    type: "object",
    properties: {
      old_str: { type: "string" },
      new_str: { type: "string" },
    },
    required: ["old_str", "new_str"],
  },
};

const HIGHLIGHT_IN_EDITOR_TOOL = {
  type: "function",
  name: "highlight_in_editor",
  description: "Highlight strings in editor.",
  parameters: {
    type: "object",
    properties: {
      queries: {
        type: "array",
        items: { type: "string" },
      },
      scroll_to_first: { type: "boolean" },
    },
    required: ["queries"],
  },
};

const READ_NOTES_TOOL = {
  type: "function",
  name: "read_notes",
  description:
    "Reads the current lesson/notes panel including summary, chapter notes, concepts, and exercises.",
};

const HIGHLIGHT_IN_NOTES_TOOL = {
  type: "function",
  name: "highlight_in_notes",
  description:
    "Highlights one or more strings in the lesson/notes panel. Use this when explaining a note, concept, or exercise to the user. Pass an empty queries array to clear notes highlights.",
  parameters: {
    type: "object",
    properties: {
      queries: {
        type: "array",
        items: { type: "string" },
      },
      scroll_to_first: { type: "boolean" },
    },
    required: ["queries"],
  },
};

const RUN_EDITOR_TOOL = {
  type: "function",
  name: "run_editor",
  description: "Run current editor code in sandbox and return output.",
};

const BROWSER_TOOLS = new Set([
  READ_EDITOR_TOOL.name,
  WRITE_EDITOR_TOOL.name,
  REPLACE_IN_EDITOR_TOOL.name,
  HIGHLIGHT_IN_EDITOR_TOOL.name,
  READ_NOTES_TOOL.name,
  HIGHLIGHT_IN_NOTES_TOOL.name,
  RUN_EDITOR_TOOL.name,
]);

export function makeSession(modelOverride?: string, chapterId?: string) {
  const model = modelOverride || MODEL;
  const instructions = `${INSTRUCTIONS}\n\n${buildChapterPrompt(chapterId)}\n`;

  return {
    type: "realtime",
    model,
    instructions,
    audio: {
      input: {
        noise_reduction: { type: NR_TYPE },
        transcription: { model: TRANSCRIBE_MODEL },
      },
      output: { voice: VOICE },
    },
    tools: [
      HANGUP_TOOL,
      GET_CURRENT_TIME_TOOL,
      WEB_SEARCH_TOOL,
      FETCH_URL_TOOL,
      READ_EDITOR_TOOL,
      WRITE_EDITOR_TOOL,
      REPLACE_IN_EDITOR_TOOL,
      HIGHLIGHT_IN_EDITOR_TOOL,
      READ_NOTES_TOOL,
      HIGHLIGHT_IN_NOTES_TOOL,
      RUN_EDITOR_TOOL,
    ],
  };
}

function getCurrentTime(): string {
  return new Date().toUTCString();
}

async function webSearch(query: string): Promise<string> {
  const url = `https://s.jina.ai/${encodeURIComponent(query)}`;
  try {
    const resp = await fetch(url, { headers: { Accept: "text/plain" } });
    if (!resp.ok) return `Search failed: ${resp.status} ${resp.statusText}`;
    return (await resp.text()).slice(0, 3000);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return `Search error: ${message}`;
  }
}

async function fetchUrl(url: string): Promise<string> {
  const readerUrl = `https://r.jina.ai/${url}`;
  try {
    const resp = await fetch(readerUrl, { headers: { Accept: "text/plain" } });
    if (!resp.ok) return `Fetch failed: ${resp.status} ${resp.statusText}`;
    return (await resp.text()).slice(0, 3000);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return `Fetch error: ${message}`;
  }
}

class AgentHandler implements ObserverHandler {
  private audioActive = false;
  private callEnding = false;

  constructor(private client: ObserverClient, private callId: string) {}

  onInit() {
    this.client.createResponse();
  }

  async onTool(name: string, argsJson: any, callItemId: string) {
    if (BROWSER_TOOLS.has(name)) {
      return;
    }

    let args: any = {};
    try {
      args = typeof argsJson === "string" ? JSON.parse(argsJson) : argsJson;
    } catch {
      args = {};
    }

    if (name === HANGUP_TOOL.name) {
      if (this.audioActive) {
        this.callEnding = true;
      } else {
        await this.hangup();
      }
      return;
    }

    let result: string;
    try {
      if (name === "get_current_time") {
        result = getCurrentTime();
      } else if (name === "web_search") {
        result = await webSearch(args.query ?? "");
      } else if (name === "fetch_url") {
        result = await fetchUrl(args.url ?? "");
      } else {
        result = `Unknown tool: ${name}`;
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      result = `Tool error: ${message}`;
    }

    this.client.submitToolOutput(callItemId, result);
  }

  async onOutputAudioStarted() {
    this.audioActive = true;
  }

  async onOutputAudioStopped() {
    this.audioActive = false;
    if (this.callEnding) {
      await this.hangup();
    }
  }

  async onOutputAudioCleared() {
    this.audioActive = false;
  }

  private async hangup() {
    const url = makeUrl(this.callId, "hangup");
    const resp = await fetch(url, { method: "POST", headers: makeHeaders() });
    if (!resp.ok) {
      console.error(`end call failed: ${await getErrorText(resp)}`);
    }
  }
}

export function createHandler(client: ObserverClient, callId: string) {
  return new AgentHandler(client, callId);
}
