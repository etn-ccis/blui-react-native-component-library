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
import * as PXBColors from "@pxblue/colors";
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

const Battery = wrapIcon({ IconClass: _Battery });
const Humidity = wrapIcon({ IconClass: _Humidity });
const Clock = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'clock-outline' });
const MailIcon = wrapIcon({ IconClass: MatIcon, name: 'mail' });


export const navGroupItems1: NavItem[] = [
    {
        title: 'Identity Management',
        itemID: '1a',
        icon: Battery
    },
    {
        title: 'Calendar',
        itemID: '2a',
        icon: Humidity,
    },
    {
        title: 'Accessibility',
        itemID: '3a',
        icon: Clock,
        chevron: true,
        onItemSelect: (): void => { /* Expand and don't update selected */ },
        items: [
            {
                title: 'Sub NavItem 1',
                itemID: '3a1',
            },
            {
                title: 'Sub NavItem 2',
                itemID: '3a2',
            }
        ]
    },
    {
        subtitle: 'Test',
        title: 'Notifications',
        itemID: '4a',
        icon: MailIcon,
    },
];

export const navGroupItems2: NavItem[] = [
    {
        title: 'Notifications',
        subtitle: '4 new alerts',
        itemID: '1b',
        statusColor: PXBColors.yellow[500],
        onItemSelect: (): void => { /* Expand and don't update selected */ },
        items: [
            {
                title: 'Sub NavItem 1',
                itemID: '1ba'
            },
            {
                title: 'Sub NavItem 2',
                itemID: '1bb'
            }
        ]
    },
    {
        title: 'Calendar',
        itemID: '2b',
    },
    {
        title: 'Accessibility',
        itemID: '3b',
    },
    {
        subtitle: 'You cant see me, fix InfoListItem',
        title: 'Notifications',
        itemID: '4b',
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
                icon={
                    <IconButton icon="menu" size={24} onPress={(): void => {
                        navigation.closeDrawer();
                    }}/>
                }
            />
            <DrawerSubheader>
                <H6 style={{backgroundColor: 'cyan'}}>Subheader goes here</H6>
            </DrawerSubheader>
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
                <H6>Footer goes here</H6>
            </DrawerFooter>
        </Drawer>
    );
};
