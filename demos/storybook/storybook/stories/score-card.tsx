import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { text, color, withKnobs, number, boolean } from '@storybook/addon-knobs';
import { ScoreCard, Hero, HeroBanner, Body1, InfoListItem } from '@pxblue/react-native-components';
import { padded } from '../decorators';
import * as Colors from '@pxblue/colors';
import backgroundImage from '../assets/farm.jpg';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';

const A: IconFamily = { family: 'pxblue', name: 'grade_a' };
const Temp: IconFamily = { family: 'pxblue', name: 'temp' };
const Humidity: IconFamily = { family: 'pxblue', name: 'moisture' };
const MailIcon: IconFamily = { name: 'mail' };
const MoreIcon: IconFamily = { name: 'more-vert' };
const NotificationsIcon: IconFamily = { name: 'notifications' };
const ListAltIcon: IconFamily = { name: 'list-alt' };
const CloudIcon: IconFamily = { name: 'cloud' };
const SearchIcon: IconFamily = { name: 'search' };

storiesOf('ScoreCard', module)
    .addDecorator(withKnobs)
    .addDecorator(padded)
    .add('with basic usage', () => (
        <ScoreCard headerTitle={text('headerTitle', 'Card Title')} style={{ maxHeight: 164 }}>
            <Body1>Body Content</Body1>
        </ScoreCard>
    ))
    .add('with custom header', () => (
        <ScoreCard
            headerTitle={text('headerTitle', 'Card Title')}
            headerSubtitle={text('headerSubtitle', 'Card Subtitle')}
            headerInfo={text('headerInfo', '4 Devices')}
            headerColor={color('backgroundColor', Colors.blue[500])}
            headerFontColor={color('fontColor', Colors.white[50])}
            headerBackgroundImage={backgroundImage}
            style={{ maxHeight: 164 }}
        >
            <Body1>Body Content</Body1>
        </ScoreCard>
    ))
    .add('with actions', () => (
        <ScoreCard
            headerTitle="Substation 3"
            headerSubtitle="High Humidity Alarm"
            headerInfo="4 Devices"
            headerColor={Colors.blue[500]}
            headerFontColor={Colors.white[50]}
            headerBackgroundImage={backgroundImage}
            styles={{
                root: { maxHeight: 220 },
                body: { flex: 1 },
            }}
            actionItems={[
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: SearchIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: MailIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: NotificationsIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: ListAltIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: CloudIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ]
                .slice(
                    0,
                    number('actionLimit', 3, {
                        range: true,
                        min: 0,
                        max: 6,
                        step: 1,
                    })
                )
                .reverse()}
            actionRow={
                <InfoListItem
                    title={'View Location'}
                    chevron
                    onPress={(): void => {
                        /* do nothing */
                    }}
                    hidePadding
                    dense
                />
            }
        >
            <Body1>Body Content</Body1>
        </ScoreCard>
    ))
    .add('with heroes', () => {
        const heroCount = number('Number of Heroes', 1, { range: true, min: 0, max: 2, step: 1 });
        return (
            <ScoreCard
                headerTitle="Substation 3"
                headerSubtitle="High Humidity Alarm"
                headerInfo="4 Devices"
                headerColor={Colors.blue[500]}
                headerFontColor={Colors.white[50]}
                headerBackgroundImage={backgroundImage}
                styles={{
                    root: { maxHeight: 310 },
                    body: { flex: 1 },
                }}
                actionItems={[
                    {
                        icon: MoreIcon,
                        onPress: (): void => {
                            /* do nothing */
                        },
                    },
                ]}
                actionRow={
                    <InfoListItem
                        title={'View Location'}
                        chevron
                        onPress={(): void => {
                            /* do nothing */
                        }}
                        hidePadding
                        dense
                    />
                }
                badgeOffset={0}
                badge={
                    <HeroBanner style={{ flex: 0, minWidth: heroCount * 90, justifyContent: 'flex-end' }}>
                        {[
                            <Hero
                                key={'hero_1'}
                                label={'Temperature'}
                                iconSize={48}
                                iconColor={Colors.black[500]}
                                ChannelValueProps={{ value: 98, units: '°F' }}
                                icon={Temp}
                            />,
                            <Hero
                                key={'hero_2'}
                                label={'Humidity'}
                                iconSize={54}
                                iconColor={Colors.lightBlue[300]}
                                ChannelValueProps={{ value: 54, units: '%' }}
                                icon={Humidity}
                            />,
                        ].slice(0, heroCount)}
                    </HeroBanner>
                }
            >
                <Body1>Body Content</Body1>
            </ScoreCard>
        );
    })
    .add('with score badge', () => (
        <ScoreCard
            headerTitle="Substation 3"
            headerSubtitle="High Humidity Alarm"
            headerInfo="4 Devices"
            headerColor={Colors.blue[500]}
            headerFontColor={Colors.white[50]}
            headerBackgroundImage={backgroundImage}
            styles={{
                root: { maxHeight: 280 },
                body: { flex: 1, paddingLeft: 0 },
            }}
            actionItems={[
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ]}
            actionRow={
                <InfoListItem
                    title={'View Location'}
                    chevron
                    onPress={(): void => {
                        /* do nothing */
                    }}
                    hidePadding
                    dense
                />
            }
            badgeOffset={boolean('badgeOffset', true) ? -55 : 0}
            badge={
                <HeroBanner style={{ flex: 0, minWidth: 90, justifyContent: 'flex-end' }}>
                    {[
                        <Hero
                            key={'hero_1'}
                            label={'Score'}
                            iconSize={48}
                            iconColor={Colors.green[500]}
                            ChannelValueProps={{ value: 98, units: '/100' }}
                            icon={A}
                        />,
                    ]}
                </HeroBanner>
            }
        >
            <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
                <InfoListItem
                    title={'1 Alarm'}
                    iconColor={Colors.red[500]}
                    fontColor={Colors.red[500]}
                    icon={{ name: 'notifications' }}
                    style={{ height: 40 }}
                />
                <InfoListItem
                    title={'1 Event'}
                    iconColor={Colors.blue[500]}
                    fontColor={Colors.blue[500]}
                    icon={{ name: 'info' }}
                    style={{ height: 40 }}
                />
                <InfoListItem
                    title={'Online'}
                    icon={{ name: 'cloud' }}
                    style={{ height: 40 }}
                    styles={{ title: { fontWeight: 'normal' } }}
                />
            </View>
        </ScoreCard>
    ))
    .add('with full config', () => {
        const heroCount = number('Number of Heroes', 1, { range: true, min: 0, max: 3, step: 1 });
        return (
            <ScoreCard
                headerTitle={text('headerTitle', 'Substation 3')}
                headerSubtitle={text('headerSubtitle', 'High Humidity Alarm')}
                headerInfo={text('headerInfo', '4 Devices')}
                headerColor={color('headerColor', Colors.blue[500])}
                headerFontColor={color('headerFontColor', Colors.white[50])}
                headerBackgroundImage={backgroundImage}
                styles={{
                    root: { maxHeight: 280 },
                    body: { flex: 1, paddingLeft: 0 },
                }}
                actionItems={[
                    {
                        icon: MoreIcon,
                        onPress: (): void => {
                            /* do nothing */
                        },
                    },
                    {
                        icon: SearchIcon,
                        onPress: (): void => {
                            /* do nothing */
                        },
                    },
                    {
                        icon: MailIcon,
                        onPress: (): void => {
                            /* do nothing */
                        },
                    },
                ]
                    .slice(
                        0,
                        number('actionLimit', 3, {
                            range: true,
                            min: 0,
                            max: 2,
                            step: 1,
                        })
                    )
                    .reverse()}
                badgeOffset={boolean('badgeOffset', true) ? -55 : 0}
                badge={
                    <HeroBanner style={{ flex: 0, minWidth: heroCount * 90, justifyContent: 'flex-end' }}>
                        {[
                            <Hero
                                key={'hero_1'}
                                label={'Temperature'}
                                iconSize={48}
                                iconColor={Colors.black[500]}
                                ChannelValueProps={{ value: 98, units: '°F' }}
                                icon={Temp}
                            />,
                            <Hero
                                key={'hero_2'}
                                label={'Humidity'}
                                iconSize={54}
                                iconColor={Colors.lightBlue[300]}
                                ChannelValueProps={{ value: 54, units: '%' }}
                                icon={Humidity}
                            />,
                        ].slice(0, heroCount)}
                    </HeroBanner>
                }
                actionRow={
                    <InfoListItem
                        title={'View Location'}
                        chevron
                        onPress={(): void => {
                            /* do nothing */
                        }}
                        hidePadding
                        dense
                    />
                }
            >
                <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
                    <InfoListItem
                        title={'1 Alarm'}
                        iconColor={Colors.red[500]}
                        fontColor={Colors.red[500]}
                        icon={{ name: 'notifications' }}
                        style={{ height: 40 }}
                    />
                    <InfoListItem
                        title={'1 Event'}
                        iconColor={Colors.blue[500]}
                        fontColor={Colors.blue[500]}
                        icon={{ name: 'info' }}
                        style={{ height: 40 }}
                    />
                    <InfoListItem
                        title={'Online'}
                        icon={{ name: 'cloud' }}
                        style={{ height: 40 }}
                        styles={{ title: { fontWeight: 'normal' } }}
                    />
                </View>
            </ScoreCard>
        );
    });
