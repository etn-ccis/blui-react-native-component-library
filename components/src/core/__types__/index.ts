import { Theme } from 'react-native-paper';

export type WithTheme<T> = T & {
    theme: Theme;
};
