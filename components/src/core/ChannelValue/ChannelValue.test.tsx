import React from 'react';
import { ChannelValue } from '.';
import { cleanup } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';

describe('ChannelValue', () => {
    afterEach(cleanup);
    it('ChannelValue Renders', () => {
        const tree = TestRenderer.create(<ChannelValue value="2" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders the background color and font color correctly', () => {
        const tree = TestRenderer.create(
            <ChannelValue
                value="50"
                units="%"
                icon={{ family: 'material-community', name: 'chart-pie' }}
                iconColor="red"
            />
        ).toJSON;
        expect(tree).toMatchSnapshot();
    });

    it('Accepts style override', () => {
        const tree = TestRenderer.create(<ChannelValue value="2" style={{ backgroundColor: 'red' }} />).toJSON;
        expect(tree).toMatchSnapshot();
    });
});
