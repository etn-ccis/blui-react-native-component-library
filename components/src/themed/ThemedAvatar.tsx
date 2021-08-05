import React from 'react';
import { Avatar } from 'react-native-paper';
import { useAltDarkTheme } from './hooks/useAltDarkTheme';

const ThemedIconAvatar: typeof Avatar.Icon = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useAltDarkTheme(themeOverride);

    return <Avatar.Icon {...other} theme={theme} />;
};

const ThemedImageAvatar: typeof Avatar.Image = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useAltDarkTheme(themeOverride);

    return <Avatar.Image {...other} theme={theme} />;
};

const ThemedTextAvatar: typeof Avatar.Text = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useAltDarkTheme(themeOverride);

    return <Avatar.Text {...other} theme={theme} />;
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