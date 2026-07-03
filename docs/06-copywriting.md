# 06 · Copywriting

## Tone of voice

- Editorial and cinematic.
- Precise and minimal.
- Quiet, not loud.
- Confident, not boastful.
- Atmospheric, not promotional.

## How NOV speaks

- In short, considered statements.
- As a curator who invites rather than demands.
- With calm authority.
- With an emphasis on journey and selection.

## How NOV never speaks

- No marketing hyperbole.
- No influencer language.
- No buzzwords.
- No ego-driven statements.
- No loud or aggressive terms.

## Copy patterns

- Hero copy should set the tone.
- Quotes should feel like an internal manifesto.
- Section labels should behave like cues.
- Body text should be precise and descriptive.
- Form copy should be simple and functional.

## Copy in the current site

- The Booking section uses: “Every night begins with a conversation.” (the
  night is the DJ's own unit; “journeys” is left to the Philosophy manifesto
  so the key line isn't diluted by repetition elsewhere.)
- Section labels are cue points: Arrival, Philosophy, About, Live, Gallery, Videos / Sets, Press Kit, Booking.
- The site uses English editorial labels as design material.
- Prose and the booking form are localized; editorial elements remain in English.

## Music philosophy copy

- “Music should never interrupt a moment. It should become one.”
- “Good music is as little music as necessary.”

## Usage

- Use the music philosophy in section copy and editorial context.
- Reserve the narrator voice for hero and pull quotes.
- Keep interface copy direct: Booking, Download, Scroll, Buenas.
- Use timecodes as structural labels, not decorative copy.

## Editor's Notes (Radio)

Each set in the Radio player may carry two short editorial sentences —
emotion, never technique. Never "128 BPM, deep groove, mixed on CDJs";
always what the set feels like or where it takes the listener.

Because the set list is fetched live from SoundCloud, notes are keyed by
exact track title and only exist for sets we've actually listened to and
written about. A set with no authored note shows none — a missing note is
never invented at render time. See `components/audio/SoundCloudPlayer.tsx`.

## Technical rider language

Humble and professional, not a legal document. Two groups only: the minimum
technical setup, and hospitality. No corporate rider boilerplate.

## TODO

- Document exact hero copy guidelines.
- Document the full set of current CTA and form copy.
- Establish more examples of editorial language for future sections.
- **Canonical biography.** The 2026-07-03 sprint brief referenced "the
  latest official biography already provided," but no biography text
  actually arrived in that message (the reference was a broken/empty
  citation marker). The site continues to run the previously-approved bio
  (see `components/sections/About.tsx` / `lib/i18n.tsx`). If a new official
  bio exists, it needs to be pasted directly into a prompt — it cannot be
  inferred or reconstructed.
