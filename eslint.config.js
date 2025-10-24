import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react
    },
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs['recommended-latest'], reactRefresh.configs.vite],
    rules: {
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true
        }
      ]
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
]);
