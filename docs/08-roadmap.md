# 08 · Roadmap

## Current sprint — Refinement (opened 2026-07-03)

The project has moved past adding sections. This sprint is about polishing every interaction until the site feels like a timeless editorial experience — the visitor should leave thinking "I need to hear him," not "nice DJ website."

Guiding test for every change this sprint: *would Apple, Leica or A24 ship this? If it still reads as a DJ website, keep refining.*

Tasks:

- [x] Runtime extended from a fictional 55:00 to 60:00 across nav, hero and booking timecodes.
- [x] New definitive hero photograph (`nov-dj-organic-house-buenos-aires-hero.jpg`) — see [05-photography.md](./05-photography.md).
- [x] Hero rebuilt as a scrollytelling sequence: hold → red sweep → photograph revealed through the typography → NOV dissolves only once the reveal is complete. See [04-motion-system.md](./04-motion-system.md).
- [x] Editorial crops set deliberately per breakpoint on the hero photo (not default `object-fit` centering).
- [x] Technical rider rewritten in humble, professional language (minimum setup + hospitality). See [06-copywriting.md](./06-copywriting.md).
- [x] "Videos / Sets" reframed as **Radio** — an editorial chapter, not a music widget. See [07-content-strategy.md](./07-content-strategy.md).
- [x] Editor's Notes: two-sentence, emotion-only mood notes for the sets we've actually heard; unknown/future sets show none rather than a fabricated note.
- [x] Three more `_mat/NOV/Fotos/chatgpt` photographs processed to the SEO-filename pipeline.
- [ ] Full legacy filename pass (`nov-portrait.png`, `nov-hero.jpg`, etc. still carry pre-pipeline names) — backlog, see [05-photography.md](./05-photography.md) TODO.
- [ ] Soft UI sounds, hidden quotes, tasteful Easter eggs — no sound asset or copy has been designed yet; tracked as backlog, not fabricated. See TODO below.
- [ ] Canonical biography — a "latest official biography" was referenced this sprint but never actually received in the conversation. The site keeps the previously-approved bio text. See [06-copywriting.md](./06-copywriting.md) TODO.
- [x] Nine hidden interactions, elegant and non-gamified. Not enumerated — see [04-motion-system.md](./04-motion-system.md).

## Sprint 6.6 — Art direction pass (opened 2026-07-03)

The brief for this sprint explicitly reframes the working posture: not "add
features," but polish rhythm, typography, motion, photography and sound
until nothing reads as "a website" — the reference is a premium editorial
publication (Apple / Leica / A24 / Kinfolk), reviewed as if presenting to
their creative directors. Two guiding rules carried through every task
below: *if a decision improves the design but breaks the atmosphere,
discard it* — atmosphere always wins; and *if an animation calls attention
to itself, remove it — if it creates emotion without being noticed, keep it.*

**Sprint 6.7 hero refinements (2026-07-03) — shipped:**

- [x] Same object load→hero (critical CSS font stack matches Newsreader-light, no Georgia-heavy flash).
- [x] Faster silence (idle reveal 5s → 3s).
- [x] Earlier, progressive hero-photo reveal.
- [x] No vertical movement on first scroll (verified the sticky stage locks the viewport; NOV screen-Y held constant across the sequence).
- [x] Perfect centering — NOV in its own absolutely-centered layer, decoupled from chrome.
- [x] Restored the continuous red recording-timeline hairline.
- [x] Hero continuity — one uninterrupted transformation, verified frame-by-frame.

See [04-motion-system.md](./04-motion-system.md) "Sprint 6.7 hero refinements".
The larger 6.7 phases below (cover transition, CUE upgrade, line reveals) remain
queued.

**Shipped this pass:**

- [x] Fixed the loading→hero position jump — root-caused to a FOUC (the
  browser paints the hero word with user-agent defaults before the
  stylesheet loads, on any throttled connection), fixed with inlined
  critical CSS. See the `fix(hero)` commit for the full trace.
- [x] Silence-first hero: only NOV exists for the first ~5s (or until first
  scroll) — header, DJ • Producer, and Curated Journeys hold back until
  then, and their arrival is staged rather than a plain fade.
- [x] Header settle: Buenos Aires / Scroll rise from below instead of
  fading in place; the header itself eases into its sticky state.
- [x] Red sweep extended ~35%; NOV shifts toward the red signal (not gray)
  as the photograph reveals, floating above it at low opacity rather than
  disappearing; DJ • Producer / Curated Journeys persist longer as faint
  afterimage layers instead of cutting to zero.
- [x] About section photo replaced with the definitive image.
- [x] Title color hierarchy: exactly one accent word per heading, used as
  a reading guide, never decoration.
- [x] "Back to top" replaced with **CUE** — a return to 00:00, not a
  generic UI affordance.

**Deliberately queued, not attempted shallow** — each of these is a real
feature on its own and doing it at the quality this project has held to
so far needs its own dedicated pass rather than a rushed pass alongside
everything else in this list:

- [ ] Hero → Philosophy "cover/layer" transition (the document physically
  covering the hero like a magazine's opening spread, with depth/parallax
  on the hero image). This is a genuine evolution of the motion system's
  "everything is a crossfade" rule, scoped specifically to this one
  boundary — needs its own docs update in [04-motion-system.md](./04-motion-system.md)
  before implementation, not a quick bolt-on.
- [ ] Gallery rebuilt as a full photographic exhibition (~20 images,
  enter/breathe/crossfade/leave, mixed full-bleed and partial framing).
  Blocked in part on having enough real, distinct, graded photographs —
  currently ~8 processed. Repeating images to hit 20 (explicitly permitted
  in the brief) still needs real art direction per placement, not a loop.
- [ ] First video inside the Gallery (`_mat/NOV/Videos/...aguante...mp4`),
  autoplay/muted/loop, with the audio-exclusivity rule (video ↔
  SoundCloud never both play).
- [ ] Shared Booth as one continuous bullet-separated sentence with slow
  GSAP marquee motion (reference: CodePen `MYyBrZw`, reinterpreted).
- [ ] Line-by-line paragraph reveals (About, Philosophy body copy) —
  reference: tympanus ScrollTextMotion, reinterpreted, not copied.
- [ ] Full photography pass: test every image in both monochrome and
  NOV LOOK™ color grading (Leica / Kodak Vision3 / Apple Editorial
  references), choose per-image rather than a blanket rule.
- [ ] Full image production pipeline: AVIF/WebP export, responsive
  srcset/sizes, explicit dimensions, complete alt/title/caption pass,
  and the remaining legacy-filename rename (already tracked in
  [05-photography.md](./05-photography.md)).
- [ ] Hero "living blacks" atmosphere texture (the background should never
  read as flat dead black) and the subtle independent-depth movement on
  the hero photograph.

## Current status

- The project is built as a journey-driven press kit.
- The site currently includes Arrival, Philosophy, About, Live, Gallery, Videos / Sets, Press Kit, and Booking.
- The motion system is implemented with Lenis and GSAP.
- The hero uses WebGL atmosphere with a DOM fallback.

## Short term

- Maintain the current approved direction.
- Improve documentation before any implementation.
- Refine the hero and narrative copy in existing sections.
- Map the current codebase to the cue architecture.
- Verify every section against the documentation.

## Medium term

- Develop Instagram as a visual extension of the website.
- Build a Digging Journal or editorial notes section.
- Add a future newsletter concept grounded in the press kit.
- Extend the press kit assets with curated editorial downloads.

## Long term

- Publish a printed press kit.
- Explore a vinyl series or music-focused editorial object.
- Plan a future exhibition or physical presentation.
- Consider a radio or podcast series as an audio refuge.
- Design future merchandise only if it stays editorial and restrained.

## Notes

- The roadmap is guided by the existing creative direction.
- Every new idea must be documented before being implemented.
