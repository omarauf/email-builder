// eslint.config.js
import { defineConfig } from 'eslint/config';

import perfectionist from 'eslint-plugin-perfectionist';
import myconfig from './eslint.config.mjs';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [myconfig],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import-x/prefer-default-export': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'react/require-default-props': 'off',
      'no-param-reassign': 'off',
      'no-console': ['error', { allow: ['error'] }],
      'react/no-array-index-key': 'off',
      'react/jsx-curly-brace-presence': 'error',
      'no-nested-ternary': 'off',

      'jsx-a11y/control-has-associated-label': [
        2,
        {
          labelAttributes: ['label'],
          controlComponents: ['CustomComponent'],
          ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video', 'td'],
          ignoreRoles: [
            'grid',
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'row',
            'tablist',
            'toolbar',
            'tree',
            'treegrid',
          ],
          depth: 3,
        },
      ],
    },
  },

  //  Perfectionist rules
  {
    plugins: {
      perfectionist,
    },
    rules: {
      // 'perfectionist/sort-imports': 'error',
      'perfectionist/sort-imports': [
        1,
        { type: 'line-length', order: 'asc', newlinesBetween: 'ignore' },
      ],
      'perfectionist/sort-exports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-imports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-exports': [1, { order: 'asc', type: 'line-length' }],
    },
  },
]);
