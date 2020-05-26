import React from 'react';
import { View, StyleSheet } from 'react-native';
import { H6 } from '../typography';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 900,

        flex: 1,
        width: '80%',
        height: '100vh'
    },
});

export type DrawerProps = {
    open: boolean;
    children: any;
};

export const Drawer: React.FC<DrawerProps> = (props) => {

    const findChildByType = (type: string): JSX.Element[] =>
        React.Children.map(props.children, (child: any) => {
            if (child && child.type) {
                const name = child.type.displayName;
                if (name && name.includes(type)) {
                    return child;
                }
            }
        }) || [];

    const getSection = (displayName: string): JSX.Element[] =>
        findChildByType(displayName)
            .slice(0, 1)
            .map((child) => React.cloneElement(child));

    return <View style={styles.container}>
        {getSection('DrawerHeader')}
        {getSection('DrawerSubheader')}
        <View />
        {getSection('DrawerFooter')}
    </View>
};

