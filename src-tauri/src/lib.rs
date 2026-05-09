use serde::{Deserialize, Serialize};
use serde_json::json;
use std::env;
use tauri::Manager;

const REALTIME_CALLS_URL: &str = "https://api.openai.com/v1/realtime/calls";

#[derive(Debug, Deserialize)]
struct RealtimeOfferRequest {
    sdp: String,
    model: Option<String>,
    #[serde(alias = "apiKey")]
    api_key: Option<String>,
}

#[derive(Debug, Serialize)]
struct RealtimeOfferResponse {
    answer_sdp: String,
    call_id: Option<String>,
    location: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct SessionRecord {
    id: String,
    started_at: u64,
    stopped_at: u64,
    events: serde_json::Value,
    canvas: serde_json::Value,
}

#[derive(Debug, Serialize)]
struct SaveSessionResponse {
    id: String,
    event_count: usize,
}

fn resolve_api_key(api_key: Option<String>) -> Result<String, String> {
    api_key
        .filter(|key| !key.trim().is_empty())
        .or_else(|| env::var("OPENAI_API_KEY").ok())
        .ok_or_else(|| "OPENAI_API_KEY is not configured. Add it in the app or launch with the environment variable.".to_string())
}

fn realtime_tools() -> serde_json::Value {
    json!([
        {
            "type": "function",
            "name": "end_call",
            "description": "Hang up the call when the user says goodbye."
        },
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Returns the current date and time in UTC."
        },
        {
            "type": "function",
            "name": "web_search",
            "description": "Search the web and return a short summary.",
            "parameters": {
                "type": "object",
                "properties": { "query": { "type": "string" } },
                "required": ["query"]
            }
        },
        {
            "type": "function",
            "name": "fetch_url",
            "description": "Fetch readable text from a URL.",
            "parameters": {
                "type": "object",
                "properties": { "url": { "type": "string" } },
                "required": ["url"]
            }
        },
        {
            "type": "function",
            "name": "read_canvas",
            "description": "Capture the current math canvas as a PNG image plus structured mark metadata. Use this before commenting on handwritten work.",
            "parameters": {
                "type": "object",
                "properties": {
                    "include_image": { "type": "boolean", "description": "Include a data:image/png base64 image. Defaults to true." }
                }
            }
        },
        {
            "type": "function",
            "name": "add_mark",
            "description": "Add one complete mark to the canvas. Use equation for MathJax LaTeX, text for labels, highlight/rect/circle/line for annotations.",
            "parameters": {
                "type": "object",
                "properties": {
                    "type": { "type": "string", "enum": ["equation", "text", "highlight", "rect", "circle", "line"] },
                    "id": { "type": "string", "description": "Optional stable id. If omitted, the app creates one." },
                    "x": { "type": "number" },
                    "y": { "type": "number" },
                    "x2": { "type": "number", "description": "Line endpoint x or shape width endpoint." },
                    "y2": { "type": "number", "description": "Line endpoint y or shape height endpoint." },
                    "latex": { "type": "string", "description": "LaTeX content for equation marks." },
                    "text": { "type": "string", "description": "Plain text for labels." },
                    "color": { "type": "string" },
                    "size": { "type": "number" }
                },
                "required": ["type", "x", "y"]
            }
        },
        {
            "type": "function",
            "name": "erase_mark",
            "description": "Erase one whole canvas mark by id, or erase the topmost mark at a canvas point.",
            "parameters": {
                "type": "object",
                "properties": {
                    "id": { "type": "string" },
                    "x": { "type": "number" },
                    "y": { "type": "number" }
                }
            }
        },
        {
            "type": "function",
            "name": "clear_canvas",
            "description": "Clear all marks from the canvas. Use sparingly and ask first unless the user explicitly requests it."
        }
    ])
}

fn realtime_instructions() -> String {
    r#"
You are aide, a voice-guided math tutor working on a shared canvas.
Be concise, conversational, and Socratic. Help the learner reason through math rather than dumping answers.
The canvas replaces a code editor. The user may write with Apple Pencil or touch; you can render MathJax equations and annotations.

Canvas/tool rules:
- Use read_canvas before judging handwriting, diagrams, or algebra already on the board. It returns an image and structured marks.
- Use add_mark to place one complete annotation at a time. For math, prefer type=equation with LaTeX in latex.
- Use erase_mark to delete a whole mark by id or a topmost mark at a point. Never describe pixel-level erasing.
- Keep agent annotations visually sparse; ask before clearing the whole canvas.
- When explaining, point to or mark the exact equation/step you are discussing.
- Use web_search/fetch_url only if the user asks for outside facts.
- When the user says goodbye, call end_call.
"#
    .trim()
    .to_string()
}

#[tauri::command]
async fn start_realtime_call(req: RealtimeOfferRequest) -> Result<RealtimeOfferResponse, String> {
    let api_key = resolve_api_key(req.api_key)?;
    let model = req.model.unwrap_or_else(|| "gpt-realtime-2".to_string());
    let session = json!({
        "type": "realtime",
        "model": model,
        "instructions": realtime_instructions(),
        "audio": {
            "input": {
                "noise_reduction": { "type": "near_field" },
                "transcription": { "model": "gpt-realtime-whisper" }
            },
            "output": { "voice": "marin" }
        },
        "tools": realtime_tools()
    });

    let form = reqwest::multipart::Form::new()
        .text("sdp", req.sdp)
        .text("session", session.to_string());

    let resp = reqwest::Client::new()
        .post(REALTIME_CALLS_URL)
        .bearer_auth(api_key)
        .multipart(form)
        .send()
        .await
        .map_err(|err| format!("Failed to create realtime call: {err}"))?;

    let status = resp.status();
    let location = resp
        .headers()
        .get(reqwest::header::LOCATION)
        .and_then(|value| value.to_str().ok())
        .map(|value| value.to_string());

    let answer_sdp = resp
        .text()
        .await
        .map_err(|err| format!("Failed to read realtime response: {err}"))?;

    if !status.is_success() {
        return Err(format!(
            "Realtime call failed: {} {}",
            status.as_u16(),
            answer_sdp
        ));
    }

    let call_id = location
        .as_ref()
        .and_then(|value| value.rsplit('/').next())
        .map(|value| value.to_string());

    Ok(RealtimeOfferResponse {
        answer_sdp,
        call_id,
        location,
    })
}

#[tauri::command]
async fn hangup_call(call_id: String, api_key: Option<String>) -> Result<(), String> {
    let api_key = resolve_api_key(api_key)?;
    if call_id.trim().is_empty() {
        return Ok(());
    }

    let url = format!("https://api.openai.com/v1/realtime/calls/{call_id}/hangup");
    let resp = reqwest::Client::new()
        .post(url)
        .bearer_auth(api_key)
        .send()
        .await
        .map_err(|err| format!("Failed to hang up call: {err}"))?;

    if !resp.status().is_success() {
        let status = resp.status();
        let body = resp.text().await.unwrap_or_default();
        return Err(format!("Hangup failed: {} {}", status.as_u16(), body));
    }

    Ok(())
}

#[tauri::command]
async fn save_session(
    app: tauri::AppHandle,
    session: SessionRecord,
) -> Result<SaveSessionResponse, String> {
    let dir = app
        .path()
        .app_data_dir()
        .map_err(|err| format!("Could not resolve app data directory: {err}"))?;
    tokio::fs::create_dir_all(&dir)
        .await
        .map_err(|err| format!("Could not create app data directory: {err}"))?;
    let path = dir.join("sessions.json");

    let mut sessions: Vec<SessionRecord> = match tokio::fs::read_to_string(&path).await {
        Ok(raw) => serde_json::from_str(&raw).unwrap_or_default(),
        Err(_) => Vec::new(),
    };

    let event_count = session
        .events
        .as_array()
        .map(|events| events.len())
        .unwrap_or(0);
    if let Some(existing) = sessions.iter().position(|item| item.id == session.id) {
        sessions[existing] = session.clone();
    } else {
        sessions.push(session.clone());
    }

    let raw = serde_json::to_string_pretty(&sessions)
        .map_err(|err| format!("Could not serialize sessions: {err}"))?;
    tokio::fs::write(&path, raw)
        .await
        .map_err(|err| format!("Could not write sessions: {err}"))?;

    Ok(SaveSessionResponse {
        id: session.id,
        event_count,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            start_realtime_call,
            hangup_call,
            save_session
        ])
        .run(tauri::generate_context!())
        .expect("error while running aide");
}
