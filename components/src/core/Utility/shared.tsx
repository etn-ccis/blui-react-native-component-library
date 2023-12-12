import { MD3Theme, useTheme } from 'react-native-paper';
import { MD3Type, MD3Typescale } from 'react-native-paper/lib/typescript/types';

export const getPrimary500 = (theme: MD3Theme): string | undefined => theme.colors.primary;

export const calculateHeight = (fontSize: number): number => Math.ceil((fontSize * 1.25) / 4) * 4;

export type AppTheme = Omit<MD3Theme, 'colors' | 'fonts'> & {
    colors: {
        primary: string;
        onPrimary: string;
        primaryContainer: string;
        onPrimaryContainer: string;
        secondary: string;
        onSecondary: string;
        secondaryContainer: string;
        onSecondaryContainer: string;
        tertiary: string;
        onTertiary: string;
        tertiaryContainer: string;
        onTertiaryContainer: string;
        error: string;
        onError: string;
        errorContainer: string;
        onErrorContainer: string;
        background: string;
        onBackground: string;
        surface: string;
        onSurface: string;
        surfaceVariant: string;
        onSurfaceVariant: string;
        outline: string;
        outlineVariant: string;
        shadow: string;
        scrim: string;
        inverseSurface: string;
        inverseOnSurface: string;
        inversePrimary: string;
        elevation: {
            level0: 'transparent';
            level1: string;
            level2: string;
            level3: string;
            level4: string;
            level5: string;
        };
        // Custom color variants
        primaryNonText: string;
        errorNonText: string;
        disabled: string;
        warning: string;
        warningNonText: string;
        onWarning: string;
        warningContainer: string;
        onWarningContainer: string;
        success: string;
        successNonText: string;
        onSuccess: string;
        successContainer: string;
        onSuccessContainer: string;
        orange: string;
        orangeNonText: string;
        onOrange: string;
        orangeContainer: string;
        onOrangeContainer: string;
        purple: string;
        purpleNonText: string;
        onPurple: string;
        purpleContainer: string;
        onPurpleContainer: string;
        surfaceContainerLowest: string;
        surfaceContainerLow: string;
        surfaceContainer: string;
        surfaceContainerHigh: string;
        surfaceContainerHighest: string;
    };
    fonts: MD3Typescale & {
        customVariant: MD3Type;
    };
};

export const useAppTheme = (): AppTheme => useTheme<AppTheme>();
