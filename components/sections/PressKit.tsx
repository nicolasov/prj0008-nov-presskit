'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import Accent from '@/components/ui/Accent';
import Drawer from '@/components/ui/Drawer';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('press-kit');

const photoDownloads = [
  { title: 'Buenos Aires Portrait', href: '/images/nov-presskit-portrait.jpg', format: 'JPG · Web optimized' },
  { title: 'Booth Light Trails', href: '/images/nov-presskit-booth.jpg', format: 'JPG · Web optimized' },
  { title: 'Editorial Set', href: '/images/nov-presskit-editorial.jpg', format: 'JPG · Web optimized' },
];

type OpenDrawer = 'biography' | 'rider' | 'photos' | null;

export default function PressKit() {
  const { t } = useLang();
  const [open, setOpen] = useState<OpenDrawer>(null);

  const rows: { key: Exclude<OpenDrawer, null>; label: string; meta: string }[] = [
    { key: 'biography', label: t.pressKit.rows.biography, meta: t.pressKit.rowMeta.biography },
    { key: 'rider', label: t.pressKit.rows.rider, meta: t.pressKit.rowMeta.rider },
    { key: 'photos', label: t.pressKit.rows.photos, meta: t.pressKit.rowMeta.photos },
  ];

  return (
    <Section id={cue.id} fxIndex={0}>
      <Timecode tc={cue.tc} label={cue.label} />
      <Heading as="h2" className="mt-6 max-w-[12ch]">
        Everything needed, nothing <Accent>loud</Accent>.
      </Heading>

      <div className="mt-12 flex flex-col border-t border-line">
        {rows.map((row) => (
          <button
            key={row.key}
            type="button"
            onClick={() => setOpen(row.key)}
            className="group flex items-baseline justify-between gap-6 border-b border-line bg-transparent py-6 text-left hover:cursor-pointer"
          >
            <span className="flex items-baseline gap-5">
              <span className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light text-ink transition-colors duration-hover ease-fade group-hover:text-red-bright">
                {row.label}
              </span>
              <span className="hidden text-[13px] text-ink/45 sm:inline">{row.meta}</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 transition-colors duration-hover ease-fade group-hover:text-red-bright">
              {t.pressKit.open}
            </span>
          </button>
        ))}
      </div>

      <Drawer open={open === 'biography'} onClose={() => setOpen(null)} title={t.pressKit.rows.biography}>
        <div className="flex flex-col gap-4">
          {t.pressKit.bioLines.map((line, i) => (
            <p key={i} className="m-0 text-[15.5px] font-light leading-[1.7] text-ink/80">
              {line}
            </p>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 'rider'} onClose={() => setOpen(null)} title={t.pressKit.rows.rider}>
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
              {t.pressKit.rider.technicalLabel}
            </span>
            <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
              {t.pressKit.rider.technical.map((item) => (
                <li key={item} className="flex gap-3 text-[14.5px] leading-[1.6] text-ink/80">
                  <span aria-hidden="true" className="text-red-bright">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
              {t.pressKit.rider.hospitalityLabel}
            </span>
            <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
              {t.pressKit.rider.hospitality.map((item) => (
                <li key={item} className="flex gap-3 text-[14.5px] leading-[1.6] text-ink/80">
                  <span aria-hidden="true" className="text-red-bright">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>

      <Drawer open={open === 'photos'} onClose={() => setOpen(null)} title={t.pressKit.rows.photos}>
        <div className="flex flex-col">
          {photoDownloads.map((p) => (
            <a
              key={p.title}
              href={p.href}
              download
              className="flex items-baseline justify-between gap-4 border-b border-line py-4 no-underline transition-colors duration-hover ease-fade hover:text-red-bright"
            >
              <span className="font-serif text-[18px] font-light text-ink">{p.title}</span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45">{p.format}</span>
            </a>
          ))}
        </div>
      </Drawer>
    </Section>
  );
}
