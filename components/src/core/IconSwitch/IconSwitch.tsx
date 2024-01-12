import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewProps, View, I18nManager } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    Extrapolation,
} from 'react-native-reanimated';
import { Icon } from '../Icon/Icon';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

export type IconSwitchProps = ViewProps & {
    /**
     * Flag to show the icon on the handle or not
     * @default: false
     */
    showIcon?: boolean;
    /**
     * Flag to disabled the IconSwitch
     * @default: false
     */
    disabled?: boolean;
    /**
     * Flag to pass the IconSwitch value
     * @default: false
     */
    value?: boolean;
    /**
     * Callback Event handling function to handle value change
     */
    onValueChange?: (arg: boolean) => void;
    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

/**
 * This is a Switch component which allow us to show the check icon on ToggleOn and Close icon on ToggleOff Switch's handle.
 */
export const IconSwitch: React.FC<IconSwitchProps> = (props) => {
    const { showIcon = false, disabled = false, value = false, onValueChange, style, ...viewProps } = props;
    const theme = useExtendedTheme(props.theme);

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
                ? theme.colors.sliderTrackDisabled
                : toggled
                ? theme.colors.primary
                : theme.colors.surfaceContainerHighest,
            borderColor: toggled ? undefined : disabled ? theme.colors.disabled : theme.colors.outline,
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
            marginHorizontal: showIcon ? 2 : 6,
            backgroundColor: disabled
                ? toggled
                    ? theme.colors.surface
                    : theme.colors.onDisabledContainer
                : toggled
                ? theme.colors.onPrimary
                : theme.colors.onBackground,
        },
    });

    const rtl = I18nManager.isRTL;

    const toggleStyles = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateX: interpolate(
                        shareValue.value,
                        [0, 1],
                        showIcon ? (rtl ? [0, -22] : [0, 22]) : rtl ? [0, -18] : [0, 18],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        }),
        []
    );

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPressSwitch}
            activeOpacity={1}
            style={[styles.track, style]}
            {...viewProps}
        >
            <Animated.View style={[styles.handle, toggleStyles]}>
                {showIcon && (
                    <View>
                        {toggled ? (
                            <Icon
                                source={{ family: 'material', name: 'check' }}
                                color={disabled ? theme.colors.disabled : theme.colors.onBackground}
                                size={16}
                            />
                        ) : (
                            <Icon
                                source={{ family: 'material', name: 'close' }}
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
