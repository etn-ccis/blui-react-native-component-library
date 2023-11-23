import React from 'react';
import { Badge } from './Badge';
import { cleanup } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';

describe('Badge', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        const tree = TestRenderer.create(<Badge size={24} visible />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
