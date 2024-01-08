import React from 'react';
import { cleanup } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';
import { EmptyState } from '.';

describe('EmptyState', () => {
    afterEach(cleanup);

    it('renders correctly with title and description', () => {
        const tree = TestRenderer.create(
            <EmptyState title="Empty State Title" description="Empty State Description" />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with custom icon size and color', () => {
        const tree = TestRenderer.create(
            <EmptyState title="Empty State Title" iconSize={150} iconColor="blue" />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with custom styles', () => {
        const customStyles = {
            root: { backgroundColor: 'red' },
            title: { fontSize: 24 },
            description: { color: 'green' },
            actions: { marginTop: 20 },
        };

        const tree = TestRenderer.create(
            <EmptyState title="Empty State Title" description="Empty State Description" styles={customStyles} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with empty props', () => {
        const tree = TestRenderer.create(<EmptyState title="Empty State Title" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different icon sources', () => {
        const tree = TestRenderer.create(
            <EmptyState title="Empty State Title" icon={{ uri: 'https://example.com/icon.png' }} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with long title and description', () => {
        const tree = TestRenderer.create(
            <EmptyState
                title="This is a very long title that should wrap to the next line"
                description="This is a very long description that should wrap to the next line. It contains more information about the empty state."
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different theme overrides', () => {
        const themeOverride = {
            colors: {
                primary: 'purple',
            },
        };

        const tree = TestRenderer.create(
            <EmptyState title="Empty State Title" description="Empty State Description" theme={themeOverride} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('renders correctly with dynamic data', () => {
    //     const dynamicTitle = Math.random() > 0.5 ? 'Data Available' : 'No Data';
    //     const dynamicDescription = Math.random() > 0.5 ? 'Data is present' : 'Data is missing';

    //     const tree = TestRenderer.create(<EmptyState title={dynamicTitle} description={dynamicDescription} />).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    // it('renders correctly on different screen sizes', () => {
    //     // You may need to use a library like react-native-responsive-screen for this test
    //     // to simulate different screen sizes. It might not be achievable in a simple Jest test.
    //     // Example usage: https://github.com/marudy/react-native-responsive-screen
    //     // It allows you to mock different screen sizes for testing purposes.
    // });

    it('renders correctly with accessibility props', () => {
        const tree = TestRenderer.create(
            <EmptyState
                title="Empty State Title"
                description="Empty State Description"
                accessibilityLabel="custom-accessibility-label"
                accessible={true}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with edge case inputs', () => {
        const tree = TestRenderer.create(<EmptyState title={''} description="" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
