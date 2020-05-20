import React, { ComponentType, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { ChannelValue } from '../channel-value';
import { Theme, useTheme } from 'react-native-paper';
import { Label } from '../typography';
import { Sizes } from '../sizes';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    icon: {
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

export type HeroProps = {
    /** Label to show */
    label: string;

    /** Primary icon */
    // icon: React.ReactNode;

    /** Primary icon */
    IconClass: ComponentType<{ size: number; color: string }>;

    /** Primary icon color */
    iconSize?: number;

    /** Primary icon color */
    iconColor?: string;

    /** Primary icon color */
    iconBackgroundColor?: string;

    /** Primary icon color */
    fontSize?: keyof Sizes;

    /** Value for ChannelValue child */
    value?: number | string;

    /** Icon component for ChannelValue child */
    ValueIconClass?: ComponentType<{ size: number; color: string }>; //ReturnType<typeof wrapIcon>;

    /** Value string color */
    valueColor?: string;

    /** Units for value of ChannelValue child */
    units?: string;

    /** Callback for onPress event  */
    onPress?: () => void;

    /** Style configuration for the wrapper View */
    style?: StyleProp<ViewStyle>;

    /**
     * TestID
     */
    testID?: string;

    /**
     * Overrides for theme
     */
    theme?: Theme;
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
        fontSize,
        units,
        onPress,
        IconClass,
        iconColor,
        iconSize,
        iconBackgroundColor,
        children,
        style,
    } = props;

    const theme = useTheme();

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 36;
        return Math.max(10, Math.min(48, iconSize));
    }, [iconSize]);

    const getColor = useCallback(
        (color: string | undefined): string => {
            if (!color) return theme.colors.text;
            if (Object.keys(theme.colors).indexOf(color) >= 0) return theme.colors[color as keyof Theme['colors']];
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
        <TouchableOpacity onPress={onPress} disabled={!onPress} style={[styles.wrapper, style]}>
            <View
                style={[
                    styles.icon,
                    { backgroundColor: iconBackgroundColor || theme.colors.surface, borderRadius: 24 },
                ]}
            >
                {getIcon()}
            </View>
            <View style={styles.values}>
                {!children && !!value && (
                    <ChannelValue
                        value={value}
                        units={units}
                        IconClass={ValueIconClass}
                        color={valueColor}
                        fontSize={fontSize || 'large'}
                    />
                )}
                {children}
            </View>
            <Label style={styles.label} numberOfLines={1} ellipsizeMode={'tail'}>
                {label}
            </Label>
        </TouchableOpacity>
    );
};
