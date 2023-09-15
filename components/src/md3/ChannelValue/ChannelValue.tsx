import React, { useCallback } from 'react';
import { View, StyleSheet, ViewProps, ViewStyle, StyleProp, TextStyle, I18nManager } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../Icon';
import { Spacer } from '../utility';
import { IconSource } from '../__types__';

const prefixUnitWhitelist = ['$'];
const suffixUnitWhitelist = ['%', '℉', '°F', '℃', '°C', '°'];

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
    icon?: IconSource;

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

    /** Whether to show a space between the value and units
     *
     * Default: auto (shows space except for white list items)
     *
     * prefixUnitWhitelist: ['$'];
     * suffixUnitWhitelist: ['%', '℉','°F','℃','°C','°']
     */
    unitSpace?: 'show' | 'hide' | 'auto';

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
    theme?: $DeepPartial<MD3Theme>;
};

/**
 * [ChannelValue](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--channel-value) component
 *
 * Used to show a stylized value and its units.
 * You may also include an icon.
 */
export const ChannelValue: React.FC<ChannelValueProps> = (props) => {
    const {
        value,
        fontSize = 16,
        icon,
        iconColor,
        iconSize,
        color,
        units,
        unitSpace = 'auto',
        prefix = false,
        styles = {},
        style,
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);

    const getColor = useCallback((): string => {
        if (!color) return theme.colors.onSurface;
        return color;
    }, [color, theme]);

    const getIcon = useCallback(() => {
        if (icon) {
            return (
                <View style={[{ marginRight: Math.round(fontSize / 3) }]}>
                    <Icon source={icon} size={iconSize || fontSize} color={iconColor || getColor()} />
                </View>
            );
        }
    }, [icon, fontSize, getColor, iconColor, iconSize]);

    const getUnits = useCallback(
        (spacerLocation: 'before' | 'after'): JSX.Element | undefined => {
            if (units) {
                return (
                    <>
                        {((spacerLocation === 'before' && unitSpace === 'show') ||
                            (spacerLocation === 'before' &&
                                unitSpace === 'auto' &&
                                !suffixUnitWhitelist.includes(units))) && <Spacer flex={0} width={fontSize / 4} />}
                        <Text
                            variant={'bodyLarge'}
                            style={[
                                {
                                    color: getColor(),
                                    fontSize: fontSize,
                                    fontWeight: '300',
                                    letterSpacing: 0,
                                    fontFamily: 'OpenSans-Regular',
                                },
                                styles.units,
                            ]}
                        >
                            {units}
                        </Text>
                        {((spacerLocation === 'after' && unitSpace === 'show') ||
                            (spacerLocation === 'after' &&
                                unitSpace === 'auto' &&
                                !prefixUnitWhitelist.includes(units))) && <Spacer flex={0} width={fontSize / 4} />}
                    </>
                );
            }
        },
        [units, fontSize, getColor, styles, unitSpace]
    );

    const prefixUnits = useCallback((): JSX.Element | undefined => {
        if ((!I18nManager.isRTL && prefix) || (I18nManager.isRTL && !prefix)) {
            return getUnits('after');
        }
    }, [prefix, getUnits]);

    const suffixUnits = useCallback((): JSX.Element | undefined => {
        if ((I18nManager.isRTL && prefix) || (!I18nManager.isRTL && !prefix)) {
            return getUnits('before');
        }
    }, [prefix, getUnits]);

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {getIcon()}
            <Text
                variant={'bodyLarge'}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                testID={'text-wrapper'}
                style={[
                    {
                        color: getColor(),
                        fontSize: fontSize,
                        letterSpacing: 0,
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                    },
                ]}
            >
                {prefixUnits()}
                <Text
                    variant={'bodyLarge'}
                    style={[
                        {
                            color: getColor(),
                            fontSize: fontSize,
                            letterSpacing: 0,
                            fontFamily: 'OpenSans-Regular',
                            fontWeight: '600',
                        },
                        styles.value,
                    ]}
                >
                    {value}
                </Text>
                {suffixUnits()}
            </Text>
        </View>
    );
};
