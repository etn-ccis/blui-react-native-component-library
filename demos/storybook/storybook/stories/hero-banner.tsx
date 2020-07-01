import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Hero, HeroBanner, ChannelValue, wrapIcon } from '@pxblue/react-native-components';
import _A from '@pxblue/icons-svg/grade_a.svg';
import _Battery from '@pxblue/icons-svg/battery.svg';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { safeArea } from '../decorators';
import { green, blue, gray } from '@pxblue/colors';

const ChartLineVariant = wrapIcon({
    IconClass: MaterialCommunityIcon,
    name: 'chart-line-variant',
});
const Battery = wrapIcon({ IconClass: _Battery });
const A = wrapIcon({ IconClass: _A });
const Pie = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'chart-pie' });
const Clock = wrapIcon({
    IconClass: MaterialCommunityIcon,
    name: 'clock-outline',
});

const heroes = [
    <Hero key={'hero_1'} label={'Healthy'} value={96} units={'/100'} IconClass={A} iconColor={green[500]} />,
    <Hero key={'hero_2'} label={'Battery'} value={'Full'} IconClass={Battery} iconColor={blue[500]} />,
    <Hero key={'hero_3'} label={'Estimated'} IconClass={Clock} iconColor={gray[500]}>
        <ChannelValue fontSize={20} value={1} units={'h'} />
        <ChannelValue fontSize={20} value={37} units={'m'} />
    </Hero>,
    <Hero key={'hero_4'} label={'Loaded'} IconClass={Pie} iconColor={blue[500]}>
        <ChannelValue fontSize={20} value={65} units={'%'} IconClass={ChartLineVariant} />
    </Hero>,
];

storiesOf('HeroBanner', module)
    .addDecorator(withKnobs)
    .addDecorator(safeArea)
    .add('with a variety of Heroes', () => <HeroBanner divider={boolean('divider', true)}>{heroes}</HeroBanner>);
