import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { BucketView, InfoListItem } from '@pxblue/react-native-components';
import { withKnobs } from '@storybook/addon-knobs';
import { red, blue, gray, white } from '@pxblue/colors';

const styles = StyleSheet.create({
    style: {
        flex: 1,
        backgroundColor: gray[100],
        padding: 10,
    },
});

type Data = {
    name: string;
    status: string;
    dateAquired: Date;
};
const differenceInDays = (a: Date, b: Date): number => (a.getTime() - b.getTime()) / 1000 / 3600 / 24;
const today = new Date('2019-03-21');
const getDateLabel = (data: Data): string => {
    const diff = differenceInDays(today, data.dateAquired);
    if (diff > 31) {
        return 'Last Year';
    } else if (diff > 7) {
        return 'Last Month';
    }
    return 'Last Week';
};

type Device = {
    name: string;
    status: string;
    dateAcquired: Date;
};
const devices: Device[] = [
    { name: 'Device A', status: 'started', dateAcquired: new Date('2019-03-21') },
    { name: 'Device A', status: 'stopped', dateAcquired: new Date('2019-03-19') },
    { name: 'Device B', status: 'stopped', dateAcquired: new Date('2019-01-01') },
    { name: 'Device B', status: 'started', dateAcquired: new Date('2019-01-02') },
    { name: 'Device B', status: 'started', dateAcquired: new Date('2019-02-01') },
    { name: 'Device C', status: 'stopped', dateAcquired: new Date('2019-03-15') },
    { name: 'Device D', status: 'stopped', dateAcquired: new Date('2019-03-11') },
];

const Separator = (): JSX.Element => <View style={{ borderBottomColor: white[900], borderBottomWidth: 1 }} />;

storiesOf('BucketView')
    .addDecorator(withKnobs)
    .add('Sorted by labeled date spans', () => (
        <BucketView
            data={devices}
            getGroupLabel={getDateLabel}
            groupLabels={['Last Week', 'Last Month', 'Last Year']}
            renderItem={(device: Device): JSX.Element => (
                <InfoListItem
                    title={device.name}
                    subtitle={`aquired: ${device.dateAcquired.toUTCString()}`}
                    backgroundColor={white[100]}
                    statusColor={device.status === 'stopped' ? red[800] : blue[800]}
                />
            )}
            ItemSeparatorComponent={Separator}
            style={styles.style}
        />
    ))
    .add('Sorted by device names', () => (
        <BucketView
            data={devices}
            getGroupLabel={(device: Device): string => device.name}
            compareGroupLabels={(a: string, b: string): number => a.localeCompare(b)}
            renderItem={(device: Device): JSX.Element => (
                <View style={{ backgroundColor: white[100] }}>
                    <InfoListItem
                        title={device.name}
                        subtitle={`aquired: ${device.dateAcquired.toUTCString()}`}
                        statusColor={device.status === 'stopped' ? red[800] : blue[800]}
                    />
                </View>
            )}
            ItemSeparatorComponent={Separator}
            style={styles.style}
        />
    ));
