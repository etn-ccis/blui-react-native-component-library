import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewProps, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    Extrapolation,
    interpolateColor,
} from 'react-native-reanimated';
import { Icon } from '../Icon/Icon';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { MD3Theme, useTheme } from 'react-native-paper';
import Color from 'color';

export type IconSwitchProps = ViewProps & {
    /**
     * Flag to show the icon on the handle or not
     * Default: false
     */
    showIcon?: boolean;
    /**
     * Flag to disabled the IconSwitch
     * Default: false
     */
    disabled?: boolean;
    /**
     * Flag to pass the IconSwitch value
     * Default: false
     */
    value?: boolean;
    /**
     * Callback Event handling function to handle value change
     */
    onValueChange?: (arg: boolean) => void;
    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<MD3Theme>;
};

/**
 * This is a Switch component which allow us to show the check icon on ToggleOn and Close icon on ToggleOff Switch's handle.
 */
export const IconSwitch: React.FC<IconSwitchProps> = (props) => {
    const { showIcon = false, disabled = false, value = false, onValueChange } = props;
    const theme = useTheme(props.theme);

    const [toggled, setToggled] = useState(value);
    const shareValue = useSharedValue(value ? 1 : 0);

    const onChangeToggle = (): void => {
        setToggled(!toggled);
        onValueChange?.(!toggled);
    };

    const onPressSwitch = (): void => {
        if (shareValue.value === 0) {
            shareValue.value = withTiming(1, {
                duration: 100,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            });
        } else {
            shareValue.value = withTiming(0, {
                duration: 100,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            });
        }
        onChangeToggle();
    };

    const styles = StyleSheet.create({
        track: {
            display: 'flex',
            justifyContent: 'center',
            height: 32,
            width: 52,
            backgroundColor: disabled
                ? Color('#BDCAD1').alpha(0.3).rgb().string()
                : toggled
                ? theme.colors.primary
                : // @ts-ignore
                  theme.colors.surfaceContainerHighest,
            // @ts-ignore
            borderColor: toggled
                ? undefined
                : disabled
                ? // @ts-ignore
                  Color(theme.colors.disabled).alpha(0.2).rgb().string()
                : theme.colors.outline,
            borderWidth: toggled ? 0 : 2,
            borderRadius: 100,
        },
        handle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: toggled ? 24 : showIcon ? 24 : 16,
            height: toggled ? 24 : showIcon ? 24 : 16,
            borderRadius: 23,
            marginLeft: showIcon ? 2 : 6,
        },
    });

    const toggleOffColor = disabled ? Color('#192024').alpha(0.25).rgb().string() : theme.colors.onBackground;
    const toggleOnColor = disabled ? theme.colors.surface : theme.colors.onPrimary;

    const toggleStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(shareValue.value, [0, 1], showIcon ? [0, 22] : [0, 18], Extrapolation.CLAMP),
            },
        ],
        backgroundColor: interpolateColor(shareValue.value, [0, 1], [toggleOffColor, toggleOnColor]),
    }));

    return (
        <TouchableOpacity disabled={disabled} onPress={onPressSwitch} activeOpacity={1} style={[styles.track]}>
            <Animated.View style={[styles.handle, toggleStyles]}>
                {showIcon && (
                    <View
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    >
                        {toggled ? (
                            <Icon
                                source={{ family: 'material', name: 'check' }}
                                color={theme.colors.onSurface}
                                size={16}
                            />
                        ) : (
                            <Icon
                                source={{ family: 'material', name: 'close' }}
                                // @ts-ignore
                                color={disabled ? theme.colors.surfaceContainerHighest : theme.colors.onPrimary}
                                size={16}
                            />
                        )}
                    </View>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};
