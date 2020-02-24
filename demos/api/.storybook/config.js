import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ReactThemes } from '@pxblue/themes';
import * as Colors from '@pxblue/colors';
import 'typeface-open-sans';
import './styles.css';
import { pxblueTheme } from '@pxblue/storybook-themes';

const newViewports = {
    iPhone5: {
        name: 'iPhone 5',
        styles: {
            width: '320px',
            height: '568px',
        },
    },
    iPhone6: {
        name: 'iPhone 6',
        styles: {
            width: '375px',
            height: '667px',
        },
    },
    iPad: {
        name: 'iPad',
        styles: {
            width: '768px',
            height: '1024px',
        },
    },
};

pxblueTheme.brandTitle = 'PX Blue React Component Library';
pxblueTheme.brandImage = require('../assets/pxblue.svg');
pxblueTheme.brandUrl = 'https://pxblue.github.io';

addParameters({
    /* Users will see this while the component is loading. */
    notes: {
        markdown: '<div> </div>',
    },
    viewport: {
        viewports: newViewports,
    },
    options: {
        theme: pxblueTheme,
        showRoots: true,
    },
});

addDecorator((storyFn) => (
    <MuiThemeProvider theme={createMuiTheme(ReactThemes.blue)}>
        <div className={'wrapper'} style={{ color: Colors.gray['800'] }}>
            {storyFn()}
        </div>
    </MuiThemeProvider>
));

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.(js|tsx)$/), module);
