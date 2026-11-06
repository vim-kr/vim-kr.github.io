import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://vim.kr',
  // Astro 7 기본(jsx) 공백 처리는 줄바꿈 사이 공백을 지워 문구가 붙는다. 예전 방식 유지
  compressHTML: true,
})
