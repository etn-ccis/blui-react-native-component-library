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

    /** Style Overrides */
    styles?: {
        root?: StyleProp<TextStyle>;
    };

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
    styles = {},
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
            style={[
                { color: color ? theme.colors[color] : theme.colors.text },
                getStyle(theme),
                customStyle,
                styles.root,
                style,
            ]}
        />
    );
};

/**
 * Typography Components
 */
export const H1 = createTypography((theme) => ({
    ...theme.fonts.light,
    fontSize: 96,
}));
export const H2 = createTypography((theme) => ({
    ...theme.fonts.light,
    fontSize: 60,
}));
export const H3 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 48,
}));
export const H4 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.giant,
}));
export const H5 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.extraLarge,
}));
export const H6 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: SIZES.large,
    letterSpacing: 0,
}));
export const H7 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: 18,
}));
export const Body = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.medium,
}));
export const Label = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.medium,
    letterSpacing: 0,
}));
export const Subtitle = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: SIZES.small,
}));
export const Caption = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: SIZES.tiny,
}));
