import React from 'react';
import { UserMenu } from '.';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { Avatar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { cleanup } from '@testing-library/react-native';

const initialSafeAreaMetrics = {
    frame: { x: 0, y: 0, width: 320, height: 640 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('UserMenu', () => {
    afterEach(cleanup);
    it('should render avatar with correct label', () => {
        const userMenu = TestRenderer.create(
            <SafeAreaProvider initialMetrics={initialSafeAreaMetrics}>
                <UserMenu avatar={<Avatar.Text label={'PX'} />} menuItems={[{ title: 'Test Item' }]} />
            </SafeAreaProvider>
        ).root;
        const avatar: ReactTestInstance[] = userMenu.findAllByType(Avatar.Text);
        expect(avatar[0].props.label).toContain('PX');
    });
});
