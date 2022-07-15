import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Image, View, StyleSheet } from 'react-native';
import { Header, InfoListItemProps, UserMenu } from '@pxblue/react-native-components';
import { text, withKnobs, color, select } from '@storybook/addon-knobs';
import * as Colors from '@pxblue/colors';
import { Avatar } from 'react-native-paper';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';
const VpnKeyIcon: IconFamily = { name: 'vpn-key' };
const SettingsIcon: IconFamily = { name: 'settings' };
const ExitToAppIcon: IconFamily = { name: 'exit-to-app' };
const avatarTestImage = require('../assets/test-avatar.png');

const customStyles = StyleSheet.create({
    root: {
        maxHeight: 56,
    },
});

const menuItems: InfoListItemProps[] = [
    { title: 'Change Password', icon: VpnKeyIcon },
    { title: 'Preferences', icon: SettingsIcon },
    { title: 'Log Out', icon: ExitToAppIcon },
];

storiesOf('UserMenu', module)
    .addDecorator(withKnobs)
    .add('with basic usage', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <UserMenu
                menuItems={menuItems}
                avatar={
                    <Avatar.Text
                        label={text('Avatar.Text label', 'JS')}
                        size={40}
                        color={Colors.blue[500]}
                        style={{ backgroundColor: Colors.blue[50] }}
                    />
                }
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
                        label={text('Avatar.Text label', 'JS')}
                        size={40}
                        color={color('Avatar.Text text color', Colors.blue[500])}
                        style={{ backgroundColor: color('Avatar.Text background color', Colors.blue[50]) }}
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
                avatar={
                    <Avatar.Text
                        label={'JS'}
                        size={40}
                        color={Colors.blue[500]}
                        style={{ backgroundColor: Colors.blue[50] }}
                    />
                }
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
                        label={text('Avatar.Text label', 'JS')}
                        size={40}
                        color={color('Avatar.Text text color', Colors.blue[500])}
                        style={{ backgroundColor: color('Avatar.Text background color', Colors.blue[50]) }}
                    />
                }
            />
        </View>
    ))
    .add('within a Header', () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Header
                title={'Title'}
                styles={{ root: customStyles.root }}
                actionItems={[
                    {
                        component: (
                            <UserMenu
                                menuTitle={'John Smith'}
                                menuSubtitle={'j.smith@email.com'}
                                menuItems={menuItems}
                                avatar={
                                    <Avatar.Text
                                        label={'JS'}
                                        size={40}
                                        color={Colors.blue[500]}
                                        style={{ backgroundColor: Colors.blue[50] }}
                                    />
                                }
                            />
                        ),
                    },
                ]}
            />
        </View>
    ));
