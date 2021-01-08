import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerNavGroup,
    DrawerSubheader,
    H6,
    InfoListItem,
    NavItem,
    NestedNavItem,
    Subtitle1,
    wrapIcon,
} from '@pxblue/react-native-components';
import { boolean, color, text, withKnobs } from '@storybook/addon-knobs';
import _Battery from '@pxblue/icons-svg/battery.svg';
import _Humidity from '@pxblue/icons-svg/moisture.svg';
import _Temp from '@pxblue/icons-svg/temp.svg';
import { Divider, IconButton } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image, View } from 'react-native';
import * as Colors from '@pxblue/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const farmBgImage = require('../assets/farm.jpg');
const eatonLogo = require('../assets/eatonLogo.png');
const Battery = wrapIcon({ IconClass: _Battery });
const Humidity = wrapIcon({ IconClass: _Humidity });
const Temp = wrapIcon({ IconClass: _Temp });
const Clock = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'clock-outline' });

export const navItems1: NavItem[] = [
    {
        title: 'Identity Management',
        itemID: 'g1i1',
        icon: Battery,
    },
    {
        title: 'Calendar',
        itemID: 'g1i2',
        icon: Humidity,
    },
    {
        title: 'Accessibility',
        itemID: 'g1i3',
        icon: Clock,
    },
];

export const navItems2: NavItem[] = [
    {
        title: 'Devices',
        itemID: 'g2i1',
        icon: Battery,
    },
    {
        title: 'Alarms',
        itemID: 'g2i2',
        icon: Temp,
    },
];

const nestedNavItems: NestedNavItem[] = [
    {
        itemID: 'nested-1',
        title: 'Account',
    },
    {
        itemID: 'nested-2',
        title: 'Settings',
    },
    {
        itemID: 'nested-3',
        title: 'Incidents',
        items: [
            {
                itemID: 'deep-1',
                title: 'Make a Claim',
            },
            {
                itemID: 'deep-2',
                title: 'History',
            },
        ],
    },
];
const nestedNavGroup = [
    {
        title: 'ID Management',
        itemID: 'item-1',
        items: nestedNavItems,
    },
    navItems1[1],
    navItems1[2],
];

const drawerDecorator = (storyFn: any): any => (
    <SafeAreaProvider>
        <View style={{ backgroundColor: Colors.black[500] }}>
            <View style={{ height: '100%', width: '70%' }}>{storyFn()}</View>
        </View>
    </SafeAreaProvider>
);

const iconColor = Colors.white[50];
const menuIcon = <IconButton icon="menu" size={24} color={iconColor} />;

storiesOf('Drawer', module)
    .addDecorator(withKnobs)
    .addDecorator(drawerDecorator)
    .add('with basic usage', () => (
        <Drawer open={true}>
            <DrawerHeader
                title={text('title', 'Drawer Title')}
                subtitle={text('subtitle', 'Drawer Subtitle')}
                icon={menuIcon}
            />
            <DrawerBody>
                <DrawerNavGroup items={navItems1} />
            </DrawerBody>
        </Drawer>
    ))
    .add('with custom header', () => (
        <Drawer open={true}>
            <DrawerHeader
                backgroundImage={farmBgImage}
                icon={menuIcon}
                titleContent={
                    <View style={{ zIndex: 1, paddingLeft: 20, paddingTop: 10 }}>
                        <Subtitle1 style={{ color: iconColor }}>Customizable</Subtitle1>
                        <H6 style={{ marginTop: -5, color: iconColor }}>Header Content</H6>
                    </View>
                }
            />
            <DrawerBody>
                <DrawerNavGroup items={navItems1} />
            </DrawerBody>
        </Drawer>
    ))
    .add('with subheader', () => (
        <Drawer open={true}>
            <DrawerHeader title={'Drawer'} subtitle={'with a custom subheader'} icon={menuIcon} />
            <DrawerSubheader open={true}>
                <View style={{ backgroundColor: Colors.red[500], paddingVertical: 8 }}>
                    <InfoListItem
                        title={'Alerts'}
                        subtitle={'4 overheating devices'}
                        iconColor={Colors.white[50]}
                        fontColor={Colors.white[50]}
                        IconClass={Temp}
                    />
                    <Divider />
                </View>
            </DrawerSubheader>
            <DrawerBody>
                <DrawerNavGroup items={navItems1} />
            </DrawerBody>
        </Drawer>
    ))
    .add(
        'with multiple DrawerNavGroups', // TODO: Can this done using a Spacer component, like in React comp library?
        () => {
            const spacer = boolean('Add Spacer', false);
            return (
                <Drawer open={true}>
                    <DrawerHeader title={'Drawer'} subtitle={'with multiple NavGroups'} icon={menuIcon} />
                    <DrawerBody>
                        <DrawerNavGroup title={text('NavGroup 1 title', 'NavGroup 1')} items={navItems1} />
                        {!spacer && <DrawerNavGroup title={text('NavGroup 2 title', 'NavGroup 2')} items={navItems2} />}
                    </DrawerBody>
                    <DrawerFooter>
                        {spacer && <DrawerNavGroup title={text('NavGroup 2 title', 'NavGroup 2')} items={navItems2} />}
                    </DrawerFooter>
                </Drawer>
            );
        }
    )
    .add('with nested nav items', () => (
        <Drawer open={true}>
            <DrawerHeader title={'Drawer'} subtitle={'with nested nav items'} icon={menuIcon} />
            <DrawerBody>
                <DrawerNavGroup
                    nestedDivider={boolean('nestedDivider', false)}
                    nestedBackgroundColor={color('nestedBackgroundColor', Colors.white[200])}
                    title={'Multi-Level Navigation Group'}
                    items={nestedNavGroup}
                />
            </DrawerBody>
        </Drawer>
    ))
    .add('with footer', () => (
        <Drawer open={true}>
            <DrawerHeader title={'Drawer'} subtitle={'with a footer'} icon={menuIcon} />
            <DrawerBody>
                <DrawerNavGroup items={navItems1} />
            </DrawerBody>
            <DrawerFooter divider={boolean('divider', true)}>
                <View style={{ padding: 16, backgroundColor: 'white', alignItems: 'center' }}>
                    <Image source={eatonLogo} style={{ height: 60, width: '80%' }} />
                </View>
            </DrawerFooter>
        </Drawer>
    ))
    .add('with full config', () => {
        const drawer = 'Drawer';
        const header = 'DrawerHeader';
        const navGroup = 'DrawerNavGroup';
        const footer = 'DrawerFooter';
        return (
            <Drawer
                activeItemFontColor={color('activeItemFontColor', Colors.red[800], drawer)}
                activeItemIconColor={color('activeItemIconColor', Colors.red[800], drawer)}
                activeItemBackgroundColor={color('activeItemBackgroundColor', Colors.blue[50], drawer)}
                backgroundColor={color('backgroundColor', Colors.white[50], drawer)}
                itemFontColor={color('itemFontColor', Colors.blue[800], drawer)}
                itemIconColor={color('itemIconColor', Colors.blue[800], drawer)}
                divider={boolean('divider', false, drawer)}
                chevron={boolean('chevron', false, drawer)}
                activeItemBackgroundShape={
                    boolean(`square activeItemBackgroundShape`, true, drawer) ? 'square' : 'round'
                }
                activeItem={'g1i2'}
                open={true}
            >
                <DrawerHeader
                    title={text('title', 'Header Title', header)}
                    subtitle={text('subtitle', 'Header subtitle', header)}
                    backgroundImage={boolean('Show Background Image', true, header) ? farmBgImage : undefined}
                    backgroundColor={color('backgroundColor', Colors.blue[500], header)}
                    fontColor={color('fontColor', Colors.white[50], header)}
                    icon={menuIcon}
                />
                <DrawerBody>
                    <DrawerNavGroup
                        items={nestedNavGroup}
                        nestedDivider={boolean('nestedDivider', true, navGroup)}
                        nestedBackgroundColor={color('nestedBackgroundColor', Colors.red[50], navGroup)}
                        title={text('NavGroup1 title', 'Nav Group 1', navGroup)}
                    />
                    <DrawerNavGroup items={navItems2} title={text('NavGroup2 title', 'Nav Group 2', navGroup)} />
                </DrawerBody>
                <DrawerFooter divider={boolean('divider', true, footer)}>
                    <View style={{ padding: 16, backgroundColor: 'white', alignItems: 'center' }}>
                        <Image source={eatonLogo} style={{ height: 60, width: '80%' }} />
                    </View>
                </DrawerFooter>
            </Drawer>
        );
    });
