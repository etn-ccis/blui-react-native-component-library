import React from 'react';
import { Platform } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
export type ThemedRadioButtonIOSProps = React.ComponentProps<typeof RadioButton.IOS>;
export type ThemedRadioButtonAndroidProps = React.ComponentProps<typeof RadioButton.Android>;
export type ThemedRadioButtonItemProps = React.ComponentProps<typeof RadioButton.Item>;

/**
 * ThemedRadioButtonIOS component
 *
 * This component is a wrapper around the React Native Paper [RadioButton.IOS](https://callstack.github.io/react-native-paper/radio-button-ios.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedRadioButtonIOS: React.FC<ThemedRadioButtonIOSProps> = (props) => {
    const { theme: themeOverride, color, ...other } = props;
    const theme = useTheme(themeOverride);

    return (
        <RadioButton.IOS
            {...other}
            color={color || theme.colors.primaryPalette?.main || theme.colors.primary}
            theme={themeOverride}
        />
    );
};
/**
 * ThemedRadioButtonAndroid component
 *
 * This component is a wrapper around the React Native Paper [RadioButton.Android](https://callstack.github.io/react-native-paper/radio-button-android.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedRadioButtonAndroid: React.FC<ThemedRadioButtonAndroidProps> = (props) => {
    const { theme: themeOverride, color, uncheckedColor, ...other } = props;
    const theme = useTheme(themeOverride);

    return (
        <RadioButton.Android
            {...other}
            uncheckedColor={
                uncheckedColor ||
                (props.status === 'unchecked'
                    ? theme.colors.textPalette?.secondary || theme.colors.text
                    : theme.colors.primaryPalette?.main || theme.colors.primary)
            }
            color={color || theme.colors.primaryPalette?.main || theme.colors.primary}
            theme={themeOverride}
        />
    );
};

const ThemedRadioButtonComponent: React.FC<React.ComponentProps<typeof RadioButton>> = (props) =>
    Platform.OS === 'ios' ? <ThemedRadioButtonIOS {...props} /> : <ThemedRadioButtonAndroid {...props} />;

const ThemedRadioButtonGroup: React.FC<React.ComponentProps<typeof RadioButton.Group>> = (props) => (
    <RadioButton.Group {...props} />
);

/**
 * ThemedRadioButton component
 *
 * This component is a wrapper around the React Native Paper [RadioButton](https://callstack.github.io/react-native-paper/radio-button.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 *
 * Note: We do not provide a wrapper around the `RadioButton.Item` component. This component from RNP uses the unstyled RadioButton components
 * and unstyled text, so we do not recommend using it. If you wish to have this behavior, you should implement your own component making
 * use of the PX Blue `Typography` components and the `ThemedRadioButton` provided here.
 */
export const ThemedRadioButton = Object.assign(ThemedRadioButtonComponent, {
    Android: ThemedRadioButtonAndroid,
    IOS: ThemedRadioButtonIOS,
    Group: ThemedRadioButtonGroup,
});
