import { MD3Theme } from 'react-native-paper';
import { useFontWeight } from '@brightlayer-ui/react-native-themes';

export const getPrimary500 = (theme: MD3Theme): string | undefined => theme.colors.primary;

export const calculateHeight = (fontSize: number): number => Math.ceil((fontSize * 1.25) / 4) * 4;

export const fontStyleLight = useFontWeight('300');
export const fontStyleRegular = useFontWeight('400');
export const fontStyleSemiBold = useFontWeight('600');
export const fontStyleBold = useFontWeight('700');
export const fontStyleExtraBold = useFontWeight('800');
