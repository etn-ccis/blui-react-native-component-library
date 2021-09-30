import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';

const ThemedIconAvatar: typeof Avatar.Icon = (props) => {
    const { theme: themeOverride, style: styleProp, color: colorProp, ...other } = props;
    const theme = useTheme(themeOverride);

    const style = Object.assign(
        theme.dark
            ? {
                  backgroundColor:
                      theme.colors.overrides.avatar?.background ||
                      theme.colors.primaryPalette.main ||
                      theme.colors.primary,
              }
            : {
                  backgroundColor: theme.colors.primaryPalette.light,
              },
        styleProp
    );

    return (
        <Avatar.Icon
            {...other}
            style={style}
            color={colorProp || (theme.dark ? theme.colors.textPalette.primary : theme.colors.primaryPalette.main)}
            theme={themeOverride}
        />
    );
};

const ThemedImageAvatar: typeof Avatar.Image = (props) => {
    const { theme: themeOverride, style: styleProp, ...other } = props;
    const theme = useTheme(themeOverride);

    const style = Object.assign(
        theme.dark
            ? {
                  backgroundColor:
                      theme.colors.overrides.avatar?.background ||
                      theme.colors.primaryPalette.main ||
                      theme.colors.primary,
              }
            : {
                  backgroundColor: theme.colors.primaryPalette.light,
              },
        styleProp
    );

    return <Avatar.Image {...other} style={style} theme={themeOverride} />;
};

const ThemedTextAvatar: typeof Avatar.Text = (props) => {
    const { theme: themeOverride, style: styleProp, color: colorProp, ...other } = props;
    const theme = useTheme(themeOverride);

    const style = Object.assign(
        theme.dark
            ? {
                  backgroundColor:
                      theme.colors.overrides.avatar?.background ||
                      theme.colors.primaryPalette.main ||
                      theme.colors.primary,
              }
            : {
                  backgroundColor: theme.colors.primaryPalette.light,
              },
        styleProp
    );

    return (
        <Avatar.Text
            {...other}
            style={style}
            color={colorProp || (theme.dark ? theme.colors.textPalette.primary : theme.colors.primaryPalette.main)}
            theme={themeOverride}
        />
    );
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
};
