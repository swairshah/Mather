const REALTIME_BASE_URL = "https://api.openai.com/v1/realtime";

function getApiKey() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }
  return key;
}

export function makeUrl(callId?: string, action?: string) {
  let url = REALTIME_BASE_URL;
  if (!callId) {
    url += "/calls";
  } else if (action) {
    url += `/calls/${callId}/${action}`;
  } else {
    url += `?call_id=${callId}`;
  }
  return url;
}

export function makeHeaders(contentType?: string) {
  const obj: Record<string, string> = {
    Authorization: `Bearer ${getApiKey()}`,
  };
  if (contentType) obj["Content-Type"] = contentType;
  return obj;
}

export async function getErrorText(resp: Response) {
  const errBody = await resp.text().catch(() => "<no body>");
  return `${resp.status} ${resp.statusText}: ${errBody}`;
}
