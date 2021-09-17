import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs, color, boolean, number } from '@storybook/addon-knobs';
import { centered } from '../decorators';
import { Hero, ChannelValue, HeroBanner } from '@pxblue/react-native-components';
import * as Colors from '@pxblue/colors';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';

const Clock: IconFamily = { family: 'material-community', name: 'clock-outline' };
const Temp: IconFamily = { family: 'pxblue', name: 'temp' };
const Battery: IconFamily = { family: 'pxblue', name: 'battery' };
const A: IconFamily = { family: 'pxblue', name: 'grade_a' };
const B: IconFamily = { family: 'pxblue', name: 'grade_b' };
const Fan: IconFamily = { family: 'pxblue', name: 'fan' };
const Current: IconFamily = { family: 'pxblue', name: 'current_circled' };
const TrendingUp: IconFamily = { family: 'material', name: 'trending-up' };

const heroes = [
    <Hero
        key={'hero_1'}
        label={'Healthy'}
        ChannelValueProps={{ value: 96, units: '/100' }}
        icon={A}
        iconColor={Colors.green[500]}
    />,
    <Hero
        key={'hero_2'}
        label={'Load'}
        ChannelValueProps={{ value: 90, units: '%' }}
        icon={Current}
        iconColor={Colors.yellow[500]}
    />,
    <Hero
        key={'hero_3'}
        label={'Temp'}
        ChannelValueProps={{ value: 55, units: 'C' }}
        icon={Temp}
        iconColor={Colors.green[500]}
    />,
    <Hero
        key={'hero_4'}
        label={'Battery'}
        ChannelValueProps={{ value: 96, units: '/100' }}
        icon={Battery}
        iconColor={Colors.green[500]}
    />,
];

storiesOf('Hero', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add('with basic usage', () => <Hero style={{ width: '100%' }} label={text('label', 'Efficiency')} icon={A} />)
    .add('with value and units', () => (
        <Hero
            style={{ width: '100%' }}
            label={'Efficiency'}
            icon={B}
            ChannelValueProps={{ value: text('value', '88'), units: text('units', '%') }}
        />
    ))
    .add('with ChannelValue children', () => (
        <Hero style={{ width: '100%' }} label={'Duration'} icon={Clock}>
            <ChannelValue fontSize={20} value={text('hours', '1')} units={'h'} />
            <ChannelValue fontSize={20} value={text('minutes', '27')} units={'m'} />
        </Hero>
    ))
    .add('with icon colors', () => (
        <Hero
            style={{ width: '100%' }}
            label={'Temperature'}
            icon={Temp}
            ChannelValueProps={{ value: '38', units: '°C' }}
            iconColor={color('iconColor', Colors.white[500])}
            iconBackgroundColor={color('iconBackgroundColor', Colors.red[500])}
        />
    ))
    .add('with full config', () => (
        <Hero
            style={{ width: '100%' }}
            label={text('label', 'Velocity')}
            icon={Fan}
            iconSize={number('iconSize', 48)}
            iconColor={color('iconColor', Colors.white[500])}
            iconBackgroundColor={color('icon background color', Colors.blue[500])}
            ChannelValueProps={{
                fontSize: number('fontSize', 24),
                value: text('value', '470'),
                units: text('units', 'RPM'),
                icon: boolean('Show Value Icon', true) ? TrendingUp : undefined,
                color: color('color', Colors.black[500]),
            }}
        />
    ))
    .add('within a hero banner', () => (
        <HeroBanner divider={boolean('divider', true)}>
            {heroes.slice(0, number('count', 4, { range: true, min: 1, max: 4, step: 1 }))}
        </HeroBanner>
    ));
