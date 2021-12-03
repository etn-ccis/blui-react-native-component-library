import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { text, color, withKnobs, number, boolean } from '@storybook/addon-knobs';
import { ScoreCard, Hero, wrapIcon, HeroBanner, Body1, InfoListItem } from '@brightlayer-ui/react-native-components';
import { padded } from '../decorators';

import MatIcon from 'react-native-vector-icons/MaterialIcons';
import _A from '@brightlayer-ui/icons-svg/grade_a.svg';
import _Temp from '@brightlayer-ui/icons-svg/temp.svg';

import _Humidity from '@brightlayer-ui/icons-svg/moisture.svg';

import * as Colors from '@brightlayer-ui/colors';
import backgroundImage from '../assets/farm.jpg';

const A = wrapIcon({ IconClass: _A });
const Temp = wrapIcon({ IconClass: _Temp });
const Humidity = wrapIcon({ IconClass: _Humidity });
const MailIcon = wrapIcon({ IconClass: MatIcon, name: 'mail' });
const MoreIcon = wrapIcon({ IconClass: MatIcon, name: 'more-vert' });
const NotificationsIcon = wrapIcon({ IconClass: MatIcon, name: 'notifications' });
const ListAltIcon = wrapIcon({ IconClass: MatIcon, name: 'list-alt' });
const CloudIcon = wrapIcon({ IconClass: MatIcon, name: 'cloud' });
const SearchIcon = wrapIcon({ IconClass: MatIcon, name: 'search' });

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
                                value={98}
                                units={'°F'}
                                IconClass={Temp}
                            />,
                            <Hero
                                key={'hero_2'}
                                label={'Humidity'}
                                iconSize={54}
                                iconColor={Colors.lightBlue[300]}
                                value={54}
                                units={'%'}
                                IconClass={Humidity}
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
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />,
                    ]}
                </HeroBanner>
            }
        >
            <View style={{ justifyContent: 'center' }}>
                <InfoListItem
                    title={'1 Alarm'}
                    iconColor={Colors.red[500]}
                    fontColor={Colors.red[500]}
                    IconClass={wrapIcon({ IconClass: MatIcon, name: 'notifications' })}
                    style={{ height: 40 }}
                />
                <InfoListItem
                    title={'1 Event'}
                    iconColor={Colors.blue[500]}
                    fontColor={Colors.blue[500]}
                    IconClass={wrapIcon({ IconClass: MatIcon, name: 'info' })}
                    style={{ height: 40 }}
                />
                <InfoListItem
                    title={'Online'}
                    IconClass={wrapIcon({ IconClass: MatIcon, name: 'cloud' })}
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
                                value={98}
                                units={'°F'}
                                IconClass={Temp}
                            />,
                            <Hero
                                key={'hero_2'}
                                label={'Humidity'}
                                iconSize={54}
                                iconColor={Colors.lightBlue[300]}
                                value={54}
                                units={'%'}
                                IconClass={Humidity}
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
                <View style={{ justifyContent: 'center' }}>
                    <InfoListItem
                        title={'1 Alarm'}
                        iconColor={Colors.red[500]}
                        fontColor={Colors.red[500]}
                        IconClass={wrapIcon({ IconClass: MatIcon, name: 'notifications' })}
                        style={{ height: 40 }}
                    />
                    <InfoListItem
                        title={'1 Event'}
                        iconColor={Colors.blue[500]}
                        fontColor={Colors.blue[500]}
                        IconClass={wrapIcon({ IconClass: MatIcon, name: 'info' })}
                        style={{ height: 40 }}
                    />
                    <InfoListItem
                        title={'Online'}
                        IconClass={wrapIcon({ IconClass: MatIcon, name: 'cloud' })}
                        style={{ height: 40 }}
                        styles={{ title: { fontWeight: 'normal' } }}
                    />
                </View>
            </ScoreCard>
        );
    });
