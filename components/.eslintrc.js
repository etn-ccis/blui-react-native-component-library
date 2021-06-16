module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['@pxblue/eslint-config/tsx'],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    jest: true
  },
  plugins: [
    'react-hooks'
  ],
  rules: {
    // ...
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  }
};