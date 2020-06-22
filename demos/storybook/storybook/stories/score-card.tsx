import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { storiesOf } from '@storybook/react-native';
import { text, color, withKnobs, number, boolean } from '@storybook/addon-knobs';
import { ScoreCard, Hero, wrapIcon, HeroBanner, Body1, InfoListItem } from '@pxblue/react-native-components';
import { padded } from '../decorators';

import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import _A from '@pxblue/icons-svg/grade_a.svg';

import * as PXBColors from '@pxblue/colors';
import backgroundImage from '../assets/farm.jpg';

const A = wrapIcon({ IconClass: _A });
const Clock = wrapIcon({
    IconClass: MaterialCommunityIcon,
    name: 'clock-outline',
});
const MailIcon = wrapIcon({ IconClass: MatIcon, name: 'mail' });
const MoreIcon = wrapIcon({ IconClass: MatIcon, name: 'more-vert' });

storiesOf('ScoreCard', module)
    .addDecorator(withKnobs)
    .addDecorator(padded)
    .add('with minimal configuration', () => (
        <ScoreCard headerTitle={text('title', 'Portland Datacenter')}>
            <Text style={{ color: PXBColors.red[500] }}>2 Alarms</Text>
            <Text style={{ color: PXBColors.blue[500] }}>2 Events</Text>
            <Text style={{ color: PXBColors.green[900] }}>2 Predictions</Text>
        </ScoreCard>
    ))
    .add('with background and actions', () => (
        <ScoreCard
            headerTitle={text('title', 'Portland Datacenter')}
            headerSubtitle={text('subtitle', '6 UPS Devices')}
            headerInfo={text('infotext', 'Attention Required')}
            headerColor={color('backgroundColor', PXBColors.red[500])}
            headerFontColor={color('fontColor', PXBColors.white[50])}
            headerBackgroundImage={backgroundImage}
            actionItems={[
                {
                    icon: Clock,
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
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(
                0,
                number('actionItems.length', 2, {
                    range: true,
                    min: 0,
                    max: 3,
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
            <View style={{ justifyContent: 'center' }}>
                <ListItem
                    containerStyle={{ margin: 0, padding: 0, marginBottom: 8 }}
                    leftIcon={<MatIcon name={'notifications'} size={24} color={PXBColors.red[500]} />}
                    title={<Body1 color={'error'}>1 Alarm</Body1>}
                />
                <ListItem
                    containerStyle={{ margin: 0, padding: 0, marginBottom: 8 }}
                    leftIcon={<MatIcon name={'info'} size={24} color={PXBColors.blue[500]} />}
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
    .add('with hero badges', () => (
        <ScoreCard
            headerTitle={text('title', 'Portland Datacenter')}
            headerSubtitle={text('subtitle', '6 UPS Devices')}
            headerInfo={text('infotext', 'Attention Required')}
            headerColor={color('backgroundColor', PXBColors.red[500])}
            headerFontColor={color('fontColor', PXBColors.white[50])}
            headerBackgroundImage={backgroundImage}
            actionItems={[
                {
                    icon: Clock,
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
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(
                0,
                number('actionItems.length', 2, {
                    range: true,
                    min: 0,
                    max: 3,
                    step: 1,
                })
            )}
            badgeOffset={boolean('badgeOffset', false) ? -55 : 0}
            badge={
                <HeroBanner style={{ flex: 0, minWidth: 180, justifyContent: 'flex-end' }}>
                    {[
                        <Hero
                            key={'hero_1'}
                            label={'Score'}
                            iconSize={48}
                            iconColor={PXBColors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />,
                        <Hero
                            key={'hero_2'}
                            label={'Score'}
                            iconSize={48}
                            iconColor={PXBColors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />,
                        <Hero
                            key={'hero_3'}
                            label={'Score'}
                            iconSize={48}
                            iconColor={PXBColors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />,
                    ].slice(0, number('badges.length', 2, { range: true, min: 0, max: 3, step: 1 }))}
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
                    leftIcon={<MatIcon name={'notifications'} size={24} color={PXBColors.red[500]} />}
                    title={<Body1 color={'error'}>1 Alarm</Body1>}
                />
                <ListItem
                    containerStyle={{ margin: 0, padding: 0, marginBottom: 8 }}
                    leftIcon={<MatIcon name={'info'} size={24} color={PXBColors.blue[500]} />}
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
