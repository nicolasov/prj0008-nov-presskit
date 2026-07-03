'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import Timecode from '@/components/ui/Timecode';
import Quote from '@/components/ui/Quote';
import Button from '@/components/ui/Button';
import SessionEcho from '@/components/hidden/SessionEcho';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('booking');

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputCls =
  'w-full border border-line bg-bg-1 px-4 py-[14px] text-[14.5px] text-ink outline-none transition-colors duration-hover ease-fade focus:border-red';

export default function Booking() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      venue: (form.elements.namedItem('venue') as HTMLInputElement).value,
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? 'Could not send message');
      }

      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t.booking.errorFallback);
    }
  };

  return (
    <Section id={cue.id} fxIndex={0}>
      <div className="grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Timecode tc={cue.tc} label={cue.label} />
          <Quote className="mt-6 max-w-[16ch] text-ink">
            Every journey begins with a conversation.
          </Quote>
          <SessionEcho />
          <div className="mt-9 flex flex-col gap-3 border-t border-line pt-7">
            <a href="mailto:booking@nov.dj" className="text-[15px] text-ink/70 no-underline transition-colors duration-hover ease-fade hover:text-red-bright">
              booking@nov.dj
            </a>
            <a
              href="https://soundcloud.com/novnovnovnovnovnovnov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-ink/70 no-underline transition-colors duration-hover ease-fade hover:text-red-bright"
            >
              soundcloud.com/novnovnovnovnovnovnov
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 border border-line bg-bg-1 p-[clamp(18px,3vw,34px)] sm:grid-cols-2">
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

          {status === 'error' && (
            <p className="m-0 text-[13px] text-red-bright sm:col-span-2">{errorMsg}</p>
          )}

          <Button
            as="button"
            type="submit"
            variant="primary"
            disabled={status === 'loading'}
            className="justify-center py-[14px] sm:col-span-2"
          >
            {status === 'loading' ? t.booking.sending : status === 'success' ? t.booking.sent : t.booking.submit}
          </Button>
        </form>
      </div>
    </Section>
  );
}
