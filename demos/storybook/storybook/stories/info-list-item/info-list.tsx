import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { InfoListItem, ChannelValue } from '@pxblue/react-native-components';
import { FlatList, Text } from 'react-native';
import * as Colors from '@pxblue/colors';
import { InfoListItemProps } from '@pxblue/react-native-components/dist/info-list-item/info-list-item';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';
const Voltage: IconFamily = { family: 'pxblue', name: 'voltage_circled' };
const DeviceActivating: IconFamily = { family: 'pxblue', name: 'device_activating' };
const Temp: IconFamily = { family: 'pxblue', name: 'temp' };
const Device: IconFamily = { family: 'pxblue', name: 'device' };

storiesOf('InfoListItem', module).add('within a full list', () => (
    <FlatList<InfoListItemProps>
        data={[
            {
                icon: DeviceActivating,
                title: 'Status',
                iconAlign: 'center',
                statusColor: Colors.green[500],
                rightComponent: (
                    <>
                        <ChannelValue value={'Online'} />
                        <Text>,</Text>
                        <ChannelValue value={'ESS+'} />
                    </>
                ),
            },
            {
                icon: Voltage,
                avatar: true,
                title: 'Input Voltage',
                subtitle: ['Phase A', 'Phase B', 'Phase C'],
                rightComponent: (
                    <>
                        <ChannelValue value={'478'} units={'V'} />
                        <Text>,</Text>
                        <ChannelValue value={'479'} units={'V'} />
                        <Text>,</Text>
                        <ChannelValue value={'473'} units={'V'} />
                    </>
                ),
            },
            {
                icon: Voltage,
                avatar: true,
                title: 'Output Voltage',
                subtitle: ['Phase A', 'Phase B', 'Phase C'],
                statusColor: Colors.red[500],
                rightComponent: (
                    <>
                        <ChannelValue color={Colors.red[500]} value={'480'} units={'V'} />
                        <Text>,</Text>
                        <ChannelValue color={Colors.red[500]} value={'480'} units={'V'} />
                        <Text>,</Text>
                        <ChannelValue color={Colors.red[500]} value={'480'} units={'V'} />
                    </>
                ),
                styles: {
                    title: { color: Colors.red[500] },
                    subtitle: { color: Colors.red[500] },
                },
            },
            {
                icon: Device,
                iconAlign: 'center',
                title: 'Output Current',
                rightComponent: (
                    <>
                        <ChannelValue value={'15'} units={'A'} />
                        <Text>,</Text>
                        <ChannelValue value={'14.9'} units={'A'} />
                        <Text>,</Text>
                        <ChannelValue value={'15'} units={'A'} />
                    </>
                ),
            },
            {
                icon: Temp,
                iconAlign: 'center',
                title: 'Temperature',
                rightComponent: <ChannelValue value={'68'} units={'°F'} />,
            },
        ]}
        style={{ height: '100%', flex: 1000 }}
        renderItem={({ item }): JSX.Element => <InfoListItem {...item} divider={'full'} />}
        keyExtractor={(_item, index): string => `${index}`}
    />
));
