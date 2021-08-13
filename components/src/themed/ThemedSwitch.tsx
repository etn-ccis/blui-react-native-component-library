import React from 'react';
import { Switch, useTheme } from 'react-native-paper';
import * as PXBColors from '@pxblue/colors';
import Color from 'color';
import { Platform } from 'react-native';

export type ThemedSwitchProps = React.ComponentProps<typeof Switch>;
const getTrackColor: (props: ThemedSwitchProps, theme: ReactNativePaper.Theme) => { true: string; false: string } = (
    props,
    theme
) => {
    const ios = Platform.OS === 'ios';
    const disabledAndroid = !ios && props.disabled;

    if (theme.dark) {
        return {
            true: ios
                ? theme.colors.primaryPalette.main
                : Color(theme.colors.primaryPalette.main)
                      .alpha(props.disabled ? 0.25 : 0.5)
                      .string(),
            false: Color(PXBColors.black[300])
                .alpha(disabledAndroid ? 0.18 : 0.36)
                .string(),
        };
    }
    return {
        true: ios
            ? theme.colors.primaryPalette.main
            : Color(theme.colors.primaryPalette.main)
                  .alpha(props.disabled ? 0.19 : 0.38)
                  .string(),
        false: Color(PXBColors.black[100])
            .alpha(disabledAndroid ? 0.19 : 0.38)
            .string(),
    };
};
const getThumbColor: (props: ThemedSwitchProps, theme: ReactNativePaper.Theme) => string = (props, theme) => {
    if (Platform.OS === 'ios') return 'white';

    if (props.value)
        return Color(theme.colors.primaryPalette.main)
            .mix(Color(theme.colors.surface), props.disabled ? 0.5 : 0)
            .string();

    return theme.dark
        ? Color(PXBColors.black[50])
              .mix(Color(theme.colors.surface), props.disabled ? 0.5 : 0)
              .string()
        : Color('white')
              .mix(Color(theme.colors.surface), props.disabled ? 0.5 : 0)
              .string();
};

/**
 * ThemedSwitch component
 *
 * This component is a wrapper around the React Native Paper [Switch](https://callstack.github.io/react-native-paper/switch.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedSwitch: React.FC<ThemedSwitchProps> = (props) => {
    const { color, theme: themeOverride } = props;
    const theme = useTheme(themeOverride);

    return color ? (
        <Switch {...props} />
    ) : (
        <Switch
            ios_backgroundColor={
                // disabled only
                theme.dark ? theme.colors.actionPalette.disabled : Color(PXBColors.black[100]).alpha(0.38).string()
            }
            thumbColor={getThumbColor(props, theme)}
            trackColor={getTrackColor(props, theme)}
            {...props}
        />
    );
};
