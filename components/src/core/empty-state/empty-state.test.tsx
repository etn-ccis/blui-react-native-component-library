import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from 'react-native-paper';
import { wrapIcon, EmptyState } from '..';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Line = wrapIcon({ IconClass: Icon, name: 'chart-line-variant' });

describe('EmptyState Tests ', () => {
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
                    actions={<Button icon={"add-circle-outline"}>Add Device</Button>}
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
                    actions={<Button icon={"add-circle-outline"}>Add Device</Button>}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
