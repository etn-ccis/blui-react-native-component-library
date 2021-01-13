import React from 'react';
import { MobileStepper } from '.';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { ProgressBar } from 'react-native-paper';
import { View } from 'react-native';

describe('MobileStepper', () => {
    it('should render the correct number of steps', () => {
        const instanceTwo: ReactTestInstance = TestRenderer.create(<MobileStepper steps={2} activeStep={0} />).root;
        const dotsTwo = instanceTwo.findAllByType(View).filter((x) => x.props.testID === 'pxb-dot');
        const instanceThree: ReactTestInstance = TestRenderer.create(<MobileStepper steps={3} activeStep={0} />).root;
        const dotsThree = instanceThree.findAllByType(View).filter((x) => x.props.testID === 'pxb-dot');
        const instanceFive: ReactTestInstance = TestRenderer.create(<MobileStepper steps={5} activeStep={0} />).root;
        const dotsFive = instanceFive.findAllByType(View).filter((x) => x.props.testID === 'pxb-dot');
        expect(dotsTwo).toHaveLength(2);
        expect(dotsThree).toHaveLength(3);
        expect(dotsFive).toHaveLength(5);

        // @TODO: It seems as though there may be two immediate renders, one with the default state variable and a second with the updated state variable after useEffect
        // is called. This test might be checking the first render before the useEffect, we need to find a way to watch for useEffect or render the component after useEffect is called.
    });

    it('should render progress indicator', () => {
        const instance: ReactTestInstance = TestRenderer.create(
            <MobileStepper steps={5} activeStep={0} variant={'progress'} />
        ).root;
        expect(instance.findAllByType(ProgressBar)).toHaveLength(1);
    });

    it('should render at least 2 steps', () => {
        const instanceMinusFive: ReactTestInstance = TestRenderer.create(<MobileStepper steps={-5} activeStep={0} />)
            .root;
        const instanceZero: ReactTestInstance = TestRenderer.create(<MobileStepper steps={0} activeStep={0} />).root;
        const dotsMinusFive = instanceMinusFive.findAllByType(View).filter((x) => x.props.testID === 'pxb-dot');
        expect(dotsMinusFive).toHaveLength(2);
        const dotsZero = instanceZero.findAllByType(View).filter((x) => x.props.testID === 'pxb-dot');
        expect(dotsZero).toHaveLength(2);
    });
});
