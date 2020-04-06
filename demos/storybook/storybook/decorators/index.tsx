import { SafeAreaView, View } from 'react-native';
import React from 'react';

export const centered = (storyFn: any): JSX.Element => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>{storyFn()}</View>
);

export const padded = (storyFn: any): JSX.Element => (
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

export const framedRow = (storyFn: any): JSX.Element => (
    <View style={{ justifyContent: 'center', height: '100%' }}>
        <View style={{ height: 2, backgroundColor: '#dddddd', flex: 1 }} />
        {storyFn()}
        <View style={{ height: 2, backgroundColor: '#dddddd', flex: 1 }} />
    </View>
);

export const safeArea = (storyFn: any): JSX.Element => <SafeAreaView>{storyFn()}</SafeAreaView>;
