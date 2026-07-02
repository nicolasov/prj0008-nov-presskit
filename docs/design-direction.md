# NOV — Design Direction
## Creative Direction v1.0 — response to [creative-director-brief.md](./creative-director-brief.md)

Status: **pending approval** — no implementation until this document is approved.

---

## 00 · Concept

**The Listening Room.**

The site is not a portfolio. It is a dark, quiet room the visitor walks into.
Every scroll is a step further inside. Nothing is shouted; everything is placed.

The organizing metaphor is NOV's own philosophy: *not playing tracks — curating
journeys*. The page is itself a curated journey: one idea per viewport, revealed
slowly, ending at a single door (Booking).

Recognition test (from the brief): the site should be identifiable without the
logo. Our signature is the combination of **near-black layered surfaces + huge
light-weight editorial serif + monospaced dossier metadata + hairline rules**.
No other DJ site looks like a gallery catalogue.

---

## 01 · Design System — principles

1. Typography carries the design. Images support; type leads.
2. Multiple blacks, one bone-white voice. No color anywhere.
3. Hairlines instead of boxes. Borders are 1px, low-contrast, structural.
4. Metadata as texture — mono uppercase micro-labels (city, year, index)
   give the "dossier" feel without decoration.
5. One idea per viewport. If a section answers two questions, split it.
6. Motion is confirmation, not spectacle. Everything eases out, slowly.
7. Mobile is designed at the same fidelity, not reflowed.

---

## 02 · Typography System

Three voices:

| Voice | Face | Role |
|---|---|---|
| **Editorial** | Newsreader (Google, variable, optical sizing) | Display headlines, pull quotes, artist names. Light weight (300) at large sizes. Occasional italic for emphasis. |
| **Interface** | Geist Sans | Body prose, navigation, forms, buttons. |
| **Metadata** | Geist Mono | Kickers, labels, indexes, coordinates, footer. Uppercase, letter-spaced. |

All loaded via `next/font` (self-hosted, zero layout shift).

### Scale (fluid, clamp-based)

| Token | Size | Use |
|---|---|---|
| `display` | clamp(4.5rem, 12vw, 11rem) / 0.95 | Hero "NOV", section statements |
| `h1` | clamp(2.75rem, 6vw, 5.5rem) / 1.02 | Section titles |
| `h2` | clamp(1.75rem, 3.5vw, 2.75rem) / 1.15 | Sub-statements |
| `lead` | clamp(1.125rem, 1.6vw, 1.375rem) / 1.6 | Pull paragraphs |
| `body` | 1.0625rem (17px) / 1.8 | Prose, max 62ch |
| `label` | 0.6875rem (11px) / 1.0 | Mono kickers, tracking 0.22em, uppercase |

Rules: headlines never bold (300–400 max). Body never wider than 62ch.
Labels always mono. `text-wrap: balance` on headings.

---

## 03 · Color System

No color. Nine tones.

| Token | Hex | Use |
|---|---|---|
| `bg-0` | `#050505` | Page base |
| `bg-1` | `#0B0B0B` | Alternate sections, depth |
| `bg-2` | `#111111` | Surfaces (cards, form fields) |
| `bg-3` | `#191919` | Hover surfaces |
| `line` | `#1E1D1B` | Hairline rules, borders (warm-biased) |
| `line-strong` | `#2E2C29` | Focus/hover borders |
| `ink` | `#E9E5DD` | Primary text — soft bone, never pure white |
| `ink-mut` | `#9A958B` | Secondary text |
| `ink-faint` | `#5C5850` | Tertiary — indexes, disabled |

Accent: **none**. The bone tone `#C9C4BA` (already in the codebase) survives
only as the hover/active state of interactive elements. Photography is
monochrome-graded. Gradients only as near-invisible vignettes (≤ 6% delta).

---

## 04 · Spacing System

- Base unit: 4px. Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192.
- Container: **1320px max**, gutter `clamp(24px, 5vw, 64px)`.
- Grid: 12 columns desktop, 4 columns mobile.
- Section rhythm: `clamp(120px, 16vw, 224px)` vertical — sections breathe like
  gallery walls.
- Prose measure: 62ch max.

---

## 05 · Motion System

| Layer | Spec |
|---|---|
| Smooth scroll | Lenis, lerp 0.09 |
| Reveals | opacity 0→1 + translateY 24px→0, 1000–1400ms, `cubic-bezier(0.19, 1, 0.22, 1)`, stagger 90ms (GSAP ScrollTrigger) |
| Hero entrance | Single staged sequence: texture (0ms) → NOV (400ms) → subtitle (900ms) → nav (1300ms) |
| Images | scale 1.04→1 on reveal (1600ms); hover scale 1.02 over 1200ms |
| Micro | Link underline draws in 400ms; buttons shift border color, nothing moves |
| Forbidden | Bounce, spin, parallax > 8%, marquee, hover lift/shadow |
| Accessibility | `prefers-reduced-motion`: all transforms removed, opacity-only at 200ms |

### WebGL (hero only)

One R3F canvas: fbm noise displacement — slow smoke/ink drift, monochrome,
≤ 6% luminance variance. Mouse adds a soft displacement radius (physical, not
playful). DPR capped at 1.5, paused when offscreen, dynamic-imported.
Fallback: static grain texture (also the reduced-motion and low-power path).

---

## 06 · Component Inventory

**Layout:** `Nav` (wordmark + 3 anchors + booking CTA, hides on scroll down),
`Section` (rhythm wrapper), `Footer`.

**Editorial primitives:** `Kicker` (mono label), `Headline`, `Prose`,
`PullQuote`, `HairlineRule`, `IndexLabel` (01–08 section numbering — the site
is literally a sequence/journey, so numbering carries meaning).

**Content:** `HeroCanvas` (WebGL + fallback), `Manifesto` (scroll-revealed
lines), `Portrait`, `LiveList` (rooms + shared booths, typographic),
`MagazineGallery` (irregular editorial layout), `VideoStill` (poster frame,
YouTube iframe injected only on click), `SetList` (SoundCloud, same pattern),
`PressKitItem` (download rows), `BookingForm` (name, email, date/venue,
message → existing Resend route), `SocialLinks`.

**Cut from current build:** `Stats` (filler), `Marquee` (motion cliché),
`Genres` (folds into Philosophy), `Testimonials`/`Events` (already deleted).

---

## 07 · Page Architecture

One page, nine movements. Each viewport answers one question.

| # | Section | Question it answers | Content |
|---|---|---|---|
| 01 | **Arrival** | Where am I? | NOV / DJ • Producer / Curated Journeys. WebGL texture. Nothing else. |
| 02 | **Philosophy** | What does he believe? | 3–4 manifesto lines revealed line-by-line. "Not playing tracks. Curating journeys." |
| 03 | **About** | Who is he? | Large portrait + trimmed bio (existing copy) + influences as mono metadata. |
| 04 | **Live** | Where has he played? | Selected rooms + shared-booth artists as large typographic list (Jimmy Van M, Popof, Martín García, Nicolás Rada, Fernando Ferreyra, Carlos Alfonsin). |
| 05 | **Gallery** | What does it look like? | Magazine layout from `assets/` — irregular rhythm, full-bleed moments. |
| 06 | **Videos / Sets** | What does it sound like? | Poster stills → click to play. SoundCloud sets in same visual system. |
| 07 | **Press Kit** | What can I use? | Download rows: photos, bio, logo, tech rider. |
| 08 | **Booking** | How do I book him? | One sentence: *"Every journey begins with a conversation."* + 4-field form. |
| — | **Footer** | — | Coordinates (34.6°S 58.4°W), socials, © year. |

---

## 08 · User Journey (emotional arc → sections)

Curiosity (01 Arrival) → Mystery (02 Philosophy) → Confidence (03 About) →
Discovery (04 Live + 05 Gallery) → Emotion (06 Videos/Sets) → Trust (07 Press
Kit) → Booking (08).

The single CTA ("Booking") is present in the nav from second one, but the page
never pushes — it lets the visitor descend at their own pace.

---

## 09–10 · Wireframes & High-Fidelity

Rendered in the visual presentation (Artifact) that accompanies this document:
lo-fi frames for Arrival, About, Gallery and Booking (desktop + mobile), and a
live high-fidelity mock of the hero and about sections in the final visual
language.

---

## Implementation notes (post-approval)

- New deps: `framer-motion`, `gsap`, `lenis`, `three`, `@react-three/fiber`
  (dynamic-imported; hero canvas is the only Three consumer).
- Fonts via `next/font/google`: Newsreader, Geist, Geist Mono.
- Performance budget: 95+ Lighthouse. WebGL lazy, videos click-to-load,
  `next/image` everywhere, no library outside the list above.
- Existing `/api/contact` (Resend) is kept as-is.
