import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerNavGroup,
    DrawerSubheader,
    H6,
    NavItem,
    Subtitle,
    wrapIcon
} from "@pxblue/react-native-components";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
// @ts-ignore
import _Humidity from '@pxblue/icons-svg/moisture.svg';
// @ts-ignore
import _Battery from '@pxblue/icons-svg/battery.svg';
import * as React from "react";
import {useCallback, useState} from "react";
import {View} from "react-native";
import {Divider} from "react-native-elements";
import {IconButton} from "react-native-paper";
import * as Colors from '@pxblue/colors';

const backgroundImage = require('../assets/images/topology_40.png');

const Battery = wrapIcon({ IconClass: _Battery });
const Humidity = wrapIcon({ IconClass: _Humidity });
const Clock = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'clock-outline' });
const MailIcon = wrapIcon({ IconClass: MatIcon, name: 'mail' });


export const navGroupItems1: NavItem[] = [
    {
        title: 'Identity Management',
        itemID: 'g1i1',
        icon: Battery
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
        chevron: true,
        onItemSelect: (): void => { /* Expand and don't update selected */ },
        items: [
            {
                title: 'Sub NavItem 1',
                itemID: 'g1i3i1',
            },
            {
                title: 'Sub NavItem 2',
                itemID: 'g1i3i2',
            },
            {
                title: 'Sub NavItem 3',
                itemID: 'g1i3i3',
                onItemSelect: (): void => { /* Expand and don't update selected */ },
                items: [
                    {
                        title: 'Deep Nested Nav',
                        itemID: 'g1i3i3i1'
                    }
                ]
            }
        ]
    },
    {
        subtitle: 'Test',
        title: 'Notifications',
        itemID: 'g1i4',
        icon: MailIcon,
    },
];

export const navGroupItems2: NavItem[] = [
    {
        title: 'Notifications',
        subtitle: '4 new alerts',
        itemID: 'g2i1',
        statusColor: Colors.yellow[500],
        onItemSelect: (): void => { /* Expand and don't update selected */ },
        items: [
            {
                title: 'Sub NavItem 1',
                itemID: 'g2i1i1',
                statusColor: Colors.blue[500],
                onItemSelect: (): void => { /* Expand and don't update selected */ },
                items: [
                    {
                        statusColor: Colors.red[500],
                        title: 'Deep Nested Nav',
                        itemID: 'g2i1i1i1'
                    }
                ]
            },
            {
                title: 'Sub NavItem 2',
                itemID: 'g2i1i2'
            }
        ]
    },
    {
        title: 'Calendar',
        itemID: 'g2i2',
    },
    {
        title: 'Accessibility',
        itemID: 'g2i3',
    },
    {
        subtitle: 'You cant see me, fix InfoListItem',
        title: 'Notifications',
        itemID: 'g2i4',
        activeItemFontColor: Colors.white[50],
        activeItemBackgroundColor: Colors.blue[900]
    },
];

// @ts-ignore
export const NavigationDrawer: React.FC = ({ navigation }) => {
    const [selected, setSelected] = useState('');
    const selectItem = useCallback((id: string) => {
        navigation.navigate('App');
        setSelected(id);
    }, [navigation]);

    return (
        <Drawer activeItem={selected} onItemSelect={(id: any): void => selectItem(id)}>
            <DrawerHeader title={'Drawer Title'} subtitle={'Drawer Subtitle'}
                backgroundImage={backgroundImage}
                icon={
                    <IconButton icon="menu" size={24} onPress={(): void => {
                        navigation.closeDrawer();
                    }}/>
                }
            />
            <DrawerBody>
                <DrawerNavGroup items={navGroupItems1} title={'Group 1'} hidePadding={false} />
                <DrawerNavGroup items={navGroupItems2} titleContent={
                    <View>
                        <Subtitle style={{padding: 16}}>Custom Navgroup Content</Subtitle>
                        <Divider />
                    </View>
                } />
            </DrawerBody>
            <DrawerFooter>
                <H6 style={{height: 60}}>Footer goes here</H6>
            </DrawerFooter>
        </Drawer>
    );
};
