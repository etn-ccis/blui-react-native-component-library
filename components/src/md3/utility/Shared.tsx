import { MD3Theme } from 'react-native-paper';

export const getPrimary500 = (theme: MD3Theme): string | undefined =>
    theme.dark ? theme.colors.primary : theme.colors.primary;
