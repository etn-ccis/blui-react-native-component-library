import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Card, ListItem } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';

import {
    Body1,
    ChannelValue,
    EmptyState,
    H6,
    Header,
    Hero,
    HeroBanner,
    InfoListItem,
    ScoreCard,
    wrapIcon,
} from '@pxblue/react-native-components';

import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as PXBColors from '@pxblue/colors';

import _A from '@pxblue/icons-svg/grade_a.svg';
import _Temp from '@pxblue/icons-svg/temp.svg';
import _Humidity from '@pxblue/icons-svg/moisture.svg';
import _Battery from '@pxblue/icons-svg/battery.svg';
import { RootStackParamList } from './router';

const backgroundImage = require('./assets/images/farm.jpg');

const ChartLineVariant = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'chart-line-variant' });
const Battery = wrapIcon({ IconClass: _Battery });
const A = wrapIcon({ IconClass: _A });
const Temp = wrapIcon({ IconClass: _Temp });
const Humidity = wrapIcon({ IconClass: _Humidity });
const Pie = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'chart-pie' });
const Clock = wrapIcon({ IconClass: MaterialCommunityIcon, name: 'clock-outline' });
const MailIcon = wrapIcon({ IconClass: MatIcon, name: 'mail' });
const MenuIcon = wrapIcon({ IconClass: MatIcon, name: 'menu' });
const MoreIcon = wrapIcon({ IconClass: MatIcon, name: 'more-vert' });

const PADDING = 10;

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'App'>;
};

export const App: React.FC<AppProps> = ({ navigation }) => (
    <View style={{ flex: 1, backgroundColor: PXBColors.gray[50] }}>
        <Header
            expandable={true}
            title={'South Tin Mill'}
            subtitle={'Gary Steel Works'}
            info={'Online'}
            navigation={{
                icon: MenuIcon,
                onPress: (): void => {
                    navigation.openDrawer();
                },
            }}
            actionItems={[
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
            ]}
            backgroundImage={backgroundImage}
            searchableConfig={{ placeholder: 'Search', autoFocus: true }}
        />
        <ScrollView>
            <Card containerStyle={{ padding: 0, margin: PADDING, marginBottom: 0 }}>
                <EmptyState
                    title={'Nothing Found'}
                    description={'Not a single thing'}
                    IconClass={ChartLineVariant}
                    actions={<Button title={'Add a Device'} type={'outline'} />}
                />
            </Card>
            <Card containerStyle={{ padding: 0, margin: PADDING, marginBottom: PADDING }}>
                <HeroBanner>
                    <Hero
                        label={'Healthy'}
                        value={96}
                        units={'/100'}
                        IconClass={A}
                        fontSize={20}
                        iconColor={PXBColors.green[500]}
                    />
                    <Hero label={'Battery'} value={'Full'} IconClass={Battery} iconColor={PXBColors.blue[500]} />
                    <Hero label={'Estimated'} IconClass={Clock} iconColor={PXBColors.gray[500]}>
                        <ChannelValue fontSize={20} value={1} units={'h'} />
                        <ChannelValue fontSize={20} value={37} units={'m'} />
                    </Hero>
                    <Hero label={'Loaded'} IconClass={Pie} iconColor={PXBColors.blue[500]}>
                        <ChannelValue fontSize={20} value={65} units={'%'} IconClass={ChartLineVariant} />
                    </Hero>
                    <Hero label={'Not Shown'} value={'5th Item'} IconClass={Battery} iconColor={PXBColors.blue[500]} />
                </HeroBanner>
                <ListItem
                    topDivider
                    leftIcon={<MatIcon name={'wb-sunny'} size={24} style={{ marginRight: 10 }} />}
                    title={<H6>Temperature</H6>}
                    rightElement={<ChannelValue value={68} units={'°F'} />}
                />
                <ListItem
                    topDivider
                    leftIcon={<MatIcon name={'wb-sunny'} size={24} style={{ marginRight: 10 }} />}
                    title={<H6>Temperature</H6>}
                    rightElement={<ChannelValue value={68} units={'°F'} />}
                />
                <ListItem
                    topDivider
                    leftIcon={<MatIcon name={'wb-sunny'} size={24} style={{ marginRight: 10 }} />}
                    title={<H6>Temperature</H6>}
                    rightElement={
                        <React.Fragment>
                            <ChannelValue value={1} units={'h'} IconClass={Clock} />
                            <ChannelValue value={24} units={'m'} />
                        </React.Fragment>
                    }
                />
            </Card>
            <InfoListItem
                title={'Emerson Field West'}
                subtitle={['DG 100', 'EDR 5000', 'Online']}
                statusColor={PXBColors.red[500]}
                fontColor={PXBColors.red[500]}
                hidePadding={true}
                backgroundColor={'white'}
                IconClass={Battery}
                avatar
                // dense
                rightComponent={<MatIcon name={'mail'} size={24} color={PXBColors.black[500]} />}
                divider={'partial'}
                onPress={(): void => {
                    /* do nothing */
                }}
            />
            <InfoListItem
                title={'South Hills Farm'}
                subtitle={'Offline'}
                backgroundColor={'white'}
                statusColor={PXBColors.orange[500]}
                divider={'full'}
                IconClass={Pie}
                hidePadding={false}
                fontColor={PXBColors.red[500]}
                rightComponent={<ChannelValue value={15} units={'A'} />}
                onPress={(): void => {
                    /* do nothing */
                }}
            />
            <InfoListItem
                title={'Cherry East'}
                backgroundColor={'white'}
                subtitle={['DG 100', 'EDR 5000', 'Online']}
                subtitleSeparator={'/'}
                hidePadding
                onPress={(): void => {
                    /* do nothing */
                }}
            />
            <ScoreCard
                style={{ margin: PADDING }}
                headerTitle={'Portland Datacenter Long Name'}
                headerSubtitle={'6 UPS Devices'}
                headerInfo={'Attention Required'}
                headerBackgroundImage={backgroundImage}
                actionItems={[
                    {
                        icon: MoreIcon,
                        onPress: (): void => {
                            /* do nothing */
                        },
                    },
                ]}
                badgeOffset={-55}
                badge={
                    <HeroBanner style={{ flex: 0, minWidth: 80, justifyContent: 'flex-end' }}>
                        <Hero
                            label={'Score'}
                            iconSize={48}
                            iconColor={PXBColors.green[500]}
                            value={98}
                            units={'/100'}
                            IconClass={A}
                        />
                    </HeroBanner>
                }
                actionRow={
                    <InfoListItem
                        dense
                        chevron
                        hidePadding
                        title={'View Location'}
                        onPress={(): void => {
                            /* do nothing */
                        }}
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
            <ScoreCard
                style={{ margin: PADDING, marginTop: 0 }}
                headerColor={PXBColors.red[500]}
                headerTitle={'Substation 3'}
                headerSubtitle={'High Humidity Alarm'}
                headerInfo={'5 Devices'}
                headerBackgroundImage={backgroundImage}
                actionItems={[
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
                ]}
                badge={
                    <HeroBanner style={{ flex: 0, minWidth: 180, justifyContent: 'flex-end' }}>
                        <Hero
                            label={'Temperature'}
                            iconColor={PXBColors.black[500]}
                            iconSize={70}
                            value={69}
                            units={'°F'}
                            IconClass={Temp}
                        />
                        <Hero
                            label={'Humidity'}
                            iconSize={70}
                            iconColor={PXBColors.blue[200]}
                            value={78}
                            units={'%'}
                            IconClass={Humidity}
                        />
                    </HeroBanner>
                }
                actionRow={
                    <InfoListItem
                        dense
                        chevron
                        hidePadding
                        title={'View Location'}
                        onPress={(): void => {
                            /* do nothing */
                        }}
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
            <SafeAreaView />
        </ScrollView>
    </View>
);
