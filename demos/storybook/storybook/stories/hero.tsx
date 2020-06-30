import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs, color, boolean, number } from '@storybook/addon-knobs';
import { centered } from '../decorators';
import { Hero, ChannelValue, wrapIcon, HeroBanner } from '@pxblue/react-native-components';
import _Leaf from '@pxblue/icons-svg/leaf.svg';
import _Temp from '@pxblue/icons-svg/temp.svg';
import _A from '@pxblue/icons-svg/grade_a.svg';
import _Battery from '@pxblue/icons-svg/battery.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Colors from '@pxblue/colors';

const Leaf = wrapIcon({ IconClass: _Leaf });
const Line = wrapIcon({ IconClass: Icon, name: 'chart-line-variant' });
const Clock = wrapIcon({ IconClass: Icon, name: 'clock-outline' });
const Temp = wrapIcon({ IconClass: _Temp });
const Battery = wrapIcon({ IconClass: _Battery });
const A = wrapIcon({ IconClass: _A });
const Pie = wrapIcon({ IconClass: Icon, name: 'chart-pie' });
const ChartLineVariant = wrapIcon({
    IconClass: Icon,
    name: 'chart-line-variant',
});

const heroes = [
    <Hero key={'hero_1'} label={'Healthy'} value={96} units={'/100'} IconClass={A} iconColor={Colors.green[500]} />,
    <Hero key={'hero_2'} label={'Battery'} value={'Full'} IconClass={Battery} iconColor={Colors.blue[500]} />,
    <Hero key={'hero_3'} label={'Estimated'} IconClass={Clock} iconColor={Colors.gray[500]}>
        <ChannelValue fontSize={20} value={1} units={'h'} />
        <ChannelValue fontSize={20} value={37} units={'m'} />
    </Hero>,
    <Hero key={'hero_4'} label={'Loaded'} IconClass={Pie} iconColor={Colors.blue[500]}>
        <ChannelValue fontSize={20} value={65} units={'%'} IconClass={ChartLineVariant} />
    </Hero>,
];

storiesOf('Hero', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add('with basic usage', () => (
        <Hero style={{ width: '100%' }} label={text('label', 'Efficiency')} IconClass={Leaf} />
    ))
    .add('with value and units', () => (
        <Hero
            style={{ width: '100%' }}
            label={'Efficiency'}
            IconClass={Leaf}
            value={text('value', '94')}
            units={text('units', '%')}
        />
    ))
    .add('with ChannelValue children', () => (
        <Hero style={{ width: '100%' }} label={'Duration'} IconClass={Clock}>
            <ChannelValue fontSize={20} value={text('hours', '1')} units={'h'} />
            <ChannelValue fontSize={20} value={text('minutes', '27')} units={'m'} />
        </Hero>
    ))
    .add('with icon colors', () => (
        <Hero
            style={{ width: '100%' }}
            label={'Temperature'}
            IconClass={Temp}
            value={'38'}
            units={'°C'}
            iconColor={color('iconColor', Colors.white[500])}
            iconBackgroundColor={color('iconBackgroundColor', Colors.red[500])}
        />
    ))
    .add('with full config', () => (
        <Hero
            style={{ width: '100%' }}
            label={text('label', 'Efficiency')}
            IconClass={Temp}
            iconSize={number('iconSize', 48)}
            iconColor={color('iconColor', Colors.white[500])}
            iconBackgroundColor={color('icon background color', Colors.red[500])}
            fontSize={number('fontSize', 24)}
            value={text('value', '38')}
            ValueIconClass={boolean('Show Value Icon', true) ? Line : undefined}
            valueColor={color('color', Colors.red[500])}
            units={text('units', '°C')}
        />
    ))
    .add('within a hero banner', () => <HeroBanner divider={boolean('divider', true)}>{heroes}</HeroBanner>);
