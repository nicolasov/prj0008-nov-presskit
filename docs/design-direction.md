# NOV — Design Direction
## Final Direction v2.0 — "The Set" — response to [creative-director-brief.md](./creative-director-brief.md)

Status: **approved direction** (merge of proposals A "The Listening Room" and
B "The Set", user-selected 2026-07-02). Implementation may begin.

Selection: structure, color temperature and motion of **B** + editorial serif
display voice of **A** for hero and pull quotes only.

---

## 00 · Concept

**The page is a set.**

Eight tracks, one runtime. Sections are cue points with timecodes
(00:00 Arrival → 55:00 Booking). Navigation is a tracklist. Transitions are
crossfades — the only transition the site knows. The visitor doesn't scroll a
website; they play through a journey NOV curated for them.

A film with a literary narrator: A24 pacing and Swiss precision carry the
structure, while a light editorial serif appears only when the page speaks in
first person (hero, pull quotes).

Recognition signature (brief test: identifiable without the logo):
**timecodes as navigation + letterboxed monochrome stills + light serif
narrator voice + fade-only motion.** No other artist site is structured as a
tracklist.

---

## 01 · Design System — principles

1. The crossfade is the metaphor and the constraint. Nothing slides, nothing
   scales, nothing moves sideways — elements only fade.
2. Hierarchy by opacity, not color. Like light falling off in a dark room.
3. Timecodes are honest structure: they mark position in the journey.
4. Every image is a film still: letterboxed, monochrome, captioned like a
   subtitle, timecoded.
5. The serif is the narrator — it appears only in big moments, never in
   interface.
6. One idea per viewport. Each cue answers one question.
7. Mobile is designed at the same fidelity, not reflowed.

---

## 02 · Typography System

Three voices:

| Voice | Face | Role |
|---|---|---|
| **Narrator** | Newsreader 300 (Google, variable) | Hero wordmark, pull quotes, thesis lines. Light, occasional italic. Never in UI. |
| **Structure** | Archivo (already in project) | Section heads (500, tracking −0.02em), body (400), navigation, forms. Two weights only. |
| **Timecode** | Geist Mono | Timecodes, cue labels, captions, metadata. Tabular numerals. |

All via `next/font`, self-hosted, zero layout shift.

### Scale

| Token | Spec | Use |
|---|---|---|
| `hero` | Newsreader 300 · clamp(4.5rem, 15vw, 13rem) / 1 · tracking 0.06em | "NOV" |
| `quote` | Newsreader 300 italic · clamp(1.5rem, 2.8vw, 2.2rem) / 1.25 | Pull quotes, manifesto |
| `h1` | Archivo 500 · clamp(1.9rem, 4.2vw, 3.1rem) / 1.05 · tracking −0.02em | Section heads |
| `sub` | Archivo 400 · 13px · tracking 0.42em · uppercase | "DJ · PRODUCER" captions |
| `body` | Archivo 400 · 16px / 1.8 · max 60ch | Prose |
| `tc` | Geist Mono 400 · 11px · tracking 0.18em · tabular-nums | Timecodes, labels |

---

## 03 · Color System

Neutral-cold blacks. No accent color at all.

| Token | Value | Use |
|---|---|---|
| `bg-0` | `#050505` | Page base |
| `bg-1` | `#0B0B0B` | Frames, alternate depth |
| `bg-2` | `#111111` | Surfaces |
| `bg-3` | `#191919` | Hover surfaces |
| `line` | `#1F1F1F` | Hairlines |
| `line-strong` | `#303030` | Focus/hover borders |
| `ink` | `#EAEAE6` | Full voice — headlines, active states |
| `ink-70` | rgba(234,234,230,.70) | Supporting — body, captions |
| `ink-45` | rgba(234,234,230,.45) | Metadata — timecodes, labels |
| `ink-25` | rgba(234,234,230,.25) | Atmosphere — inactive cues, rules |

Hover states move up one opacity step; nothing changes hue. Photography
monochrome-graded. Gradients only as near-invisible vignettes (≤ 6% delta).

---

## 04 · Spacing System

- Base unit: 4px. Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192.
- Container: 1320px max, gutter `clamp(24px, 5vw, 72px)`.
- Grid: 12 columns desktop, 4 mobile.
- Section rhythm: `clamp(110px, 16vw, 200px)`.
- Prose measure: 60ch max.
- Letterbox bars on stills are structural, part of the composition.

---

## 05 · Motion System

**The one rule: everything is a crossfade.** Nothing translates, nothing
scales, nothing bounces.

| Layer | Spec |
|---|---|
| Reveals | opacity 0→1 · 1400–2000ms · stagger 140ms (GSAP ScrollTrigger) |
| Smooth scroll | Lenis, lerp 0.08. Scroll position drives the timecode readout in the nav. |
| Hero entrance | Staged fades: smoke → NOV → sub → tracklist nav |
| Images | Fade from 0 · hover: caption fades in, exposure lifts ~4% |
| Micro | Opacity-step hovers (25→45→70→100). Underline none — links brighten. |
| Timecode nav | Current cue at 70%, others at 25%; click seeks (Lenis scrollTo) |
| Forbidden | Translate, scale, bounce, spin, marquee, parallax, hover lift/shadow |
| Reduced motion | Fades shorten to 200ms — degrades almost invisibly |

### WebGL (hero only)

One R3F canvas: fbm smoke/ink drift, monochrome, ≤ 6% luminance variance,
soft mouse displacement. DPR ≤ 1.5, paused offscreen, dynamic-imported.
Fallback: static grain (also reduced-motion and low-power path).

---

## 06 · Component Inventory

**Layout:** `Nav` (wordmark + timecode readout + tracklist + booking),
`Cue` (section wrapper: timecode + anchor + rhythm), `Footer`.

**Primitives:** `Timecode`, `CueLabel`, `NarratorQuote` (serif), `SectionHead`,
`Prose`, `Still` (letterboxed image: caption + timecode), `HairlineRule`.

**Content:** `HeroCanvas` (WebGL + static fallback), `Manifesto` (crossfading
lines), `CreditsList` (Live — rooms/artists as rolling credits),
`FilmGallery` (21:9 + 4:5 stills, irregular rhythm), `VideoStill` /
`SetList` (posters; iframes injected on click only), `PressKitItem`
(download rows: format, size), `BookingForm` (4 fields → existing Resend
route), `SocialLinks`.

**Cut from current build:** `Stats`, `Marquee`, `Genres` (folds into
Philosophy). `Testimonials`/`Events` already removed.

---

## 07 · Page Architecture — the tracklist

| Cue | TC | Section | Question |
|---|---|---|---|
| 01 | 00:00 | **Arrival** | Where am I? — Title card: NOV (serif) · DJ • Producer · *Curated Journeys*. Smoke. |
| 02 | 04:30 | **Philosophy** | What does he believe? — Manifesto lines crossfading like opening captions. |
| 03 | 09:00 | **About** | Who is he? — Letterboxed portrait, bio as subtitle blocks. |
| 04 | 18:00 | **Live** | Where has he played? — Rooms + shared booths as rolling credits (Jimmy Van M, Popof, Martín García, Nicolás Rada, Fernando Ferreyra, Carlos Alfonsin). |
| 05 | 27:00 | **Gallery** | What does it look like? — Film stills, captions, timecodes. |
| 06 | 38:00 | **Videos / Sets** | What does it sound like? — Posters, click to play. YouTube + SoundCloud. |
| 07 | 47:00 | **Press Kit** | What can I use? — Download rows: photos, bio, logo, rider. |
| 08 | 55:00 | **Booking** | How do I book him? — "Every journey begins with a conversation." 4 fields. |
| — | — | **Footer** | Coordinates 34.6°S 58.4°W · socials · © year. |

Timecodes are editorial fiction — position in the journey, not real durations.

---

## 08 · User Journey

Curiosity (01) → Mystery (02) → Confidence (03) → Discovery (04–05) →
Emotion (06) → Trust (07) → Booking (08). Single CTA in the nav from second
one; the page never pushes.

---

## 09–10 · Wireframes & High-Fidelity

Rendered in the visual presentation (Artifact "NOV — Design Direction ·
Final"): letterboxed wireframes for Arrival, About, Live and Booking, plus a
live hi-fi mock of the hero with the tracklist navigation and smoke texture.

---

## Implementation notes

- New deps: `gsap`, `lenis`, `three`, `@react-three/fiber` (+ `framer-motion`
  only if micro-fades need it — prefer GSAP-only to keep bundle minimal).
- Fonts: Newsreader + Archivo + Geist Mono via `next/font/google`.
- Performance budget: 95+ Lighthouse. WebGL dynamic-imported, embeds
  click-to-load, `next/image` everywhere.
- Existing `/api/contact` (Resend) kept as-is.
- Build order: tokens + fonts → Cue/Nav skeleton with timecodes → sections
  01→08 → WebGL hero → motion pass → performance pass.
