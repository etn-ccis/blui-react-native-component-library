import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { ChannelValue } from '@pxblue/react-native-components';
import { text, withKnobs, boolean, color, number, select } from '@storybook/addon-knobs';
import * as Colors from '@pxblue/colors';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';

const notes = {
    notes: 'Any React Element may be passed in as `icon`; if using an svg, its color and size are not controlled by `ChannelValue`',
};

const WrappedTrending: IconFamily = { name: 'trending-up' };

storiesOf('ChannelValue', module)
    .addDecorator(withKnobs)
    .add(
        'with basic usage',
        () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ChannelValue value={text('value', text('value', '123'))} />
            </View>
        ),
        notes
    )
    .add(
        'with units',
        () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ChannelValue value={'123'} units={text('units', 'hz')} />
            </View>
        ),
        notes
    )
    .add(
        'with icon',
        () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ChannelValue
                    value={'123'}
                    units={'hz'}
                    icon={WrappedTrending}
                    iconColor={color('color', Colors.red[500])}
                />
            </View>
        ),
        notes
    )
    .add(
        'with fontSize',
        () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ChannelValue
                    value={'123'}
                    units={'hz'}
                    fontSize={number('fontSize', 48)}
                    icon={WrappedTrending}
                    iconColor={Colors.red[500]}
                />
            </View>
        ),
        notes
    )
    .add(
        'with full config',
        () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ChannelValue
                    value={text('value', text('value', '123'))}
                    icon={boolean('Show Icon', true) ? WrappedTrending : undefined}
                    iconColor={color('icon color', Colors.red[500])}
                    units={text('units', 'hz')}
                    prefix={boolean('prefix', false)}
                    fontSize={number('fontSize', 16)}
                    color={color('color', Colors.black[500])}
                    unitSpace={select('unitSpace', ['auto', 'show', 'hide'], 'auto')}
                />
            </View>
        ),
        notes
    );
