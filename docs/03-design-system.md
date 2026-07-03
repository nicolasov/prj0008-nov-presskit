# 03 · Design System

## Principles

- The crossfade is the metaphor and the constraint.
- Hierarchy is carried by opacity.
- One deep red is the signal.
- The dark is the ground.
- Timecodes are honest structure.
- Every image is a film still.
- The serif is the narrator.
- One idea per viewport.
- Mobile is designed at the same fidelity, not reflowed.
- Layout is quiet, not crowded.

## Colors

- `bg-0`: #050505 — page base.
- `bg-1`: #0B0B0B — surfaces and frames.
- `bg-2`: #111111 — containers and card backgrounds.
- `bg-3`: #191919 — hover surfaces and emphasis.
- `line`: #1F1F1F — hairlines.
- `line-strong`: #303030 — stronger borders and focus.
- `ink`: #EAEAE6 — primary text.
- `ink-70`: rgba(234,234,230,.70) — supporting text.
- `ink-45`: rgba(234,234,230,.45) — metadata and passive labels.
- `ink-25`: rgba(234,234,230,.25) — atmosphere and inactive elements.
- `red`: #C1372B — signal color.
- `red-bright`: #E0523F — active signal and small text.
- `red-dim`: rgba(193,55,43,.40) — traces and subtle gestures.

## Typography

### Voices

- **Narrator**: Newsreader 300.
  - Hero wordmark, pull quotes, thesis lines.
  - Light, occasional italic.
  - Never used in UI elements.
- **Structure**: Archivo.
  - Section headings, body copy, navigation, forms.
  - Two weights only: 400 and 500.
- **Timecode**: Geist Mono.
  - Timecodes, cue labels, captions, metadata.
  - Tabular numerals always on.

### Scale

- `hero`: Newsreader 300 · clamp(4.5rem, 15vw, 13rem) · tracking 0.06em.
- `quote`: Newsreader 300 italic · clamp(1.5rem, 2.8vw, 2.2rem) · line-height 1.25.
- `h1`: Archivo 500 · clamp(1.9rem, 4.2vw, 3.1rem) · tracking −0.02em.
- `sub`: Archivo 400 · 13px · tracking 0.42em · uppercase.
- `body`: Archivo 400 · 16px · leading 1.8 · max 60ch.
- `tc`: Geist Mono 400 · 11px · tracking 0.18em · tabular numbers.

## Grids and responsive behavior

- Desktop: 12-column layout.
- Mobile: 4-column layout, same fidelity, scaled rhythm.
- Container max width: 1320px.
- Gutter: `clamp(24px, 5vw, 72px)`.
- Section rhythm: `clamp(110px, 16vw, 200px)`.
- Prose measure: max 60ch.
- The navigation adapts from desktop tracklist to a mobile overlay while keeping the same structure.

## Components

### Layout

- `Nav`: sticky header, live progress bar, timecode readout, tracklist, booking CTA.
- `Section`: the section wrapper with optional bleed and reveal choreography.
- `Footer`: coordinates, socials, copyright.

### Primitives

- `Timecode`: Geist Mono metadata voice.
- `Still`: film-still card, letterboxed and monochrome.
- `Quote`: narrator voice in Newsreader italic.
- `Heading`: structure voice in Archivo.
- `Button`: primary signal or ghost link.
- `Container`: page margin system.
- `Background`: layered photographic and tonal frame.

### Patterns

- `HeroStage`: staged hero with canvas atmosphere and fallback text.
- `Section` `data-fx` reveals for crossfade choreography.
- `Still` captions as subtitles with timecodes.
- `PressKit` downloads as simple editorial cards.
- `Booking` form with minimal fields and clear labels.

## Spacing

- Base unit: 4px.
- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192.
- Space is used to separate ideas and let typography breathe.
- Negative space is a structural asset, not an absence.

## Title color hierarchy (2026-07-03)

- Exactly one word per heading may carry the accent color (`Accent`,
  `components/ui/Accent.tsx` — red-bright). Never zero, never more than one.
- It's a reading guide, not decoration: the accented word is the one the
  heading actually pivots on ("A slow build into **depth**.", "Trusted in
  serious **rooms**.", "**Listen** before reading.").
- Narrator-voice elements (`Quote`) are exempt — Philosophy's "Curating
  journeys." is already entirely red-bright as a different, older pattern
  (the manifesto's second line responding to its first), not a
  single-word accent.

## CUE (2026-07-03)

- The site's only "return to top" control. Not a conventional button —
  the word **CUE**, mono, minimal, fixed bottom-right, appears after the
  hero and returns to 00:00 / Arrival. `components/ui/CueButton.tsx`.

## Buttons

- Primary buttons: red border, red text, subtle hover fill.
- Ghost links: text-only, brighten to red on hover.
- Buttons use uppercase Archivo with tight tracking.
- Focus outline: red-bright for accessibility.

## Cards

- Press kit cards use border-line-strong, bg-bg-1 and editorial spacing.
- Still cards use monochrome image fill, caption, and optional timecode.
- Cards are simple, restrained and functional.

## Layout philosophy

- One idea per viewport.
- The page reads like a set list, not a long scrolling page.
- Section headings are concise and anchored by timecodes.
- Every paragraph is contained and paced.
- Photography is a support layer, not a decorative pattern.

## Hero composition

- Top-left: `DJ · Producer` subline.
- Center: `NOV` in Newsreader.
- Below: `Curated Journeys` as the hero thesis.
- Bottom: location and scroll prompt.
- The hero is layered over a photograph revealed through scroll and a delicate WebGL texture.

## Editorial rhythm

- Timecodes create a musical cadence.
- Section labels behave like chapter headings.
- Quotes and copy alternate between wide and narrow measures.
- The experience favors breath and pause over density.

## Reference

See `docs/design-direction.md` for the approved system and `docs/creative-director-brief.md` for the original creative priorities.
