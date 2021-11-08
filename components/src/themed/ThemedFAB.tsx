import React from 'react';
import { FAB, Provider, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedFABProps = React.ComponentProps<typeof FAB>;
const ThemedFABComponent: React.FC<ThemedFABProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const fullTheme = useTheme(themeOverride);
    const theme = useAlternateTheme(
        themeOverride,
        { colors: { accent: fullTheme.colors.primaryPalette?.main || fullTheme.colors.primary } },
        { colors: { accent: fullTheme.colors.primaryPalette?.dark || fullTheme.colors.primary } }
    );

    return <FAB {...other} theme={theme} />;
};

export type ThemedFABGroupProps = React.ComponentProps<typeof FAB.Group>;
/**
 * ThemedFABGroup component
 *
 * This component is a wrapper around the React Native Paper [FAB.Group](https://callstack.github.io/react-native-paper/fab-group.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 *
 * **NOTE**: Because the underlying FAB.Group component directly uses the FAB component from RNP (instead of our ThemedFAB component),
 * we have to wrap this component in an additional theme Provider. This works because both the FAB and FAB.Group use the same
 * alternate styles in their modified themes.
 */
const ThemedFABGroupComponent: React.FC<ThemedFABGroupProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const defaultTheme = useTheme(themeOverride);
    const theme = useAlternateTheme(
        themeOverride,
        { colors: { accent: defaultTheme.colors.primaryPalette?.main || defaultTheme.colors.primary } },
        { colors: { accent: defaultTheme.colors.primaryPalette?.dark || defaultTheme.colors.primary } }
    );

    const fullTheme = useTheme(theme);

    return (
        <Provider theme={fullTheme}>
            <FAB.Group {...other} theme={theme} />
        </Provider>
    );
};

/**
 * ThemedFAB component
 *
 * This component is a wrapper around the React Native Paper [FAB](https://callstack.github.io/react-native-paper/fab.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
export const ThemedFAB = Object.assign(ThemedFABComponent, {
    Group: ThemedFABGroupComponent,
});
