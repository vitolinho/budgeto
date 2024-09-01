import { defineConfig } from 'eslint-define-config'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        browser: true,
        node: true
      }
    },
    plugins: {
      vue: eslintPluginVue,
      tailwindcss: eslintPluginTailwindcss
    },
    rules: {
      // ESLint recommended rules
      ...eslintPluginVue.configs['vue3-recommended'].rules,
      ...eslintPluginTailwindcss.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      // Custom rules
      'no-unused-vars': ['error'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-var': 'error',
      'no-console': 'error',
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      eqeqeq: ['error', 'always'],
      'no-trailing-spaces': 'error',
      indent: ['error', 2],
      'no-empty': 'error',
      'space-in-parens': ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-multi-spaces': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      'array-bracket-spacing': ['error', 'never']
    }
  }
])
