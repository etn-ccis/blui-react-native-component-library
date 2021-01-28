import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { color, number, text, withKnobs } from '@storybook/addon-knobs';
import { Header, wrapIcon } from '@pxblue/react-native-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { white, blue } from '@pxblue/colors';

const MailIcon = wrapIcon({ IconClass: Icon, name: 'mail' });
const MenuIcon = wrapIcon({ IconClass: Icon, name: 'menu' });
const MoreIcon = wrapIcon({ IconClass: Icon, name: 'more-vert' });
const CloudIcon = wrapIcon({ IconClass: Icon, name: 'cloud-upload' });
import backgroundImage from '../assets/farm.jpg';

storiesOf('Header', module)
    .addDecorator(withKnobs)
    .add('with basic usage', () => (
        <Header
            title={text('title', 'Title')}
            navigation={{
                icon: MenuIcon,
                onPress: (): void => {
                    /* do nothing */
                },
            }}
            actionItems={[
                {
                    icon: MailIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: CloudIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
        />
    ))
    .add('with background image', () => (
        <Header
            expandable={true}
            title={text('title', 'Long Title Text')}
            subtitle={text('subtitle', 'Really Really Long Subtitle Text')}
            navigation={{
                icon: MenuIcon,
                onPress: (): void => {
                    /* do nothing */
                },
            }}
            actionItems={[
                {
                    icon: MailIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: CloudIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
            backgroundImage={backgroundImage}
        />
    ))
    .add('with search', () => (
        <Header
            expandable={false}
            title={text('title', 'With Search')}
            navigation={{
                icon: MenuIcon,
                onPress: (): void => {
                    /* do nothing */
                },
            }}
            actionItems={[
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
            searchableConfig={{ placeholder: 'Search', autoFocus: true }}
        />
    ))
    .add('with custom colors', () => (
        <Header
            title={text('title', 'With Custom Colors')}
            navigation={{
                icon: MenuIcon,
                onPress: (): void => {
                    /* do nothing */
                },
            }}
            actionItems={[
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
            fontColor={color('fontColor', white[50])}
            backgroundColor={color('backgroundColor', blue[500])}
        />
    ))
    .add('with full config', () => (
        <Header
            title={text('title', 'Title Text')}
            subtitle={text('subtitle', 'Subtitle Text')}
            navigation={{
                icon: MenuIcon,
                onPress: (): void => {
                    /* do nothing */
                },
            }}
            actionItems={[
                {
                    icon: MailIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: CloudIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
            fontColor={color('fontColor', white[50])}
            backgroundColor={color('backgroundColor', blue[500])}
        />
    ));
