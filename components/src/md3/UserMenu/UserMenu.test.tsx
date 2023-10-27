import React from 'react';
import { Avatar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import { UserMenu, UserMenuProps } from '.';

const initialSafeAreaMetrics = {
    frame: { x: 0, y: 0, width: 320, height: 640 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const defaultProps: UserMenuProps = {
    avatar: <Avatar.Text label={'BLUI'} />,
    menuItems: [{ title: 'Test Item' }],
};

const renderer = (props = defaultProps): React.ReactNode =>
    render(
        <SafeAreaProvider initialMetrics={initialSafeAreaMetrics}>
            <UserMenu {...props} />
        </SafeAreaProvider>
    );

describe('UserMenu', () => {
    afterEach(cleanup);

    it('should render avatar with correct label', () => {
        renderer();
        expect(screen.getByText('BLUI')).toBeDefined();
    });

    it('should render bottom sheet on avatar press', () => {
        const props = defaultProps;
        props.menuTitle = 'Bottom Sheet';
        renderer(props);
        expect(screen.queryByText('Bottom Sheet')).toBeNull();
        fireEvent.press(screen.getByText('BLUI'));
        expect(screen.getByText('Bottom Sheet')).toBeDefined();
    });

    it('should render bottom sheet InfoListItem with correct content', () => {
        const props = defaultProps;
        props.menuTitle = 'Bottom Sheet';
        props.menuItems = [{ title: 'Title', subtitle: 'Subtitle', info: 'Info' }];
        renderer(props);
        expect(screen.queryByText('Title')).toBeNull();
        expect(screen.queryByText('Subtitle')).toBeNull();
        expect(screen.queryByText('Info')).toBeNull();
        fireEvent.press(screen.getByText('BLUI'));
        expect(screen.getByText('Title')).toBeDefined();
        expect(screen.getByText('Subtitle')).toBeDefined();
        expect(screen.getByText('Info')).toBeDefined();
    });
});
