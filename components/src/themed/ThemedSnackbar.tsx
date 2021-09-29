import React from 'react';
import { Provider, Snackbar, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedSnackbarProps = React.ComponentProps<typeof Snackbar>;

/**
 * ThemedSnackbar component
 *
 * This component is a wrapper around the React Native Paper [Snackbar](https://callstack.github.io/react-native-paper/snackbar.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedSnackbar: React.FC<ThemedSnackbarProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const currentTheme = useTheme(themeOverride);
    const theme = useAlternateTheme(
        themeOverride,
        { colors: { accent: currentTheme.colors.overrides.snackbar?.accent } },
        { colors: { accent: currentTheme.colors.primaryPalette.dark } }
    );

    const fullTheme = useTheme(theme);

    return (
        <Provider theme={fullTheme}>
            <Snackbar {...other} theme={theme} />
        </Provider>
    );
};
