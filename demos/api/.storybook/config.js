import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ReactThemes } from '@pxblue/themes';
import * as Colors from '@pxblue/colors';
import 'typeface-open-sans';
import { pxblueTheme } from '@pxblue/storybook-themes';

pxblueTheme.brandTitle = 'PX Blue React Native Component Library';
pxblueTheme.brandImage = require('../assets/pxblue.svg');
pxblueTheme.brandUrl = 'https://pxblue.github.io';

addParameters({
    /* Users will see this while the component is loading. */
    notes: {
        markdown: '<div> </div>',
    },
    options: {
        theme: pxblueTheme,
        showRoots: true,
    },
});

export const appliedTheme = createMuiTheme(ReactThemes.blue);

addDecorator((storyFn) => (
    <MuiThemeProvider theme={appliedTheme}>
        <div className={'wrapper'} style={{ color: Colors.gray['800'] }}>
            {storyFn()}
        </div>
    </MuiThemeProvider>
));
