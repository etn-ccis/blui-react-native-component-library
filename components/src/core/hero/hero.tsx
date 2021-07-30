import React, { ComponentType, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    StyleProp,
    ViewStyle,
    ViewProps,
    TextStyle,
    PixelRatio,
} from 'react-native';
import { ChannelValue } from '../channel-value';
import { useTheme } from 'react-native-paper';
import { Body1 } from '../typography';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { WrapIconProps } from '../icon-wrapper';

type HeroStyles = {
    root?: ViewStyle;
    iconWrapper?: ViewStyle;
    values?: ViewStyle;
    label?: TextStyle;
};
const makeStyles = (fontScale: number): StyleSheet.NamedStyles<HeroStyles> =>
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
            marginBottom: 4 * fontScale,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            height: 48 * fontScale,
            width: 48 * fontScale,
            borderRadius: 24 * fontScale,
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
        },
    });

export type HeroProps = ViewProps & {
    /** The text shown below the ChannelValue */
    label: string;

    /**
     * A component to render for the primary icon
     *
     * @deprecated in version 6.0.0
     */
    IconClass: ComponentType<WrapIconProps>;

    /** A component to render for the primary icon  */
    icon?: ComponentType<WrapIconProps>;

    /**
     * The size of the primary icon (10-48)
     *
     * Default: 36
     */
    iconSize?: number;

    /**
     * The color of the primary icon
     *
     * Default: Theme.colors.text
     */
    iconColor?: string;

    /**
     * The color to use behind the primary icon
     *
     * Default: Theme.colors.surface
     */
    iconBackgroundColor?: string;

    /**
     * The text size to use for the ChannelValue
     *
     * Default: 20
     */
    fontSize?: number;

    /** Value for the ChannelValue child */
    value?: number | string;

    /**
     * A component to render for the ChannelValue child icon
     *
     * @deprecated in version 6.0.0
     */
    ValueIconClass?: ComponentType<WrapIconProps>;
    /** A component to render for the ChannelValue child icon */
    valueIcon?: ComponentType<WrapIconProps>;

    /** Color to use for the ChannelValue text */
    valueColor?: string;

    /** Units for the ChannelValue child */
    units?: string;

    /** A callback function to execute when the Hero is pressed  */
    onPress?: () => void;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        iconWrapper?: StyleProp<ViewStyle>;
        values?: StyleProp<ViewStyle>;
        label?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * [Hero](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--hero) component
 *
 * The Hero is used to call attention to particular values of importance to the user. It includes a
 * large icon with a label and (typically) a [ChannelValue](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--channel-value) item. The channel value can be configured
 * through the `value` and `units` props, or passed declaratively as a child.
 */
export const Hero: React.FC<HeroProps> = (props) => {
    const {
        label,
        value,
        ValueIconClass,
        valueIcon: valueIconProp,
        valueColor,
        fontSize = 20,
        units,
        onPress,
        IconClass,
        icon: iconProp,
        iconColor,
        iconSize,
        iconBackgroundColor,
        children,
        styles = {},
        style,
        theme: themeOverride,
        ...viewProps
    } = props;

    // Compatibility to facilitate updates
    const Icon = iconProp || IconClass;
    const valueIcon = valueIconProp || ValueIconClass;
    // Deprecation Warning
    useEffect(() => {
        // TODO Update docs
        if (IconClass) {
            // eslint-disable-next-line no-console
            console.warn(
                `Property 'IconClass' in Hero component has been deprecated and will be removed in version 6.0.0. You should update to use the renamed 'icon' prop instead.`
            );
        }
    }, [IconClass]);
    useEffect(() => {
        // TODO Update docs
        if (ValueIconClass) {
            // eslint-disable-next-line no-console
            console.warn(
                `Property 'ValueIconClass' in Hero component has been deprecated and will be removed in version 6.0.0. You should update to use the renamed 'valueIcon' prop instead.`
            );
        }
    }, [ValueIconClass]);

    const theme = useTheme(themeOverride);
    const fontScale = PixelRatio.getFontScale();
    const defaultStyles = makeStyles(fontScale);

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 36;
        return Math.max(10, Math.min(48, iconSize));
    }, [iconSize]);

    const getColor = useCallback(
        (color: string | undefined): string => {
            if (!color) return theme.colors.text;
            if (Object.keys(theme.colors).indexOf(color) >= 0)
                return theme.colors[color as keyof ReactNativePaper.Theme['colors']];
            return color;
        },
        [theme]
    );

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (Icon) {
            return <Icon size={normalizeIconSize()} color={getColor(iconColor)} />;
        }
    }, [Icon, normalizeIconSize, getColor, iconColor]);

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
                    { backgroundColor: iconBackgroundColor || theme.colors.surface },
                    styles.iconWrapper,
                ]}
            >
                {getIcon()}
            </View>
            <View style={[defaultStyles.values, styles.values]}>
                {!children && !!value && (
                    <ChannelValue
                        value={value}
                        units={units}
                        IconClass={valueIcon}
                        color={valueColor}
                        fontSize={fontSize}
                    />
                )}
                {children}
            </View>
            <Body1 style={[defaultStyles.label, styles.label]} numberOfLines={1} ellipsizeMode={'tail'}>
                {label}
            </Body1>
        </TouchableOpacity>
    );
};
