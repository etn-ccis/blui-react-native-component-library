import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Icon } from './index';
import BLUIIcon from '@brightlayer-ui/react-native-vector-icons';
import { EmptyState } from '../EmptyState';

describe('Icon Tests ', () => {
    it('renders with string source', () => {
        const tree = TestRenderer.create(<Icon source={'String'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with emoji source', () => {
        const tree = TestRenderer.create(<Icon source={'🍇'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with blui object source', () => {
        const tree = TestRenderer.create(<Icon source={{ family: 'brightlayer-ui', name: 'broccoli' }} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with material community object source', () => {
        const tree = TestRenderer.create(
            <Icon source={{ family: 'material-community', name: 'chart-pie' }} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with material object source', () => {
        const tree = TestRenderer.create(<Icon source={{ family: 'material', name: 'settings' }} />).toJSON();
        expect(tree).toMatchSnapshot();
        const tree2 = TestRenderer.create(<Icon source={{ name: 'settings' }} />).toJSON();
        expect(tree2).toMatchSnapshot();
    });
    it('renders with function source', () => {
        const tree = TestRenderer.create(
            <Icon source={({ size, color }): JSX.Element => <BLUIIcon name={'broccoli'} size={size} color={color} />} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with remote image source', () => {
        const tree = TestRenderer.create(
            <Icon
                source={{
                    uri: 'https://raw.githubusercontent.com/etn-ccis/blui-icons/dev/png/png48/account_settings_black500_48dp.png',
                }}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with local image source', () => {
        const tree = TestRenderer.create(<Icon source={require('../../images/default-avatar.png')} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders in a component', () => {
        const tree = TestRenderer.create(
            <EmptyState title={'Test'} icon={{ family: 'brightlayer-ui', name: 'broccoli' }} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
