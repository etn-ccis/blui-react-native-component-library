/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { MainRouter } from './router';
import { Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { blue } from '@pxblue/react-native-themes';

const wrapper = (): JSX.Element => (
    <PaperProvider theme={blue}>
        <MainRouter />
    </PaperProvider>
);

AppRegistry.registerComponent(appName, () => wrapper);
