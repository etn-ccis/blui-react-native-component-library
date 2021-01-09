import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import * as Colors from '@pxblue/colors';

const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            margin: 16,
        },
        stepperContainer: {
            flexDirection: 'row',
        },
        circle: {
            height: 8,
            width: 8,
            borderRadius: 20,
            marginRight: 8,
            overflow: 'hidden',
            backgroundColor: Colors.gray['200'],
        },
        filled: {
            position: 'absolute',
            height: 8,
            width: 8,
            borderRadius: 20,
            backgroundColor: theme.colors.primary,
        },
        progressBar: {
            // @TODO: Fix this fixed width style; Without setting a width the progress bar has a width of 0 and flex doesn't seem to work;
            width: 100,
        },
    });

export type MobileStepperProps = {
    activeStep: number;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
    steps: number;
    theme?: ReactNativePaper.Theme;
    variant?: 'dots' | 'text' | 'progress';
};

export const MobileStepper: React.FC<MobileStepperProps> = (props) => {
    const { activeStep, leftButton, rightButton, steps, variant = 'dots' } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(theme);
    const pageIndices = [...Array(steps).keys()];

    // @TODO: should this use useCallback?
    const getProgressFill = (): number => (activeStep === 0 ? 0 : activeStep / (steps - 1));

    return (
        <View style={styles.container}>
            {leftButton}
            <View style={styles.stepperContainer}>
                {variant === 'dots' &&
                    pageIndices.map((i) => {
                        if (i === activeStep) {
                            return (
                                <View style={styles.circle} key={i}>
                                    <View style={[styles.filled]} />
                                </View>
                            );
                        }
                        return <View style={styles.circle} key={i}></View>;
                    })}

                {variant === 'text' && (
                    <Text>
                        {activeStep + 1} / {steps}
                    </Text>
                )}

                {variant === 'progress' && (
                    <ProgressBar style={styles.progressBar} progress={getProgressFill()} color={theme.colors.primary} />
                )}
            </View>
            {rightButton}
        </View>
    );
};
