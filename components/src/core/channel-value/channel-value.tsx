import React, { ComponentType, useCallback, useEffect } from 'react';
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

    /**
     * Props to spread to the icon component
     *
     * @deprecated in version 6.0.0
     */
    IconProps?: { size?: number; color?: string };

    /**
     * The size of the icon
     *
     * Default: fontSize
     */
    iconSize?: number;

    /**
     * The color of the primary icon
     *
     * Default: Theme.colors.text
     */
    iconColor?: string;

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
 * [ChannelValue](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--channel-value) component
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
        iconColor: iconColorProp,
        iconSize: iconSizeProp,
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);

    // Compatibility to facilitate updates
    const iconColor = iconColorProp || IconProps?.color;
    const iconSize = iconSizeProp || IconProps?.size;
    // Deprecation Warning
    useEffect(() => {
        if (IconClass) {
            // eslint-disable-next-line no-console
            console.warn(
                `Property 'IconClass' in ChannelValue component has been deprecated and will be removed in version 6.0.0. You should update to use the renamed 'icon' prop instead.`
            );
        }
    }, [IconClass]);
    useEffect(() => {
        if (IconProps) {
            // eslint-disable-next-line no-console
            console.warn(
                `Property 'IconProps' in ChannelValue component has been deprecated and will be removed in version 6.0.0. You should update to use the new 'iconColor' and 'iconSize' props instead.`
            );
        }
    }, [IconProps]);

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
                    <IconClass size={iconSize || fontSize} color={iconColor || getColor()} />
                </View>
            );
        }
    }, [IconClass, fontSize, getColor, iconColor, iconSize]);

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
