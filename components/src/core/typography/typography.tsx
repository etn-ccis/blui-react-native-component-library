import React, { ComponentType } from 'react';
import { Text, TextProps, TextStyle, StyleProp } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';
import { Sizes, SIZES } from '../sizes';

type TypographyProps = {
    /**
     * Key to use for font size.
     */
    fontSize?: keyof Sizes;

    /**
     * Font to use
     */
    font?: keyof Theme['fonts'];

    /**
     * Font to use
     */
    color?: keyof Theme['colors'];

    /**
     * Overrides for theme
     */
    theme?: Theme;
} & TextProps;

type Typography = ComponentType<TypographyProps>;

/*
 * createTypography is a component-generator function. It takes one argument.
 *     getStyle: a function that takes in a theme and returns a text style object
 * createTypography returns a theme-wrapped text component that utilizes that styles and theme that are provided
 */
const createTypography = (getStyle: (theme: Theme) => StyleProp<TextStyle>): React.FC<TypographyProps> => ({
    font,
    fontSize,
    color,
    style,
    ...props
}): JSX.Element => {
    const theme = useTheme(props.theme);

    let customStyle: StyleProp<TextStyle> = {};
    if (fontSize) {
        customStyle.fontSize = SIZES[fontSize];
    }
    if (font) {
        customStyle = {
            ...customStyle,
            ...theme.fonts[font],
        };
    }
    return (
        <Text
            {...props}
            style={[{ color: color ? theme.colors[color] : theme.colors.text }, getStyle(theme), customStyle, style]}
        />
    );
};

/**
 * Typography Components
 */
export const H1 = createTypography((theme) => ({
    ...theme.fonts.light,
    fontSize: 96,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 112.032,
}));
export const H2 = createTypography((theme) => ({
    ...theme.fonts.light,
    fontSize: 60,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 72,
}));
export const H3 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 48,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 56.016,
}));
export const H4 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.giant,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 41.99,
}));
export const H5 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.extraLarge,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 32.016,
}));
export const H6 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: SIZES.large,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 32,
}));
export const Body1 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.medium,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 24,
}));
export const Body2 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.small,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 20.02,
}));
export const Label = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.medium,
    letterSpacing: 0,
}));
export const Subtitle1 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: SIZES.medium,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 28,
}));
export const Subtitle2 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: SIZES.small,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 21.98,
}));
export const Button = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.small,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 24.5,
}));
export const Caption = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.tiny,
    letterSpacing: 0,
    marginBottom: 8,
    lineHeight: 16.6,
}));
export const Overline = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.extraSmall,
    letterSpacing: 2,
    marginBottom: 8,
    lineHeight: 31.92,
}));
