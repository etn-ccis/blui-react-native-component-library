import React, { ComponentType, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle, ViewProps, TextStyle } from 'react-native';
import { ChannelValue } from '../channel-value';
import { useTheme } from 'react-native-paper';
import { Body1 } from '../typography';
import { $DeepPartial } from '@callstack/react-theme-provider';

const defaultStyles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    iconWrapper: {
        padding: 0,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: 48,
        width: 48,
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
    /** Label to show */
    label: string;

    /** Primary icon */
    IconClass: ComponentType<{ size: number; color: string }>;

    /** Primary icon size */
    iconSize?: number;

    /** Primary icon color */
    iconColor?: string;

    /** Primary icon background */
    iconBackgroundColor?: string;

    /** Font size used for the values row*/
    fontSize?: number;

    /** Value for ChannelValue child */
    value?: number | string;

    /** Icon component for ChannelValue child */
    ValueIconClass?: ComponentType<{ size: number; color: string }>;

    /** Value string color */
    valueColor?: string;

    /** Units for value of ChannelValue child */
    units?: string;

    /** Callback for onPress event  */
    onPress?: () => void;

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        iconWrapper?: StyleProp<ViewStyle>;
        values?: StyleProp<ViewStyle>;
        label?: StyleProp<TextStyle>;
    };

    /**
     * TestID
     */
    testID?: string;

    /**
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * Hero component
 *
 * Used to call attention to particular values of importance to the user.
 * An arbitrary value, value icon, and units may be added,
 * or <ChannelValue/> components may be passed as children.
 */
export const Hero: React.FC<HeroProps> = (props) => {
    const {
        label,
        value,
        ValueIconClass,
        valueColor,
        fontSize = 20,
        units,
        onPress,
        IconClass,
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

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 36;
        return Math.max(10, Math.min(48, iconSize));
    }, [iconSize]);

    const getColor = useCallback(
        (color: string | undefined): string => {
            if (!color) return theme.colors.text;
            if (Object.keys(theme.colors).indexOf(color) >= 0) return theme.colors[color as keyof ReactNativePaper.Theme['colors']];
            return color;
        },
        [theme]
    );

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (IconClass) {
            return <IconClass size={normalizeIconSize()} color={getColor(iconColor)} />;
        }
    }, [IconClass, normalizeIconSize, getColor, iconColor]);

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
                    { backgroundColor: iconBackgroundColor || theme.colors.surface, borderRadius: 24 },
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
                        IconClass={ValueIconClass}
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
