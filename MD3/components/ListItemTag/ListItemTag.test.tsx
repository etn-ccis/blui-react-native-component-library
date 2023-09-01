import React from 'react';
import { ListItemTag } from '.';
import { cleanup } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';

describe('ListItemTag', () => {
    afterEach(cleanup);
    it('ListItemTag Renders', () => {
        const tree = TestRenderer.create(<ListItemTag label={'label text'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders the background color and font color correctly', () => {
        const tree = TestRenderer.create(
            <ListItemTag label={'label text'} backgroundColor={'yellow'} fontColor={'brown'} />
        ).toJSON;
        expect(tree).toMatchSnapshot();
    });

    it('Accepts style override', () => {
        const tree = TestRenderer.create(
            <ListItemTag label={'label text'} style={{ color: 'blue', borderRadius: 99, marginLeft: 1 }} />
        ).toJSON;
        expect(tree).toMatchSnapshot();
    });
});
