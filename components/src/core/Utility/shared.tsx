import { MD3Theme } from 'react-native-paper';
import { blue, blueDark } from '@brightlayer-ui/react-native-themes';

export const getPrimary500 = (theme: MD3Theme): string | undefined => theme.colors.primary;

export const calculateHeight = (fontSize: number): number => Math.ceil((fontSize * 1.25) / 4) * 4;

export const getThemeColors = (themeVariant: boolean): typeof appTheme => {
  const appTheme = themeVariant ? { ...blueDark, colors: blueDark.colors }: { ...blue, colors: blue.colors };
  return appTheme;
}
export type BluiColors = typeof blue.colors;