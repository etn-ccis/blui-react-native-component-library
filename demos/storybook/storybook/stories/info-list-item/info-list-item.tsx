import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { InfoListItem, ChannelValue, wrapIcon } from '@pxblue/react-native-components';
import { text, boolean, withKnobs, color } from '@storybook/addon-knobs';
import Leaf from '@pxblue/icons-svg/leaf.svg';
import { framedRow } from '../../decorators';
import * as PXBColors from '@pxblue/colors';

const notes = {
    notes:
        'The borders are NOT part of the component; they are provided for framing only. Any React Element may be passed in as `icon`; if using an svg, its color and size are not controlled by `ChannelValue`',
};

const LeafIcon = wrapIcon({ IconClass: Leaf });
storiesOf('InfoListItem', module)
    .addDecorator(withKnobs)
    .addDecorator(framedRow)
    .add(
        'basic list item',
        () => (
            <InfoListItem
                title={text('title', 'Test')}
                subtitle={text('subtitle', 'A simpler view')}
                hidePadding={boolean('hidePadding', true)}
                divider={boolean('divider', true) ? 'full' : undefined}
            />
        ),
        notes
    )
    .add(
        'with icon',
        () => (
            <InfoListItem
                title={text('title', 'Test')}
                avatar={boolean('avatar', false)}
                IconClass={LeafIcon}
                iconColor={color('iconColor', PXBColors.red[500])}
                subtitle={text('subtitle', 'A simpler view')}
            />
        ),
        notes
    )
    .add(
        'with status and background color',
        () => (
            <InfoListItem
                title={text('title', 'Test')}
                IconClass={LeafIcon}
                avatar={boolean('avatar', false)}
                subtitle={text('subtitle', 'A simpler view')}
                statusColor={color('statusColor', PXBColors.blue[700])}
                fontColor={color('fontColor', PXBColors.blue[700])}
                backgroundColor={color('backgroundColor', PXBColors.gray[50])}
            />
        ),
        notes
    )
    .add(
        'with long text',
        () => (
            <InfoListItem
                title={text('title', 'This is a really really really really really really really really long title')}
                IconClass={LeafIcon}
                subtitle={text(
                    'subtitle',
                    'this is a really really really really really really really really really really long subtitle'
                )}
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
        'array for subtitles',
        () => (
            <InfoListItem
                title={text('title', 'Test')}
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
            />
        ),
        notes
    )
    .add(
        'with custom control',
        () => (
            <InfoListItem
                title={text('title', 'Test')}
                IconClass={LeafIcon}
                subtitle={text('subtitle', 'A simpler view')}
                rightComponent={<ChannelValue value={15} units={'A'} />}
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
                iconColor={color('iconColor', PXBColors.green[500])}
                statusColor={color('statusColor', PXBColors.blue[700])}
                fontColor={color('fontColor', PXBColors.blue[700])}
                backgroundColor={color('backgroundColor', PXBColors.white[50])}
            />
        ),
        notes
    );
