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
        NProgress: 'readonly',
        URL: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        document: 'readonly',
        URLSearchParams: 'readonly',
        window: 'readonly',
        history: 'readonly',
        clearTimeout: 'readonly',
        navigator: 'readonly',
      },
    },

    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'warn',
      'no-console': 'warn',
      eqeqeq: 'error',
      curly: ['error', 'multi-line'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
