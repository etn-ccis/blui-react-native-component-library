import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { ChannelValue, wrapIcon } from '@brightlayer-ui/react-native-components';
import { text, withKnobs, boolean, color, number } from '@storybook/addon-knobs';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '@brightlayer-ui/colors';

const notes = {
    notes: 'Any React Element may be passed in as `icon`; if using an svg, its color and size are not controlled by `ChannelValue`',
};

const WrappedTrending = wrapIcon({ IconClass: MatIcon, name: 'trending-up' });

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
                    IconClass={WrappedTrending}
                    IconProps={{ color: color('color', Colors.red[500]) }}
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
                    IconClass={WrappedTrending}
                    IconProps={{ color: Colors.red[500] }}
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
                    IconClass={boolean('Show Icon', true) ? WrappedTrending : undefined}
                    IconProps={{ color: color('icon color', Colors.red[500]) }}
                    units={text('units', 'hz')}
                    prefix={boolean('prefix', false)}
                    fontSize={number('fontSize', 16)}
                    color={color('color', Colors.black[500])}
                />
            </View>
        ),
        notes
    );
