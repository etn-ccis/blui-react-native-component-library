import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import * as PXBColors from '@pxblue/colors';
import Color from 'color';

export type ThemedButtonProps = React.ComponentProps<typeof Button>;

const useStyles = (): StyleSheet.NamedStyles<{
    outlined: ViewStyle;
}> =>
    StyleSheet.create({
        outlined: {
            borderWidth: 1,
        },
    });

/**
 * ThemedButton component
 *
 * This component is a wrapper around the React Native Paper [Button](https://callstack.github.io/react-native-paper/button.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedButton: React.FC<ThemedButtonProps> = (props) => {
    const { style, color, labelStyle: labelStyleProp, ...other } = props;
    const theme = useTheme(props.theme);
    const styles = useStyles();

    let textColor = '';
    let backgroundColor = '';
    let borderColor = '';

    if (props.disabled) {
        if (props.mode === 'text' || props.mode === undefined) {
            backgroundColor = 'transparent';
            textColor = theme.colors.actionPalette.disabled;
        } else if (props.mode === 'contained') {
            if (theme.dark) {
                backgroundColor = theme.colors.actionPalette.disabledBackground;
                textColor = theme.colors.textPalette.disabled;
            } else {
                backgroundColor = theme.colors.primaryPalette.light;
                textColor = PXBColors.blue[200]; // TODO: Make available in theme
            }
        } else if (props.mode === 'outlined') {
            if (theme.dark) {
                borderColor = theme.colors.divider;
                textColor = theme.colors.actionPalette.disabled;
            } else {
                borderColor = Color(PXBColors.black[500]).alpha(0.12).string(); // TODO: Make available in theme
                textColor = theme.colors.actionPalette.disabled;
            }
        }
    } else {
        if (props.mode === 'text' || props.mode === undefined) {
            backgroundColor = 'transparent';
            textColor = theme.colors.primaryPalette.main;
        } else if (props.mode === 'contained') {
            if (theme.dark) {
                backgroundColor = theme.colors.primaryPalette.dark;
                textColor = theme.colors.textPalette.onPrimary.dark;
            } else {
                backgroundColor = theme.colors.primaryPalette.main;
                textColor = theme.colors.textPalette.onPrimary.main;
            }
        } else if (props.mode === 'outlined') {
            borderColor = theme.colors.primaryPalette.main;
            textColor = theme.colors.primaryPalette.main;
        }
    }

    const buttonStyle = {
        backgroundColor: color && props.mode === 'contained' ? color : backgroundColor ?? undefined,
        borderColor: color && props.mode === 'outlined' ? color : borderColor ?? undefined,
    };
    const labelStyle = textColor
        ? {
              color: color && (props.mode === 'text' || props.mode === 'outlined') ? color : textColor ?? undefined,
          }
        : {};

    return (
        <Button
            {...other}
            style={[props.mode === 'outlined' && styles.outlined, buttonStyle, style]}
            labelStyle={[labelStyle, labelStyleProp]}
        />
    );
};
