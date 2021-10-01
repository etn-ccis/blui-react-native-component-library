import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { EmptyState } from '@pxblue/react-native-components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import * as Colors from '@pxblue/colors';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';
const NoLocation: IconFamily = { name: 'not-listed-location' };
const LocationOff: IconFamily = { name: 'location-off' };
const Devices: IconFamily = { name: 'devices' };
const TrendingUp: IconFamily = { name: 'trending-up' };

storiesOf('EmptyState', module)
    .addDecorator(withKnobs)
    .add('with basic usage', () => <EmptyState icon={NoLocation} title={text('title', 'Location Unknown')} />)
    .add('with description', () => (
        <EmptyState
            icon={LocationOff}
            title={text('title', 'Location Services Disabled')}
            description={text('description', 'Enable Location Services via Settings to receive GPS information.')}
        />
    ))
    .add('with actions', () => (
        <EmptyState
            icon={Devices}
            title={'No Devices'}
            description={'Check your network connection or add a new device.'}
            actions={
                <Button
                    mode={'outlined'}
                    icon={(): JSX.Element => <MaterialIcon name="add" color={Colors.blue[500]} size={24} />}
                >
                    {text('button title', 'Add Device')}
                </Button>
            }
        />
    ))
    .add('with full config', () => (
        <ImageBackground
            source={
                boolean('Show Background', true)
                    ? {
                          uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                      }
                    : {}
            }
            style={{ flex: 1, padding: 20 }}
            imageStyle={{ opacity: 0.2 }}
        >
            <EmptyState
                icon={TrendingUp}
                title={text('title', 'Predictions Page Coming Soon')}
                description={text('description', 'A fully redesigned predictions page is coming in our next release!')}
                actions={<Button mode={'outlined'}>{text('button title', 'Learn More')}</Button>}
            />
        </ImageBackground>
    ));
