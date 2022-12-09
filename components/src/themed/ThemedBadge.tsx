import React from 'react';
import { Badge, useTheme } from 'react-native-paper';
import { useFontScale } from '..';
import { useAlternateTheme } from './hooks/useAlternateTheme';

export type ThemedBadgeProps = React.ComponentProps<typeof Badge>;

/**
 * ThemedBadge component
 *
 * This component is a wrapper around the React Native Paper [Badge](https://callstack.github.io/react-native-paper/badge.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
export const ThemedBadge: React.FC<ThemedBadgeProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const fullTheme = useTheme(themeOverride);
    const theme = useAlternateTheme(
        themeOverride,
        { colors: { notification: fullTheme.colors.primaryPalette?.main || fullTheme.colors.primary } },
        { colors: { notification: fullTheme.colors.primaryPalette?.dark || fullTheme.colors.primary } }
    );
    const { maxScale, minScale, disableScaling } = useFontScale();

    return (
        <Badge
            {...other}
            theme={theme}
            allowFontScaling={!disableScaling}
            maxFontSizeMultiplier={maxScale}
            minimumFontScale={minScale}
        />
    );
};
