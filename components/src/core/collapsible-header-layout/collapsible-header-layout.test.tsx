import React from 'react';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { CollapsibleHeaderLayout } from '.';

describe('CollapsibleHeaderLayout', () => {
    describe('with only required props', () => {
        let instance: ReactTestInstance;
        beforeEach(() => {
            instance = TestRenderer.create(<CollapsibleHeaderLayout />).root;
        });

        it('renders just the title element', () => {
            expect(instance).toBeTruthy();
        });
    });
});
