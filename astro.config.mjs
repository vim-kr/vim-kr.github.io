import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://next.vim.kr',
  integrations: [
    starlight({
      title: 'vim.kr',
      social: {
        discord: 'https://discord.com/widget?id=1071395189219938354&theme=dark',
        github: 'https://github.com/vim-kr/renewal',
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
