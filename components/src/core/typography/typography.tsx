import React from 'react';
import { Text, TextProps, TextStyle, StyleProp, I18nManager, Platform } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';

type TypographyProps = {
    /**
     * Key to use for font size.
     */
    fontSize?: number;

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
    theme?: $DeepPartial<Theme>;
} & TextProps;

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
        customStyle.fontSize = fontSize;
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
                { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'},
                Platform.OS === 'android' ? { textAlign: 'left' } : {},
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
    letterSpacing: 0,
}));
export const H2 = createTypography((theme) => ({
    ...theme.fonts.light,
    fontSize: 60,
    letterSpacing: 0,
}));
export const H3 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 48,
    letterSpacing: 0,
}));
export const H4 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 34,
    letterSpacing: 0,
}));
export const H5 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 24,
    letterSpacing: 0,
}));
export const H6 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: 20,
    letterSpacing: 0,
}));
export const Body1 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 16,
    letterSpacing: 0,
}));
export const Body2 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 14,
    letterSpacing: 0,
}));
export const Label = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 16,
    letterSpacing: 0,
}));
export const Subtitle1 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: 16,
    letterSpacing: 0,
}));
export const Subtitle2 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: 14,
    letterSpacing: 0,
}));
export const Button = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 14,
    letterSpacing: 0,
}));
export const Caption = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 10,
    letterSpacing: 0,
}));
export const Overline = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 12,
    letterSpacing: 2,
}));
