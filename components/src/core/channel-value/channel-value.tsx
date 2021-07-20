import React, { ComponentType, useCallback } from 'react';
import { View, StyleSheet, ViewProps, ViewStyle, StyleProp, TextStyle, I18nManager } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Body1, Subtitle1 } from '../typography';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { WrapIconProps } from '../icon-wrapper';

const defaultStyles = StyleSheet.create({
    root: {
        maxWidth: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export type ChannelValueProps = ViewProps & {
    /** Text to display for the value (bold text) */
    value: string | number;

    /** A component to render for the icon */
    IconClass?: ComponentType<WrapIconProps>;

    /** Props to spread to the icon component */
    IconProps?: { size?: number; color?: string };

    /** Text to display for the units (light text) */
    units?: string;

    /** Whether to show the units before the value (e.g., for currency)
     *
     * Default: false
     */
    prefix?: boolean;

    /** The size to use for the text elements
     *
     * Default: 16
     */
    fontSize?: number;

    /** The color used for the text elements */
    color?: string;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        value?: StyleProp<TextStyle>;
        units?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * ChannelValue component
 *
 * Used to show a stylized value and its units.
 * You may also include an icon.
 */
export const ChannelValue: React.FC<ChannelValueProps> = (props) => {
    const {
        value,
        fontSize = 16,
        IconClass,
        color,
        units,
        prefix = false,
        styles = {},
        style,
        IconProps = {},
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);

    const getColor = useCallback((): string => {
        if (!color) return theme.colors.text;
        if (Object.keys(theme.colors).indexOf(color) >= 0)
            return theme.colors[color as keyof ReactNativePaper.Theme['colors']];
        return color;
    }, [color, theme]);

    const getIcon = useCallback(() => {
        if (IconClass) {
            return (
                <View style={[{ marginRight: Math.round(fontSize / 6) }]}>
                    <IconClass size={fontSize} color={getColor()} {...IconProps} />
                </View>
            );
        }
    }, [IconClass, fontSize, getColor, IconProps]);

    const getUnits = useCallback((): JSX.Element | undefined => {
        if (units) {
            return (
                <Body1 font={'light'} fontSize={fontSize} style={[{ color: getColor() }, styles.units]}>
                    {units}
                </Body1>
            );
        }
    }, [units, fontSize, getColor, styles]);

    const prefixUnits = useCallback((): JSX.Element | undefined => {
        if ((!I18nManager.isRTL && prefix) || (I18nManager.isRTL && !prefix)) {
            return getUnits();
        }
    }, [prefix, getUnits]);

    const suffixUnits = useCallback((): JSX.Element | undefined => {
        if ((I18nManager.isRTL && prefix) || (!I18nManager.isRTL && !prefix)) {
            return getUnits();
        }
    }, [prefix, getUnits]);

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {getIcon()}
            <Body1
                numberOfLines={1}
                ellipsizeMode={'tail'}
                testID={'text-wrapper'}
                fontSize={fontSize}
                style={[{ color: getColor() }]}
            >
                {prefixUnits()}
                <Subtitle1 fontSize={fontSize} style={[{ color: getColor() }, styles.value]}>
                    {value}
                </Subtitle1>
                {suffixUnits()}
            </Body1>
        </View>
    );
};
