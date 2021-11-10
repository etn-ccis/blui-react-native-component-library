import React from 'react';
import { Divider, useTheme } from 'react-native-paper';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedDividerProps = React.ComponentProps<typeof Divider>;

/**
 * ThemedDivider component
 *
 * This component is a wrapper around the React Native Paper [Divider](https://callstack.github.io/react-native-paper/divider.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
export const ThemedDivider: React.FC<ThemedDividerProps> = (props) => {
    const { theme: themeOverride, style, ...other } = props;
    const theme = useAlternateTheme(themeOverride);
    const fullTheme = useTheme(theme);

    const finalStyle = Object.assign({ backgroundColor: fullTheme.colors.divider }, style);

    return <Divider {...other} style={finalStyle} theme={theme} />;
};
