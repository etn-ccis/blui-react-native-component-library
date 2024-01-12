import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';
import { Chip } from './Chip';
import { Avatar } from 'react-native-paper';

describe('Chip component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders correctly with default props', () => {
        const tree = TestRenderer.create(<Chip>Text</Chip>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly in outlined mode', () => {
        const tree = TestRenderer.create(<Chip mode="outlined">Text</Chip>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly in elevated mode', () => {
        const tree = TestRenderer.create(<Chip mode="elevated">Text</Chip>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when selected', () => {
        const tree = TestRenderer.create(<Chip selected>Text</Chip>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when disabled', () => {
        const tree = TestRenderer.create(<Chip disabled>Text</Chip>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with an icon', () => {
        const tree = TestRenderer.create(
            <Chip icon={{ family: 'material-community', name: 'chart-pie' }}>Text</Chip>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with an avatar', () => {
        const avatar = <Avatar.Text label="AB" />;
        const tree = TestRenderer.create(<Chip avatar={avatar}>Text</Chip>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders only the icon when both an icon and an avatar are provided', () => {
        const avatar = <Avatar.Text label="AB" />;
        const tree = TestRenderer.create(
            <Chip icon={{ family: 'material-community', name: 'chart-pie' }} avatar={avatar}>
                Text
            </Chip>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with avatar', () => {
        const { getByTestId } = render(
            <Chip avatar={<Avatar.Text label="AB" testID="avatar" />} testID="chip">
                CHIP
            </Chip>
        );

        const avatarElement = getByTestId('avatar');
        expect(avatarElement).toBeTruthy();
    });
});
