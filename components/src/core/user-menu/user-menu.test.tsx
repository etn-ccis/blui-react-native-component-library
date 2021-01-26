import React from 'react';
import { UserMenu } from '.';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { Avatar } from 'react-native-paper';

describe('UserMenu', () => {
    it('should render avatar with correct label', () => {
        const userMenu = TestRenderer.create(<UserMenu avatar={<Avatar.Text label={'PX'} />} />).root;
        const avatar: ReactTestInstance[] = userMenu.findAllByType(Avatar.Text);
        expect(avatar[0].props.label).toContain('PX');
    });
});
