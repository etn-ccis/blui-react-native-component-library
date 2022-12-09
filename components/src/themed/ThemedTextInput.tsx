import React, { MutableRefObject } from 'react';
import { TextInput as ReactTextInput } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { useFontScale } from '..';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedTextInputProps = React.ComponentProps<typeof TextInput>;

/**
 * ThemedTextInput component
 *
 * This component is a wrapper around the React Native Paper [TextInput](https://callstack.github.io/react-native-paper/text-input.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const ThemedTextInputRender: React.ForwardRefRenderFunction<{}, ThemedTextInputProps> = (
    props: ThemedTextInputProps,
    ref: MutableRefObject<{} | null> | ((instance: {} | null) => void) | null // eslint-disable-line @typescript-eslint/ban-types
) => {
    // Necessary to allow use of ref (to pass focus to next TextInput on submit)
    const inputRef = React.useRef<ReactTextInput>(null);
    React.useImperativeHandle(ref, () => ({
        focus: (): void => {
            if (inputRef && inputRef.current) inputRef.current.focus();
        },
    }));

    const { theme: themeOverride, style, ...other } = props;
    const fullTheme = useTheme(themeOverride);
    const { maxScale, disableScaling } = useFontScale();
    const backgroundColorLight = props.mode === 'outlined' ? fullTheme.colors.surface : fullTheme.colors.background;
    const backgroundColorDark =
        props.mode === 'outlined'
            ? fullTheme.colors.surface
            : fullTheme.colors.actionPalette?.background || fullTheme.colors.background;
    const backgroundColor = fullTheme.dark ? backgroundColorDark : backgroundColorLight;
    const theme = useAlternateTheme(
        themeOverride,
        {
            colors: {
                background: backgroundColorLight, // input background
                // disabled: fullTheme.colors.disabled, // disabled-label disabled-outline
                placeholder: fullTheme.colors.textPalette?.secondary || fullTheme.colors.text, // outline placeholder inactive-label
            },
        },
        {
            colors: {
                primary: fullTheme.colors.primaryPalette?.main || fullTheme.colors.primary,
                background: backgroundColorDark, // input background
                // error: fullTheme.colors.errorPalette.dark
            },
        }
    );

    return (
        <TextInput
            {...other}
            // @ts-ignore issue with refs on RNP input
            ref={inputRef}
            style={props.mode !== 'outlined' ? [{ backgroundColor }, style] : style}
            outlineColor={props.outlineColor || fullTheme.colors.divider}
            theme={theme}
            allowFontScaling={!disableScaling}
            maxFontSizeMultiplier={maxScale}
        />
    );
};
// Necessary to allow use of ref (to pass focus to next TextInput on submit)
export const ThemedTextInput = React.forwardRef(ThemedTextInputRender);
TextInput.displayName = 'ThemedTextInput';
