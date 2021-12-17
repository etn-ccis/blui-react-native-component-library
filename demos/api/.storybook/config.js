import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue as ReactThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import '@brightlayer-ui/react-themes/open-sans';
import { bluiTheme } from '@brightlayer-ui/storybook-themes';
import { CssBaseline } from '@material-ui/core';

bluiTheme.brandTitle = 'Brightlayer UI React Native Component Library';
bluiTheme.brandUrl = 'https://brightlayer-ui.github.io';
if (window.top.location.hostname === 'localhost') {
    bluiTheme.brandImage = require('../assets/brightlayer-ui-react-native-alpha.svg');
} else if (window.top.location.pathname.slice(0, 18) === '/react-native-dev/') {
    bluiTheme.brandImage = require('../assets/brightlayer-ui-react-native-beta.svg');
} else {
    bluiTheme.brandImage = require('../assets/brightlayer-ui-react-native.svg');
}

addParameters({
    /* Users will see this while the component is loading. */
    notes: {
        markdown: '<div> </div>',
    },
    options: {
        theme: bluiTheme,
        showRoots: true,
    },
});

export const appliedTheme = createMuiTheme(ReactThemes);

addDecorator((storyFn) => (
    <MuiThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <div className={'wrapper'} style={{ color: Colors.gray['800'] }}>
            {storyFn()}
        </div>
    </MuiThemeProvider>
));
