import { MD3Theme, useTheme } from 'react-native-paper';
import { blue, blueDark } from '@brightlayer-ui/react-native-themes';

export const getPrimary500 = (theme: MD3Theme): string | undefined => theme.colors.primary;

export const calculateHeight = (fontSize: number): number => Math.ceil((fontSize * 1.25) / 4) * 4;

const theme = useTheme();
const appTheme =
    theme.dark
      ? { ...blue, colors: blue.colors }
      : { ...blueDark, colors: blueDark.colors };

export type AppTheme = typeof appTheme;
export const useAppTheme = () => useTheme<AppTheme>();