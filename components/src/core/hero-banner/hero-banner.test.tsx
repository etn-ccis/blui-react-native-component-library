import React from 'react';
import TestRenderer from 'react-test-renderer';
import { HeroBanner, Hero, wrapIcon } from '..';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Line = wrapIcon({ IconClass: Icon, name: 'chart-line-variant' });

describe('HeroBanner', () => {
    it('renders four children when four are passed in', () => {
        const instance = TestRenderer.create(
            <HeroBanner>
                <Hero label={'Hero One'} icon={Line} />
                <Hero label={'Hero Two'} icon={Line} />
                <Hero label={'Hero Three'} icon={Line} />
                <Hero label={'Hero Four'} icon={Line} />
            </HeroBanner>
        ).root;

        expect(instance.findAllByType(Hero)).toHaveLength(4);
    });

    describe('divider', () => {
        it('does not render if the prop is not specified', () => {
            const instance = TestRenderer.create(<HeroBanner />).root;

            expect(instance.findAllByType(View)).toHaveLength(1);
        });

        it('does render if the prop is set to true', () => {
            const instance = TestRenderer.create(<HeroBanner divider={true} />).root;

            expect(instance.findAllByType(View)).toHaveLength(2);
        });
    });
});
