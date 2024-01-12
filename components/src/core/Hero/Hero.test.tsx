import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';
import { Hero } from './Hero';

describe('Hero', () => {
    afterEach(cleanup);

    it('renders correctly with label', () => {
        const tree = TestRenderer.create(<Hero label="Hero Label" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with icon', () => {
        const tree = TestRenderer.create(<Hero label="Hero Label" icon="your-icon-source" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with custom icon size and color', () => {
        const tree = TestRenderer.create(
            <Hero label="Hero Label" icon="your-icon-source" iconSize={30} iconColor="blue" />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with icon background color', () => {
        const tree = TestRenderer.create(
            <Hero label="Hero Label" icon="your-icon-source" iconBackgroundColor="yellow" />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with ChannelValueProps', () => {
        const tree = TestRenderer.create(<Hero label="Hero Label" ChannelValueProps={{ value: 100 }} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Hero label="Hero Label" onPress={onPressMock} />);

        fireEvent.press(getByText('Hero Label'));
        expect(onPressMock).toHaveBeenCalled();
    });
    it('renders correctly with custom styles', () => {
        const customStyles = {
            root: { backgroundColor: 'red' },
            iconWrapper: { borderColor: 'green' },
            values: { padding: 10 },
            label: { color: 'blue' },
        };

        const tree = TestRenderer.create(<Hero label="Hero Label" styles={customStyles} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
