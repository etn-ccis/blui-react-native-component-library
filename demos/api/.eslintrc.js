module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['@brightlayer-ui/eslint-config/tsx', 'plugin:storybook/recommended'],
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
    },
};
