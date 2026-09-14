export default [
  {
    files: ['**/*.js'],
    ignores: ['node_modules/**', 'dist/**', 'build/**'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        $: 'readonly',
        jQuery: 'readonly',
      },
    },

    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
      eqeqeq: 'error',
      curly: ['error', 'multi-line'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
