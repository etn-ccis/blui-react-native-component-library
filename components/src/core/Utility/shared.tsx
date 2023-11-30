import { MD3Theme } from 'react-native-paper';

export const getPrimary500 = (theme: MD3Theme): string | undefined => theme.colors.primary;

export const calculateHeight = (fontSize: number): number => Math.ceil((fontSize * 1.25) / 4) * 4;
