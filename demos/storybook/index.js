/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './storybook';
import { name as appName } from './app.json';

LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
