import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['var(--font-archivo)', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: {
          0: '#050505',
          1: '#0B0B0B',
          2: '#111111',
          3: '#191919',
        },
        line: '#1F1F1F',
        'line-strong': '#303030',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        red: {
          DEFAULT: 'rgb(var(--red-rgb) / <alpha-value>)',
          bright: '#E0523F',
        },
      },
      maxWidth: {
        container: '1320px',
      },
      screens: {
        nav: '880px',
      },
      transitionTimingFunction: {
        fade: 'linear',
      },
      transitionDuration: {
        hover: '500ms',
      },
    },
  },
  plugins: [],
};

export default config;
