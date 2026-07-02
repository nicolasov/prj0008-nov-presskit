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
          DEFAULT: '#020202',
          2: '#070707',
        },
        card: {
          DEFAULT: '#101010',
          2: '#161616',
        },
        accent: {
          DEFAULT: '#C9C4BA',
          hover: '#EEEAE2',
        },
        txt: '#F4F1EB',
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
