import React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { alternateDarkTheme } from './shared/alternateDarkTheme';

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
    const theme = useTheme(themeOverride);

    // TODO: Check if this needs additional styles for inactive items - review specs
    const altDarkTheme: $DeepPartial<ReactNativePaper.Theme> = Object.assign({
        ...alternateDarkTheme(theme)
    }, themeOverride);

    return <BottomNavigation {...other} theme={theme.dark ? altDarkTheme : themeOverride} />;

};