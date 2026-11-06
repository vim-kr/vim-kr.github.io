import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import prettier from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  prettier,
  { languageOptions: { globals: { ...globals.browser } } },
  // .astro 는 eslint 안의 prettier 가 <script> 를 망가뜨려 prettier 를 따로 돌린다
  {
    files: ['**/*.astro', '**/*.astro/*.js', '**/*.astro/*.ts'],
    rules: { 'prettier/prettier': 'off' },
  },
]
