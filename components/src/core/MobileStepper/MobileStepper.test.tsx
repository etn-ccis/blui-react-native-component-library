import React from 'react';
import { MobileStepper } from '.';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { ProgressBar } from 'react-native-paper';
import { View } from 'react-native';
import { cleanup } from '@testing-library/react-native';

describe('MobileStepper', () => {
    afterEach(cleanup);
    it('should render typical number of steps', () => {
        const stepper: ReactTestInstance = TestRenderer.create(<MobileStepper steps={5} activeStep={2} />).root;
        const dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');
        expect(dots).toHaveLength(5);
    });

    it('should render at least 1 step', () => {
        // Edge cases for number of steps
        let stepper = TestRenderer.create(<MobileStepper steps={0} activeStep={3} />).root;
        let dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');
        expect(dots).toHaveLength(1);

        stepper = TestRenderer.create(<MobileStepper steps={-1} activeStep={3} />).root;
        dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');
        expect(dots).toHaveLength(1);

        stepper = TestRenderer.create(<MobileStepper steps={-10} activeStep={3} />).root;
        dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');
        expect(dots).toHaveLength(1);
    });

    it('should render progress indicator', () => {
        const instance: ReactTestInstance = TestRenderer.create(
            <MobileStepper steps={5} activeStep={0} variant={'progress'} />
        ).root;
        expect(instance.findAllByType(ProgressBar)).toHaveLength(1);
    });

    it('should render activeStep within available range', () => {
        const theme = { colors: { primary: '#007bc1' } };

        // typical use
        let stepper = TestRenderer.create(<MobileStepper steps={5} activeStep={2} theme={theme} />).root;
        let dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');
        expect(dots[2].props.style[2]).toMatchObject({
            backgroundColor: '#007bc1',
        });

        // edge case beyond available steps
        stepper = TestRenderer.create(<MobileStepper steps={5} activeStep={10} theme={theme} />).root;
        dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');
        expect(dots[4].props.style[2]).toMatchObject({
            backgroundColor: '#007bc1',
        });

        // edge case zero
        stepper = TestRenderer.create(<MobileStepper steps={5} activeStep={0} theme={theme} />).root;
        dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');
        expect(dots[0].props.style[2]).toMatchObject({
            backgroundColor: '#007bc1',
        });

        // edge case negative
        stepper = TestRenderer.create(<MobileStepper steps={5} activeStep={-1} theme={theme} />).root;
        dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');
        expect(dots[0].props.style[2]).toMatchObject({
            backgroundColor: '#007bc1',
        });
    });

    it('should render steps with the correct color', () => {
        const stepper = TestRenderer.create(
            <MobileStepper steps={5} activeStep={0} activeColor={'#FF0000'} inactiveColor={'#DEADBEEF'} />
        ).root;
        const dots = stepper.findAllByType(View).filter((x) => x.props.testID === 'blui-dot');

        // test active item color
        expect(dots[0].props.style[2]).toMatchObject({
            backgroundColor: '#FF0000',
        });

        // test inactive item color
        expect(dots[1].props.style[0]).toMatchObject({
            backgroundColor: '#DEADBEEF',
        });
    });
});
