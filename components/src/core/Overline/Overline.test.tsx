import React from 'react';
import { Overline } from '.';
import { cleanup } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';

describe('Overline', () => {
    afterEach(cleanup);
    it('Overline Renders', () => {
        const tree = TestRenderer.create(<Overline>Overline</Overline>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders the color correctly', () => {
        const tree = TestRenderer.create(<Overline>Overline </Overline>).toJSON;
        expect(tree).toMatchSnapshot();
    });

    it('Accepts style override', () => {
        const tree = TestRenderer.create(<Overline style={{ color: 'blue', fontSize: 9 }}>Overline </Overline>).toJSON;
        expect(tree).toMatchSnapshot();
    });
});
