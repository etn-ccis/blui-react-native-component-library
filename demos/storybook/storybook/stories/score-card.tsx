import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { storiesOf } from '@storybook/react-native';
import { text, color, withKnobs, number, boolean } from '@storybook/addon-knobs';
import { ScoreCard, Hero, wrapIcon, HeroBanner, Body1, InfoListItem } from '@pxblue/react-native-components';
import { padded } from '../decorators';

import MatIcon from 'react-native-vector-icons/MaterialIcons';
import _A from '@pxblue/icons-svg/grade_a.svg';

import * as Colors from '@pxblue/colors';
import backgroundImage from '../assets/farm.jpg';

const A = wrapIcon({ IconClass: _A });
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
            <Text>Body Content</Text>
        </ScoreCard>
    ))
    .add('with custom header', () => (
        <ScoreCard
            headerTitle={text('headerTitle', 'Card Title')}
            headerSubtitle={text('headerSubtitle', 'Card Subtitle')}
            headerInfo={text('headerInfo', '4 Devices')}
            headerColor={color('backgroundColor', Colors.red[500])}
            headerFontColor={color('fontColor', Colors.white[50])}
            headerBackgroundImage={backgroundImage}
            style={{ maxHeight: 164 }}
        >
            <Text>Body Content</Text>
        </ScoreCard>
    ))
    .add('with actions', () => (
        <ScoreCard
            headerTitle="Substation 3"
            headerSubtitle="High Humidity Alarm"
            headerInfo="4 Devices"
            headerColor={Colors.red[500]}
            headerFontColor={Colors.white[50]}
            headerBackgroundImage={backgroundImage}
            style={{ maxHeight: 220 }}
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
            <Text>Body Content</Text>
        </ScoreCard>
    ))
    .add('with heroes', () => (
        <ScoreCard
            headerTitle="Substation 3"
            headerSubtitle="High Humidity Alarm"
            headerInfo="4 Devices"
            headerColor={Colors.red[500]}
            headerFontColor={Colors.white[50]}
            headerBackgroundImage={backgroundImage}
            style={{ maxHeight: 310 }}
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
                            label={'Score'}
                            iconSize={48}
                            iconColor={Colors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />,
                        <Hero
                            key={'hero_2'}
                            label={'Score'}
                            iconSize={48}
                            iconColor={Colors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />,
                    ].slice(0, number('Number of Heroes', 1, { range: true, min: 0, max: 2, step: 1 }))}
                </HeroBanner>
            }
        >
            <Text>Body Content</Text>
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
            style={{ maxHeight: 280 }}
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
                <HeroBanner style={{ flex: 0, minWidth: 180, justifyContent: 'flex-end' }}>
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
                <ListItem
                    containerStyle={{ margin: 0, padding: 0, marginBottom: 8 }}
                    leftIcon={<MatIcon name={'notifications'} size={24} color={Colors.red[500]} />}
                    title={<Body1 color={'error'}>1 Alarm</Body1>}
                />
                <ListItem
                    containerStyle={{ margin: 0, padding: 0, marginBottom: 8 }}
                    leftIcon={<MatIcon name={'info'} size={24} color={Colors.blue[500]} />}
                    title={<Body1 color={'primary'}>1 Event</Body1>}
                />
                <ListItem
                    containerStyle={{ margin: 0, padding: 0 }}
                    leftIcon={<MatIcon name={'cloud'} size={24} />}
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
            headerColor={color('headerColor', Colors.red[500])}
            headerFontColor={color('headerFontColor', Colors.white[50])}
            headerBackgroundImage={backgroundImage}
            style={{ maxHeight: 280 }}
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
                            label={'Score'}
                            iconSize={48}
                            iconColor={Colors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />,
                        <Hero
                            key={'hero_2'}
                            label={'Score'}
                            iconSize={48}
                            iconColor={Colors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />,
                        <Hero
                            key={'hero_3'}
                            label={'Score'}
                            iconSize={48}
                            iconColor={Colors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
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
                <ListItem
                    containerStyle={{ margin: 0, padding: 0, marginBottom: 8 }}
                    leftIcon={<MatIcon name={'notifications'} size={24} color={Colors.red[500]} />}
                    title={<Body1 color={'error'}>1 Alarm</Body1>}
                />
                <ListItem
                    containerStyle={{ margin: 0, padding: 0, marginBottom: 8 }}
                    leftIcon={<MatIcon name={'info'} size={24} color={Colors.blue[500]} />}
                    title={<Body1 color={'primary'}>1 Event</Body1>}
                />
                <ListItem
                    containerStyle={{ margin: 0, padding: 0 }}
                    leftIcon={<MatIcon name={'cloud'} size={24} />}
                    title={<Body1>Online</Body1>}
                />
            </View>
        </ScoreCard>
    ));
