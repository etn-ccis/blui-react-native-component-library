import React from 'react';
import { UserMenu } from '.';
import TestRenderer from 'react-test-renderer';
import { Avatar } from 'react-native-paper';

describe('UserMenu', () => {
    it('renders UserMenu', () => {
        const instance = TestRenderer.create(<UserMenu avatar={<Avatar.Text label={'PX'} />} />).root;
        expect(instance).toBeTruthy();
    });
});
