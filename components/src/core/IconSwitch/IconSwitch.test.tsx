import React from 'react';
import { cleanup } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';
import { IconSwitch } from './IconSwitch';

describe('IconSwitch component', () => {
    afterEach(() => {
        cleanup();
    });

    test('should render with default props', () => {
        const tree = TestRenderer.create(<IconSwitch />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render with turned on state', () => {
        const tree = TestRenderer.create(<IconSwitch value />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render with turned on state and icon', () => {
        const tree = TestRenderer.create(<IconSwitch value showIcon />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render icon switch', () => {
        const tree = TestRenderer.create(<IconSwitch showIcon />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render disabled switch with turned on state', () => {
        const tree = TestRenderer.create(<IconSwitch value disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render disabled switch with turned on state and icon', () => {
        const tree = TestRenderer.create(<IconSwitch value showIcon disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render disabled switch ', () => {
        const tree = TestRenderer.create(<IconSwitch disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render disabled switch with icon', () => {
        const tree = TestRenderer.create(<IconSwitch disabled showIcon />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
