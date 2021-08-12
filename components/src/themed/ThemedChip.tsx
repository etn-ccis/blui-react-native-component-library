import React from 'react';
import { Chip, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';
import * as PXBColors from '@pxblue/colors';
import Color from 'color';

export type ThemedChipProps = React.ComponentProps<typeof Chip>;

const getBackgroundColor: (props: ThemedChipProps, theme: ReactNativePaper.Theme) => string = (props, theme) => {
    // Filled Style
    if (props.mode === undefined || props.mode === 'flat') {
        if (props.disabled) return theme.dark ? Color(PXBColors.black[200]).alpha(0.24).string() : PXBColors.white[500];
        else if (props.selected) {
            return theme.colors.primaryPalette[theme.dark ? 'dark' : 'main'];
        }
        return theme.dark ? PXBColors.black[500] : PXBColors.white[500];
    }
    // Outlined Style
    else if (props.disabled) return theme.dark ? 'transparent' : PXBColors.white[50];
    else if (props.selected) {
        return theme.dark
            ? Color(theme.colors.primaryPalette.dark).alpha(0.2).string()
            : Color(theme.colors.primaryPalette.main).alpha(0.05).string();
    }
    return theme.dark ? theme.colors.surface : PXBColors.white[50];
};

const getTextColor: (props: ThemedChipProps, theme: ReactNativePaper.Theme) => string = (props, theme) => {
    // Filled Style
    if (props.mode === undefined || props.mode === 'flat') {
        if (props.disabled)
            return theme.dark ? PXBColors.black[400] : Color(theme.colors.textPalette.primary).alpha(0.3).string();
        else if (props.selected) {
            return theme.colors.textPalette.onPrimary[theme.dark ? 'dark' : 'main'];
        }
        return theme.colors.textPalette.primary;
    }
    // Outlined Style
    else if (props.disabled) return theme.dark ? PXBColors.black[400] : theme.colors.actionPalette.disabled;
    return props.selected ? theme.colors.primaryPalette.main : theme.colors.textPalette.primary;
};

const getBorderColor: (props: ThemedChipProps, theme: ReactNativePaper.Theme) => string = (props, theme) => {
    // Filled Style
    if (props.mode === undefined || props.mode === 'flat') return 'transparent';
    // Outlined Style
    else if (props.disabled)
        return theme.dark
            ? Color(PXBColors.black[200]).alpha(0.36).string()
            : Color(PXBColors.black[500]).alpha(0.12).string();
    else if (props.selected) return theme.colors.primaryPalette.main;
    return theme.dark
        ? Color(PXBColors.black[200]).alpha(0.32).string()
        : Color(PXBColors.black[500]).alpha(0.12).string();
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
