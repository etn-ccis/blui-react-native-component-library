export const getPrimary500 = (theme: ReactNativePaper.Theme): string | undefined =>
    theme.dark ? theme.colors.primaryPalette?.dark : theme.colors.primaryPalette?.main;

export const MAX_FONT_SCALE = 1.3;
