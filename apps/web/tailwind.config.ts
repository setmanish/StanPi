import type { Config } from 'tailwindcss';

// Tailwind scans these files to generate utility classes and includes shadcn/ui defaults
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './styles/**/*.{css}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
