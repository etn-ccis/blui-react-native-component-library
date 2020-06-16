import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { ChannelValue, wrapIcon } from '@pxblue/react-native-components';
import { text, withKnobs, boolean, color, number } from '@storybook/addon-knobs';
import Leaf from '@pxblue/icons-svg/leaf.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { red } from '@pxblue/colors';

const notes = {
    notes:
        'Any React Element may be passed in as `icon`; if using an svg, its color and size are not controlled by `ChannelValue`',
};

const WrappedLeaf = wrapIcon({ IconClass: Leaf });
const WrappedIcon = wrapIcon({ IconClass: Icon, name: 'chart-pie' });

storiesOf('ChannelValue', module)
    .addDecorator(withKnobs)
    .add(
        'with value',
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
                <ChannelValue value={text('value', text('value', '123'))} units={text('units', 'hz')} />
            </View>
        ),
        notes
    )
    .add(
        'with icon',
        () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ChannelValue
                    value={text('value', text('value', '123'))}
                    units={text('units', 'hz')}
                    IconClass={WrappedLeaf}
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
                    value={text('value', text('value', '123'))}
                    units={text('units', 'hz')}
                    fontSize={number('fontSize', 48)}
                    IconClass={WrappedLeaf}
                />
            </View>
        ),
        notes
    )
    .add(
        'with all props',
        () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ChannelValue
                    value={text('value', text('value', '123'))}
                    IconClass={WrappedIcon}
                    units={text('units', 'hz')}
                    prefix={boolean('prefix', false)}
                    fontSize={number('fontSize', 16)}
                    color={color('color', 'blue')}
                />
            </View>
        ),
        notes
    )
    .add(
        'with overridden theme',
        () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ChannelValue
                    value={text('value', text('value', '123'))}
                    units={text('units', 'hz')}
                    color="error"
                    theme={{
                        colors: { error: red[500] },
                    }}
                />
            </View>
        ),
        notes
    );
