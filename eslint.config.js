import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/**/*', '!@/features/*/index.ts'],
              message: 'Cross-feature imports restricted.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/game/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '!@/features/prompt/',
                '!@/features/timer/',
                '!@/features/prompt/**',
                '!@/features/timer/**',
              ],
              message: 'Cross-feature imports restricted, except for prompt and timer.',
            },
          ],
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
])
