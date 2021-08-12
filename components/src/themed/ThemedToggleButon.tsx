import React from 'react';
import { ToggleButton, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedToggleButtonProps = React.ComponentProps<typeof ToggleButton>;

/**
 * ThemedToggleButton component
 *
 * This component is a wrapper around the React Native Paper [ToggleButton](https://callstack.github.io/react-native-paper/toggle-button.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedToggleButton: React.FC<ThemedToggleButtonProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const fullTheme = useTheme(themeOverride);
    const theme = useAlternateTheme(
        themeOverride,
        { colors: { notification: fullTheme.colors.primaryPalette.main } },
        { colors: { notification: fullTheme.colors.primaryPalette.dark } }
    );

    return <ToggleButton {...other} theme={theme} />;
};
