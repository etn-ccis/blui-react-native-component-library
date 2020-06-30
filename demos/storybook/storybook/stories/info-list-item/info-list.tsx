import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { InfoListItem, wrapIcon, ChannelValue } from '@pxblue/react-native-components';
import { FlatList } from 'react-native';
import Flow from '@pxblue/icons-svg/flow.svg';
import { blue, green, red, white } from '@pxblue/colors';
import * as _ from 'lodash';
import { InfoListItemProps } from '@pxblue/react-native-components/dist/info-list-item/info-list-item';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import _Leaf from '@pxblue/icons-svg/leaf.svg';

const AlarmIcon = wrapIcon({ IconClass: MatIcon, name: 'notifications' });
const LeafIcon = wrapIcon({ IconClass: _Leaf });

const createInfoListItemProps = (): InfoListItemProps => {
    let subtitle: InfoListItemProps['subtitle'];
    let title: InfoListItemProps['title'];
    let color: InfoListItemProps['color'];
    let IconClass: InfoListItemProps['IconClass'];
    let onPress: InfoListItemProps['onPress'];
    let statusColor: InfoListItemProps['statusColor'];
    let iconColor: InfoListItemProps['iconColor'];

    const titleNumber = Math.random();
    if (titleNumber < 0.3) {
        title = 'Status';
    } else if (titleNumber < 0.6) {
        title = 'Input Voltage'
    } else if (titleNumber < 1.0) {
        title = 'Output Voltage';
    }

    const subtitleNumber = Math.random();
    if (subtitleNumber < 0.3) {
        subtitle = 'Voltage Stable';
    } else if (subtitleNumber < 0.6) {
        subtitle = ['Phase A', 'Phase B', 'Phase C'];
    } else if (subtitleNumber < 1.0) {
        subtitle = '';
    }

    const colorNumber = Math.random();
    if (colorNumber < 0.4) {
        color = iconColor = green[700];
        statusColor = white[500];
    } else if (colorNumber < 0.7) {
        color = statusColor = iconColor = blue[700];
    } else if (colorNumber < 1.0) {
        color = statusColor = iconColor = red[500];
    }

    const alarmNumber = Math.random()
    if (alarmNumber < 0.4) {
        IconClass = AlarmIcon;
    } else if (alarmNumber < 0.7) {
        IconClass = LeafIcon;
    }

    if (Math.random() < 0.5) {
        onPress = (): void => {
            /* do nothing */
        };
    }

    return {
        title,
        subtitle,
        color,
        IconClass,
        onPress,
        divider: 'partial',
        statusColor,
        iconColor
    };
};

const data: InfoListItemProps[] = _.range(100).map(createInfoListItemProps);
storiesOf('InfoListItem', module).add('within a full list', () => (
    <FlatList<InfoListItemProps>
        data={data}
        style={{ height: '100%', flex: 1000 }}
        renderItem={({ item }): JSX.Element => <InfoListItem {...item} rightComponent={
            <ChannelValue
                value={'15'}
                units={'A'}
            />
        }/>}
        keyExtractor={(_item, index): string => `${index}`}
    />
));
