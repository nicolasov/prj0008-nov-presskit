# Easter Eggs — the hidden interactions

A private maintenance record. **For visitors, discovery is the point** — none of
these are announced, none are onboarded, and if a visitor never finds any of
them the site is still complete. Ground rules (see `docs/04-motion-system.md`):
no pop-ups, no achievements, no notifications, no gamification; any sound is
synthesized (Web Audio, no asset) and only ever plays if the visitor has
already engaged audio elsewhere (the SoundCloud player dispatches
`nov:audio-engaged` on first play); everything respects `prefers-reduced-motion`.

Each entry: **trigger · location · purpose.**

---

## Playback language

**The CUE — return to 00:00 (+ needle tone)**
· *Trigger:* click the circular **CUE** (appears bottom-right after scrolling past ~1.2 screens). On click, if audio is already engaged, a soft synthesized "needle to the cue point" tone plays.
· *Location:* `components/ui/CueButton.tsx`, fixed bottom-right.
· *Purpose:* a DJ dropping the needle back to the first cue — not a "back to top".

**Hot cues — keyboard (NEW)**
· *Trigger:* press a number **1–8** anywhere (ignored while typing in a field).
· *Location:* `components/hidden/HotCues.tsx`, global keydown; seeks the tracklist cue (1 = Arrival … 8 = Booking).
· *Purpose:* the CDJ hot-cue mental model moved to the keyboard — and it quietly makes the whole journey keyboard-reachable.

**BPM ticker — the pulse in type**
· *Trigger:* present while "in the set" (past the hero, not at the footer), desktop only; drifts a little more alive while music plays.
· *Location:* `components/hidden/BpmTicker.tsx`, fixed bottom-left.
· *Purpose:* the set's tempo, felt as metadata rather than a meter.

**The Companion — a quiet reminder that music continues**
· *Trigger:* exists only while a set is playing; hover reveals "Listening", click unfolds a drawer.
· *Location:* `components/companion/Companion.tsx`, fixed bottom-right (above the CUE).
· *Purpose:* the playback presence — the site itself is the player. (Full notes in `docs/04-motion-system.md`.)

**Wake Up Mode**
· *Trigger:* playing music (`html.is-playing`).
· *Location:* `app/globals.css` + `lib/playback.tsx`.
· *Purpose:* the site becomes imperceptibly more alive — richer grain, the hero photograph breathing.

---

## Cursor & hover

**Hero cursor light**
· *Trigger:* moving the pointer over the hero (desktop, after the intro).
· *Location:* `components/hero/HeroLight.tsx`.
· *Purpose:* the black around NOV becomes faintly aware of the cursor — a hand moving through a dark room.

**NOV ring cursor + the whispered manifesto**
· *Trigger:* hover the hero NOV wordmark (a lagging ring replaces the cursor); **long-press ~650ms** whispers "Not playing tracks. Curating journeys." once per session.
· *Location:* `components/hero/HeroWordInteractions.tsx`.
· *Purpose:* the manifesto, found only by someone who lingers on the word.

**NOV wordmark → 00:00**
· *Trigger:* click the **NOV** wordmark in the nav.
· *Location:* `components/Nav.tsx`.
· *Purpose:* the one explicit "return to the start" gesture.

**Nav real time**
· *Trigger:* hover-hold the nav timecode ~1.5s (desktop).
· *Location:* `components/Nav.tsx`.
· *Purpose:* the real Buenos Aires clock, the quiet counterpart to the fictional 60:00 runtime.

---

## Keyboard

**Director's Cut**
· *Trigger:* type **"d" then "j"** within 600ms (ignored in fields).
· *Location:* `components/hidden/DirectorsMode.tsx`; screener corner marks + a mono label for 7s, with a single synthesized click if audio is engaged.
· *Purpose:* a fleeting director's-monitor moment over the frame.

**Hot cues (1–8)** — see *Playback language* above.

---

## Time & attention

**Idle grain breath**
· *Trigger:* ~12s with no scroll or pointer move, past the hero (`scrollY > 200`).
· *Location:* `components/hidden/IdleGrainBreath.tsx`.
· *Purpose:* the film grain breathes once — a projector holding a frame — then settles. Never a loop.

**Session echo**
· *Trigger:* a visitor who has scrolled and stayed >90s of real time.
· *Location:* `components/hidden/SessionEcho.tsx`, at the bottom of the Booking thesis.
· *Purpose:* a barely-visible timestamp of their *actual* session against the fictional runtime. No one reads it unless already looking closely.

**Progress hairline flicker**
· *Trigger:* random, every ~60–140s.
· *Location:* `components/Nav.tsx`, the top red recording hairline.
· *Purpose:* a signal catching static — analog imperfection.

---

## Under the hood

**Dev console signature**
· *Trigger:* open the browser devtools console.
· *Location:* `components/hidden/DevConsole.tsx`.
· *Purpose:* a NOV note (and `booking@nov.dj`) for whoever looks — the same restraint as everything else.

---

## Reduced motion

All motion-based eggs (idle grain breath, cursor light, ring cursor, ripple,
progress flicker) are gated behind `prefers-reduced-motion`. The keyboard eggs
(hot cues, Director's Cut) and the console note remain, since they are not
motion.
