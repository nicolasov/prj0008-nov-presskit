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
      body: 'Every set is researched and selected fresh, built to move slowly from tension into release. Nothing is aggressive. Nothing is loud. The room is trusted to follow, one careful transition at a time.',
    },
    about: {
      p1: 'NOV is a DJ and producer from Buenos Aires, shaped by progressive house, deep house, hypnotic groove and emotional storytelling. His sets avoid aggression; they build tension slowly, with an organic sense of evolution.',
      p2: 'Before every performance he carefully selects new music, keeping each night fresh and specific to the room. The result is less a playlist and more a guided atmospheric journey.',
      influences: 'Influences',
    },
    live: {
      body: 'NOV has performed across Buenos Aires and the Argentine coast, sharing the booth with artists who shaped the progressive and deep electronic language of the region.',
    },
    videos: {
      body: 'The presskit is built around the same principle as the set: fewer signals, deeper attention.',
    },
    pressKit: {
      facts: [
        ['Origin', 'Buenos Aires, Argentina'],
        ['Sound', 'Progressive House, Deep House, Organic House, Hypnotic Groove'],
        ['Set Philosophy', 'Fresh music selected before every performance'],
        ['Booking', 'Clubs, listening rooms, private and coastal dates'],
        ['Technical Rider', 'Minimum 3× Pioneer CDJ-2000NXS2 · DJM-900NXS2 · booth monitors + sub-low'],
        ['Logistics', 'Travel expenses and accommodation covered by the promoter'],
      ] as [string, string][],
      downloadsMeta: {
        portraits: 'High-resolution studio press photos',
        liveStill: 'Dark booth photography for flyers and editorial use',
        artistMark: 'NOV stage image and identity reference',
      },
      download: 'Download',
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
      body: 'Cada set se investiga y selecciona desde cero, construido para moverse lentamente de la tensión a la liberación. Nada es agresivo. Nada es estridente. Se confía en que la sala siga el viaje, una transición cuidadosa a la vez.',
    },
    about: {
      p1: 'NOV es un DJ y productor de Buenos Aires, formado por el progressive house, el deep house, el groove hipnótico y la narrativa emocional. Sus sets evitan la agresión; construyen tensión lentamente, con un sentido orgánico de evolución.',
      p2: 'Antes de cada presentación selecciona cuidadosamente música nueva, manteniendo cada noche fresca y específica para la sala. El resultado es menos una playlist y más un viaje atmosférico guiado.',
      influences: 'Influencias',
    },
    live: {
      body: 'NOV se ha presentado en Buenos Aires y la costa argentina, compartiendo cabina con artistas que dieron forma al lenguaje electrónico progresivo y profundo de la región.',
    },
    videos: {
      body: 'El presskit está construido sobre el mismo principio que el set: menos señales, atención más profunda.',
    },
    pressKit: {
      facts: [
        ['Origen', 'Buenos Aires, Argentina'],
        ['Sonido', 'Progressive House, Deep House, Organic House, Hypnotic Groove'],
        ['Filosofía de set', 'Música nueva seleccionada antes de cada presentación'],
        ['Booking', 'Clubes, listening rooms, fechas privadas y de costa'],
        ['Rider técnico', 'Mínimo 3× Pioneer CDJ-2000NXS2 · DJM-900NXS2 · monitores de cabina + sub-low'],
        ['Logística', 'Viáticos y alojamiento a cargo del organizador'],
      ] as [string, string][],
      downloadsMeta: {
        portraits: 'Fotos de prensa de estudio en alta resolución',
        liveStill: 'Fotografía oscura de cabina para flyers y uso editorial',
        artistMark: 'Imagen de escenario NOV y referencia de identidad',
      },
      download: 'Descargar',
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
