import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  site: 'https://next.vim.kr',
  integrations: [
    starlight({
      title: 'Vim Korea',
      social: {
        discord: 'https://discord.com/widget?id=1071395189219938354&theme=dark',
        github: 'https://github.com/vim-kr/renewal',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', link: '/guides/example/' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
})
