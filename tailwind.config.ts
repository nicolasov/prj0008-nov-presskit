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
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0908',
          2: '#100e0b',
        },
        card: {
          DEFAULT: '#161310',
          2: '#1c1813',
        },
        accent: {
          DEFAULT: '#E0463A',
          hover: '#F15B4C',
        },
        txt: '#F5F1EB',
      },
      screens: {
        nav: '880px',
      },
      animation: {
        'spin-slow': 'spin 16s linear infinite',
        marquee: 'marquee 26s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
