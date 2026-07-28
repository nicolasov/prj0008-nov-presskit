export const LINKS = {
  defaultDestination: 'instagram',

  instagram: 'https://instagram.com/NOVNOVNOVNOVNOVNOVNOV',

  website: '/',
  press: '/press',
  music: '/music',
  booking: '/booking',
  media: '/media',
  about: '/about',
  contact: '/contact',

  spotify: '',
  soundcloud: 'https://soundcloud.com/novnovnovnovnovnovnov',
  youtube: 'https://youtube.com/@novnovnovnovnovnovnov',
  beatport: '',
  residentAdvisor: '',
  whatsapp: 'https://wa.me/5491132102111',
  bookingEmail: 'booking@nov.dj',
} as const;

export type LinkKey = Exclude<keyof typeof LINKS, 'defaultDestination'>;
export type LinkDestination = (typeof LINKS)[keyof typeof LINKS];
