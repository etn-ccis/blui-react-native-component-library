import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { color, withKnobs } from '@storybook/addon-knobs';
import { safeArea } from '../decorators';
import * as Typography from '@brightlayer-ui/react-native-components';
import { View } from 'react-native';
import * as Colors from '@brightlayer-ui/colors';

storiesOf('Typography', module)
    .addDecorator(withKnobs)
    .addDecorator(safeArea)
    .add('with basic usage', () => (
        <View>
            <Typography.H1>Head. 1</Typography.H1>
            <Typography.H2>Heading 2</Typography.H2>
            <Typography.H3>Heading 3</Typography.H3>
            <Typography.H4>Heading 4</Typography.H4>
            <Typography.H5>Heading 5</Typography.H5>
            <Typography.H6>Heading 6</Typography.H6>
            <Typography.Body1>Body 1</Typography.Body1>
            <Typography.Body2>Body 2</Typography.Body2>
            <Typography.Subtitle1>Subtitle 1</Typography.Subtitle1>
            <Typography.Subtitle2>Subtitle 2</Typography.Subtitle2>
            <Typography.Button>Button</Typography.Button>
            <Typography.Caption>Caption</Typography.Caption>
            <Typography.Overline>Overline</Typography.Overline>
        </View>
    ))
    .add('with custom colors', () => (
        <View>
            <Typography.H4 color={'primary'}>Primary</Typography.H4>
            <Typography.H4 color={'accent'}>Accent</Typography.H4>
            <Typography.H4 color={'error'}>Error</Typography.H4>
            <Typography.H4 color={'text'}>Text/Default</Typography.H4>
        </View>
    ))
    .add('with custom styles', () => (
        <View>
            <Typography.Body1 style={{ color: color('style text color', Colors.blue[500]) }}>
                Typography styles can be overridden
            </Typography.Body1>
            <Typography.Body1 theme={{ colors: { text: color('theme text color', Colors.black[500]) } }}>
                Their themes can be overridden as well
            </Typography.Body1>
            <Typography.Body1 fontSize={14} font={'light'}>
                You can even override which parts of themes they use
            </Typography.Body1>
        </View>
    ));
