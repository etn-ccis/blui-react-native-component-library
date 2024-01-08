import React from 'react';
import { Avatar } from 'react-native-paper';
import { EdgeInsets } from 'react-native-safe-area-context';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import { UserMenu, UserMenuProps } from '.';

const defaultProps: UserMenuProps = {
    avatar: <Avatar.Text label={'BLUI'} />,
    menuItems: [{ title: 'Test Item' }],
};
jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: (): EdgeInsets => ({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }),
}));

describe('UserMenu', () => {
    afterEach(cleanup);

    it('should render avatar with correct label', () => {
        render(<UserMenu {...defaultProps} />);
        expect(screen.getByText('BLUI')).toBeDefined();
    });

    it('should render bottom sheet on avatar press', () => {
        const props = defaultProps;
        props.menuTitle = 'Bottom Sheet';
        render(<UserMenu {...props} />);
        expect(screen.queryByText('Bottom Sheet')).toBeNull();
        fireEvent.press(screen.getByText('BLUI'));
        expect(screen.getByText('Bottom Sheet')).toBeDefined();
    });

    it('should render bottom sheet InfoListItem with correct content', () => {
        const props = defaultProps;
        props.menuTitle = 'Bottom Sheet';
        props.menuItems = [{ title: 'Title', subtitle: 'Subtitle', info: 'Info' }];
        render(<UserMenu {...props} />);
        expect(screen.queryByText('Title')).toBeNull();
        expect(screen.queryByText('Subtitle')).toBeNull();
        expect(screen.queryByText('Info')).toBeNull();
        fireEvent.press(screen.getByText('BLUI'));
        expect(screen.getByText('Title')).toBeDefined();
        expect(screen.getByText('Subtitle')).toBeDefined();
        expect(screen.getByText('Info')).toBeDefined();
    });
});
