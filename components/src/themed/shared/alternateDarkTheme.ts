import { $DeepPartial } from '@callstack/react-theme-provider';

export const alternateDarkTheme: (theme: ReactNativePaper.Theme) => $DeepPartial<ReactNativePaper.Theme> = (theme) => {
    return {
        colors: {
            primary: theme.colors.primaryPalette.dark,
            accent: theme.colors.accentPalette.dark,
            background: theme.colors.surface,
            notification: theme.colors.accentPalette.dark, // TODO: Add notification palette with dark variation
        }
    }
}