import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'purple',
    },
});

export const DrawerFooter: React.FC = (props) => <View style={styles.footer}>{props.children}</View>;

DrawerFooter.displayName = 'DrawerFooter';
