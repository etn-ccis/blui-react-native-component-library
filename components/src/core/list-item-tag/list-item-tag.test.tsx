import React from 'react';
import { ListItemTag } from '.';
import { Overline } from '..';
import TestRenderer from 'react-test-renderer';

describe('ListItemTag', () => {
    it('renders the label text correctly', () => {
        const instance = TestRenderer.create(<ListItemTag label={'label text'} />).root;
        const textComponent = instance.findAllByType(Overline)[0];
        expect(textComponent.props.children).toEqual('label text');
    });

    it('renders the background color and font color correctly', () => {
        const instance = TestRenderer.create(
            <ListItemTag label={'label text'} backgroundColor={'yellow'} fontColor={'brown'} />
        ).root;
        const textComponent = instance.findAllByType(Overline)[0];
        expect(textComponent.props.style[0]).toMatchObject({
            backgroundColor: 'yellow',
            color: 'brown',
        });
    });

    it('accepts style override', () => {
        const instance = TestRenderer.create(
            <ListItemTag label={'label text'} style={{ color: 'blue', borderRadius: 99, marginLeft: 1 }} />
        ).root;
        const textComponent = instance.findAllByType(Overline)[0];
        expect(textComponent.props.style[2]).toMatchObject({ color: 'blue', borderRadius: 99, marginLeft: 1 });
    });
});
