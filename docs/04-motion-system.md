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
2. **Sweep** (0.35 → 0.55) — the red signal travels once across the glyphs,
   left to right, before anything else changes. It is the only place red
   appears in the hero.
3. **Photograph** (0.50 → 0.82, slightly overlapping the sweep for a smooth
   handoff) — the hero photograph becomes visible **through the letterforms**
   (the glyph mask acts as a window onto the photo, not a flat fade behind
   it), and the full-bleed background photo layer ramps up in parallel.
4. **Disperse** (0.80 → 1.0) — only now does NOV break apart: the same ink-
   drift distortion used for the atmosphere grows sharply and the word fades.
   The word is never allowed to dissolve before the photograph has finished
   revealing.

The face is never the first thing the visitor sees: it only becomes visible
once the Photograph phase is underway, several screens into the scroll.

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

- The hero word behaves like light projected on a wall.
- The hero text reveals through opacity and texture, not transform.
- The WebGL word is a canvas texture of actual Newsreader glyphs.
- The transition is crossfade-only, maintaining the typographic composition.

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

### TODO

- Soft UI sounds, hidden quotes and other tasteful Easter eggs were requested
  in the 2026-07-03 sprint brief but no sound asset or hidden-copy has been
  designed yet. Do not fabricate audio or "discoveries" without a specific
  brief — add them here once decided.

## Reference

See `docs/design-direction.md` for the final motion contract and `docs/creative-director-brief.md` for motion constraints.
