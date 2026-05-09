# Mather

A voice-guided math tutor that lives on a pencil-and-touch canvas.

Mather runs on macOS and iPad. You write math the way you would in a
notebook — equations, sketches, scratch work — and a realtime voice tutor
talks with you, reads what you've written, and draws on the same canvas
alongside you.

## What you can do

- **Write freely.** Drag with a mouse, finger, or Apple Pencil to sketch
  equations, diagrams, and notes.
- **Drop in equations.** Type something like `x^2 + y^2 = r^2` in the side
  panel, then tap anywhere on the canvas to place a clean MathJax rendering
  at that spot.
- **Erase by mark, not by pixel.** Each stroke, equation, and shape is its
  own object. The eraser removes a whole mark with a single tap.
- **Talk it through.** Press **GO LIVE** to open a voice conversation with
  the tutor. It can hear you, see your canvas, ask questions, and write
  answers right next to your work.
- **Pick up where you left off.** Your canvas is saved automatically, so
  closing the app doesn't lose your work.

## Setting up the voice tutor

Voice mode uses OpenAI's Realtime API and needs your own API key. Your key
stays on your device — it is stored locally and never sent anywhere except
to OpenAI.

To add it:

1. Open the **setup** tab in the right-hand panel.
2. Paste your OpenAI API key into the field.
3. Press **save**.

You only need to do this once per device. On iPad this is the only way to
set the key.

## Using the canvas

The toolbar across the top of the canvas:

- **pen** — draw freely.
- **erase** — tap a mark to delete the whole thing.
- **tap** — tap on the canvas to drop the equation currently in the side
  panel at that spot.
- **undo** — remove the most recent mark.
- **clear** — empty the canvas (asks first).
- **read** — show the tutor a snapshot of your canvas. Useful if it seems
  out of sync.
- **color swatches** + **size slider** — change the active pen.

Top right:

- **status pill** — shows whether the voice tutor is `idle`, `connecting`,
  or `live`.
- **GO LIVE** — starts a voice session. Press again to hang up.
- **☀ / ☾** — toggle light or dark theme.

The right-hand panel has two tabs:

- **setup** — your API key, the quick-equation input, and a small dashboard
  showing the number of marks on the canvas and how long the current voice
  session has been running.
- **events** — a live transcript of the voice session: what you said, what
  the tutor said, and what it drew.

## Going live with the tutor

1. Make sure your API key is saved (see above).
2. Press **GO LIVE**. Your browser/app will ask for microphone permission
   the first time.
3. Talk normally. The tutor listens continuously, looks at the canvas
   whenever you change something, and responds out loud.
4. The tutor can place equations, draw lines, rectangles, circles, and
   highlights, erase a specific mark, and clear the canvas if you ask it to.
5. Press the same button (now **hang up**) to end the call.

If something goes wrong, glance at the **events** tab — connection problems
and tool errors are logged there in plain language.

## On iPad / iPhone

The app is built for Apple Pencil and touch. A few things to know:

- Paste the API key in the **setup** tab; iPad apps can't read environment
  variables.
- Microphone access has to be granted the first time you go live.
- The canvas stays on your device; nothing is uploaded except what the
  tutor needs to hear and the canvas snapshot it asks for.

## Privacy

- Your API key is stored locally on your device.
- Drawings and notes never leave the device unless you start a live voice
  session, in which case the audio and a periodic snapshot of the canvas
  are sent to OpenAI's Realtime API so the tutor can respond.
- Past sessions and canvas state are kept locally so you can pick up where
  you left off.
