import React from 'react';
import { View, StyleSheet } from 'react-native';
import {DrawerInheritableProps, inheritProps} from "./inheritable-types";

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

export const Drawer: React.FC<DrawerInheritableProps> = (props) => {

    const findChildByType = (type: string): JSX.Element[] =>
        React.Children.map(props.children, (child: any) => {
            if (child && child.type) {
                const name = child.type.displayName;
                if (name && name.includes(type)) {
                    return child;
                }
            }
        }) || [];

    const getSectionByDisplayName = (displayName: string): JSX.Element[] =>
        findChildByType(displayName)
            .slice(0, 1)
            .map((child) => React.cloneElement(child));

    const getBody = (): JSX.Element[] =>
        findChildByType('DrawerBody')
            .slice(0, 1)
            .map((child) =>
                React.cloneElement(child, inheritProps(props, child.props)));

    return <View style={styles.container}>
        {getSectionByDisplayName('DrawerHeader')}
        {getSectionByDisplayName('DrawerSubheader')}
        {getBody()}
        <View style={{flex: 1, backgroundColor: 'green', height: 'auto', width: 'auto'}}/>
        {getSectionByDisplayName('DrawerFooter')}
    </View>
};
