# 07 · Content Strategy

## Strategy

- The website is a curated journey, not a traditional menu of pages.
- Content must reveal progressively and never overwhelm.
- Each section answers a single editorial question.
- Instagram and future channels are extensions of the website, not the other way around.

## Ecosystem

- Website: the central editorial press kit.
- Instagram: an extension of the website’s photographic and editorial language.
- Radio: a future listening refuge for NOV’s sound.
- Stories: short editorial moments, not promotional noise.
- Podcast: a future extension of the journey and the press kit.
- Bookings: discreet and useful, with minimal friction.
- Newsletter: future thoughtful dispatches, not constant updates.

## Website content

- Arrival — Where am I? (runtime 00:00 of 60:00)
- Philosophy — What does he believe?
- About — Who is he?
- Live — Where has he played?
- Gallery — What does it look like?
- **Radio** — What does it sound like? (formerly "Videos / Sets")
- Press Kit — What can I use?
- Booking — How do I book him? (closes at 60:00)

## Editorial roles

- Hero: set the tone with a quiet opening act.
- Philosophy: present the artistic manifesto.
- About: explain the approach and selection process.
- Live: build credibility through the rooms and shared booths.
- Gallery: show the visual language as film stills.
- **Radio: NOV's refuge, not a music widget** — see below.
- Press Kit: provide assets and practical facts.
- Booking: invite conversation.

## Radio (renamed from "Videos / Sets", 2026-07-03)

Radio is treated as an editorial chapter, the same way Gallery or Press Kit
are — not as an embedded player bolted onto the page. It is framed as NOV's
refuge: the place curation happens in long form.

Present now:
- A custom-built SoundCloud player (`components/audio/SoundCloudPlayer.tsx`)
  that replaces the default orange embed entirely with the site's own visual
  system — see [03-design-system.md](./03-design-system.md) and [04-motion-system.md](./04-motion-system.md).
- Editor's Notes: two short, emotion-only sentences per set, for sets we've
  actually written about (see [06-copywriting.md](./06-copywriting.md)).

Future home for (not yet built — do not imply these exist in copy):
- Monthly radio shows
- Guest mixes
- Curated journeys (long-form, narrated selections)
- Live recordings
- A running archive of Editor's Notes as its own read

## Instagram strategy

- **Do not implement Instagram inside the website** (confirmed 2026-07-03).
  No embedded feed, no grid widget. The website is the source; Instagram is
  downstream of it. What we do instead is keep the site's visual language
  (grade, crop discipline, red-signal restraint) consistent enough that
  future posts inherit it naturally.
- Instagram is a visual extension of the website.
- Use portraits, stills and editorial details, not party photos.
- Keep the grid calm and consistent with the press kit palette.
- Stories should feel like annotated stills, not daily updates.
- The platform should reinforce the website’s mood and tone.

## Future content directions

- Radio: a listening room for longer form sets.
- Digging Journal: notes on music selection and discovery.
- Editorial essays: short writing on sound, rooms, and mood.
- Printed press kit: a tactile extension of the website’s editorial system.
- Merchandise and vinyl: future expressions of the brand’s visual identity.

## TODO

- Define the website-to-Instagram content map.
- Document the editorial brief for future radio and podcast work.
- Capture the full booking narrative and priorities.
