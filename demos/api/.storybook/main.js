var path = require('path');

module.exports = {
    stories: ['../stories/welcome.stories.tsx', '../stories/*.stories.tsx'],

    addons: [
        '@storybook/addon-notes',
        '@storybook/preset-create-react-app',
    ],

    docs: {
        autodocs: true
    },

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    }
};
