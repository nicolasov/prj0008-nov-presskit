# 04 · Motion System

## Motion principles

- Motion must reinforce emotion.
- Stillness is usually stronger than movement.
- Less motion is almost always better.
- Motion should be functional, never decorative.
- Crossfade is the default transition.
- Animation must have intent.

## Core philosophy

- Everything is a crossfade.
- Nothing translates, scales, bounces, spins or moves sideways.
- Motion is reserved for revealing hierarchy and supporting the journey.
- The experience should feel calm, not kinetic.

### Scoped exceptions

Two deliberate, narrow exceptions to "everything is a crossfade" exist.
Both are scoped to a single moment, documented here so they read as
intentional decisions rather than drift:

1. **Hero intro rise** (`Staged` component, `rise` prop, `components/hero/HeroStage.tsx`,
   and `Nav`'s own entrance in `components/Nav.tsx`). The hero's frame —
   timecodes, subline, thesis, footer labels — settles in with a small
   (12px) upward translate alongside its fade, and the sticky nav settles
   down into place the same way, both triggered by the shared
   `lib/introReveal.tsx` (first scroll, or ~5s of silence). Nowhere else in
   the site translates on entrance.
2. **The hero continuum** (Sprint 7.0 — replaces the old "cover transition"
   idea). The brief reframed the problem: not a transition, but a hero that
   never ends. There is no cover, no divider, no cut. The hero photograph is
   a viewport-**fixed** backdrop (z-0) the whole document scrolls over; a
   single scroll driver in `components/sections/Arrival.tsx` writes one set
   of CSS variables (`--h-photo`, `--h-nov`, `--h-mix`, `--h-phil`,
   `--h-photo-scale/y`) that crossfade three layers against each other over
   that one still image:
   - **NOV** (fixed, centred, the single element — never moves) colours to
     the signal, then fades late (`--h-nov`, ~vp 0.95→1.65).
   - **The photograph** develops (~vp 0.05→0.7), lingers past the first
     screen, then recedes to black (~vp 1.3→2.2), with a hair of scale/Y
     parallax for depth (off under reduced motion).
   - **Philosophy** emerges *within* the same frame (`--h-phil`, ~vp
     0.72→1.55) — the document layer (z-20) is transparent, so the first
     words appear over the still-present portrait, never after a seam.
   Because everything shares one backdrop and crossfades on scroll position
   (not time), the whole thing is perfectly reversible and there is no moment
   where the hero "ends". This is the one place several layers move at once;
   it is deliberate and load-bearing to the whole experience.

   Sprint 7.0 refinements:
   - **NOV steps back sooner** (fades over ~vp 0.85→1.4) so Philosophy owns
     the frame; the photograph keeps lingering (recede ~vp 1.4→2.3) as the
     connective tissue.
   - **Philosophy sets itself as an editorial page**, not a block. When it
     enters view a *time-based* sequence plays (Philosophy.tsx) regardless of
     scroll speed — timestamp (quick) → pause → "Not playing tracks." →
     "Curating journeys." (slow, the key line) → the body, line by line — so
     the eye reads one thing at a time. Body text is at higher contrast
     (ink/90) so it's confident once it owns the viewport. Reduced motion
     shows it all at once, no timeline.
   - **The water ripple** returns on NOV: a static fine `feTurbulence`
     displacing the letterforms, its amount breathing 2.2↔4.2 over 9s like
     the surface of still water (`#nov-ripple`, Arrival.tsx). Desktop
     pointers only (coexists with the cursor light), off under reduced
     motion, never moves the type. Cheap (static turbulence, scale-only
     animation) — Lighthouse stays 100.

## Gallery — reader intention (2026-07-04)

The Gallery interlude adapts to *how* the visitor scrolls, never announced.
One rAF loop (alive only while the section is near the viewport, via an
IntersectionObserver) is the single source of truth — geometry-driven, so
nothing depends on scroll-event timing (fast programmatic or momentum scroll
starves IntersectionObserver, which would leave plates black or the hint
late). Each frame it measures a smoothed scroll **pace** (0 = still, 1 = fast,
from `|Δscroll|/Δt`) and:

- **develops** any plate that has entered, its duration read from that pace —
  `3.2s` when lingering, down to `~0.7s` when rushing (`--dev`, consumed by
  `.plate-media` in `app/globals.css`);
- drives **parallax / slow zoom / breathing** (transform only; parallax range
  eases down as pace rises, so fast scrolling feels calmer, not busier);
- reveals the **`SKIP GALLERY →`** control only once past ~the sixth
  photograph *and* while clearly moving (pace > 0.55), hiding it again when the
  visitor slows (< 0.28) or leaves — with hysteresis so it never flickers, and
  a hover-hold so it can't fade out from under the pointer. Clicking it
  continues smoothly to the next section (`#radio`), never a hard jump.

Everything is off under `prefers-reduced-motion` (plates simply settle from
black quickly, no parallax); the SKIP affordance still works. No layout shift.

## Scroll pacing

- The tracklist is driven by scroll progress.
- Scroll is smooth and weighted, not abrupt.
- The header progress bar and live runtime respond to overall scroll.
- `Lenis` provides smooth scroll interpolation with `lerp: 0.08`.

## Timing

- Reveal duration: 1.4s–2.0s.
- Stagger: 140ms between layered elements.
- Hover transitions: 0.5s.
- Reduced motion fade: 0.2s.
- Hero stage fallback: 4.5s to avoid half-staged states.

## Hero reveal

- The hero is staged: atmosphere first, then the word, then supporting copy.
- `HeroStage` mounts the canvas after the first gesture.
- The DOM fallback word remains visible until the canvas is ready.
- `--hero-scroll` drives the gradual reveal of the hero photograph.

### Hero scrollytelling sequence (2026-07-03)

The hero is a pinned (`sticky`) stage inside a tall scroll wrapper, not a single
100svh section — this is what gives the sequence room to be slow. One raw
scroll progress value (`--hero-scroll`, 0→1 across the wrapper's own scroll
range) is remapped into four phases, in this order and never overlapping in
a way that breaks the sequence:

1. **Hold** (0 → 0.35) — nothing happens. NOV stays fully formed and legible.
   This is the contemplation window the brief asked for: the visitor is never
   rushed into the next moment.
2. **Sweep** (0.35 → 0.62) — the red signal travels once across the glyphs,
   left to right, before anything else changes. It is the only place red
   appears in the hero. (Extended ~35% in Sprint 6.7 — it lingers longer.)
3. **Photograph** (0.46 → 0.90 — Sprint 6.7 begins it earlier and ramps it
   more gradually) — the hero photograph emerges progressively behind the
   word, never abruptly. NOV does not vanish into it; the word turns toward
   the red signal and thins to a low-opacity afterimage floating above the
   frame.
4. **Disperse** (0.86 → 1.0) — only now does NOV break apart: the same ink-
   drift distortion used for the atmosphere grows sharply and the word fades.
   The word is never allowed to dissolve before the photograph has finished
   revealing.

The face is never the first thing the visitor sees: it only becomes visible
once the Photograph phase is underway, several screens into the scroll.

### Sprint 6.7 hero refinements (2026-07-03)

Seven refinements, all preserving the sequence above:

1. **Same object, load → hero.** The loading word and the hero word must feel
   like one continuous object, never a logo swap. The critical CSS
   (`app/layout.tsx`) now uses the **same font stack** as the hero's real
   style (`var(--font-newsreader), 'Times New Roman', serif`, weight 300),
   not a heavier Georgia fallback — so the first paint already reads as
   Newsreader-light, and the DOM→canvas handoff (both Newsreader, same
   measured box) is invisible.
2. **Faster silence.** The idle auto-reveal drops from 5s to 3s
   (`lib/introReveal.tsx`). Silence stays; the wait stops feeling like the
   page is stalling.
3. **Earlier, progressive photograph** — the Photograph phase now starts at
   0.46 (from 0.58) and ramps to 0.90, so the image emerges gradually rather
   than appearing suddenly. Threshold mirrored in shader + CSS var.
4. **No vertical movement on the first scroll.** The hero is a `sticky`
   stage: the viewport is visually locked for the entire sequence — the first
   scroll drives only color, red ink, opacity, photograph, typography and
   shader, never an upward translate. The page only begins translating once
   the sequence completes and the sticky releases. This was already the
   architecture; 6.7 makes NOV's centering absolute so it cannot drift.
5. **Perfect centering.** NOV lives in its own absolutely-centered layer
   (`.nov-hero-stage`, `display:grid; place-items:center`), decoupled from
   the surrounding chrome (timecodes, subline, thesis, footer labels), which
   sit in a separate full-height flex layer. NOV cannot shift when the chrome
   appears or changes — museum-hang stability, and the critical CSS centers
   it identically so there is no first-paint drift.
6. **The recording timeline is restored.** A single continuous red hairline
   at the very top paints with scroll from the first movement onward
   (`components/Nav.tsx` — the progress bar is now always mounted, outside the
   chrome's intro fade, so the "REC timeline slowly advancing" reads through
   the hero and onward as one line).
7. **One continuous shot.** load → hero → photograph → scroll is a single
   uninterrupted transformation. No replacements, jumps or resets — every
   state melts into the next, guaranteed by 1–6 together.

Implementation notes:
- All four phases are derived from the single `uScroll` uniform inside the
  fragment shader via `smoothstep`, so there is one source of truth for
  timing (kept in `components/hero/NovCanvas.tsx`, mirrored in
  `components/sections/Arrival.tsx` for the DOM-side CSS variables
  `--hero-sweep` / `--hero-photo` / `--hero-disperse`). If the pacing is
  retimed, both places need the same thresholds.
- The DOM fallback (`<h1>`, used under `prefers-reduced-motion` or without
  WebGL) mirrors the same disperse-only fade — it never fades early either.

## NOV typography animation

### Sprint 6.8 — ONE NOV (supersedes the WebGL word)

The hero word is now a **single DOM `<h1>`**, present from the first frame to
the end of the hero — never replaced, never crossfaded into a second element,
never resized or re-weighted. The WebGL canvas word (and `three` / R3F on the
hero) was removed: it inherently replaced the DOM word with a canvas
rendering, which the brief explicitly forbids ("do NOT crossfade between two
DOM elements"). Removing it is also lighter and more editorial — less effect,
more atmosphere.

The one element only animates **colour** (bone `#EAEAE6` → the NOV signal
`#E0523F`, via `color-mix` driven by `--hero-photo`) and lets the photograph
develop behind it. It never disperses or disappears — it becomes part of the
image, and is later covered by the Philosophy chapter (cover transition:
still queued). The same typography (Newsreader light, tracking 0.06em) is used
for the hero word, the nav wordmark, and any NOV on the site — one identity,
one logo, per docs/09 LOGO SYSTEM.

Historical note: earlier sprints rendered NOV as a WebGL shader (fbm ink
drift, a red sweep across the glyphs, the photo showing through the
letterforms). That approach is retired.

## Red reveal

- The signal red appears only in active states and call-to-action elements.
- The live timecode and active tracklist cue use `red-bright`.
- Red is never used as a decorative color.

## Image reveal

- Photography fades in and builds atmosphere.
- Still captions and timecodes appear as editorial metadata.
- Hover reveals are subtle, with text brightening and exposure lifting.
- Still cards are structural, not decorative.

## WebGL philosophy

- WebGL is atmosphere, not spectacle.
- It is dynamically imported after initial interaction.
- It is enabled only on capable hardware.
- It is paused when offscreen and replaced by a static fallback when needed.
- The hero WebGL texture is monochrome ink drift with ≤ 6% luminance variance.

## Implementation

- `SmoothScroll` uses `Lenis` and `gsap`.
- `gsap` controls scroll-triggered opacity scrubbing in `Philosophy`.
- `ScrollTrigger` updates with Lenis on every frame.
- Motion values are defined in `lib/motion.ts`.

## Microinteractions

- Clicking the "NOV" wordmark in the nav returns to 00:00 (Arrival) — the one
  implemented "return to the start" gesture.
- Every interactive hover shifts toward the red signal or brightens one
  opacity step — never a shadow, lift or scale (see [03-design-system.md](./03-design-system.md)).

### Hidden interactions

A set of elegant, non-gamified hidden details shipped 2026-07-03 across the
Hero, Nav, Booking and global layout — deliberately **not enumerated here**.
The brief that requested them was explicit: discovery is the point, and that
applies to the person who wrote the brief too. Implementation lives in
`components/hidden/` and `components/hero/HeroWordInteractions.tsx`, each
with its own inline comment explaining what it does and why, for whoever
next needs to maintain or extend one. Ground rules that governed all of
them, for future additions:

- No pop-ups, no achievements, no badges, no jokes, no gamification.
- Never interrupt — everything is opt-in-by-curiosity (hover, long-press,
  idle, a typed shortcut), never presented to a visitor who isn't already
  looking closely.
- Any sound is synthesized (Web Audio, no asset) and gated behind the
  visitor having already engaged audio elsewhere on the page — the site
  never introduces surprise sound.
- Quality over quantity. Each one should feel handcrafted on its own.

### TODO

- None open — the previous placeholder ("no sound asset or hidden-copy has
  been designed") was resolved this sprint. Future hidden details should
  follow the same ground rules above and, like these, stay undocumented
  here beyond their existence.

## Reference

See `docs/design-direction.md` for the final motion contract and `docs/creative-director-brief.md` for motion constraints.
