/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      backgroundImage: () => ({
        light: "url('/blurry-background-light.svg')",
        dark: "url('/blurry-background-dark.svg')",
      }),
      colors: {
        'custom-gray': 'var(--sl-color-gray-2)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(500px)' }, // image should be 200px wide
          '100%': { transform: 'translateX(-2000px)' }, // image list should be 9 * 200px wide
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
