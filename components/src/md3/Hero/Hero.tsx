import React, { useCallback } from 'react';
import { View, TouchableOpacity, ViewStyle, TextStyle, StyleProp, StyleSheet, ViewProps } from 'react-native';
import { useTheme, MD3Theme, Text } from 'react-native-paper';
import { ChannelValue, ChannelValueProps as ChannelValuePropsType } from '../ChannelValue';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../Icon';
import { IconSource } from '../__types__';
import { useFontScale } from '../__contexts__/font-scale-context';

type HeroStyles = {
    root?: ViewStyle;
    iconWrapper?: ViewStyle;
    values?: ViewStyle;
    label?: TextStyle;
};

const makeStyles = (theme: MD3Theme, fontScale: number): StyleSheet.NamedStyles<HeroStyles> =>
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
            fontFamily: 'OpenSans-SemiBold',
            fontWeight: '500',
            color: theme.colors.onSurfaceVariant,
        },
    });

export type HeroProps = ViewProps & {
    label: string;
    icon?: IconSource;
    iconSize?: number;
    iconColor?: string;
    iconBackgroundColor?: string;
    ChannelValueProps?: ChannelValuePropsType;
    onPress?: () => void;
    styles?: {
        root?: StyleProp<ViewStyle>;
        iconWrapper?: StyleProp<ViewStyle>;
        values?: StyleProp<ViewStyle>;
        label?: StyleProp<TextStyle>;
    };
    theme?: $DeepPartial<MD3Theme>;
};

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

    const theme = useTheme(themeOverride);
    const fontScale = useFontScale();
    const defaultStyles = makeStyles(theme, fontScale);

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 36;
        return Math.max(10, Math.min(48, iconSize));
    }, [iconSize]);
    // @TODO update the color once the theme creation is complete
    const getColor = useCallback(
        (color: string | undefined): string => color || theme.colors.onSurfaceVariant,
        [theme]
    );

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (icon) {
            return (
                <Icon
                    source={icon}
                    size={typeof iconSize === 'number' ? normalizeIconSize() : iconSize}
                    color={getColor(iconColor)}
                />
            );
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
                        backgroundColor: iconBackgroundColor || theme.colors.surface,
                        height: typeof iconSize === 'number' ? normalizeIconSize() : iconSize ?? 36 * fontScale,
                        width: typeof iconSize === 'number' ? normalizeIconSize() : iconSize ?? 36 * fontScale,
                        borderRadius:25,
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
