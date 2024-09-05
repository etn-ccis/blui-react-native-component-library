import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ViewProps, I18nManager, StyleProp, ViewStyle, Animated } from 'react-native';
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
    value: boolean;
    /**
     * Callback Event handling function to handle value change
     */
    onValueChange: (arg: boolean) => void;
    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
    /**
     * Style overrides for internal elements. The styles you provide will be combined with the default styles.
     */
    styles?: {
        root?: StyleProp<ViewStyle>;
        handle?: StyleProp<ViewStyle>;
    };
};

/**
 * This is a Switch component which allow us to show the check icon on ToggleOn and Close icon on ToggleOff Switch's handle.
 */
export const IconSwitch: React.FC<IconSwitchProps> = (props) => {
    const { showIcon = false, disabled = false, value, onValueChange, styles = {}, style, ...viewProps } = props;
    const theme = useExtendedTheme(props.theme);

    const rtl = I18nManager.isRTL;
    const toggleStyles = {
        transform: [{ translateX: value ? (showIcon ? (rtl ? -22 : 22) : rtl ? -18 : 18) : 0 }],
        transition: 'transform 50ms ease-in-out',
    };
    const onPressSwitch = (): void => {
        const newValue = !value;
        onValueChange(newValue);
    };

    useEffect(() => {
        // Update the toggleStyles based on the current value
        toggleStyles.transform = [{ translateX: value ? (showIcon ? (rtl ? -22 : 22) : rtl ? -18 : 18) : 0 }];
    }, [value]);

    const defaultStyles = StyleSheet.create({
        track: {
            display: 'flex',
            justifyContent: 'center',
            height: 32,
            width: 52,
            backgroundColor: disabled
                ? theme.colors.sliderTrackDisabled
                : value
                ? theme.colors.primary
                : theme.colors.surfaceContainerHighest,
            borderColor: value ? undefined : disabled ? theme.colors.disabled : theme.colors.outline,
            borderWidth: value ? 0 : 2,
            borderRadius: 100,
        },
        handle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: value ? 24 : showIcon ? 24 : 16,
            height: value ? 24 : showIcon ? 24 : 16,
            borderRadius: 23,
            marginHorizontal: showIcon ? 2 : 6,
            backgroundColor: disabled
                ? value
                    ? theme.colors.surface
                    : theme.colors.onDisabledContainer
                : value
                ? theme.colors.onPrimary
                : theme.colors.onBackground,
        },
    });

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPressSwitch}
            activeOpacity={1}
            style={[defaultStyles.track, styles.root, style]}
            {...viewProps}
        >
            <Animated.View style={[defaultStyles.handle, toggleStyles, styles.handle]}>
                {showIcon && (
                    <>
                        {value ? (
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
                    </>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};
