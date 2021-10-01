import React from 'react';
import { Appbar } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedAppbarProps = React.ComponentProps<typeof Appbar>;

/**
 * ThemedAppbar component
 *
 * This component is a wrapper around the React Native Paper [Appbar](https://callstack.github.io/react-native-paper/appbar.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for PX Blue projects.
 */
export const ThemedAppbar: React.FC<ThemedAppbarProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useAlternateTheme(themeOverride);

    return <Appbar {...other} theme={theme} />;
};
