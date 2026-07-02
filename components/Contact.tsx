'use client';

import { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdlejre';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
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
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
      setErrorMsg(err instanceof Error ? err.message : 'Could not send. Please try again.');
    }
  };

  const inputCls =
    'w-full border border-[var(--line)] bg-[var(--bg2)] px-4 py-[14px] text-[14.5px] text-[var(--txt)] outline-none transition duration-300 focus:border-[var(--silver)] focus:bg-[var(--surface)]';

  return (
    <section
      id="contacto"
      className="mx-auto grid max-w-[1240px] gap-[clamp(34px,6vw,82px)] px-[clamp(18px,4vw,40px)] py-[clamp(70px,9vw,126px)] lg:grid-cols-[0.82fr_1.18fr]"
    >
      <div data-reveal="">
        <p className="section-kicker">Booking</p>
        <h2 className="section-title max-w-[8ch]">Open the room.</h2>
        <p className="mt-7 max-w-[44ch] text-[16px] leading-[1.85] text-[var(--mut)]">
          For clubs, agencies, private listening rooms and coastal dates. Send the context
          of the night and the desired emotional direction.
        </p>
        <div className="mt-9 grid gap-4 border-t border-[var(--line)] pt-7">
          <a href="mailto:booking@nov.dj" className="quiet-link text-[15px]">
            booking@nov.dj
          </a>
          <a
            href="https://soundcloud.com/novnovnovnovnovnovnov"
            target="_blank"
            rel="noopener noreferrer"
            className="quiet-link text-[15px]"
          >
            soundcloud.com/novnovnovnovnovnovnov
          </a>
        </div>
      </div>

      <form
        data-reveal=""
        onSubmit={onSubmit}
        className="grid gap-4 border border-[var(--line)] bg-[var(--surface)] p-[clamp(18px,3vw,34px)] sm:grid-cols-2"
      >
        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--mut2)]">Name *</span>
          <input name="name" type="text" required placeholder="Your name" className={inputCls} />
        </label>

        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--mut2)]">Email *</span>
          <input name="email" type="email" required placeholder="you@example.com" className={inputCls} />
        </label>

        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--mut2)]">Venue</span>
          <input name="venue" type="text" placeholder="Club, city or agency" className={inputCls} />
        </label>

        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--mut2)]">Date</span>
          <input name="date" type="text" placeholder="DD / MM / YYYY" className={inputCls} />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--mut2)]">Message *</span>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us about the room, the audience and the moment of the night."
            className={inputCls}
            style={{ resize: 'vertical' }}
          />
        </label>

        {status === 'error' && (
          <p className="m-0 text-[13px] text-[var(--silver)] sm:col-span-2">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="silver-button sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'loading'
            ? 'Sending'
            : status === 'success'
              ? 'Message sent'
              : 'Send booking request'}
        </button>
      </form>
    </section>
  );
}
