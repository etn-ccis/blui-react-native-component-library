import React from 'react';
import { View, StyleSheet } from 'react-native';
import { H6 } from '../typography';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export type DrawerHeaderProps = {
    title?: string;
    subtitle?: string;
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
    const { title, subtitle } = props;
    return (
        <View style={styles.container}>
            <H6>{title}</H6>
            <H6>{subtitle}</H6>
        </View>
    );
};


DrawerHeader.displayName = 'DrawerHeader';
