import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { InfoListItem, ChannelValue } from '@pxblue/react-native-components';
import { text, boolean, withKnobs, color } from '@storybook/addon-knobs';
import { framedRow } from '../../decorators';
import * as Colors from '@pxblue/colors';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';

const notes = {
    notes: 'The borders are NOT part of the component; they are provided for framing only. Any React Element may be passed in as `icon`; if using an svg, its color and size are not controlled by `ChannelValue`',
};

const LeafIcon: IconFamily = { family: 'pxblue', name: 'leaf' };
const AlarmIcon: IconFamily = { name: 'alarm' };
const TempIcon: IconFamily = { family: 'pxblue', name: 'temp' };
const DeviceIcon: IconFamily = { family: 'pxblue', name: 'device' };
const AIcon: IconFamily = { family: 'pxblue', name: 'grade_a' };
storiesOf('InfoListItem', module)
    .addDecorator(withKnobs)
    .addDecorator(framedRow)
    .add('with basic usage', () => <InfoListItem title={text('title', 'Info List Item')} />, notes)
    .add(
        'with subtitle',
        () => (
            <InfoListItem
                title={'Info List Item'}
                subtitle={text('subtitle', 'this is a subtitle within an InfoListItem')}
            />
        ),
        notes
    )
    .add(
        'with icon',
        () => (
            <InfoListItem
                title={'Info List Item'}
                // TODO: make this work
                // iconAlign={select('iconAlign', ['left', 'center', 'right'], 'left')}
                icon={AlarmIcon}
                iconColor={color('iconColor', Colors.black[500])}
                subtitle={'with an icon'}
            />
        ),
        notes
    )
    .add(
        'with array of subtitles',
        () => (
            <InfoListItem
                title={'Info List Item'}
                icon={TempIcon}
                subtitle={[
                    <ChannelValue key={'temp1'} value={'50'} units={'°C'} />,
                    <ChannelValue key={'temp2'} value={'55'} units={'°C'} />,
                ]}
                subtitleSeparator={text('subtitleSeparator', '·')}
                onPress={
                    boolean('action', true)
                        ? (): void => {
                              /* do nothing */
                          }
                        : undefined
                }
            />
        ),
        notes
    )
    .add(
        'with avatar and status color',
        () => (
            <InfoListItem
                title={'Info List Item'}
                icon={AIcon}
                avatar={boolean('avatar', true)}
                subtitle={'with an avatar and configurable status color'}
                statusColor={color('statusColor', Colors.green[700])}
            />
        ),
        notes
    )
    .add(
        'with background color',
        () => (
            <InfoListItem
                title={'Info List Item'}
                icon={LeafIcon}
                iconColor={Colors.black[500]}
                subtitle={'With a configurable background color'}
                fontColor={Colors.black[500]}
                backgroundColor={color('backgroundColor', Colors.white[50])}
            />
        ),
        notes
    )
    .add(
        'with right component',
        () => (
            <InfoListItem
                title={'Info List Item'}
                icon={DeviceIcon}
                subtitle={'with a right component'}
                rightComponent={
                    <ChannelValue
                        value={text('rightComponent.ChannelValue.value', '15')}
                        units={text('rightComponent.ChannelValue.units', 'A')}
                    />
                }
            />
        ),
        notes
    )
    .add(
        'with full config',
        () => (
            <InfoListItem
                title={text('title', 'Info List Item')}
                icon={DeviceIcon}
                subtitle={text('subtitle', 'with all customizable properties')}
                info={text('info', 'more info...')}
                onPress={
                    boolean('action', true)
                        ? (): void => {
                              /* do nothing */
                          }
                        : undefined
                }
                chevron={boolean('chevron', true)}
                avatar={boolean('avatar', false)}
                // TODO: make this work
                // iconAlign={select('iconAlign', ['left', 'center', 'right'], 'right')}
                iconColor={color('iconColor', Colors.black[500])}
                statusColor={color('statusColor', Colors.blue[500])}
                fontColor={color('fontColor', Colors.black[700])}
                backgroundColor={color('backgroundColor', Colors.white[50])}
            />
        ),
        notes
    );
