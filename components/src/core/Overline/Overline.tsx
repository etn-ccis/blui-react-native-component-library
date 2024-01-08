import React from 'react';
import { TextStyle, StyleProp, StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { useFontScaleSettings } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

export type OverlineProps = Omit<TextProps<'labelMedium'>, 'theme' | 'variant'> & {
    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

const overlineStyles = (
    theme: ExtendedTheme
): StyleSheet.NamedStyles<{
    root: TextStyle;
}> =>
    StyleSheet.create({
        root: {
            color: theme.colors.onSurface,
            letterSpacing: 2,
            textTransform: 'uppercase',
        },
    });

export const Overline: React.FC<OverlineProps> = (props) => {
    const { children, style, styles = {}, theme: themeOverride, ...otherTextProps } = props;
    const theme = useExtendedTheme(themeOverride);
    const defaultStyles = overlineStyles(theme);
    const { maxScale, disableScaling } = useFontScaleSettings();

    return (
        <Text
            variant={'labelMedium'}
            style={[defaultStyles.root, styles.root, style]}
            allowFontScaling={!disableScaling}
            maxFontSizeMultiplier={maxScale}
            {...otherTextProps}
        >
            {children}
        </Text>
    );
};
