import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ListItemTag, InfoListItem } from '@pxblue/react-native-components';
import { withKnobs, color, text } from '@storybook/addon-knobs';
import { padded } from '../decorators';
import * as Colors from '@pxblue/colors';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';

const notes = {
    notes: 'A text item with a colored background and rounded corners that is used to tag lists.',
};

const Build: IconFamily = { name: 'build' };

storiesOf('ListItemTag', module)
    .addDecorator(withKnobs)
    .addDecorator(padded)
    .add('with basic usage', () => <ListItemTag label={text('label', 'ACTIVE')} />, notes)
    .add(
        'with full config',
        () => (
            <ListItemTag
                label={text('label', 'ACTIVE')}
                backgroundColor={color('backgroundColor', Colors.red[500])}
                fontColor={color('fontColor', Colors.white[50])}
            />
        ),
        notes
    )
    .add(
        'within an Info List Item',
        () => (
            <View style={{ justifyContent: 'center', width: '100%', height: '100%', backgroundColor: Colors.gray[50] }}>
                <View style={{ width: '100%', backgroundColor: Colors.white[50] }}>
                    <InfoListItem
                        title={'@pxblue/react-themes'}
                        subtitle={'Light and dark themes supported'}
                        icon={Build}
                        rightComponent={
                            <ListItemTag
                                label={'BUILD PASSING'}
                                backgroundColor={Colors.green[300]}
                                fontColor={Colors.black[500]}
                            />
                        }
                    />
                </View>
            </View>
        ),
        notes
    );
