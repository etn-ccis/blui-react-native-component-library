var path = require('path');

module.exports = {
    stories: ['../stories/welcome.stories.tsx', '../stories/*.stories.tsx'],
    addons: ['@storybook/addon-notes'],

    docs: {
        autodocs: true,
    },
};
