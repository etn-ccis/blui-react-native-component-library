import React, { ComponentType, useCallback } from 'react';
import { View, StyleSheet, ViewProps, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';
import { Label } from '../typography';
import { SIZES, Sizes } from '../sizes';

const defaultStyles = StyleSheet.create({
    root: {
        maxWidth: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export type ChannelValueProps = ViewProps & {
    /** Value to show (bold text) */
    value: string | number;

    /** Icon component to render */
    IconClass?: ComponentType<{ size: number; color: string }>;

    /** Props to pass to the Icon component */
    IconProps?: { size?: number; color?: string };

    /** Text to show for units (light text) */
    units?: string;

    /** Whether to show units before the value. Default: false */
    prefix?: boolean;

    /** Font size for all text */
    fontSize?: keyof Sizes;

    /** Font color for all text */
    color?: string;

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        value?: StyleProp<TextStyle>;
        units?: StyleProp<TextStyle>;
    };

    /**
     * Overrides for theme
     */
    theme?: Theme;
};

/**
 * ChannelValue component
 *
 * Used to show a channel value and its units.
 * An arbitrary icon may be added
 */
export const ChannelValue: React.FC<ChannelValueProps> = (props) => {
    const { value, fontSize, IconClass, color, units, prefix = false, styles = {}, IconProps = {}, theme: themeOverride, ...viewProps } = props;
    const theme = useTheme(themeOverride);

    const getFontSize = useCallback((): number => SIZES[fontSize || 'medium'], [fontSize]);

    const getColor = useCallback((): string => {
        if (!color) return theme.colors.text;
        if (Object.keys(theme.colors).indexOf(color) >= 0) return theme.colors[color as keyof Theme['colors']];
        return color;
    }, [color, theme]);

    const getIcon = useCallback(() => {
        if (IconClass) {
            return (
                <View style={[{ marginRight: Math.round(getFontSize() / 6) }]}>
                    <IconClass size={getFontSize()} color={getColor()} {...IconProps} />
                </View>
            );
        }
    }, [IconClass, getFontSize, getColor, styles]);

    const getUnits = useCallback((): JSX.Element | undefined => {
        if (units) {
            return (
                <Label font={'light'} fontSize={fontSize} style={[{ color: getColor() }, styles.units]}>
                    {units}
                </Label>
            );
        }
    }, [units, fontSize, getColor, styles]);

    const prefixUnits = useCallback((): JSX.Element | undefined => {
        if (prefix) {
            return getUnits();
        }
    }, [prefix, getUnits]);

    const suffixUnits = useCallback((): JSX.Element | undefined => {
        if (!prefix) {
            return getUnits();
        }
    }, [prefix, getUnits]);

    return (
        <View style={[defaultStyles.root, styles.root, props.style]} {...viewProps}>
            {getIcon()}
            <Label
                numberOfLines={1}
                ellipsizeMode={'tail'}
                testID={'text-wrapper'}
                fontSize={fontSize}
                style={[{ color: getColor() }]}
            >
                {prefixUnits()}
                <Label font={'medium'} fontSize={fontSize} style={[{ color: getColor() }, styles.value]}>
                    {value}
                </Label>
                {suffixUnits()}
            </Label>
        </View>
    );
};
