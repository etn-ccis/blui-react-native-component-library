import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs, color, boolean, number } from '@storybook/addon-knobs';
import { centered } from '../decorators';
import { Hero, ChannelValue, wrapIcon, HeroBanner } from '@brightlayer-ui/react-native-components';
import _Temp from '@brightlayer-ui/icons-svg/temp.svg';
import _A from '@brightlayer-ui/icons-svg/grade_a.svg';
import _B from '@brightlayer-ui/icons-svg/grade_b.svg';
import _Current from '@brightlayer-ui/icons-svg/current_circled.svg';
import _Fan from '@brightlayer-ui/icons-svg/fan.svg';
import _Battery from '@brightlayer-ui/icons-svg/battery.svg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Colors from '@brightlayer-ui/colors';

const Clock = wrapIcon({ IconClass: Icon, name: 'clock-outline' });
const Temp = wrapIcon({ IconClass: _Temp });
const Battery = wrapIcon({ IconClass: _Battery });
const A = wrapIcon({ IconClass: _A });
const B = wrapIcon({ IconClass: _B });
const Fan = wrapIcon({ IconClass: _Fan });
const Current = wrapIcon({ IconClass: _Current });
const TrendingUp = wrapIcon({ IconClass: MaterialIcon, name: 'trending-up' });

const heroes = [
    <Hero key={'hero_1'} label={'Healthy'} value={96} units={'/100'} IconClass={A} iconColor={Colors.green[500]} />,
    <Hero key={'hero_2'} label={'Load'} value={'90'} units={'%'} IconClass={Current} iconColor={Colors.yellow[500]} />,
    <Hero key={'hero_3'} label={'Temp'} value={'55'} units={'C'} IconClass={Temp} iconColor={Colors.green[500]} />,
    <Hero
        key={'hero_4'}
        label={'Battery'}
        value={'96'}
        units={'/100'}
        IconClass={Battery}
        iconColor={Colors.green[500]}
    />,
];

storiesOf('Hero', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add('with basic usage', () => <Hero style={{ width: '100%' }} label={text('label', 'Efficiency')} IconClass={A} />)
    .add('with value and units', () => (
        <Hero
            style={{ width: '100%' }}
            label={'Efficiency'}
            IconClass={B}
            value={text('value', '88')}
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
            label={text('label', 'Velocity')}
            IconClass={Fan}
            iconSize={number('iconSize', 48)}
            iconColor={color('iconColor', Colors.white[500])}
            iconBackgroundColor={color('icon background color', Colors.blue[500])}
            fontSize={number('fontSize', 24)}
            value={text('value', '470')}
            ValueIconClass={boolean('Show Value Icon', true) ? TrendingUp : undefined}
            valueColor={color('color', Colors.black[500])}
            units={text('units', 'RPM')}
        />
    ))
    .add('within a hero banner', () => (
        <HeroBanner divider={boolean('divider', true)}>
            {heroes.slice(0, number('count', 4, { range: true, min: 1, max: 4, step: 1 }))}
        </HeroBanner>
    ));
