# 13 · NOV Playback System™ — Roadmap & Architecture

> Status: **architecture only — do not build yet.** No UI prototypes. This
> document defines how the full Playback System integrates with the site that
> exists today, so it can be built later without redesigning anything.

## Principle

Borrow the **mental model** of DJ playback — never the interface. Nothing here
should look like a Pioneer CDJ, a waveform editor, or a music app. Every part
is expressed as **type, opacity, motion and atmosphere**. If a piece cannot be
made editorial, it is not built. See `docs/04-motion-system.md` and
`docs/10-ai-rules.md`.

Non-goals (explicit): no literal jog wheel, no spectrum analyser, no equalizer,
no bouncing bars, no "now playing" app chrome. The Companion and the existing
Wake Up Mode are the tone: present only while music continues, never announced.

---

## What already exists (the foundation)

The playback plumbing is already in place and event-driven — the new system
extends it, it does not replace it.

| Piece | File | Exposes |
| --- | --- | --- |
| Playing state | `lib/playback.tsx` | `usePlaying()`, `html.is-playing`, `nov:play` / `nov:pause` |
| Audio engine | `components/audio/SoundCloudPlayer.tsx` | SoundCloud Widget API; broadcasts `nov:track` `{title,duration}`; listens `nov:toggle`; holds `position` / `duration` / `sounds` |
| Tempo / pitch | `components/hidden/BpmTicker.tsx` | editorial BPM drift (120–124) + scroll-velocity pitch |
| Companion | `components/companion/Companion.tsx` | breathes on 122 BPM; drawer reflects the current set |
| Set metadata | `lib/sets.ts` | per-title note / location / year |
| Section cues | `lib/cues.ts` | the editorial 00:00 → 60:00 tracklist |

### The one architectural change first

Today, playback truth is spread across events + local component state. Before
building the modules below, promote it into a **single shared store** — a
richer `PlaybackProvider` (or a tiny Zustand store) that is the one source of
truth and that every module subscribes to:

```ts
type PlaybackState = {
  playing: boolean;
  track: { title: string; duration: number; position: number } | null;
  bpm: number | null;        // from set metadata; null = unknown → beat features stay off
  pitch: number;             // editorial, −6..+6 %
  cues: number[];            // hot-cue positions in ms, from set metadata
  waveform: number[] | null; // 0..1 amplitude samples; null = feature stays off
};
```

Keep the `nov:*` events as the loose-coupling bridge (the Companion and Wake Up
Mode already ride them). The store simply centralises what the SoundCloud
widget already emits (`PLAY_PROGRESS` → position) plus the per-set data from
`lib/sets.ts`. **Rule that governs every module below: if its data source is
`null`/absent, the module renders nothing — never a fabricated default.**

### The data reality (be honest about the engine)

The SoundCloud Widget API gives us **position, duration, title, seek, skip** —
and nothing else. It does **not** expose raw samples, BPM, or a beatgrid, and
the iframe audio is cross-origin so Web Audio `AnalyserNode` is not an option.
Therefore:

- **Waveform** comes from SoundCloud's own `waveform_url` (per-track amplitude
  JSON) fetched once per set, **or** a hand-simplified array stored in
  `lib/sets.ts`. No live DSP.
- **BPM / beats** are **authored per set** in `lib/sets.ts` (a single number),
  not detected. Editorial fiction, consistent with the rest of the site.
- Everything else (position, remaining time, cues-as-seek) is real, from the
  widget.

---

## The modules

### 1 · Editorial Waveform
A single, quiet horizontal line of the set's amplitude — not a DAW waveform.
- **Source:** `waveform` samples (SoundCloud `waveform_url` or authored array),
  downsampled to ~120–200 points.
- **Form:** hairline strokes in `ink/20`; the portion already played lifts to
  `ink/45` (or a whisper of the signal). No fill, no gradient, no scrubber
  handle beyond the existing minimal one.
- **Behaviour:** progress is driven by `position/duration`; click-to-seek reuses
  the widget's `seekTo`. If `waveform` is `null`, fall back to the current thin
  progress line (already in `SoundCloudPlayer`).
- **Home:** an upgrade to the Radio player's seek bar, and optionally a
  micro-form inside the Companion drawer.

### 2 · Beat Markers
Sparse ticks that imply the grid — not a full beatgrid.
- **Source:** `bpm` + a downbeat offset (authored). Positions = every N beats
  (e.g. every 16 or 32 beats = a phrase), computed as `ms = offset + k * (60000/bpm) * N`.
- **Form:** faint vertical ticks along the waveform/timeline; the *next* phrase
  marker may glow one step brighter as it approaches. Phrase-level, never
  per-beat strobing.
- **Behaviour:** purely visual rhythm; no audio scheduling. If `bpm` is `null`,
  no markers.

### 3 · Pitch
Already prototyped editorially in `BpmTicker` (scroll velocity nudges pitch,
eases back to 0).
- **Promote** that value into the store as `pitch`.
- **Form:** the existing `+0.0 %` readout; optionally the waveform's horizontal
  scale breathes by a hair with pitch. Never a fader.
- **Behaviour:** decorative/expressive, tied to scroll energy — the site's
  "tempo of reading". Not connected to real playback rate.

### 4 · Needle Countdown
The felt sense of a record running out.
- **Source:** `duration − position` (real).
- **Form:** a mono countdown in the metadata voice (e.g. `−04:12`), and/or a
  hairline that retreats. In the last ~30s it may warm toward the signal — the
  same restraint as the Companion's breath.
- **Behaviour:** on `FINISH`, the widget already advances; the countdown simply
  resets to the next set. If no track, nothing.

### 5 · Hot Cues
Jump points, borrowed from the CDJ idea, expressed editorially.
- **Two layers, both already conceptually present:**
  - **Site cues** = the section tracklist in `lib/cues.ts` (nav already seeks to
    them). These are the "hot cues" of the *page*.
  - **In-set cues** = optional authored `cues: number[]` per set in `lib/sets.ts`
    (e.g. the drop, the breakdown). Rendered as small marks on the waveform;
    clicking `seekTo(cue)`.
- **Form:** tiny signal-coloured marks; a label only on hover (like the
  Companion's "Listening"). No lettered A/B/C pads.
- **Behaviour:** if a set has no authored `cues`, it shows only the site cues —
  never invented ones.

### 6 · Playback Language (the unifying spec)
The through-line that makes 1–5 read as one atmosphere rather than five widgets:
- **Voice:** mono for numbers/markers (Geist Mono), the signal `#E0523F` used
  only for the *active* moment (played portion, next phrase, final seconds).
- **Motion:** everything eases on the same tempo the Companion breathes on; slow
  in, slower out; nothing strobes.
- **Presence:** all of it exists **only while music plays** and recedes when it
  stops (rides `html.is-playing`), exactly like the Companion.
- **Placement:** the Radio player is the "deck"; the Companion drawer is the
  "pocket" version; neither ever becomes app chrome.

---

## Phased roadmap

- **Phase 0 — Foundation.** Introduce the shared `PlaybackState` store; move
  position/duration/pitch/track into it; keep the `nov:*` event bridge. No
  visible change. *(Prereq for everything.)*
- **Phase 1 — Countdown + Waveform.** Real data only (position/duration +
  SoundCloud `waveform_url`). Upgrade the Radio seek bar; add the countdown.
  Biggest felt payoff, lowest authoring cost.
- **Phase 2 — Hot Cues (site + in-set).** Wire in-set `cues` from `lib/sets.ts`;
  render marks + seek. Site cues already work.
- **Phase 3 — Beat Markers + Pitch expression.** Author `bpm`/offset per set;
  add phrase markers; promote the `BpmTicker` pitch into the waveform's subtle
  scale. Purely editorial, no DSP.
- **Phase 4 — Companion micro-deck.** Fold the smallest version (countdown +
  waveform line) into the Companion drawer, so the "pocket" mirrors the "deck".

Each phase is independently shippable and degrades gracefully (missing data →
the feature simply isn't there). Nothing here blocks or alters the current
launch; it layers on afterwards.

## Data to author later (in `lib/sets.ts`)
Extend `SetMeta` when Phase 1+ begins — all optional, all "absent → feature off":
```ts
type SetMeta = {
  note?: string; location?: string; year?: string;
  bpm?: number;            // Phase 3
  downbeatMs?: number;     // Phase 3
  cues?: number[];         // Phase 2 — in-set hot cues, ms
  waveform?: number[];     // Phase 1 fallback if not using SoundCloud's
};
```
