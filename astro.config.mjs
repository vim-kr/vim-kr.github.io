import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://vim.kr',
  integrations: [
    starlight({
      favicon: '/favicon.ico',
      title: 'vim.kr',
      defaultLocale: 'root',
      locales: {
        root: { label: '한국어', lang: 'ko' },
        en: { label: 'English' },
        ja: { label: '日本語' },
      },
      customCss: [
        './src/styles/global.css',
      ],
      social: {
        discord: 'https://discord.gg/FCDhM2cw65',
        github: 'https://github.com/vim-kr/vim-kr.github.io',
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: {
            directory: 'getting-started',
          },
        },
        {
          label: 'Vim As IDE',
          autogenerate: {
            directory: 'vim-as-ide',
          },
        },
        {
          label: 'Note Taking',
          autogenerate: {
            directory: 'note-taking',
          },
        },
        {
          label: 'Neovim News',
          autogenerate: {
            directory: 'neovim-news',
          },
        },
      ],
    }),
    tailwind(),
    react(),
  ],
})
