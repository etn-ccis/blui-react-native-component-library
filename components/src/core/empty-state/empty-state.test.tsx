import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from 'react-native-paper';
import { wrapIcon, EmptyState } from '..';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { cleanup } from '@testing-library/react-native';
const Line = wrapIcon({
    IconClass: MatCommunityIcon,
    name: 'chart-line-variant',
});

describe('EmptyState Tests ', () => {
    afterEach(cleanup);
    it('Icon Renders', () => {
        const tree = renderer.create(<EmptyState title={'Test'} IconClass={Line} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Only Title Renders', () => {
        const tree = renderer.create(<EmptyState title={'EmptyState'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Description Renders', () => {
        const tree = renderer.create(<EmptyState title={'Test'} description={'Description'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Actions Renders', () => {
        const tree = renderer
            .create(
                <EmptyState
                    title={'Test'}
                    actions={
                        <Button icon={(): JSX.Element => <MatIcon name={'add-circle-outline'} />}>Add Device</Button>
                    }
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Title, actions, Description Renders', () => {
        const tree = renderer
            .create(
                <EmptyState
                    title={'EmptyState'}
                    description={'Description'}
                    actions={
                        <Button icon={(): JSX.Element => <MatIcon name={'add-circle-outline'} />}>Add Device</Button>
                    }
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
