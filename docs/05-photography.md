# 05 · Photography

## NOV LOOK™

Photography is treated as editorial atmosphere and quiet evidence, never as loud decoration.

## Philosophy

- Imagery should feel like carefully selected film stills.
- All stills are monochrome or desaturated, with controlled contrast.
- Images support mood, not spectacle.
- The camera is a witness, not a stage.
- Photography should feel natural and cinematic.

## Camera references

- Leica: precision, texture, low key.
- Kodak Vision3: filmic grain and muted color memory.
- Apple Editorial: lighting simplicity and refined composition.
- Roger Deakins: deep blacks, soft volume, cinematic depth.

## Composition and framing

- Use editorial crops, not generic grids.
- Favor letterboxed and portrait formats.
- Keep image placement asymmetrical and purposeful.
- Captions should read like subtitles.
- Include timecodes as metadata, not as decoration.

## Lighting rules

- Natural or moody light.
- Deep blacks, subtle highlights.
- Avoid oversaturation.
- Avoid artificial studio gloss.
- Avoid fake HDR.

## Image checklist

- Is the image quiet and atmospheric?
- Does it feel like a still rather than a staged portrait?
- Is the palette muted or monochrome?
- Does it have editorial composition?
- Is the caption minimal and clear?
- Is the aspect ratio intentional?
- Does the image avoid trendy DJ clichés?

## Things never allowed

- No oversaturated photography.
- No festival clichés.
- No giant performance photos.
- No audience shots.
- No overly polished glam lighting.
- No Instagram-style grids.
- No fake smoke or obvious effects.

## Processing pipeline

Every photograph that enters the site from `_mat/NOV/Fotos/chatgpt` goes
through the same steps before it's referenced in code:

1. **Optimize** — re-encoded to JPEG (quality ~88–90) via `sips`, cutting
   1.4–1.8MB source PNGs down to ~0.2–0.3MB. `next/image` layers AVIF/WebP
   negotiation and responsive `srcset` generation on top automatically
   (configured in `next.config.ts`) — there is no separate manual "export
   webp" step, the optimizer does it per-request.
2. **Rename** — camera/export filenames (`ChatGPT Image 2 jul 2026, 10_41_55
   p.m..png`) are never used in the repo. Files are renamed descriptively,
   e.g. `nov-dj-organic-house-buenos-aires-hero.jpg`,
   `nov-dj-red-light-booth-silhouette.jpg`.
3. **Grade** — `.monochrome-image` (grayscale + contrast + brightness,
   `app/globals.css`) is the standard grade applied through the `Still`
   primitive. No fake HDR, no oversharpening, no saturation boost.
4. **Crop deliberately** — every placement gets a reviewed `object-position`,
   never the CSS default (`center`). Where a photo is used full-bleed behind
   very different aspect ratios (the hero, across mobile/tablet/desktop),
   the crop is set **per breakpoint**, not left to `object-fit` alone.
5. **Authenticity** — remove a distracting logo/brand mark only when it's
   genuinely incidental to the frame (e.g. a random sponsor sticker); never
   retouch the subject, never stage what wasn't there.

## The Gallery — an exhibition, not a portfolio (2026-07-04)

The Gallery (`components/sections/Gallery.tsx`) is the site's second emotional
peak, equal to the hero, and it is built as an **interlude**: the site goes
almost silent — no heading, no timecode, almost no interface — and lets the
photographs speak. Rules that govern it, so future edits keep the intent:

- **Composition never repeats twice in a row.** The sequence alternates full
  viewport → small portrait held in negative space → wide landscape → a void
  → close detail → panorama → full → a receding wide. Two photographs return
  at radically different crops *and* grades (colour vs monochrome) — treated
  as different moments, never a repeat.
- **Colour is curated, not mechanical.** The exhibition is monochrome; muted
  cinematic colour arrives only twice, well apart — the warm light-trails, and
  the red booth silhouette at the peak. This is the one deliberate exception
  to "all stills are monochrome" (Philosophy, above): the two grades live in
  `app/globals.css` as `.grade-mono` / `.grade-color`, both built from the same
  four filter primitives so the develop-from-black interpolates cleanly.
- **Captions are optional, tiny, quiet** — place and year only ("Buenos Aires
  — 2025", "UFO Point — 2025"), on just two plates. The test the Gallery must
  pass: *if every caption were removed, would it still read as intentionally
  curated?* It must be yes — the composition rhythm carries it.
- **Motion is cinema, never "website animation"** — each photograph develops
  from near-black like a print; a little parallax, and the large frames zoom
  and breathe imperceptibly slowly. All transform/filter only → no CLS.
- **It reads the visitor** (scroll pace): linger and each plate develops
  slowly with room; move quickly and the development shortens, the parallax
  calms, and a near-invisible `SKIP GALLERY →` fades in (only past ~the sixth
  photograph, only while clearly moving) that continues to the next section.
  Slow down and the contemplative rhythm returns. None of it is announced.
  See the reader-intention notes in [04-motion-system.md](./04-motion-system.md).

## Current implementation

- The definitive hero photograph (2026-07-03) is
  `public/images/nov-dj-organic-house-buenos-aires-hero.jpg` — a shadowed,
  partially-obscured portrait (cap, glasses, headphones, hands on the mixer)
  that deliberately never shows the face clearly. It's revealed **through**
  the hero typography as the visitor scrolls — see [04-motion-system.md](./04-motion-system.md).
- Two more processed this sprint, in the general editorial pool:
  `nov-dj-live-buenos-aires-club.jpg` (wide room shot) and
  `nov-dj-red-light-booth-silhouette.jpg` (backlit booth silhouette).

## TODO

- Full legacy rename pass: `nov-portrait.png`, `nov-hero.jpg`, `nov-bio.jpg`,
  `nov-stage.jpg`, `nov-live.jpg`, `nov-bali-1/2.png`, `nov-00-90.jpg`,
  `book-1..4.png`, `nov-no-bg.png`, `scr-ddpu.jpeg` in `public/images/`
  predate the SEO-filename convention. Backlogged rather than renamed in
  bulk, to avoid broad churn across every section in one pass without a
  deliberate review of which of these are even still in use.
- A short, explicit "NOV LOOK™" one-pager (exact contrast/brightness curve,
  approved aspect ratios per section) has not been written as a standalone
  spec — the working definition currently lives only as the rules above and
  the `.monochrome-image` CSS rule.
