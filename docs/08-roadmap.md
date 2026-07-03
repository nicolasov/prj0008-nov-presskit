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
