import React from 'react';
import { BottomNavigation, Provider, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';
import * as PXBColors from '@pxblue/colors';

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
        { colors: { notification: defaultTheme.colors.errorPalette.main } },
        { colors: { notification: defaultTheme.colors.errorPalette.dark } }
    );
    const fullTheme = useTheme(theme);

    const activeColor =
        props.activeColor || (fullTheme.dark ? PXBColors.blue[200] : fullTheme.colors.textPalette.onPrimary.main); // TODO from theme
    const inactiveColor = props.inactiveColor || (fullTheme.dark ? PXBColors.black[200] : PXBColors.blue[200]); // TODO from theme

    return (
        <Provider theme={fullTheme}>
            <BottomNavigation
                {...other}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                barStyle={Object.assign(
                    fullTheme.dark ? { backgroundColor: PXBColors.black[800] /* TODO get from theme */ } : {},
                    props.barStyle
                )}
                theme={theme}
            />
        </Provider>
    );
};
