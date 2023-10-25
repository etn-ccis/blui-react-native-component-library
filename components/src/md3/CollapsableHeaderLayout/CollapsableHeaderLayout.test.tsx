import React from 'react';
import { PixelRatio, ScrollView } from 'react-native';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { CollapsibleHeaderLayout } from './CollapsableHeaderLayout';
import { Header } from '../Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EdgeInsets } from '../__types__';
import { cleanup } from '@testing-library/react-native';
jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: (): EdgeInsets => ({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }),
}));
const insets = useSafeAreaInsets();
const fontScale = PixelRatio.getFontScale();
const heightWithStatusBar = (height: number): number => height * fontScale + insets.top;

describe('CollapsibleHeaderLayout', () => {
    afterEach(cleanup);
    let instance: ReactTestInstance;
    beforeEach(() => {
        instance = TestRenderer.create(<CollapsibleHeaderLayout HeaderProps={{ title: 'Hello' }} />).root;
    });

    it('renders without error', () => {
        expect(instance).toBeTruthy();
    });

    it('renders a Header component', () => {
        const header = instance.findByType(Header);
        expect(header).toBeTruthy();
    });

    it('renders a ScrollView component', () => {
        const sv = instance.findByType(ScrollView);
        expect(sv).toBeTruthy();
    });

    it('renders correct sizes - default props', () => {
        const sv = instance.findByType(ScrollView);
        const v = instance.findByProps({ testID: 'blui-padded-view' });
        expect(v.props.style.paddingTop.toJSON()).toEqual(heightWithStatusBar(200));
        expect(sv.props.contentOffset.y).toBe(heightWithStatusBar(200) - heightWithStatusBar(56));
    });

    it('renders correct sizes (static) - custom props', () => {
        instance = TestRenderer.create(
            <CollapsibleHeaderLayout
                HeaderProps={{
                    title: 'Hello',
                    expandedHeight: 500,
                    collapsedHeight: 200,
                }}
            />
        ).root;
        const sv = instance.findByType(ScrollView);
        const v = instance.findByProps({ testID: 'blui-padded-view' });
        expect(v.props.style.paddingTop.toJSON()).toEqual(heightWithStatusBar(500));
        expect(sv.props.contentOffset.y).toBe(heightWithStatusBar(500) - heightWithStatusBar(200));
    });

    it('renders correct sizes (dynamic) - custom props', () => {
        instance = TestRenderer.create(
            <CollapsibleHeaderLayout
                HeaderProps={{
                    title: 'Hello',
                    expandedHeight: 500,
                    collapsedHeight: 200,
                    variant: 'dynamic',
                }}
            />
        ).root;
        const sv = instance.findByType(ScrollView);
        const v = instance.findByProps({ testID: 'blui-padded-view' });
        expect(v.props.style.paddingTop.toJSON()).toEqual(heightWithStatusBar(500));
        expect(sv.props.contentOffset.y).toBe(heightWithStatusBar(500) - heightWithStatusBar(200));
    });

    it('renders correct sizes (static, startExpanded) - custom props', () => {
        instance = TestRenderer.create(
            <CollapsibleHeaderLayout
                HeaderProps={{
                    title: 'Hello',
                    expandedHeight: 500,
                    collapsedHeight: 200,
                    variant: 'static',
                    startExpanded: true,
                }}
            />
        ).root;
        const sv = instance.findByType(ScrollView);
        const v = instance.findByProps({ testID: 'blui-padded-view' });
        expect(v.props.style.paddingTop.toJSON()).toEqual(heightWithStatusBar(500));
        expect(sv.props.contentOffset.y).toBe(0);
    });

    it('renders correct sizes (dynamic, startExpanded) - custom props', () => {
        instance = TestRenderer.create(
            <CollapsibleHeaderLayout
                HeaderProps={{
                    title: 'Hello',
                    expandedHeight: 500,
                    collapsedHeight: 200,
                    variant: 'dynamic',
                    startExpanded: true,
                }}
            />
        ).root;
        const sv = instance.findByType(ScrollView);
        const v = instance.findByProps({ testID: 'blui-padded-view' });
        expect(v.props.style.paddingTop.toJSON()).toEqual(heightWithStatusBar(500));
        expect(sv.props.contentOffset.y).toBe(0);
    });
});
