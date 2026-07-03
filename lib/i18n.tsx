'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'es';

/**
 * Partial translation by design: prose and the booking form switch
 * language; editorial elements (hero, narrator quotes, headings,
 * timecode labels, captions, asset names) stay in English — they are
 * design material, not copy.
 */
const dictionaries = {
  en: {
    philosophy: {
      lines: [
        'Every set, researched and selected fresh.',
        'Built to move from tension into release.',
        'Nothing aggressive. Nothing loud.',
        'The room is trusted to follow.',
      ],
    },
    about: {
      lines: [
        'A DJ and producer from Buenos Aires.',
        'Progressive, deep, hypnotic — never aggressive.',
        'Tension built slowly, with room to breathe.',
        'New music chosen before every night.',
        'Not a playlist. A guided journey.',
      ],
      influences: 'Influences',
    },
    live: {
      body: 'NOV has performed across Buenos Aires and the Argentine coast, sharing the booth with artists who shaped the progressive and deep electronic language of the region.',
    },
    radio: {
      body: 'The presskit is built around the same principle as the set: fewer signals, deeper attention.',
    },
    pressKit: {
      facts: [
        ['Origin', 'Buenos Aires, Argentina'],
        ['Sound', 'Progressive House, Deep House, Organic House, Hypnotic Groove'],
        ['Set Philosophy', 'Fresh music selected before every performance'],
        ['Booking', 'Clubs, listening rooms, private and coastal dates'],
      ] as [string, string][],
      downloadsMeta: {
        portraits: 'High-resolution studio press photos',
        liveStill: 'Dark booth photography for flyers and editorial use',
        artistMark: 'NOV stage image and identity reference',
      },
      download: 'Download',
      rider: {
        technicalLabel: 'Technical Requirements — Minimum Setup',
        technical: [
          '3 × Pioneer CDJ-2000NXS2 (or newer)',
          'Pioneer DJM-900NXS2 (or equivalent)',
          'Professional booth monitors',
          'Professional venue sound system',
        ],
        hospitalityLabel: 'Hospitality',
        hospitality: ['Water', 'Beer', 'Accommodation and travel expenses when applicable'],
      },
    },
    booking: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      venue: 'Venue',
      venuePlaceholder: 'Club, city or agency',
      date: 'Date',
      datePlaceholder: 'DD / MM / YYYY',
      message: 'Message',
      messagePlaceholder: 'Tell us about the room, the audience and the moment of the night.',
      submit: 'Send booking request',
      sending: 'Sending',
      sent: 'Message sent',
      errorFallback: 'Could not send. Please try again.',
    },
  },
  es: {
    philosophy: {
      lines: [
        'Cada set, investigado y elegido desde cero.',
        'Construido para ir de la tensión a la liberación.',
        'Nada agresivo. Nada estridente.',
        'Se confía en que la sala siga.',
      ],
    },
    about: {
      lines: [
        'DJ y productor de Buenos Aires.',
        'Progresivo, profundo, hipnótico — nunca agresivo.',
        'Tensión que crece lento, con aire para respirar.',
        'Música nueva elegida antes de cada noche.',
        'No una playlist. Un viaje guiado.',
      ],
      influences: 'Influencias',
    },
    live: {
      body: 'NOV se ha presentado en Buenos Aires y la costa argentina, compartiendo cabina con artistas que dieron forma al lenguaje electrónico progresivo y profundo de la región.',
    },
    radio: {
      body: 'El presskit está construido sobre el mismo principio que el set: menos señales, atención más profunda.',
    },
    pressKit: {
      facts: [
        ['Origen', 'Buenos Aires, Argentina'],
        ['Sonido', 'Progressive House, Deep House, Organic House, Hypnotic Groove'],
        ['Filosofía de set', 'Música nueva seleccionada antes de cada presentación'],
        ['Booking', 'Clubes, listening rooms, fechas privadas y de costa'],
      ] as [string, string][],
      downloadsMeta: {
        portraits: 'Fotos de prensa de estudio en alta resolución',
        liveStill: 'Fotografía oscura de cabina para flyers y uso editorial',
        artistMark: 'Imagen de escenario NOV y referencia de identidad',
      },
      download: 'Descargar',
      rider: {
        technicalLabel: 'Requerimientos Técnicos — Set Mínimo',
        technical: [
          '3 × Pioneer CDJ-2000NXS2 (o más nuevo)',
          'Pioneer DJM-900NXS2 (o equivalente)',
          'Monitores de cabina profesionales',
          'Sistema de sonido profesional del venue',
        ],
        hospitalityLabel: 'Hospitalidad',
        hospitality: ['Agua', 'Cerveza', 'Alojamiento y viáticos cuando corresponda'],
      },
    },
    booking: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'vos@ejemplo.com',
      venue: 'Lugar',
      venuePlaceholder: 'Club, ciudad o agencia',
      date: 'Fecha',
      datePlaceholder: 'DD / MM / AAAA',
      message: 'Mensaje',
      messagePlaceholder: 'Contanos sobre la sala, el público y el momento de la noche.',
      submit: 'Enviar solicitud de booking',
      sending: 'Enviando',
      sent: 'Mensaje enviado',
      errorFallback: 'No se pudo enviar. Probá de nuevo.',
    },
  },
};

export type Dictionary = (typeof dictionaries)['en'];

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: dictionaries.en,
});

const STORAGE_KEY = 'nov-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
