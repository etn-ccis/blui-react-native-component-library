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

export type IconSwitchProps = ViewProps & {
    checkedIcon?: boolean;
    disabledSwitch?: boolean;
    color?: string;
    value?: boolean;
    onValueChange?: Function;
    theme?: $DeepPartial<MD3Theme>;
};

const SWITCH_BUTTON_PADDING = 4;
const InterpolateXInput = [0, 1];

export const IconSwitch: React.FC<IconSwitchProps> = (props) => {
    const { checkedIcon = false, disabledSwitch = false, color = 'white', value = false, onValueChange } = props;
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
        // height: SWITCH_BUTTON_AREA,
        // width: SWITCH_BUTTON_AREA,
        width: 24,
        height: 24,
    };

    const onChangeToggle = () => {
        setToggled(!toggled);
        onValueChange?.(!toggled);
    };

    const onPressSwitch = () => {
        if (shareValue.value === 0) {
            shareValue.value = withTiming(1, {
                duration: 800,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            });
        } else {
            shareValue.value = withTiming(0, {
                duration: 800,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            });
        }
        onChangeToggle();
    };

    const styles = StyleSheet.create({
        containerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            borderRadius: 100,
        },
        switchButton: {
            position: 'absolute',
            left: SWITCH_BUTTON_PADDING,
            borderRadius: 23,
        },
    });

    const switchAreaStyles = useAnimatedStyle(() => {
        return {
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
            backgroundColor: interpolateColor(shareValue.value, InterpolateXInput, [color, color]),
        };
    });

    return (
        <TouchableOpacity
            disabled={disabledSwitch}
            onPress={onPressSwitch}
            activeOpacity={1}
            style={[styles.containerStyle, containerScale]}
        >
            <Animated.View style={[styles.switchButton, switchScale, switchAreaStyles]}>
                {checkedIcon ? <Icon source={{ family: 'brightlayer-ui', name: 'right' }} /> : null}
            </Animated.View>
        </TouchableOpacity>
    );
};
