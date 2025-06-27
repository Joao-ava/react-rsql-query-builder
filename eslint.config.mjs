import globals from 'globals'
import jsLint from '@eslint/js'
import tsLint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import storybook from 'eslint-plugin-storybook'

/** @type {import('eslint').Linter.Config} */
export default [
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module'
      },
      globals: globals.browser
    }
  },
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-children-prop': 'off',
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'arrow-body-style': ["error", "as-needed"],
      'prefer-arrow-callback': ['error'],
      'no-duplicate-imports': ['error', { includeExports: true }],
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'parent',
            'internal'
          ]
        }
      ]
    },
    settings: {
      'import/resolver': {
        'typescript': {}
      }
    }
  },
  ...storybook.configs['flat/recommended'],
  eslintConfigPrettier
]
