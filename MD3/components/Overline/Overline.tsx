import React from 'react';
import { TextStyle, TextProps, StyleProp, StyleSheet } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import Color from 'color';
import { white, black } from '@brightlayer-ui/colors';

export type TypographyProps = {
    /**
     * The font size to use
     */
    fontSize?: number;

    /**
     * The font style to use (from the predefined values in the Theme)
     */
    font?: keyof MD3Theme['fonts'];

    /**
     * The color to use for the text (from the predefined values in the Theme or custom)
     */
    color?: string;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<MD3Theme>;
} & TextProps;

const overlineStyles = (
    props: TypographyProps,
    theme: MD3Theme
): StyleSheet.NamedStyles<{
    root: TextStyle;
}> =>
    StyleSheet.create({
        root: {
            color:
                props.color ||
                (Color(theme.colors.primary).isLight() ? (theme.dark ? white[50] : theme.colors.primary) : black[500]),
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
        },
    });

export const Overline: React.FC<TypographyProps> = (props) => {
    const { children, style, styles = {}, theme: themeOverride, ...otherTextProps } = props;
    const theme = useTheme(themeOverride);
    const defaultStyles = overlineStyles(props, theme);

    return (
        <Text variant={'bodyMedium'} style={[defaultStyles.root, styles.root, style]} {...otherTextProps}>
            {children}
        </Text>
    );
};
