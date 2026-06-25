'use client';

import { useState } from 'react';

// ← Reemplazá con tu endpoint de Formspree: https://formspree.io/f/xxxxxxxx
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
        throw new Error(json.error ?? 'Error al enviar');
      }

      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error al enviar. Intentá de nuevo.');
    }
  };

  const inputCls =
    'bg-[var(--bg2)] border border-[var(--line)] rounded-[11px] px-[15px] py-[13px] text-txt text-[14.5px] outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(224,70,58,.12)] w-full';

  return (
    <section
      id="contacto"
      className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,90px)] pb-[clamp(60px,9vw,110px)] flex flex-wrap gap-[clamp(36px,5vw,72px)]"
    >
      {/* Left col */}
      <div data-reveal="" className="flex-[1_1_320px] min-w-[280px]">
        <div className="w-[46px] h-[3px] bg-accent mb-[26px]" />
        <h2
          className="font-archivo font-black uppercase tracking-[-0.01em] leading-none m-0 mb-[22px]"
          style={{ fontSize: 'clamp(2rem,4.4vw,3.2rem)' }}
        >
          Pongámonos
          <br />
          en contacto
        </h2>
        <p className="text-[var(--mut)] text-[16px] leading-[1.7] max-w-[42ch] m-0 mb-[34px]">
          Para reservas, fechas y consultas de booking. Contame de tu evento y armamos juntos el
          viaje sonoro perfecto.
        </p>
        <div className="flex flex-col gap-4">
          <a
            href="mailto:booking@nov.dj"
            className="flex items-center gap-[14px] text-txt no-underline transition-colors duration-300 hover:text-accent"
          >
            <span className="grid place-items-center w-[42px] h-[42px] rounded-full border border-[var(--line)] flex-none text-[18px]">
              ✉
            </span>
            <span className="text-[15.5px]">booking@nov.dj</span>
          </a>
        </div>
      </div>

      {/* Form */}
      <div data-reveal="" className="flex-[1.1_1_380px] min-w-[300px]">
        <form
          onSubmit={onSubmit}
          className="bg-card border border-[var(--line)] rounded-[8px] p-[clamp(24px,3.4vw,40px)] grid gap-[18px]"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-[var(--mut)] font-medium">Nombre *</span>
            <input name="name" type="text" required placeholder="Tu nombre" className={inputCls} />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-[var(--mut)] font-medium">Email *</span>
            <input name="email" type="email" required placeholder="vos@ejemplo.com" className={inputCls} />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-[var(--mut)] font-medium">Lugar / Club</span>
            <input name="venue" type="text" placeholder="Club, ciudad" className={inputCls} />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-[var(--mut)] font-medium">Fecha</span>
            <input name="date" type="text" placeholder="DD / MM / AAAA" className={inputCls} />
          </label>

          <label className="flex flex-col gap-2 col-span-2">
            <span className="text-[13px] text-[var(--mut)] font-medium">Mensaje *</span>
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Contame sobre tu evento..."
              className={inputCls}
              style={{ resize: 'vertical' }}
            />
          </label>

          {status === 'error' && (
            <p className="col-span-2 text-accent text-[13px] m-0">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="col-span-2 py-[15px] border-none rounded-[11px] bg-accent text-white font-bold text-[15px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(224,70,58,.28)] hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {status === 'loading'
              ? 'Enviando…'
              : status === 'success'
              ? '✓ ¡Mensaje enviado!'
              : 'Enviar consulta'}
          </button>
        </form>
      </div>
    </section>
  );
}
