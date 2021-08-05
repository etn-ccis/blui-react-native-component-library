import React from 'react';
import { FAB, Provider, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { alternateDarkTheme } from './shared/alternateDarkTheme';

export type ThemedFABProps = React.ComponentProps<typeof FAB>;
const ThemedFABComponent: React.FC<ThemedFABProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useTheme(themeOverride);

    const altDarkTheme: $DeepPartial<ReactNativePaper.Theme> = Object.assign({
        ...alternateDarkTheme(theme)
    }, themeOverride);

    return <FAB {...other} theme={theme.dark ? altDarkTheme : themeOverride} />;

};

export type ThemedFABGroupProps = React.ComponentProps<typeof FAB.Group>;
/** 
 * ThemedFABGroup component
 * 
 * This component is a wrapper around the React Native Paper [FAB.Group](https://callstack.github.io/react-native-paper/fab-group.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides 
 * in order to make the component look the way we want for PX Blue projects.
 * 
 * **NOTE**: Because the underlying FAB.Group component directly uses the FAB component from RNP (instead of our ThemedFAB component),
 * we have to wrap this component in an additional theme Provider. This works because both the FAB and FAB.Group use the same
 * alternate styles in their modified themes.
 */
const ThemedFABGroupComponent: React.FC<ThemedFABGroupProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useTheme(themeOverride);

    const altDarkTheme: $DeepPartial<ReactNativePaper.Theme> = Object.assign({
        ...alternateDarkTheme(theme),
    }, themeOverride);

    const fullAlternateTheme = useTheme(altDarkTheme);

    return (
        <Provider theme={theme.dark ? fullAlternateTheme : theme}>
            <FAB.Group {...other} theme={theme.dark ? altDarkTheme : themeOverride} />
        </Provider>
    )
};

/** 
 * ThemedFAB component
 * 
 * This component is a wrapper around the React Native Paper [FAB](https://callstack.github.io/react-native-paper/fab.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides 
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedFAB = Object.assign(
    ThemedFABComponent,
    {
        Group: ThemedFABGroupComponent,
    }
);
