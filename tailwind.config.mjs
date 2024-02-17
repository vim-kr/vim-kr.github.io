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
    },
  },
  plugins: [],
}
