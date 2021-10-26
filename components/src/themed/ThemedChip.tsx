import React from 'react';
import { Chip, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';
import Color from 'color';

export type ThemedChipProps = React.ComponentProps<typeof Chip>;

const getBackgroundColor: (props: ThemedChipProps, theme: ReactNativePaper.Theme) => string = (props, theme) => {
    // Filled Style
    if (props.mode === undefined || props.mode === 'flat') {
        if (props.disabled) return theme.colors.actionPalette?.disabledBackground || theme.colors.disabled;
        else if (props.selected) {
            return (
                (theme.dark ? theme.colors.primaryPalette?.dark : theme.colors.primaryPalette?.main) ||
                theme.colors.primary
            );
        }
        return (
            (theme.dark ? theme.colors.actionPalette?.active : theme.colors.actionPalette?.background) ||
            theme.colors.background
        );
    }
    // Outlined Style
    else if (props.disabled) return 'transparent';
    else if (props.selected) {
        return theme.dark
            ? Color(theme.colors.primaryPalette?.dark || theme.colors.primary)
                  .alpha(0.2)
                  .string()
            : Color(theme.colors.primaryPalette?.main || theme.colors.primary)
                  .alpha(0.05)
                  .string();
    }
    return 'transparent';
};

const getTextColor: (props: ThemedChipProps, theme: ReactNativePaper.Theme) => string = (props, theme) => {
    // Filled Style
    if (props.mode === undefined || props.mode === 'flat') {
        if (props.disabled)
            return theme.dark
                ? theme.colors.textPalette?.disabled || theme.colors.disabled
                : Color(theme.colors.textPalette?.primary || theme.colors.text)
                      .alpha(0.3)
                      .string();
        else if (props.selected) {
            return (
                (theme.dark ? theme.colors.textPalette?.onPrimary?.dark : theme.colors.textPalette?.onPrimary?.main) ||
                theme.colors.text
            );
        }
        return theme.colors.textPalette?.primary || theme.colors.text;
    }
    // Outlined Style
    else if (props.disabled)
        return (
            (theme.dark ? theme.colors.textPalette?.disabled : theme.colors.actionPalette?.disabled) ||
            theme.colors.disabled
        );
    return props.selected
        ? theme.colors.primaryPalette?.main || theme.colors.primary
        : theme.colors.textPalette?.primary || theme.colors.text;
};

const getBorderColor: (props: ThemedChipProps, theme: ReactNativePaper.Theme) => string = (props, theme) => {
    // Filled Style
    if (props.mode === undefined || props.mode === 'flat') return 'transparent';
    // Outlined Style
    else if (props.disabled) return theme.colors.divider;
    else if (props.selected) return theme.colors.primaryPalette?.main || theme.colors.primary;
    return theme.colors.divider;
};

/**
 * ThemedChip component
 *
 * This component is a wrapper around the React Native Paper [Chip](https://callstack.github.io/react-native-paper/chip.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedChip: React.FC<ThemedChipProps> = (props) => {
    const { theme: themeOverride, style, selectedColor, ...other } = props;
    const theme = useAlternateTheme(themeOverride);
    const fullTheme = useTheme(theme);

    const backgroundColor = getBackgroundColor(props, fullTheme);
    const textColor = getTextColor(props, fullTheme);
    const borderColor = getBorderColor(props, fullTheme);
    const borderWidth = props.mode === 'flat' || props.mode === undefined ? 0 : 1;
    /* Unfortunately we cannot fully override the color of the icons for chips. RNP has hardcoded an opacity on the icon
    that cannot be overridden with any styles or props. */

    const finalStyle = Object.assign(
        { backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: borderWidth },
        style
    );

    return (
        <Chip
            {...other}
            style={finalStyle}
            textStyle={{ color: textColor }}
            selectedColor={selectedColor || textColor}
            theme={theme}
        />
    );
};
