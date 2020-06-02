import { SafeAreaView, View } from 'react-native';
import React from 'react';

type AnyFunction = () => any;
export const centered = (storyFn: AnyFunction): JSX.Element => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>{storyFn()}</View>
);

export const padded = (storyFn: AnyFunction): JSX.Element => (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
        }}
    >
        {storyFn()}
    </View>
);

export const framedRow = (storyFn: AnyFunction): JSX.Element => (
    <View style={{ justifyContent: 'center', height: '100%' }}>
        <View style={{ height: 2, backgroundColor: '#dddddd', flex: 1 }} />
        {storyFn()}
        <View style={{ height: 2, backgroundColor: '#dddddd', flex: 1 }} />
    </View>
);

export const safeArea = (storyFn: AnyFunction): JSX.Element => <SafeAreaView>{storyFn()}</SafeAreaView>;
