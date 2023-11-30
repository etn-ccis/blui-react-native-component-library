import React from 'react';
import { TextStyle, TextProps, StyleProp, StyleSheet } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { useFontScaleSettings } from '../__contexts__/font-scale-context';
import { calculateHeight } from '../Utility/shared';

type TypographyProps = {
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
    fontSize: number,
    theme: MD3Theme
): StyleSheet.NamedStyles<{
    root: TextStyle;
}> =>
    StyleSheet.create({
        root: {
            color: props.color || theme.colors.onSurface,
            fontSize,
            letterSpacing: 2,
            textTransform: 'uppercase',
            lineHeight: calculateHeight(fontSize),
        },
    });

export const Overline: React.FC<TypographyProps> = (props) => {
    const { children, style, styles = {}, theme: themeOverride, ...otherTextProps } = props;
    const theme = useTheme(themeOverride);
    const defaultStyles = overlineStyles(props, props.fontSize || 12, theme);
    const { maxScale, disableScaling } = useFontScaleSettings();

    return (
        <Text
            variant={'bodyMedium'}
            style={[defaultStyles.root, styles.root, style]}
            allowFontScaling={!disableScaling}
            maxFontSizeMultiplier={maxScale}
            {...otherTextProps}
        >
            {children}
        </Text>
    );
};
