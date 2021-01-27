import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { Image, View } from 'react-native';
import { InfoListItem, InfoListItemProps, UserMenu, wrapIcon } from '@pxblue/react-native-components';
import { text, withKnobs, color } from '@storybook/addon-knobs';
import * as Colors from '@pxblue/colors';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Divider } from 'react-native-paper';
const VpnKeyIcon = wrapIcon({ IconClass: MatIcon, name: 'vpn-key', flip: false });
const SettingsIcon = wrapIcon({ IconClass: MatIcon, name: 'settings', flip: false });
const ExitToAppIcon = wrapIcon({ IconClass: MatIcon, name: 'exit-to-app', flip: false });
const NumericOneBoxIcon = wrapIcon({ IconClass: MatIcon, name: 'looks-one', flip: false });
const NumericTwoBoxIcon = wrapIcon({ IconClass: MatIcon, name: 'looks-two', flip: false });
const avatarTestImage = require('../assets/test-avatar.png');

const menuItems: InfoListItemProps[] = [
    { title: 'Change Password', IconClass: VpnKeyIcon },
    { title: 'Preferences', IconClass: SettingsIcon },
    { title: 'Log Out', IconClass: ExitToAppIcon },
];

const CustomMenuComponent: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = (): void => {
        setMenuOpen(false);
    };

    const customMenu = (): JSX.Element => (
        <View>
            <InfoListItem
                customIcon={
                    <Avatar.Icon
                        icon="account-circle"
                        size={40}
                        color={Colors.white[50]}
                        style={{ backgroundColor: Colors.red[500] }}
                    />
                }
                title={'Custom Menu Title'}
                subtitle={'Custom Menu Subtitle'}
            />
            <Divider />
            <InfoListItem
                title={'Custom Menu Info List Item 1'}
                IconClass={NumericOneBoxIcon}
                onPress={(): void => closeMenu()}
            />
            <InfoListItem
                title={'Custom Menu Info List Item 2'}
                IconClass={NumericTwoBoxIcon}
                onPress={(): void => closeMenu()}
            />
        </View>
    );

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <UserMenu
                menu={customMenu()}
                menuOpen={menuOpen}
                toggleMenu={(): void => setMenuOpen(!menuOpen)}
                avatar={
                    <Avatar.Icon
                        icon="account-circle"
                        size={40}
                        color={Colors.white[50]}
                        style={{ backgroundColor: Colors.red[500] }}
                    />
                }
            />
        </View>
    );
};

storiesOf('UserMenu', module)
    .addDecorator(withKnobs)
    .add('with basic usage', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <UserMenu
                menuItems={menuItems}
                avatar={<Avatar.Text label={text('Avatar.Text label', 'PX')} size={40} color={Colors.white[50]} />}
            />
        </View>
    ))
    .add('with custom colors', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <UserMenu
                menuItems={menuItems}
                backgroundColor={color('backgroundColor', Colors.blue[500])}
                fontColor={color('fontColor', Colors.white[50])}
                iconColor={color('iconColor', Colors.white[50])}
                avatar={
                    <Avatar.Text
                        label={text('Avatar.Text label', 'PX')}
                        size={40}
                        color={color('Avatar.Text text color', Colors.white[50])}
                        style={{ backgroundColor: color('Avatar.Text background color', Colors.blue[500]) }}
                    />
                }
            />
        </View>
    ))
    .add('with icon avatar', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <UserMenu
                menuItems={menuItems}
                avatar={
                    <Avatar.Icon
                        icon="account-circle"
                        size={40}
                        color={Colors.white[50]}
                        style={{ backgroundColor: Colors.red[500] }}
                    />
                }
            />
        </View>
    ))
    .add('with image avatar', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <UserMenu
                menuItems={menuItems}
                avatar={
                    <Image
                        source={avatarTestImage}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                            resizeMode: 'contain',
                            backgroundColor: Colors.green[500],
                        }}
                    />
                }
            />
        </View>
    ))
    .add('with a menu header', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <UserMenu
                menuTitle={text('menuTitle', 'John Smith')}
                menuSubtitle={text('menuSubtitle', 'j.smith@email.com')}
                menuItems={menuItems}
                avatar={<Avatar.Text label={'PX'} size={40} color={Colors.white[50]} />}
            />
        </View>
    ))
    .add('with custom menu', () => <CustomMenuComponent />)
    .add('with full config', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <UserMenu
                menuTitle={text('menuTitle', 'John Smith')}
                menuSubtitle={text('menuSubtitle', 'j.smith@email.com')}
                menuItems={menuItems}
                backgroundColor={color('backgroundColor', Colors.blue[500])}
                fontColor={color('fontColor', Colors.white[50])}
                iconColor={color('iconColor', Colors.white[50])}
                avatar={
                    <Avatar.Text
                        label={text('Avatar.Text label', 'PX')}
                        size={40}
                        color={color('Avatar.Text text color', Colors.white[50])}
                        style={{ backgroundColor: color('Avatar.Text background color', Colors.blue[500]) }}
                    />
                }
            />
        </View>
    ));
