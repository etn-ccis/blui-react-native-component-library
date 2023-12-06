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
    checkedIcon?: boolean;
    disabled?: boolean;
    // switchColor?: string;
    value?: boolean;
    onValueChange?: (arg: boolean) => void;
    theme?: $DeepPartial<MD3Theme>;
};

const SWITCH_BUTTON_PADDING = 4;
const InterpolateXInput = [0, 1];

export const IconSwitch: React.FC<IconSwitchProps> = (props) => {
    const { checkedIcon = false, disabled = false, value = false, onValueChange } = props;
    const theme = useTheme(props.theme);

    const BUTTON_WIDTH = 52;
    const BUTTON_HEIGHT = 32;
    const SWITCH_BUTTON_AREA = BUTTON_HEIGHT - SWITCH_BUTTON_PADDING;
    const [toggled, setToggled] = useState(value);
    const shareValue = useSharedValue(value ? 1 : 0);

    const containerScale = {
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
    };
    const switchScale = {
        width: toggled ? 24 : checkedIcon ? 24 : 16,
        height: toggled ? 24 : checkedIcon ? 24 : 16,
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
                translateX: interpolate(
                    shareValue.value,
                    InterpolateXInput,
                    [0, BUTTON_WIDTH - SWITCH_BUTTON_AREA - 1 * SWITCH_BUTTON_PADDING],
                    Extrapolation.CLAMP
                ),
            },
        ],
        backgroundColor: disabled
            ? theme.colors.surface
            : interpolateColor(shareValue.value, InterpolateXInput, [toggleOffColor, toggleOnColor]),
    }));

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPressSwitch}
            activeOpacity={1}
            style={[styles.containerStyle, containerScale]}
        >
            <Animated.View style={[styles.switchButton, switchScale, switchAreaStyles]}>
                {checkedIcon && (
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
