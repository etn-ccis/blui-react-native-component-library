import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, number } from '@storybook/addon-knobs';
import { safeArea } from '../decorators';
import { Spacer, Body1 } from '@pxblue/react-native-components';
import { View } from 'react-native';
import * as Colors from '@pxblue/colors';

storiesOf('Spacer', module)
    .addDecorator(withKnobs)
    .addDecorator(safeArea)
    .add('with flex layout', () => {
        const flex1 = number('Item 1 Flex', 1, { range: true, min: 1, max: 5, step: 1 });
        const flex2 = number('Item 2 Flex', 1, { range: true, min: 1, max: 5, step: 1 });
        const flex3 = number('Item 3 Flex', 1, { range: true, min: 1, max: 5, step: 1 });
        return (
            <>
                <Body1>Horizontal</Body1>
                <View style={{ width: 300, height: 50, display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
                    <Spacer flex={flex1} style={{ backgroundColor: Colors.blue[300] }}>
                        <Body1>1</Body1>
                    </Spacer>
                    <Spacer flex={flex2} style={{ backgroundColor: Colors.yellow[300] }}>
                        <Body1>2</Body1>
                    </Spacer>
                    <Spacer flex={flex3} style={{ backgroundColor: Colors.red[300] }}>
                        <Body1>3</Body1>
                    </Spacer>
                </View>
                <Body1 style={{ marginTop: 20 }}>Vertical</Body1>
                <View
                    style={{
                        width: 300,
                        height: 150,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }}
                >
                    <Spacer flex={flex1} style={{ backgroundColor: Colors.blue[300] }}>
                        <Body1>1</Body1>
                    </Spacer>
                    <Spacer flex={flex2} style={{ backgroundColor: Colors.yellow[300] }}>
                        <Body1>2</Body1>
                    </Spacer>
                    <Spacer flex={flex3} style={{ backgroundColor: Colors.red[300] }}>
                        <Body1>3</Body1>
                    </Spacer>
                </View>
            </>
        );
    })
    .add('with static layout', () => {
        const size1 = number('Item 1 Size (dp)', 60, { range: true, min: 20, max: 100, step: 20 });
        const size2 = number('Item 2 Size (dp)', 60, { range: true, min: 20, max: 100, step: 20 });
        const size3 = number('Item 3 Size (dp)', 60, { range: true, min: 20, max: 100, step: 20 });

        /* 
            Note: 
            React Native does not support 'display: inline', so we 
            need to use flex box for the stacked static layout
        */
        return (
            <View>
                <Body1>Horizontal</Body1>

                <View style={{ width: 300, height: 50, display: 'flex', flexDirection: 'row' }}>
                    <Spacer width={size1} flex={0} style={{ backgroundColor: Colors.blue[300] }}>
                        <Body1>1</Body1>
                    </Spacer>
                    <Spacer width={size2} flex={0} style={{ backgroundColor: Colors.yellow[300] }}>
                        <Body1>2</Body1>
                    </Spacer>
                    <Spacer width={size3} flex={0} style={{ backgroundColor: Colors.red[300] }}>
                        <Body1>3</Body1>
                    </Spacer>
                </View>
                <Body1 style={{ marginTop: 20 }}>Vertical</Body1>
                <View
                    style={{
                        width: 300,
                        height: 300,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Spacer height={size1} flex={0} style={{ backgroundColor: Colors.blue[300] }}>
                        <Body1>1</Body1>
                    </Spacer>
                    <Spacer height={size2} flex={0} style={{ backgroundColor: Colors.yellow[300] }}>
                        <Body1>2</Body1>
                    </Spacer>
                    <Spacer height={size3} flex={0} style={{ backgroundColor: Colors.red[300] }}>
                        <Body1>3</Body1>
                    </Spacer>
                </View>
            </View>
        );
    });
