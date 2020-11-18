import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { EmptyState, wrapIcon } from '@pxblue/react-native-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Clock = wrapIcon({ IconClass: Icon, name: 'clock-outline' });
import { text, withKnobs } from '@storybook/addon-knobs';
import { ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '@pxblue/colors';

storiesOf('EmptyState', module)
    .addDecorator(withKnobs)
    .add('with basic usage', () => <EmptyState IconClass={Clock} title={text('title', 'No Alarms Found')} />)
    .add('with description', () => (
        <EmptyState
            IconClass={Clock}
            title={text('title', 'No Alarms Found')}
            description={text('description', 'A fully redesigned alarms page is coming in our next release!')}
        />
    ))
    .add('with actions', () => (
        <EmptyState
            IconClass={Clock}
            title={'No Alarms Found'}
            description={'A fully redesigned alarms page is coming in our next release!'}
            actions={
                <Button
                    mode={'contained'}
                    icon={(): JSX.Element => <MatIcon name="add-circle-outline" color={Colors.white[500]} size={24} />}
                >
                    {text('button title', 'Add Alarm')}
                </Button>
            }
        />
    ))
    .add('with background image', () => (
        <ImageBackground
            source={{
                uri:
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            }}
            style={{ flex: 1, padding: 20 }}
            imageStyle={{ opacity: 0.2 }}
        >
            <EmptyState
                IconClass={Clock}
                title={text('title', 'Alarms Page Coming Soon')}
                description={text('description', 'A fully redesigned alarms page is coming in our next release!')}
                actions={<Button mode={'outlined'}>{text('button title', 'Learn More')}</Button>}
            />
        </ImageBackground>
    ))
    .add('with full config', () => (
        <EmptyState
            IconClass={Clock}
            title={text('title', 'No Alarms Found')}
            description={text('description', 'A fully redesigned alarms page is coming in our next release!')}
            actions={
                <Button
                    mode={'contained'}
                    icon={(): JSX.Element => <MatIcon name="add-circle-outline" color={Colors.white[500]} size={24} />}
                >
                    {text('button title', 'Add Alarm')}
                </Button>
            }
        />
    ));
