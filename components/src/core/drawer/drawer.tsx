import React, {useCallback} from 'react';
import { View, StyleSheet } from 'react-native';
import {DrawerInheritableProps, inheritProps} from "./inheritable-types";
import * as Colors from '@pxblue/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white[50],
        zIndex: 2,
        flex: 1,
        height: '100%',
    },
});

export const Drawer: React.FC<DrawerInheritableProps> = (props) => {

    // Set theme-related default props here.
    const activeItemBackgroundColor = Colors.blue[50];




    const findChildByType = useCallback((type: string): JSX.Element[] =>
        React.Children.map(props.children, (child: any) => {
            if (child && child.type) {
                const name = child.type.displayName;
                if (name && name.includes(type)) {
                    return child;
                }
            }
        }) || [], [props]);

    const getSectionByDisplayName = useCallback( (displayName: string, inherit = false): JSX.Element[] =>
        findChildByType(displayName)
            .slice(0, 1)
            .map((child) => React.cloneElement(child, inherit ?
                inheritProps({
                    ...props,
                    activeItemBackgroundColor
                }, child.props) : {} ))
    , [props]);

    return (
        <View style={styles.container}>
            {getSectionByDisplayName('DrawerHeader')}
            {getSectionByDisplayName('DrawerSubheader')}
            {getSectionByDisplayName('DrawerBody', true)}
            { /* TODO: Fix me, Spacer doesn't work in the RN Drawer Container */ }
            <View style={{flex: 1, backgroundColor: 'green', height: 'auto', width: 'auto'}}/>
            {getSectionByDisplayName('DrawerFooter')}
        </View>
    );
};

Drawer.defaultProps = {
    activeItemBackgroundShape: 'round',
    chevron: false,
    divider: true,
    hidePadding: true,
    ripple: false, // TODO: Fix me or delete me.
};
