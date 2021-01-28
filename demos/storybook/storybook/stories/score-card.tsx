import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { text, color, withKnobs, number, boolean } from '@storybook/addon-knobs';
import { ScoreCard, Hero, wrapIcon, HeroBanner, Body1, InfoListItem } from '@pxblue/react-native-components';
import { List } from 'react-native-paper';
import { padded } from '../decorators';

import MatIcon from 'react-native-vector-icons/MaterialIcons';
import _A from '@pxblue/icons-svg/grade_a.svg';
import _Temp from '@pxblue/icons-svg/temp.svg';

import _Humidity from '@pxblue/icons-svg/moisture.svg';

import * as Colors from '@pxblue/colors';
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
            ].slice(
                0,
                number('actionLimit', 3, {
                    range: true,
                    min: 0,
                    max: 6,
                    step: 1,
                })
            )}
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
    .add('with heroes', () => (
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
                <HeroBanner style={{ flex: 0, minWidth: 180, justifyContent: 'flex-end' }}>
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
                    ].slice(0, number('Number of Heroes', 1, { range: true, min: 0, max: 2, step: 1 }))}
                </HeroBanner>
            }
        >
            <Body1>Body Content</Body1>
        </ScoreCard>
    ))
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
                <List.Item
                    style={{ margin: 0, padding: 0, marginBottom: 8 }}
                    left={(): JSX.Element => (
                        <View style={{ justifyContent: 'center' }}>
                            <MatIcon name={'notifications'} size={24} color={Colors.red[500]} />
                        </View>
                    )}
                    title={<Body1 color={'error'}>1 Alarm</Body1>}
                />
                <List.Item
                    style={{ margin: 0, padding: 0, marginBottom: 8 }}
                    left={(): JSX.Element => (
                        <View style={{ justifyContent: 'center' }}>
                            <MatIcon name={'info'} size={24} color={Colors.blue[500]} />
                        </View>
                    )}
                    title={<Body1 color={'primary'}>1 Event</Body1>}
                />
                <List.Item
                    style={{ margin: 0, padding: 0, alignItems: 'center', justifyContent: 'center' }}
                    left={(): JSX.Element => (
                        <View style={{ justifyContent: 'center' }}>
                            <MatIcon name={'cloud'} size={24} />
                        </View>
                    )}
                    title={<Body1>Online</Body1>}
                />
            </View>
        </ScoreCard>
    ))
    .add('with full config', () => (
        <ScoreCard
            headerTitle={text('headerTitle', 'Substation 3')}
            headerSubtitle={text('headerSubtitle', 'High Humidity Alarm')}
            headerInfo={text('headerInfo', '4 Devices')}
            headerColor={color('headerColor', Colors.blue[500])}
            headerFontColor={color('headerFontColor', Colors.white[50])}
            headerBackgroundImage={backgroundImage}
            styles={{
                root: { maxHeight: 280 },
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
            ].slice(
                0,
                number('actionLimit', 3, {
                    range: true,
                    min: 0,
                    max: 3,
                    step: 1,
                })
            )}
            badgeOffset={boolean('badgeOffset', true) ? -55 : 0}
            badge={
                <HeroBanner style={{ flex: 0, minWidth: 180, justifyContent: 'flex-end' }}>
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
                    ].slice(0, number('Number of Heroes', 1, { range: true, min: 0, max: 3, step: 1 }))}
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
                <List.Item
                    style={{ margin: 0, padding: 0, marginBottom: 8 }}
                    left={(): JSX.Element => (
                        <View style={{ justifyContent: 'center' }}>
                            <MatIcon name={'notifications'} size={24} color={Colors.red[500]} />
                        </View>
                    )}
                    title={<Body1 color={'error'}>1 Alarm</Body1>}
                />
                <List.Item
                    style={{ margin: 0, padding: 0, marginBottom: 8 }}
                    left={(): JSX.Element => (
                        <View style={{ justifyContent: 'center' }}>
                            <MatIcon name={'info'} size={24} color={Colors.blue[500]} />
                        </View>
                    )}
                    title={<Body1 color={'primary'}>1 Event</Body1>}
                />
                <List.Item
                    style={{ margin: 0, padding: 0 }}
                    left={(): JSX.Element => (
                        <View style={{ justifyContent: 'center' }}>
                            <MatIcon name={'cloud'} size={24} />
                        </View>
                    )}
                    title={<Body1>Online</Body1>}
                />
            </View>
        </ScoreCard>
    ));
