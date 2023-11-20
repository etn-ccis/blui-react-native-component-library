import React from 'react';
import { Badge as PaperBadge, BadgeProps as PaperBadgeProps, MD3Theme, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { useFontScaleSettings } from '../__contexts__';

export type BadgeProps = Omit<PaperBadgeProps, 'theme'> & {
    theme?: $DeepPartial<MD3Theme>;
};

/**
 * Badge component
 *
 * This component is a wrapper around the React Native Paper [Badge](https://callstack.github.io/react-native-paper/docs/components/Badge)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */
export const Badge: React.FC<BadgeProps> = (props) => {
    const { theme: themeOverride, ...other } = props;
    const theme = useTheme(themeOverride);
    const { maxScale, disableScaling } = useFontScaleSettings();

    return <PaperBadge {...other} theme={theme} allowFontScaling={!disableScaling} maxFontSizeMultiplier={maxScale} />;
};
