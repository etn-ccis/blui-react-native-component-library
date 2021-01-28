import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { InfoListItem, wrapIcon, ChannelValue } from '@pxblue/react-native-components';
import { FlatList, Text } from 'react-native';
import * as Colors from '@pxblue/colors';
import { InfoListItemProps } from '@pxblue/react-native-components/dist/info-list-item/info-list-item';
import _DeviceActivating from '@pxblue/icons-svg/device_activating.svg';
import _Temp from '@pxblue/icons-svg/temp.svg';
import _Device from '@pxblue/icons-svg/device.svg';
import _Voltage from '@pxblue/icons-svg/voltage_circled.svg';
const Voltage = wrapIcon({ IconClass: _Voltage });
const DeviceActivating = wrapIcon({ IconClass: _DeviceActivating });
const Temp = wrapIcon({ IconClass: _Temp });
const Device = wrapIcon({ IconClass: _Device });

storiesOf('InfoListItem', module).add('within a full list', () => (
    <FlatList<InfoListItemProps>
        data={[
            {
                IconClass: DeviceActivating,
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
                IconClass: Voltage,
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
                IconClass: Voltage,
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
                IconClass: Device,
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
                IconClass: Temp,
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
