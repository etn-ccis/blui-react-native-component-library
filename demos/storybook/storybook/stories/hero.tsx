import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs, color, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { centered } from '../decorators';
import { Hero, ChannelValue, wrapIcon } from '@pxblue/react-native-components';
import _Leaf from '@pxblue/icons-svg/leaf.svg';
import _Temp from '@pxblue/icons-svg/temp.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Colors from '@pxblue/colors';

const Leaf = wrapIcon({ IconClass: _Leaf });
const Line = wrapIcon({ IconClass: Icon, name: 'chart-line-variant' });
const Clock = wrapIcon({ IconClass: Icon, name: 'clock-outline' });
const Temp = wrapIcon({ IconClass: _Temp });

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
    .add('with press event', () => (
        <Hero
            style={{ width: '100%' }}
            label={text('label', 'Efficiency')}
            IconClass={Leaf}
            value={text('value', '94')}
            units={text('units', '%')}
            action
            onPress={(): void => {
                action('clicked alarms');
            }}
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
    ));
