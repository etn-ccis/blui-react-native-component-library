import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Image, View } from 'react-native';
import { InfoListItemProps, UserMenu, wrapIcon } from '@pxblue/react-native-components';
import { text, withKnobs, color, select } from '@storybook/addon-knobs';
import * as Colors from '@pxblue/colors';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-paper';
const VpnKeyIcon = wrapIcon({ IconClass: MatIcon, name: 'vpn-key', flip: false });
const SettingsIcon = wrapIcon({ IconClass: MatIcon, name: 'settings', flip: false });
const ExitToAppIcon = wrapIcon({ IconClass: MatIcon, name: 'exit-to-app', flip: false });
const avatarTestImage = require('../assets/test-avatar.png');

const menuItems: InfoListItemProps[] = [
    { title: 'Change Password', IconClass: VpnKeyIcon },
    { title: 'Preferences', IconClass: SettingsIcon },
    { title: 'Log Out', IconClass: ExitToAppIcon },
];

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
                        icon={select('Avatar.Icon icon', ['account-circle', 'face', 'account-group'], 'account-circle')}
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
                            resizeMode: 'cover',
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
