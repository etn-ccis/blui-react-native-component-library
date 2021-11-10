import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedActivityIndicator = React.ComponentProps<typeof ActivityIndicator>;

/**
 * ThemedActivityIndicator component
 *
 * This component is a wrapper around the React Native Paper [ActivityIndicator](https://callstack.github.io/react-native-paper/activity-indicator.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
export const ThemedActivityIndicator: React.FC<ThemedActivityIndicator> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useAlternateTheme(themeOverride);
    return <ActivityIndicator {...other} theme={theme} />;
};
