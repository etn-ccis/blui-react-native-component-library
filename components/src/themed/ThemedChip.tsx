import React from 'react';
import { Chip, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';
import * as PXBColors from '@pxblue/colors';
import Color from 'color';

export type ThemedChipProps = React.ComponentProps<typeof Chip>;

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

    const backgroundColor =
        // FLAT style
        props.mode === 'flat' || props.mode === undefined ?
            (props.disabled ? (fullTheme.dark ? Color(PXBColors.black[200]).alpha(0.24).string() : PXBColors.white[500]) : // TODO: get from theme
                (props.selected ?
                    (fullTheme.colors.primaryPalette[fullTheme.dark ? 'dark' : 'main']) :
                    (fullTheme.dark ? PXBColors.black[500] : PXBColors.white[500]))) :// TODO: get from theme
            // OUTLINED style
            (props.disabled ? (fullTheme.dark ? 'transparent' : PXBColors.white[50]) :
                (props.selected ?
                    (fullTheme.dark ? Color(fullTheme.colors.primaryPalette.dark).alpha(0.2).string() : Color(fullTheme.colors.primaryPalette.main).alpha(0.05).string()) : // TODO
                    (fullTheme.dark ? fullTheme.colors.surface : PXBColors.white[50])
                ));

    const textColor =
        // FLAT style
        props.mode === 'flat' || props.mode === undefined ?
            (props.disabled ? (fullTheme.dark ? PXBColors.black[400] : Color(fullTheme.colors.textPalette.primary).alpha(0.3).string()) : // TODO: get from theme
                (props.selected ? fullTheme.colors.textPalette.onPrimary[fullTheme.dark ? 'dark' : 'main'] : fullTheme.colors.textPalette.primary)) :// TODO: get from theme
            // OUTLINED style
            (props.disabled ? (fullTheme.dark ? PXBColors.black[400] : fullTheme.colors.actionPalette.disabled) : (props.selected ? fullTheme.colors.primaryPalette.main : fullTheme.colors.textPalette.primary));

    const borderColor =
        // FLAT style
        props.mode === 'flat' || props.mode === undefined ?
            'transparent' :
            // OUTLINED style
            (props.disabled ? (fullTheme.dark ? Color(PXBColors.black[200]).alpha(0.36).string() : Color(PXBColors.black[500]).alpha(0.12).string()) :
                (props.selected ? fullTheme.colors.primaryPalette.main : (fullTheme.dark ? Color(PXBColors.black[200]).alpha(0.32).string() : Color(PXBColors.black[500]).alpha(0.12).string())));

    const borderWidth = props.mode === 'flat' || props.mode === undefined ? 0 : 1;

    /* Unfortunately we cannot fully override the color of the icons for chips. RNP has hardcoded an opacity on the icon
    that cannot be overridden with any styles or props. */


    const finalStyle = Object.assign({ backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: borderWidth }, style);

    return <Chip {...other} style={finalStyle} textStyle={{ color: textColor }} selectedColor={selectedColor || textColor} theme={theme} />;
};
