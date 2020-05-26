import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        flex: 1,
        height: '100%',
        width: '70%',
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
        {getSection('DrawerBody')}
        <View style={{flex: 1, backgroundColor: 'green', height: 'auto', width: 'auto'}}/>
        {getSection('DrawerFooter')}
    </View>
};

