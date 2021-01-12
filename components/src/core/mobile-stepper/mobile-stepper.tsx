import React from 'react';
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import * as Colors from '@pxblue/colors';
import { $DeepPartial } from '@callstack/react-theme-provider';

const makeStyles = (
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
            backgroundColor: Colors.gray['200'],
        },
        filled: {
            backgroundColor: theme.colors.primary,
        },
        progressBar: {},
        text: {},
    });

export type MobileStepperProps = {
    activeStep: number;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
    steps: number;
    theme?: $DeepPartial<ReactNativePaper.Theme>;
    variant?: 'dots' | 'text' | 'progress';
    styles?: {
        root?: StyleProp<ViewStyle>;
        circle?: StyleProp<ViewStyle>;
        filled?: StyleProp<ViewStyle>;
        stepperContainer?: StyleProp<ViewStyle>;
        progressBar?: StyleProp<ViewStyle>;
        text?: StyleProp<ViewStyle>;
    };
};

export const MobileStepper: React.FC<MobileStepperProps> = (props) => {
    const { activeStep, leftButton, rightButton, steps, styles = {}, variant = 'dots' } = props;
    const theme = useTheme(props.theme);
    const defaultStyles = makeStyles(theme);
    const pageIndices = [...Array(steps).keys()];

    return (
        <View style={[defaultStyles.root, styles.root]}>
            {leftButton}
            <View style={[defaultStyles.stepperContainer, styles.stepperContainer]}>
                {variant === 'dots' &&
                    pageIndices.map((i) => {
                        const active = i === activeStep;
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
                    <Text style={[defaultStyles.text, styles.text]}>
                        {activeStep + 1} / {steps}
                    </Text>
                )}

                {variant === 'progress' && (
                    <View style={{ flex: 1 }}>
                        <ProgressBar
                            style={[defaultStyles.progressBar, styles.progressBar]}
                            progress={activeStep === 0 ? 0 : activeStep / (steps - 1)}
                            color={theme.colors.primary}
                        />
                    </View>
                )}
            </View>
            {rightButton}
        </View>
    );
};
