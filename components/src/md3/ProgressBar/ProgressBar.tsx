import React from 'react';
import {
    MD3Theme,
    ProgressBar as PaperProgressBar,
    ProgressBarProps as PaperProgressBarProps,
    useTheme,
} from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';

/**
 * ProgressBar component
 *
 * This component is a wrapper around the React Native Paper [ProgressBar](https://callstack.github.io/react-native-paper/progress-bar.html)
 * component. It accepts all the same props as the RNP component. The wrapper simply performs some minor theme / style overrides
 * in order to make the component look the way we want for Brightlayer UI projects.
 */

export type ProgressBarProps = Omit<PaperProgressBarProps, 'theme'> & {
    theme?: $DeepPartial<MD3Theme>;
};

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
    const { theme: themeOverride, ...otherProgressBarProps } = props;
    const theme = useTheme(themeOverride);

    return <PaperProgressBar {...otherProgressBarProps} theme={theme} />;
};
