import React, { useCallback } from 'react';
import { View, TouchableOpacity, ViewStyle, TextStyle, StyleProp, StyleSheet, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import { ChannelValue, ChannelValueProps as ChannelValuePropsType } from '../ChannelValue';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../Icon';
import { IconSource } from '../__types__';
import { useFontScale } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { fontStyleSemiBold } from '../Utility/shared';

type HeroStyles = {
    root?: ViewStyle;
    iconWrapper?: ViewStyle;
    values?: ViewStyle;
    label?: TextStyle;
};

const makeStyles = (theme: ExtendedTheme, fontScale: number): StyleSheet.NamedStyles<HeroStyles> =>
    StyleSheet.create({
        root: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 8,
            paddingVertical: 16,
        },
        iconWrapper: {
            padding: 0,
            marginBottom: 8 * fontScale,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 50,
        },
        values: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '100%',
        },
        label: {
            width: '100%',
            overflow: 'hidden',
            textAlign: 'center',
            ...fontStyleSemiBold,
            color: theme.colors.onSurfaceVariant,
        },
    });

export type HeroProps = ViewProps & {
    /** The text shown below the `ChannelValue` */
    label: string;

    /** The primary icon */
    icon?: IconSource;

    /** The size of the primary icon (min 10px)
     *
     * @default: 36
     */
    iconSize?: number;

    /** Color override for the row icon
     *
     * @default: theme.colors.onSurfaceVariant
     */
    iconColor?: string;

    /** The color used behind the primary icon
     *
     * @default: 'transparent
     */
    iconBackgroundColor?: string;

    /** Props to be passed through to ChannelValue child component */
    ChannelValueProps?: ChannelValuePropsType;

    /** Callback to execute when the drawer header is pressed */
    onPress?: () => void;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        iconWrapper?: StyleProp<ViewStyle>;
        values?: StyleProp<ViewStyle>;
        label?: StyleProp<TextStyle>;
    };

    /** Theme value overrides specific to this component. */
    theme?: $DeepPartial<ExtendedTheme>;
};

/**
 * [Hero](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--hero) component
 *
 * The `<Hero>` component displays a particular icon, value/units, and a label. The icon property will accept any valid component - this will typically be a Material icon, [Brightlayer UI icon](https://github.com/etn-ccis/blui-icons), or [Progress Icon](https://github.com/etn-ccis/blui-progress-icons). It will also accept Text/Emoji values.
 */
export const Hero: React.FC<HeroProps> = (props) => {
    const {
        label,
        ChannelValueProps,
        onPress,
        icon,
        iconColor,
        iconSize,
        children,
        iconBackgroundColor,
        styles = {},
        style,
        theme: themeOverride,
        ...viewProps
    } = props;

    const theme = useExtendedTheme(themeOverride);
    const fontScale = useFontScale();
    const defaultStyles = makeStyles(theme, fontScale);

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 36;
        return Math.max(10, Math.min(48, iconSize));
    }, [iconSize]);

    const getColor = useCallback(
        (color: string | undefined): string => color || theme.colors.onSurfaceVariant,
        [theme]
    );

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (icon) {
            return <Icon source={icon} size={normalizeIconSize()} color={getColor(iconColor)} />;
        }
    }, [icon, normalizeIconSize, getColor, iconColor]);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!onPress}
            style={[defaultStyles.root, styles.root, style]}
            {...viewProps}
        >
            <View
                style={[
                    defaultStyles.iconWrapper,
                    {
                        backgroundColor: iconBackgroundColor || 'rgba(255, 255, 255, 0)',
                        height: typeof iconSize === 'number' ? normalizeIconSize() : iconSize ?? 36 * fontScale,
                        width: typeof iconSize === 'number' ? normalizeIconSize() : iconSize ?? 36 * fontScale,
                    },
                    styles.iconWrapper,
                ]}
            >
                {getIcon()}
            </View>
            <View style={[defaultStyles.values, styles.values]}>
                {!children && !!ChannelValueProps?.value && <ChannelValue fontSize={22} {...ChannelValueProps} />}
                {children}
            </View>
            <Text
                variant={'titleMedium'}
                style={[defaultStyles.label, styles.label]}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};
