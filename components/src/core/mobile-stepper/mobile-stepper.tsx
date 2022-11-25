import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, ViewProps } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import * as Colors from '@brightlayer-ui/colors';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Body1 } from '../typography';
import { getPrimary500 } from '../utility/shared';
import { useFontScaleContext } from '..';

const makeStyles = (
    props: MobileStepperProps,
    theme: ReactNativePaper.Theme
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    stepperContainer: ViewStyle;
    circle: ViewStyle;
    filled: ViewStyle;
    progressBar: ViewStyle;
    text: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            margin: 16,
        },
        stepperContainer: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        circle: {
            height: 8,
            width: 8,
            borderRadius: 8,
            marginHorizontal: 4,
            overflow: 'hidden',
            backgroundColor: props.inactiveColor || (theme.dark ? theme.colors.disabled : Colors.gray[200]),
        },
        filled: {
            backgroundColor:
                props.activeColor || (theme.dark ? theme.colors.primaryPalette.dark : theme.colors.primary),
        },
        progressBar: {},
        text: {},
    });

export type DotStepperVariant = 'dots' | 'text' | 'progress';

export type MobileStepperProps = ViewProps & {
    /**
     * Color of the active page indicator (dots & progress only)
     *
     * Default: Theme.color.primary
     */
    activeColor?: string;

    /** The index of the active step */
    activeStep: number;

    /** Color of the inactive step indicators */
    inactiveColor?: string;

    /** Content to render to the left of the step indicators
     *
     * Usually a Back or Previous button
     */
    leftButton?: JSX.Element;

    /** Content to render to the right of the step indicators
     *
     * Usually a Next or Finish button
     */
    rightButton?: JSX.Element;

    /** Total number of steps to display */
    steps: number;

    /** Which type of step indicator to use:
     * - dots: circles
     * - progress: progress bar
     * - text: text
     *
     * Default: 'dots'
     */
    variant?: DotStepperVariant;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        circle?: StyleProp<ViewStyle>;
        filled?: StyleProp<ViewStyle>;
        stepperContainer?: StyleProp<ViewStyle>;
        progressBar?: StyleProp<ViewStyle>;
        text?: StyleProp<ViewStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * keepInRange function
 *
 * This function takes a value and clamps it between the min and max supplied values.
 *
 * @param value the initial value
 * @param min the minimum allowed value
 * @param max the maximum allowed value
 * @returns the initial value restricted to the supplied range
 */
const keepInRange = (value: number, min?: number, max?: number): number => {
    let ret = value;
    if (min !== undefined) {
        ret = Math.max(min, ret);
    }
    if (max !== undefined) {
        ret = Math.min(max, ret);
    }
    return ret;
};

/**
 * [MobileStepper](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--mobile-stepper) component
 *
 * This component is used to show progress through a set of pages. It displays
 * the total number of pages or steps and which one is currently being displayed.
 *
 * This is based on the [MobileStepper](https://material-ui.com/components/steppers/#mobile-stepper) component from Material UI.
 */
export const MobileStepper: React.FC<MobileStepperProps> = (props) => {
    const theme = useTheme(props.theme);
    const { maxScaleFont, disableFontScaling } = useFontScaleContext();
    const {
        activeColor = getPrimary500(theme) || theme.colors.primary,
        activeStep,
        leftButton,
        rightButton,
        steps,
        style,
        styles = {},
        variant = 'dots',
        ...viewProps
    } = props;
    const defaultStyles = makeStyles(props, theme);

    const adjustedSteps = keepInRange(steps, 1);
    const adjustedActiveStep = keepInRange(activeStep, 0, adjustedSteps - 1);

    const pageIndices = [...Array(adjustedSteps).keys()];

    return (
        <View {...viewProps} style={[defaultStyles.root, styles.root, style]}>
            {leftButton}
            <View style={[defaultStyles.stepperContainer, styles.stepperContainer]}>
                {variant === 'dots' &&
                    pageIndices.map((i) => {
                        const active = i === adjustedActiveStep;
                        return (
                            <View
                                key={i}
                                testID={'blui-dot'}
                                style={[
                                    defaultStyles.circle,
                                    styles.circle,
                                    active ? defaultStyles.filled : {},
                                    active ? styles.filled : {},
                                ]}
                            />
                        );
                    })}

                {variant === 'text' && (
                    <Body1
                        style={[defaultStyles.text, styles.text]}
                        maxFontSizeMultiplier={maxScaleFont}
                        allowFontScaling={!disableFontScaling}
                    >
                        {adjustedActiveStep + 1} / {adjustedSteps}
                    </Body1>
                )}

                {variant === 'progress' && (
                    <View style={{ flex: 1 }}>
                        <ProgressBar
                            style={[defaultStyles.progressBar, styles.progressBar]}
                            progress={adjustedActiveStep / (adjustedSteps - 1)}
                            color={activeColor}
                        />
                    </View>
                )}
            </View>
            {rightButton}
        </View>
    );
};
