import React from 'react';
import { cleanup } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';
import { IconSwitch } from './IconSwitch';

describe('IconSwitch component', () => {
    afterEach(() => {
        cleanup();
    });

    const mockOnValueChange = jest.fn();

    test('should render with default props', () => {
        const tree = TestRenderer.create(<IconSwitch value={false} onValueChange={mockOnValueChange} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render with turned on state', () => {
        const tree = TestRenderer.create(<IconSwitch value={true} onValueChange={mockOnValueChange} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render with turned on state and icon', () => {
        const tree = TestRenderer.create(
            <IconSwitch value={true} showIcon onValueChange={mockOnValueChange} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render icon switch', () => {
        const tree = TestRenderer.create(
            <IconSwitch value={false} showIcon onValueChange={mockOnValueChange} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render disabled switch with turned on state', () => {
        const tree = TestRenderer.create(
            <IconSwitch value={true} disabled onValueChange={mockOnValueChange} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render disabled switch with turned on state and icon', () => {
        const tree = TestRenderer.create(
            <IconSwitch value={true} showIcon disabled onValueChange={mockOnValueChange} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render disabled switch', () => {
        const tree = TestRenderer.create(
            <IconSwitch value={false} disabled onValueChange={mockOnValueChange} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render disabled switch with icon', () => {
        const tree = TestRenderer.create(
            <IconSwitch value={false} disabled showIcon onValueChange={mockOnValueChange} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
