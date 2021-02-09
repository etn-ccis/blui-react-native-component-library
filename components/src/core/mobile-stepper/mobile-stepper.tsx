import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import * as Colors from '@pxblue/colors';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Body1 } from '../typography';

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
            flex: 1,
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
            backgroundColor: props.inactiveColor || Colors.gray['200'],
        },
        filled: {
            backgroundColor: props.activeColor || theme.colors.primary,
        },
        progressBar: {},
        text: {},
    });

export type DotStepperVariant = 'dots' | 'text' | 'progress';

export type MobileStepperProps = {
    activeColor?: string;
    activeStep: number;
    inactiveColor?: string;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
    steps: number;
    theme?: $DeepPartial<ReactNativePaper.Theme>;
    variant?: DotStepperVariant;
    styles?: {
        root?: StyleProp<ViewStyle>;
        circle?: StyleProp<ViewStyle>;
        filled?: StyleProp<ViewStyle>;
        stepperContainer?: StyleProp<ViewStyle>;
        progressBar?: StyleProp<ViewStyle>;
        text?: StyleProp<ViewStyle>;
    };
};

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

export const MobileStepper: React.FC<MobileStepperProps> = (props) => {
    const { activeColor, activeStep, leftButton, rightButton, steps, styles = {}, variant = 'dots' } = props;
    const theme = useTheme(props.theme);
    const defaultStyles = makeStyles(props, theme);

    const adjustedSteps = keepInRange(steps, 1);
    const adjustedActiveStep = keepInRange(activeStep, 0, adjustedSteps - 1);

    const pageIndices = [...Array(adjustedSteps).keys()];

    return (
        <View style={[defaultStyles.root, styles.root]}>
            {leftButton}
            <View style={[defaultStyles.stepperContainer, styles.stepperContainer]}>
                {variant === 'dots' &&
                    pageIndices.map((i) => {
                        const active = i === adjustedActiveStep;
                        return (
                            <View
                                key={i}
                                testID={'pxb-dot'}
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
                    <Body1 style={[defaultStyles.text, styles.text]}>
                        {adjustedActiveStep + 1} / {adjustedSteps}
                    </Body1>
                )}

                {variant === 'progress' && (
                    <View style={{ flex: 1 }}>
                        <ProgressBar
                            style={[defaultStyles.progressBar, styles.progressBar]}
                            progress={adjustedActiveStep / (adjustedSteps - 1)}
                            color={activeColor || theme.colors.primary}
                        />
                    </View>
                )}
            </View>
            {rightButton}
        </View>
    );
};
