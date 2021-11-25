module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['@brightlayer-ui/eslint-config/tsx'],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    jest: true
  },
  // Uncomment these if you want to run the hook checks
  // plugins: [
  //   'react-hooks'
  // ],
  // rules: {
  //   'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
  //   'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  // }
};