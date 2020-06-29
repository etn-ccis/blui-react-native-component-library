import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { InfoListItem, ChannelValue, wrapIcon } from '@pxblue/react-native-components';
import { text, boolean, withKnobs, color } from '@storybook/addon-knobs';
import Leaf from '@pxblue/icons-svg/leaf.svg';
import { framedRow } from '../../decorators';
import * as Colors from '@pxblue/colors';

const notes = {
    notes:
        'The borders are NOT part of the component; they are provided for framing only. Any React Element may be passed in as `icon`; if using an svg, its color and size are not controlled by `ChannelValue`',
};

const LeafIcon = wrapIcon({ IconClass: Leaf });
storiesOf('InfoListItem', module)
    .addDecorator(withKnobs)
    .addDecorator(framedRow)
    .add('with basic usage', () => <InfoListItem title={text('title', 'Info List Item')} />, notes)
    .add(
        'with subtitle',
        () => (
            <InfoListItem
                title={text('title', 'Info List Item')}
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
                IconClass={LeafIcon}
                iconColor={color('iconColor', Colors.green[500])}
                subtitle={'with an icon'}
            />
        ),
        notes
    )
    .add(
        'array for subtitles',
        () => (
            <InfoListItem
                title={'Info List Item'}
                IconClass={LeafIcon}
                subtitle={['this is a subtitle', 'and so is this']}
                subtitleSeparator={text('subtitleSeparator', '__')}
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
                IconClass={LeafIcon}
                avatar={boolean('avatar', true)}
                subtitle={'with an avatar and configurable status color'}
                statusColor={color('statusColor', Colors.blue[700])}
            />
        ),
        notes
    )
    .add(
        'with background color',
        () => (
            <InfoListItem
                title={'Info List Item'}
                IconClass={LeafIcon}
                iconColor={Colors.white[700]}
                subtitle={'With a configurable background color'}
                fontColor={Colors.white[700]}
                backgroundColor={color('backgroundColor', Colors.blue[500])}
            />
        ),
        notes
    )
    .add(
        'with right component',
        () => (
            <InfoListItem
                title={'Info List Item'}
                IconClass={LeafIcon}
                subtitle={'with a ChannelValue component as rightComponent'}
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
                title={text('title', 'This is a title')}
                IconClass={LeafIcon}
                subtitle={text('subtitle', 'this is a subtitle')}
                info={text('info', 'this is a third line of text')}
                onPress={
                    boolean('action', true)
                        ? (): void => {
                              /* do nothing */
                          }
                        : undefined
                }
                rightComponent={<ChannelValue value={15} units={'A'} />}
                avatar={boolean('avatar', false)}
                iconColor={color('iconColor', Colors.green[500])}
                statusColor={color('statusColor', Colors.blue[700])}
                fontColor={color('fontColor', Colors.blue[700])}
                backgroundColor={color('backgroundColor', Colors.white[50])}
            />
        ),
        notes
    );
