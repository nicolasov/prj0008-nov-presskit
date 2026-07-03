# 11 · Lessons Learned

## Purpose

This document records important design decisions in chronological order.
Each lesson includes the decision, the reason, and the impact.

## Lessons

- **The website became the press kit.**
  - Reason: the project needed a clear identity beyond a promotional page.
  - Impact: every section is now framed as a press asset rather than a portfolio entry.

- **Museum instead of club.**
  - Reason: the brief called for a premium, editorial tone and a mature audience.
  - Impact: design choices favor stillness, typography, and restrained motion.

- **No smoke effects.**
  - Reason: smoke can feel generic and decorative.
  - Impact: the hero uses subtle WebGL atmosphere instead of obvious smoke overlays.

- **Typography over decoration.**
  - Reason: the visual system needed a strong, recognizable voice.
  - Impact: the brand relies on Newsreader, Archivo and Geist Mono rather than flashy UI.

- **Hero became the emotional center.**
  - Reason: the first viewport needed to set tone before content.
  - Impact: the hero combines a staged reveal, a large typographic wordmark, and a photograph.

- **Radio became the refuge of the project.**
  - Reason: audio should be available without dominating the page.
  - Impact: the Videos / Sets section is understated and focused on listening.

- **The hero became a scrollytelling sequence, not a single viewport.**
  - Reason: a one-screen hero couldn't hold hold → sweep → photograph-through-
    typography → dissolve without rushing every step.
  - Impact: `Arrival` is now a tall pinned (`sticky`) stage; `--hero-scroll`
    is computed against the wrapper's own scroll range, not `window.innerHeight`.

- **"Videos / Sets" became "Radio."**
  - Reason: a functional label read as a widget; the brief wanted an
    editorial chapter and a future home for shows, guest mixes and notes.
  - Impact: cue label, section copy and the SoundCloud player's framing all
    changed; the underlying custom player (already built) didn't need to.

- **Editor's Notes are keyed and optional, never generated.**
  - Reason: the brief asked for two emotion-only sentences per set, but the
    set list is fetched live and titles aren't known in advance; writing
    fake notes for unheard sets would be exactly the kind of invention the
    brief explicitly forbids for biography and achievements.
  - Impact: notes exist only for sets we've actually written about; anything
    else renders with no note rather than a placeholder.

## TODO

- Add a lesson for the live progress bar and tracklist interaction.
- Add a lesson for the decision to keep editorial copy labels in English.
- Add a lesson for the hero canvas interaction strategy.
