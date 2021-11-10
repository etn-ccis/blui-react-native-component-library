import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedProgressBarProps = React.ComponentProps<typeof ProgressBar>;

/**
 * ThemedProgressBar component
 *
 * This component is a wrapper around the React Native Paper [ProgressBar](https://callstack.github.io/react-native-paper/progress-bar.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
export const ThemedProgressBar: React.FC<ThemedProgressBarProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useAlternateTheme(themeOverride);

    return <ProgressBar {...other} theme={theme} />;
};
