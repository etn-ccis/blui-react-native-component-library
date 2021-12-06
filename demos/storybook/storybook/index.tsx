import React from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import { Provider as ThemeProvider } from 'react-native-paper';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import './rn-addons';

// import stories
configure(() => {
    require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

const ThemedStorybook = (): JSX.Element => (
    <ThemeProvider theme={BLUIThemes.blue}>
        <StorybookUIRoot />
    </ThemeProvider>
);

export default ThemedStorybook;
