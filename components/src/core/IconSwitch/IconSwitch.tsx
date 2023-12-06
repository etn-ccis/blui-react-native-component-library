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
    showIcon?: boolean;
    disabled?: boolean;
    value?: boolean;
    onValueChange?: (arg: boolean) => void;
    theme?: $DeepPartial<MD3Theme>;
};

export const IconSwitch: React.FC<IconSwitchProps> = (props) => {
    const { showIcon = false, disabled = false, value = false, onValueChange } = props;
    const theme = useTheme(props.theme);

    const [toggled, setToggled] = useState(value);
    const shareValue = useSharedValue(value ? 1 : 0);

    const containerScale = {
        height: 32,
        width: 52,
    };
    const switchScale = {
        width: toggled ? 24 : showIcon ? 24 : 16,
        height: toggled ? 24 : showIcon ? 24 : 16,
    };

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
        containerStyle: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: disabled
                ? Color('#BDCAD1').alpha(0.3).rgb().string()
                : toggled
                ? theme.colors.primary
                : // @ts-ignore
                  theme.colors.surfaceContainerHighest,
            // @ts-ignore
            borderColor: toggled ? undefined : disabled ? theme.colors.disabled : theme.colors.outline,
            borderWidth: toggled ? 0 : 2,
            borderRadius: 100,
        },
        switchButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 23,
            marginLeft: 4,
        },
    });

    const toggleOffColor = disabled ? Color('#192024').alpha(0.25).rgb().string() : theme.colors.onBackground;
    const toggleOnColor = disabled ? theme.colors.surface : theme.colors.onPrimary;

    const switchAreaStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(shareValue.value, [0, 1], [0, 52 - (32 - 4) - 1 * 4], Extrapolation.CLAMP),
            },
        ],
        backgroundColor: disabled
            ? theme.colors.surface
            : interpolateColor(shareValue.value, [0, 1], [toggleOffColor, toggleOnColor]),
    }));

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPressSwitch}
            activeOpacity={1}
            style={[styles.containerStyle, containerScale]}
        >
            <Animated.View style={[styles.switchButton, switchScale, switchAreaStyles]}>
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
                                color={theme.colors.onPrimary}
                                size={16}
                            />
                        )}
                    </View>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};
