import React, { ComponentType, useCallback } from 'react';
import { View, StyleSheet, TextProps } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';
import { Label } from '../typography';
import { SIZES, Sizes } from '../sizes';
import { WithTheme } from '../__types__';

const styles = StyleSheet.create({
    row: {
        maxWidth: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export type ChannelValueProps = {
    /** Value to show (bold text) */
    value: string | number;

    /** Icon component to render */
    IconClass?: ComponentType<{ size: number; color: string }>;

    /** Text to show for units (light text) */
    units?: string;

    /** Whether to show units before the value. Default: false */
    prefix?: boolean;

    /** Font size for all text */
    fontSize?: keyof Sizes;

    /** Font color for all text */
    color?: string;

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
    const { value, fontSize, IconClass, color, units, prefix = false } = props;
    const theme = useTheme();
    
    const getFontSize = useCallback((): number => SIZES[fontSize || 'medium'], [fontSize]);

    const getColor = useCallback((): string => {
        if (!color) return theme.colors.text;
        if (Object.keys(theme.colors).indexOf(color) >= 0) return theme.colors[color as keyof Theme['colors']];
        return color;
    }, [color, theme])

    const getIcon = useCallback(() => {
        if (IconClass) {
            return (
                <View style={{ marginRight: Math.round(getFontSize() / 6) }}>
                    <IconClass size={getFontSize()} color={getColor()} />
                </View>
            );
        }
    }, [IconClass, getFontSize, getColor]);

    const textOverrides = useCallback((): WithTheme<TextProps> => {
        const output: WithTheme<TextProps> = { theme };
        if (color) {
            output.style = { color: getColor() };
        }
        return output;
    }, [color, theme, getColor])

    const getUnits = useCallback((): JSX.Element | undefined => {
        const labelOverrides = textOverrides();
        if (units) {
            return (
                <Label font={'light'} {...labelOverrides} fontSize={fontSize}>
                    {units}
                </Label>
            );
        }
    }, [textOverrides, units, fontSize])

    const prefixUnits = useCallback((): JSX.Element | undefined => {
        if (prefix) {
            return getUnits();
        }
    }, [prefix, getUnits])

    const suffixUnits = useCallback((): JSX.Element | undefined => {
        if (!prefix) {
            return getUnits();
        }
    }, [prefix, getUnits])

    const labelOverrides = textOverrides();

    return (
        <View style={styles.row}>
            {getIcon()}
            <Label
                numberOfLines={1}
                ellipsizeMode={'tail'}
                testID={'text-wrapper'}
                fontSize={fontSize}
                {...labelOverrides}
            >
                {prefixUnits()}
                <Label font={'medium'} fontSize={fontSize} {...labelOverrides}>
                    {value}
                </Label>
                {suffixUnits()}
            </Label>
        </View>
    );
}