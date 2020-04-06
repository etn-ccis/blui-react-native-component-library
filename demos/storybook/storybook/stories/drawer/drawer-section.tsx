import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Drawer, wrapIcon } from '@pxblue/react-native-components';
import { safeArea } from '../../decorators';
import Leaf from '@pxblue/icons-svg/leaf.svg';
import Water from '@pxblue/icons-svg/water.svg';
import Device from '@pxblue/icons-svg/device.svg';
import Pxwhite from '@pxblue/icons-svg/pxwhite.svg';
import Basketball from '@pxblue/icons-svg/basketball_hoop.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

const LeafIcon = wrapIcon({ IconClass: Leaf });
const WaterIcon = wrapIcon({ IconClass: Water });
const DeviceIcon = wrapIcon({ IconClass: Device });
const PxwhiteIcon = wrapIcon({ IconClass: Pxwhite });
const BasketballIcon = wrapIcon({ IconClass: Basketball });
const SettingsIcon = wrapIcon({ IconClass: Icon, name: 'settings' });

const item1 = (
    <Drawer.Item
        active={true}
        onPress={(): void => {
            /* do nothing */
        }}
        label={'Environment'}
        IconClass={LeafIcon}
    />
);

const item2 = (
    <Drawer.Item
        active={false}
        onPress={(): void => {
            /* do nothing */
        }}
        label={'Water Pumps'}
        IconClass={WaterIcon}
    />
);

const item3 = (
    <Drawer.Item
        active={false}
        onPress={(): void => {
            /* do nothing */
        }}
        label={'Devices'}
        IconClass={DeviceIcon}
    />
);

const item4 = (
    <Drawer.Item
        active={false}
        onPress={(): void => {
            /* do nothing */
        }}
        label={'PX White'}
        IconClass={PxwhiteIcon}
    />
);

const item5 = (
    <Drawer.Item
        active={false}
        onPress={(): void => {
            /* do nothing */
        }}
        label={'Shooty Hoops'}
        IconClass={BasketballIcon}
    />
);

const item6 = (
    <Drawer.Item
        active={false}
        onPress={(): void => {
            /* do nothing */
        }}
        label={'Settings'}
        IconClass={SettingsIcon}
    />
);

storiesOf('Drawer', module)
    .addDecorator(withKnobs)
    .addDecorator(safeArea)
    .add('Drawer.Section', () => (
        <View>
            <Drawer.Section title={text('Section 1 title', 'Section 1')}>
                {item1}
                {item2}
                {item3}
            </Drawer.Section>
            <Drawer.Section title={text('Section 2 title', 'Section 2')}>
                {item4}
                {item5}
            </Drawer.Section>
            <Drawer.Section divider={false}>{item6}</Drawer.Section>
        </View>
    ));
