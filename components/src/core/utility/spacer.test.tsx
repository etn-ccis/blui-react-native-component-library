import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Spacer } from '.';
import { StyleSheet, ViewStyle } from 'react-native';

describe('spacer', () => {
    it('renders the correct default style', () => {
        const instance = TestRenderer.create(<Spacer />).root;
        const spacer = instance.find((x) => x.props.testID === 'spacer-root');
        expect(spacer.props.style).toMatchObject([
            {
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
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
                flexGrow: 2,
                flexShrink: 2,
                flexBasis: 0,
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
                flexGrow: 3,
                flexShrink: 3,
                flexBasis: 0,
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
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
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
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                width: 42,
                height: 123,
            },
            undefined,
            undefined,
        ]);
    });

    it('accepts style overrides', () => {
        const spacerStyles: StyleSheet.NamedStyles<{ root: ViewStyle }> = StyleSheet.create({
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
            { flexBasis: 0, flexGrow: 1, flexShrink: 1, height: 'auto', width: 'auto' },
            { color: 'red', flexGrow: 12, height: '30%', width: '1rem' },
            { borderRadius: 3 },
        ]);
    });
});
