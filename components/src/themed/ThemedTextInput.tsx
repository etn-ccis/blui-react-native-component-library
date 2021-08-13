import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedTextInputProps = React.ComponentProps<typeof TextInput>;

/**
 * ThemedTextInput component
 *
 * This component is a wrapper around the React Native Paper [TextInput](https://callstack.github.io/react-native-paper/text-input.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedTextInput: React.FC<ThemedTextInputProps> = (props) => {
    const { theme: themeOverride, style, ...other } = props;
    const fullTheme = useTheme(themeOverride);

    const backgroundColorLight = props.mode === 'outlined' ? fullTheme.colors.surface : fullTheme.colors.background;
    const backgroundColorDark =
        props.mode === 'outlined' ? fullTheme.colors.surface : fullTheme.colors.actionPalette.background;
    const backgroundColor = fullTheme.dark ? backgroundColorDark : backgroundColorLight;
    const theme = useAlternateTheme(
        themeOverride,
        {
            colors: {
                background: backgroundColorLight, // input background
                // disabled: fullTheme.colors.disabled, // disabled-label disabled-outline
                placeholder: fullTheme.colors.textPalette.secondary, // outline placeholder inactive-label
            },
        },
        {
            colors: {
                primary: fullTheme.colors.primaryPalette.main,
                background: backgroundColorDark, // input background
                // error: fullTheme.colors.errorPalette.dark
            },
        }
    );

    return (
        <TextInput
            {...other}
            style={props.mode !== 'outlined' ? [{ backgroundColor }, style] : style}
            outlineColor={props.outlineColor || fullTheme.colors.divider}
            theme={theme}
        />
    );
};
