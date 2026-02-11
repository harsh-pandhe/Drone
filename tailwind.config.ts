import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tech: {
          'bg-primary': '#0f172a',
          'bg-secondary': '#1e293b',
          'border': '#334155',
          'accent-cyan': '#06b6d4',
          'accent-orange': '#f97316',
          'text-main': '#f8fafc',
          'text-muted': '#94a3b8',
        },
      },
      fontFamily: {
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'hud-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)' },
        },
        'data-stream': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
      animation: {
        scanline: 'scanline 4s linear infinite',
        blink: 'blink 1s step-end infinite',
        'hud-spin': 'hud-spin 10s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'data-stream': 'data-stream 3s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
