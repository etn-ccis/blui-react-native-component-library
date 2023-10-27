import React from 'react';
import TestRenderer from 'react-test-renderer';
import { StyleSheet, ViewStyle } from 'react-native';
import { cleanup } from '@testing-library/react-native';
import { Spacer } from './Spacer';

describe('spacer', () => {
    afterEach(cleanup);
    it('renders the correct default style', () => {
        const instance = TestRenderer.create(<Spacer />).root;
        const spacer = instance.find((x) => x.props.testID === 'spacer-root');
        expect(spacer.props.style).toMatchObject([
            {
                flex: 1,
                width: 'auto',
                height: 'auto',
            },
            undefined,
            undefined,
        ]);
    });

    it('passes in the inherited view props', () => {
        const instance = TestRenderer.create(<Spacer removeClippedSubviews={true} />).root;
        const spacer = instance.find((x) => x.props.testID === 'spacer-root');
        expect(spacer.props).toMatchObject({ removeClippedSubviews: true });
    });

    it('renders flex properties', () => {
        let instance = TestRenderer.create(<Spacer flex={2} />).root;
        let spacer = instance.find((x) => x.props.testID === 'spacer-root');
        expect(spacer.props.style).toMatchObject([
            {
                flex: 2,
                width: 'auto',
                height: 'auto',
            },
            undefined,
            undefined,
        ]);

        instance = TestRenderer.create(<Spacer flex={3} />).root;
        spacer = instance.find((x) => x.props.testID === 'spacer-root');
        expect(spacer.props.style).toMatchObject([
            {
                flex: 3,
                width: 'auto',
                height: 'auto',
            },
            undefined,
            undefined,
        ]);

        instance = TestRenderer.create(<Spacer flex={0} />).root;
        spacer = instance.find((x) => x.props.testID === 'spacer-root');
        expect(spacer.props.style).toMatchObject([
            {
                flex: 0,
                width: 'auto',
                height: 'auto',
            },
            undefined,
            undefined,
        ]);
    });

    it('renders static properties', () => {
        const instance = TestRenderer.create(<Spacer flex={0} width={42} height={123} />).root;
        const spacer = instance.find((x) => x.props.testID === 'spacer-root');
        expect(spacer.props.style).toMatchObject([
            {
                flex: 0,
                width: 42,
                height: 123,
            },
            undefined,
            undefined,
        ]);
    });

    it('accepts style overrides', () => {
        const spacerStyles: StyleSheet.NamedStyles<{
            root: ViewStyle;
        }> = StyleSheet.create({
            root: {
                flexGrow: 12,
                color: 'red',
                height: '30%',
                width: '1rem',
            },
        });
        const instance = TestRenderer.create(<Spacer styles={spacerStyles} style={{ borderRadius: 3 }} />).root;
        const spacer = instance.find((x) => x.props.testID === 'spacer-root');
        expect(spacer.props.style).toMatchObject([
            { flex: 1, height: 'auto', width: 'auto' },
            { color: 'red', flexGrow: 12, height: '30%', width: '1rem' },
            { borderRadius: 3 },
        ]);
    });
});
