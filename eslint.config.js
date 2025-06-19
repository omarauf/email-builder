// eslint.config.js
import { defineConfig } from 'eslint/config';
import myconfig from './eslint.config.mjs';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [myconfig],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import-x/prefer-default-export': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
]);
