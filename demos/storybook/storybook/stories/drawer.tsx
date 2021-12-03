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
    ListItemTag,
    NavItem,
    Subtitle1,
    wrapIcon,
} from '@brightlayer-ui/react-native-components';
import { boolean, color, text, withKnobs } from '@storybook/addon-knobs';

import _Device from '@brightlayer-ui/icons-svg/device.svg';
import _Temp from '@brightlayer-ui/icons-svg/temp.svg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image, View } from 'react-native';
import * as Colors from '@brightlayer-ui/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const farmBgImage = require('../assets/farm.jpg');
const eatonLogo = require('../assets/eatonLogo.png');
const Device = wrapIcon({ IconClass: _Device });
const Temp = wrapIcon({ IconClass: _Temp });
const Today = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'calendar-today' });
const Menu = wrapIcon({ IconClass: MaterialIcon, name: 'menu' });
const Person = wrapIcon({ IconClass: MaterialIcon, name: 'person' });
const Settings = wrapIcon({ IconClass: MaterialIcon, name: 'settings' });
const Group = wrapIcon({ IconClass: MaterialIcon, name: 'group' });
const Dashboard = wrapIcon({ IconClass: MaterialIcon, name: 'dashboard' });
const TOC = wrapIcon({ IconClass: MaterialIcon, name: 'toc' });
const PinDrop = wrapIcon({ IconClass: MaterialIcon, name: 'pin-drop' });
const AddPhoto = wrapIcon({ IconClass: MaterialIcon, name: 'add-a-photo' });
const Event = wrapIcon({ IconClass: MaterialIcon, name: 'event' });
const MenuBook = wrapIcon({ IconClass: MaterialIcon, name: 'menu-book' });
const Gavel = wrapIcon({ IconClass: MaterialIcon, name: 'gavel' });
const Accessibility = wrapIcon({ IconClass: MaterialIcon, name: 'accessibility' });
const NotificationsActive = wrapIcon({ IconClass: MaterialIcon, name: 'notifications-active' });

export const navItems1: NavItem[] = [
    {
        title: 'Identity Management',
        itemID: 'g1i1',
        icon: Person,
    },
    {
        title: 'Calendar',
        itemID: 'g1i2',
        icon: Today,
    },
    {
        title: 'Accessibility',
        itemID: 'g1i3',
        icon: Accessibility,
    },
    {
        title: 'Notifications',
        itemID: 'g1i4',
        icon: NotificationsActive,
    },
];

export const navItems2: NavItem[] = [
    {
        title: 'Settings',
        itemID: 'g2i1',
        icon: Settings,
    },
    {
        title: 'Legal',
        itemID: 'g2i2',
        icon: Gavel,
    },
];

const nestedNavGroup = [
    {
        title: 'User Guide',
        itemID: 'item-1',
        icon: MenuBook,
        items: [
            {
                itemID: 'nested-1',
                title: 'Getting Started',
                subtitle: 'Introduction to Eaton',
            },
            {
                itemID: 'nested-2',
                title: 'Tutorials',
                items: [
                    {
                        itemID: 'deep-0',
                        title: 'For Developers',
                    },
                    {
                        itemID: 'deep-1',
                        title: 'For Designers',
                        items: [
                            {
                                itemID: 'deep-deep-0',
                                title: 'Component Library',
                            },
                            {
                                itemID: 'deep-deep-1',
                                title: 'Typography Rules',
                            },
                            {
                                itemID: 'deep-deep-2',
                                title: 'Theme Rules',
                            },
                        ],
                    },
                ],
            },
            {
                itemID: 'nested-3',
                title: 'Environment Setup',
            },
        ],
    },
    {
        title: 'Community',
        itemID: 'item-2',
        icon: Group,
        items: [
            {
                itemID: 'nested-4',
                title: 'License',
            },
            {
                itemID: 'nested-5',
                title: 'Contribute',
                items: [
                    {
                        itemID: 'deep-2',
                        title: 'Hall of Fame',
                    },
                    {
                        itemID: 'deep-3',
                        title: 'Contributing Guide',
                    },
                ],
            },
        ],
    },
    navItems1[2],
    navItems1[3],
];

const fullConfigGroup = [
    {
        title: 'Overview',
        itemID: 'item-1',
        icon: Dashboard,
        statusColor: Colors.green[500],
        items: [
            {
                itemID: 'nested-1',
                title: 'Monthly Report',
            },
            {
                itemID: 'nested-2',
                title: 'Annual Report',
            },
        ],
    },
    {
        title: 'Timeline',
        itemID: 'item-2',
        icon: TOC,
    },
    {
        title: 'Locations',
        itemID: 'item-3',
        icon: PinDrop,
    },
    {
        title: 'Devices',
        subtitle: '5 new warnings',
        itemID: 'item-4',
        icon: Device,
        statusColor: Colors.yellow[500],
    },
    {
        title: 'Photos',
        itemID: 'item-5',
        icon: AddPhoto,
    },
    {
        title: 'Schedule',
        itemID: 'item-6',
        icon: Event,
    },
];

const drawerDecorator = (storyFn: any): any => (
    <SafeAreaProvider>
        <View style={{ backgroundColor: Colors.black[500] }}>
            <View style={{ height: '100%', width: '70%' }}>{storyFn()}</View>
        </View>
    </SafeAreaProvider>
);

const iconColor = Colors.white[50];

storiesOf('Drawer', module)
    .addDecorator(withKnobs)
    .addDecorator(drawerDecorator)
    .add('with basic usage', () => (
        <Drawer>
            <DrawerHeader
                title={text('title', 'Drawer Title')}
                subtitle={text('subtitle', 'Drawer Subtitle')}
                icon={{
                    icon: Menu,
                }}
            />
            <DrawerBody>
                <DrawerNavGroup items={navItems1} />
            </DrawerBody>
        </Drawer>
    ))
    .add('with custom header', () => (
        <Drawer>
            <DrawerHeader
                backgroundImage={farmBgImage}
                icon={{
                    icon: Menu,
                }}
                titleContent={
                    <View style={{ zIndex: 1, paddingLeft: 20, paddingTop: 8, flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Subtitle1 style={{ color: iconColor }}>Customizable</Subtitle1>
                            <H6 style={{ marginTop: -5, color: iconColor }}>Header Content</H6>
                        </View>
                        <ListItemTag label={'V1.0.3'} style={{ marginRight: 8 }} />
                    </View>
                }
            />
            <DrawerBody>
                <DrawerNavGroup items={navItems1} />
            </DrawerBody>
        </Drawer>
    ))
    .add('with subheader', () => (
        <Drawer>
            <DrawerHeader
                title={'Drawer'}
                subtitle={'with a custom subheader'}
                icon={{
                    icon: Menu,
                }}
            />
            <DrawerSubheader divider={boolean('divider', true)}>
                <View style={{ backgroundColor: Colors.red[500], paddingVertical: 8 }}>
                    <InfoListItem
                        dense
                        title={'Alerts'}
                        subtitle={'4 overheating devices'}
                        iconColor={Colors.white[50]}
                        fontColor={Colors.white[50]}
                        IconClass={Temp}
                    />
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
            const spacer = boolean('Add Spacer', true);
            return (
                <Drawer>
                    <DrawerHeader
                        title={'Drawer'}
                        subtitle={'with multiple NavGroups'}
                        icon={{
                            icon: Menu,
                        }}
                    />
                    <DrawerBody>
                        <DrawerNavGroup title={text('NavGroup 1 title', 'First DrawerNavGroup')} items={navItems1} />
                        {!spacer && <DrawerNavGroup title={text('NavGroup 2 title', 'NavGroup 2')} items={navItems2} />}
                    </DrawerBody>
                    <DrawerFooter>
                        {spacer && (
                            <DrawerNavGroup
                                title={text('NavGroup 2 title', 'Second DrawerNavGroup')}
                                items={navItems2}
                            />
                        )}
                    </DrawerFooter>
                </Drawer>
            );
        }
    )
    .add('with nested nav items', () => (
        <Drawer>
            <DrawerHeader
                title={'Drawer'}
                subtitle={'with nested nav items'}
                icon={{
                    icon: Menu,
                }}
            />
            <DrawerBody>
                <DrawerNavGroup
                    divider={boolean('divider', false)}
                    nestedDivider={boolean('nestedDivider', false)}
                    nestedBackgroundColor={color('nestedBackgroundColor', Colors.white[200])}
                    title={'Multi-Level Navigation Group'}
                    items={nestedNavGroup}
                />
            </DrawerBody>
        </Drawer>
    ))
    .add('with footer', () => (
        <Drawer>
            <DrawerHeader
                title={'Drawer'}
                subtitle={'with a footer'}
                icon={{
                    icon: Menu,
                }}
            />
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
                activeItemFontColor={color('activeItemFontColor', Colors.blue[500], drawer)}
                activeItemIconColor={color('activeItemIconColor', Colors.blue[500], drawer)}
                activeItemBackgroundColor={color('activeItemBackgroundColor', Colors.blue[50], drawer)}
                backgroundColor={color('backgroundColor', Colors.white[50], drawer)}
                itemFontColor={color('itemFontColor', Colors.black[500], drawer)}
                itemIconColor={color('itemIconColor', Colors.black[500], drawer)}
                divider={boolean('divider', false, drawer)}
                chevron={boolean('chevron', false, drawer)}
                activeItemBackgroundShape={
                    boolean(`square activeItemBackgroundShape`, true, drawer) ? 'square' : 'round'
                }
                activeItem={'item-3'}
            >
                <DrawerHeader
                    title={text('title', 'Header Title', header)}
                    subtitle={text('subtitle', 'Header subtitle', header)}
                    backgroundImage={boolean('Show Background Image', false, header) ? farmBgImage : undefined}
                    backgroundColor={color('backgroundColor', Colors.blue[500], header)}
                    fontColor={color('fontColor', Colors.white[50], header)}
                    icon={{
                        icon: Menu,
                    }}
                />
                <DrawerBody>
                    <DrawerNavGroup
                        items={fullConfigGroup}
                        nestedDivider={boolean('nestedDivider', false, navGroup)}
                        nestedBackgroundColor={color('nestedBackgroundColor', Colors.red[50], navGroup)}
                        title={text('NavGroup1 title', 'NavGroup 1', navGroup)}
                    />
                    <DrawerNavGroup items={navItems2} title={text('NavGroup2 title', 'NavGroup 2', navGroup)} />
                </DrawerBody>
                <DrawerFooter divider={boolean('divider', true, footer)}>
                    <View style={{ padding: 16, backgroundColor: 'white', alignItems: 'center' }}>
                        <Image source={eatonLogo} style={{ height: 60, width: '80%' }} />
                    </View>
                </DrawerFooter>
            </Drawer>
        );
    });
