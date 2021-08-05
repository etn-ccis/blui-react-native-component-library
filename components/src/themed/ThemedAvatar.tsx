import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { alternateDarkTheme } from './shared/alternateDarkTheme';

const ThemedIconAvatar: typeof Avatar.Icon = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useTheme(themeOverride);

    const altDarkTheme: $DeepPartial<ReactNativePaper.Theme> = Object.assign({
        ...alternateDarkTheme(theme)
    }, themeOverride);

    return <Avatar.Icon {...other} theme={theme.dark ? altDarkTheme : themeOverride} />;
};

const ThemedImageAvatar: typeof Avatar.Image = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useTheme(themeOverride);

    const altDarkTheme: $DeepPartial<ReactNativePaper.Theme> = Object.assign({
        ...alternateDarkTheme(theme)
    }, themeOverride);

    return <Avatar.Image {...other} theme={theme.dark ? altDarkTheme : themeOverride} />;
};

const ThemedTextAvatar: typeof Avatar.Text = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useTheme(themeOverride);

    const altDarkTheme: $DeepPartial<ReactNativePaper.Theme> = Object.assign({
        ...alternateDarkTheme(theme)
    }, themeOverride);

    return <Avatar.Text {...other} theme={theme.dark ? altDarkTheme : themeOverride} />;
};

/** 
 * ThemedAvatar component
 * 
 * This component is a wrapper around the React Native Paper [Avatar](https://callstack.github.io/react-native-paper/avatar-icon.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides 
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedAvatar = {
    Icon: ThemedIconAvatar,
    Image: ThemedImageAvatar,
    Text: ThemedTextAvatar,
}