# Mather — Tauri math canvas tutor

Mather an for voice-guided math tutoring on
desktop and iPad devices. The workspace is a pencil/touch-friendly canvas; a realtime voice agent draws on it, reads it back, and tutors through the work alongside you.

## Requirements

- Node.js
- Rust / Cargo
- For live voice mode: an OpenAI API key with Realtime API access
- For iPad / iOS builds: Xcode and the Tauri iOS prerequisites

## Run on desktop

```bash
cd ~/work/projects/Mather
npm install
npm run dev
```

Live mode picks up its API key in either of two ways:

1. Open the **setup** tab in the side panel, paste the key, and press
   **save**. This is the practical path for iPad builds.
2. Launch with `OPENAI_API_KEY=... npm run dev`.

## Build desktop bundles

```bash
npm run build
```

The current macOS build outputs:

- `src-tauri/target/release/bundle/macos/aide.app`
- `src-tauri/target/release/bundle/dmg/aide_0.2.0_aarch64.dmg`

## iPad / iOS

Initialize the iOS project once:

```bash
npm run ios:init
```

Then run or build for iOS:

```bash
npm run ios:dev
npm run ios:build
```

The app is designed for Apple Pencil / touch input. The OpenAI API key has to
be entered in the app's **setup** tab on iPad — mobile apps do not inherit
your shell environment.

## UI tour

Top nav

- **aide** brand on the left, status pill (`idle` / `connecting` / `live`),
  and a **GO LIVE** button that starts/ends the realtime voice session.
- Theme toggle (☀ / ☾) on the right.

Toolbar

- **pen** — creates one `ink` mark per stroke.
- **erase** — deletes the topmost whole mark under the pointer.
- **tap** — tapping places the quick equation from the side panel.
- **undo** — removes the latest mark.
- **clear** — wipes the canvas (with confirm).
- **read** — logs the current structured canvas summary into the events
  panel. The agent's `read_canvas` tool additionally captures a PNG data URL
  for the model.
- Color swatches and a stroke-size slider.

Side panel

- **setup** — voice agent API key, quick-equation input, and live canvas
  stats (mark count, session timer).
- **events** — Claude-Code-style stream of user / assistant / tool-call /
  tool-result / system entries for the live session.

## Persistence

- Canvas state is saved to `localStorage` and restored on reload.
- Voice session summaries are saved through a Tauri command into the app's
  data directory when running inside Tauri; the web fallback stores them in
  `localStorage` under `aide:session:<id>`.

## Project layout

```
Mather/
├── frontend/            # static frontend served by Tauri (index.html + vendor)
├── src/                 # local-dev / TypeScript helper sources
├── src-tauri/           # Tauri 2 shell, Rust commands, mobile scaffolding
├── package.json         # npm scripts (dev, build, ios:*)
└── README.md
```
