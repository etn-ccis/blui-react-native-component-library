import React from 'react';
import { BottomNavigation, Provider, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';
import Color from 'color';

export type ThemedBottomNavigationProps = React.ComponentProps<typeof BottomNavigation>;

/**
 * ThemedBottomNavigation component
 *
 * This component is a wrapper around the React Native Paper [BottomNavigation](https://callstack.github.io/react-native-paper/bottom-navigation.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedBottomNavigation: React.FC<ThemedBottomNavigationProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const defaultTheme = useTheme(themeOverride);
    const theme = useAlternateTheme(
        themeOverride,
        { colors: { notification: defaultTheme.colors.errorPalette?.main || defaultTheme.colors.error } },
        { colors: { notification: defaultTheme.colors.errorPalette?.dark || defaultTheme.colors.error } }
    );
    const fullTheme = useTheme(theme);

    const activeColor =
        props.activeColor ||
        (fullTheme.dark ? fullTheme.colors.primaryPalette?.main : fullTheme.colors.textPalette?.onPrimary?.main) ||
        fullTheme.colors.text;
    const inactiveColor =
        props.inactiveColor ||
        fullTheme.colors.overrides?.bottomNavigation?.inactive ||
        (fullTheme.dark
            ? fullTheme.colors.textPalette?.onPrimary?.main
            : Color(fullTheme.colors.textPalette?.onPrimary?.main).alpha(0.5).string()) ||
        fullTheme.colors.placeholder;

    return (
        <Provider theme={fullTheme}>
            <BottomNavigation
                {...other}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                barStyle={Object.assign(
                    fullTheme.dark
                        ? { backgroundColor: fullTheme.colors.actionPalette?.background || fullTheme.colors.primary }
                        : {},
                    props.barStyle
                )}
                theme={theme}
            />
        </Provider>
    );
};
