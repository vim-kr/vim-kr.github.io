/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'space-to-ground': 'linear-gradient(to bottom, #1a1b26 0%, #24283b 50%, #16161e 100%)',
      },
      colors: {
        'custom-gray': 'var(--sl-color-gray-2)',
        'vim-dark': '#1a1b26',
        'vim-dark-secondary': '#24283b',
        'vim-dark-tertiary': '#16161e',
        'vim-blue': '#7aa2f7',
        'vim-purple': '#bb9af7',
        'vim-pink': '#f7768e',
        'vim-green': '#9ece6a',
        'vim-yellow': '#e0af68',
        'vim-cyan': '#7dcfff',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(500px)' }, // image should be 200px wide
          '100%': { transform: 'translateX(-2000px)' }, // image list should be 9 * 200px wide
        },
        'marquee-infinite': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-infinite': 'marquee-infinite 40s linear infinite',
      },
    },
  },
  plugins: [],
}
