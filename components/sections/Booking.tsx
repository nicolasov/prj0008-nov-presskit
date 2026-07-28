'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import Timecode from '@/components/ui/Timecode';
import Quote from '@/components/ui/Quote';
import SessionEcho from '@/components/hidden/SessionEcho';
import { LINKS } from '@/lib/config/links';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('booking');

type Status = 'idle' | 'loading' | 'success' | 'error';
type Payload = { name: string; email: string; venue: string; date: string; message: string };

// Editorial, not a web form: no boxes — each field is a quiet underline that
// warms to the signal on focus. Placeholders whisper. Usability kept intact.
const inputCls =
  'w-full border-0 border-b border-line bg-transparent px-0 py-[10px] text-[15px] text-ink outline-none transition-colors duration-hover ease-fade placeholder:text-ink/25 focus:border-red';

/**
 * A booking that must never be silently lost. The form posts to /api/contact
 * (Resend). On success it confirms honestly; on any failure it does NOT pretend
 * to have sent — it shows the error and offers a graceful, pre-filled fallback
 * straight to the configured booking inbox, so the enquiry always has a way through even
 * before the mail service is configured. No personal address is ever exposed.
 */
const mailtoFallback = (d: Payload) => {
  const subject = `NOV Booking — ${d.name || 'Enquiry'}`;
  const body = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.venue && `Venue: ${d.venue}`,
    d.date && `Date: ${d.date}`,
    '',
    d.message,
  ]
    .filter(Boolean)
    .join('\n');
  return `mailto:${LINKS.bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function Booking() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>('idle');
  const [payload, setPayload] = useState<Payload | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      venue: (form.elements.namedItem('venue') as HTMLInputElement).value.trim(),
      date: (form.elements.namedItem('date') as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };
    // The inputs are `required` + type=email, so the browser blocks empty or
    // malformed submits first; this is a final guard against a programmatic one.
    if (!data.name || !data.email || !data.message) return;

    setPayload(data);
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        window.setTimeout(() => setStatus('idle'), 7000);
        return;
      }
      setStatus('error'); // honest — never a faked success
    } catch {
      setStatus('error');
    }
  };

  // starting to edit again clears a previous result
  const onFormInput = () => {
    if (status === 'error' || status === 'success') setStatus('idle');
  };

  return (
    <Section id={cue.id} fxIndex={0}>
      <div className="grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Timecode tc={cue.tc} label={cue.label} />
          <Quote className="mt-6 max-w-[16ch] text-ink">
            Every night begins with a conversation.
          </Quote>
          <SessionEcho />
          <div className="mt-9 flex flex-col gap-3 border-t border-line pt-7">
            <a href={`mailto:${LINKS.bookingEmail}`} className="text-[15px] text-ink/70 no-underline transition-colors duration-hover ease-fade hover:text-red-bright">
              {LINKS.bookingEmail}
            </a>
            <a
              href={LINKS.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-ink/70 no-underline transition-colors duration-hover ease-fade hover:text-red-bright"
            >
              soundcloud.com/novnovnovnovnovnovnov
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} onInput={onFormInput} noValidate={false} className="grid gap-x-[clamp(24px,4vw,56px)] gap-y-8 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink/55">{t.booking.name} *</span>
            <input name="name" type="text" required placeholder={t.booking.namePlaceholder} className={inputCls} />
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink/55">{t.booking.email} *</span>
            <input name="email" type="email" required placeholder={t.booking.emailPlaceholder} className={inputCls} />
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink/55">{t.booking.venue}</span>
            <input name="venue" type="text" placeholder={t.booking.venuePlaceholder} className={inputCls} />
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink/55">{t.booking.date}</span>
            <input name="date" type="text" placeholder={t.booking.datePlaceholder} className={inputCls} />
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink/55">{t.booking.message} *</span>
            <textarea
              name="message"
              rows={5}
              required
              placeholder={t.booking.messagePlaceholder}
              className={inputCls}
              style={{ resize: 'vertical' }}
            />
          </label>

          <div aria-live="polite" className="sm:col-span-2 empty:hidden">
            {status === 'success' && (
              <p className="m-0 text-[13px] text-ink/70">
                <span className="text-red-bright">●</span> {t.booking.sent}.
              </p>
            )}
            {status === 'error' && payload && (
              <p className="m-0 text-[13px] text-ink/70">
                {t.booking.errorFallback}{' '}
                <a
                  href={mailtoFallback(payload)}
                  className="text-red-bright underline decoration-red-bright/40 underline-offset-4 transition-colors duration-hover ease-fade hover:decoration-red-bright"
                >
                  {t.booking.writeDirect}
                </a>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="group/send mt-1 flex w-fit items-center gap-3 border-0 bg-transparent p-0 text-left font-mono text-[11px] uppercase tracking-[0.24em] text-ink/70 transition-colors duration-hover ease-fade hover:cursor-pointer hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-50 sm:col-span-2"
          >
            {status === 'loading' ? t.booking.sending : status === 'success' ? t.booking.sent : t.booking.submit}
            <span
              aria-hidden="true"
              className="text-red-bright transition-transform duration-hover ease-fade group-hover/send:translate-x-1"
            >
              →
            </span>
          </button>
        </form>
      </div>
    </Section>
  );
}
