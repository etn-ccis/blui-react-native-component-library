import React from 'react';
import { ProgressBar } from './ProgressBar';
import { cleanup } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';

describe('ProgressBar', () => {
    afterEach(cleanup);
    it('ProgressBar Renders', () => {
        const tree = TestRenderer.create(<ProgressBar progress={0.5} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
