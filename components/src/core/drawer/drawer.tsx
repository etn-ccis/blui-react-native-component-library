import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerInheritableProps, inheritDrawerProps } from './inheritable-types';
import * as Colors from '@pxblue/colors';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white[50],
        zIndex: 2,
        flex: 1,
        height: '100%',
    },
});

export const Drawer: React.FC<DrawerInheritableProps> = (props) => {
    const theme = useTheme();
    const findChildByType = useCallback(
        (type: string): JSX.Element[] =>
            React.Children.map(props.children, (child: any) => {
                if (child && child.type) {
                    const name = child.type.displayName;
                    if (name && name.includes(type)) {
                        return child;
                    }
                }
            }) || [],
        [props]
    );

    const getSectionByDisplayName = useCallback(
        (displayName: string, inherit = false): JSX.Element[] =>
            findChildByType(displayName)
                .slice(0, 1)
                .map((child) => {
                    let inheritableProps = {};
                    if (inherit) {
                        inheritableProps = inheritDrawerProps(
                            {
                                ...props,
                                // Set theme-related default props here.
                                activeItemBackgroundColor: props.activeItemBackgroundColor || Colors.blue[50],
                                activeItemFontColor: props.activeItemFontColor || theme.colors.primary,
                                activeItemIconColor: props.activeItemIconColor || theme.colors.primary,
                            }, child.props);
                    }
                    return React.cloneElement(child, inheritableProps);
                }),
        [props]
    );

    return (
        <View style={styles.container}>
            {getSectionByDisplayName('DrawerHeader')}
            {getSectionByDisplayName('DrawerSubheader')}
            {getSectionByDisplayName('DrawerBody', true)}
            {getSectionByDisplayName('DrawerFooter')}
        </View>
    );
};

Drawer.defaultProps = {
    activeItemBackgroundShape: 'round',
    chevron: false,
    divider: true,
    hidePadding: true,
    // Nested expand/collapse icon defaults are different and are set in the DrawerNavGroup.
    expandIcon: <MatIcon name={'expand-more'} size={24} />,
    collapseIcon: <MatIcon name={'expand-less'} size={24} />,
};
