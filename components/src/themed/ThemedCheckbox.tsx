import React from 'react';
import { Platform } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';
export type ThemedCheckboxIOSProps = React.ComponentProps<typeof Checkbox.IOS>;
export type ThemedCheckboxAndroidProps = React.ComponentProps<typeof Checkbox.Android>;
export type ThemedCheckboxItemProps = React.ComponentProps<typeof Checkbox.Item>;

/**
 * ThemedCheckboxIOS component
 *
 * This component is a wrapper around the React Native Paper [Checkbox.IOS](https://callstack.github.io/react-native-paper/checkbox-ios.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedCheckboxIOS: React.FC<ThemedCheckboxIOSProps> = (props) => {
    const { theme: themeOverride, color, ...other } = props;
    const theme = useTheme(themeOverride);

    return <Checkbox.IOS {...other} color={color || theme.colors.primaryPalette.main} theme={themeOverride} />;
};
/**
 * ThemedCheckboxAndroid component
 *
 * This component is a wrapper around the React Native Paper [Checkbox.Android](https://callstack.github.io/react-native-paper/checkbox-android.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedCheckboxAndroid: React.FC<ThemedCheckboxAndroidProps> = (props) => {
    const { theme: themeOverride, color, uncheckedColor, ...other } = props;
    const theme = useTheme(themeOverride);

    return (
        <Checkbox.Android
            {...other}
            uncheckedColor={
                uncheckedColor ||
                (props.status === 'unchecked' ? theme.colors.textPalette.secondary : theme.colors.primaryPalette.main)
            }
            color={color || theme.colors.primaryPalette.main}
            theme={themeOverride}
        />
    );
};

const ThemedCheckboxComponent: React.FC<React.ComponentProps<typeof Checkbox>> = (props) =>
    Platform.OS === 'ios' ? <ThemedCheckboxIOS {...props} /> : <ThemedCheckboxAndroid {...props} />;

/**
 * ThemedCheckbox component
 *
 * This component is a wrapper around the React Native Paper [Checkbox](https://callstack.github.io/react-native-paper/checkbox.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 *
 * Note: We do not provide a wrapper around the `Checkbox.Item` component. This component from RNP uses the unstyled checkbox components
 * and unstyled text, so we do not recommend using it. If you wish to have this behavior, you should implement your own component making
 * use of the PX Blue `Typography` components and the `ThemedCheckbox` provided here.
 */
export const ThemedCheckbox = Object.assign(ThemedCheckboxComponent, {
    Android: ThemedCheckboxAndroid,
    IOS: ThemedCheckboxIOS,
});
