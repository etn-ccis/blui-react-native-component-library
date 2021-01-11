import React from 'react';
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import * as Colors from '@pxblue/colors';

const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
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
    });

export type MobileStepperProps = {
    activeStep: number;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
    steps: number;
    theme?: ReactNativePaper.Theme;
    variant?: 'dots' | 'text' | 'progress';
    styles?: {
        root?: StyleProp<ViewStyle>;
        circle?: StyleProp<ViewStyle>;
        filled?: StyleProp<ViewStyle>;
        stepperContainer?: StyleProp<ViewStyle>;
        progressBar?: StyleProp<ViewStyle>;
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
                        if (i === activeStep) {
                            return (
                                <View testID={'pxb-dot'} style={[defaultStyles.circle, styles.circle]} key={i}>
                                    <View style={[defaultStyles.filled, styles.filled]} />
                                </View>
                            );
                        }
                        return <View testID={'pxb-dot'} style={[defaultStyles.circle, styles.circle]} key={i}></View>;
                    })}

                {variant === 'text' && (
                    <Text>
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
