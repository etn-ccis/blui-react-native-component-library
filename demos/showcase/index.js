/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import {MainRouter} from "./router";

AppRegistry.registerComponent(appName, () => MainRouter);
