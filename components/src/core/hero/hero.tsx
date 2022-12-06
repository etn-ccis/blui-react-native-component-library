import React, { useCallback } from 'react';
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
import { ChannelValue, ChannelValueProps as ChannelValuePropsType } from '../channel-value';
import { useTheme } from 'react-native-paper';
import { Body1 } from '../typography';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../icon';
import { IconSource } from '../__types__';
import { useFontScale } from '..';

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

    /** A component to render for the primary icon  */
    icon?: IconSource;

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
     * Props to be passed through to ChannelValue child component
     */
    ChannelValueProps?: ChannelValuePropsType;

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
 * [Hero](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--hero) component
 *
 * The Hero is used to call attention to particular values of importance to the user. It includes a
 * large icon with a label and (typically) a [ChannelValue](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--channel-value) item. The channel value can be configured
 * through the `ChannelValueProps`, or passed declaratively as a child.
 */
export const Hero: React.FC<HeroProps> = (props) => {
    const {
        label,
        ChannelValueProps,
        onPress,
        icon,
        iconColor,
        iconSize,
        iconBackgroundColor,
        children,
        styles = {},
        style,
        theme: themeOverride,
        ...viewProps
    } = props;

    const theme = useTheme(themeOverride);
    const { maxScale, disableScaling } = useFontScale();
    const fontScale = !disableScaling
        ? PixelRatio.getFontScale() < maxScale
            ? PixelRatio.getFontScale()
            : maxScale
        : 1;
    const defaultStyles = makeStyles(fontScale);

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 36;
        return Math.max(10, Math.min(48, iconSize));
    }, [iconSize]);

    const getColor = useCallback((color: string | undefined): string => color || theme.colors.text, [theme]);

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
                    { backgroundColor: iconBackgroundColor || theme.colors.surface },
                    styles.iconWrapper,
                ]}
            >
                {getIcon()}
            </View>
            <View style={[defaultStyles.values, styles.values]}>
                {!children && !!ChannelValueProps?.value && <ChannelValue fontSize={20} {...ChannelValueProps} />}
                {children}
            </View>
            <Body1 style={[defaultStyles.label, styles.label]} numberOfLines={1} ellipsizeMode={'tail'}>
                {label}
            </Body1>
        </TouchableOpacity>
    );
};
