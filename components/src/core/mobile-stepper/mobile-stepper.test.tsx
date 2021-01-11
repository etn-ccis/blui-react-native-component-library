import React from 'react';
import { MobileStepper } from '.';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { ProgressBar } from 'react-native-paper';
import { View } from 'react-native';

describe('MobileStepper', () => {
    it('should render the correct number of steps', () => {
        const instance: ReactTestInstance = TestRenderer.create(<MobileStepper steps={5} activeStep={0} />).root;
        const dots = instance.findAllByType(View).filter((x) => x.props.testID === 'pxb-dot');
        expect(dots).toHaveLength(5);
    });

    it('should render progress indicator', () => {
        const instance: ReactTestInstance = TestRenderer.create(
            <MobileStepper steps={5} activeStep={0} variant={'progress'} />
        ).root;
        expect(instance.findAllByType(ProgressBar)).toHaveLength(1);
    });
});
