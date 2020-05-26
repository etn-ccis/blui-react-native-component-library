import React, {ReactNode} from 'react';
import {Subtitle} from '../typography';
import {StyleSheet, View} from "react-native";
import {DrawerNavItem, NavItem} from './drawer-nav-item';

export type DrawerNavGroupProps = {
    items: NavItem[];
    title?: string;
    titleContent?: ReactNode;
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'blue',
    },
    subtitle: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16
    }

});

export const DrawerNavGroup: React.FC<DrawerNavGroupProps> = (props) => {
    const { title, items } = props;
   return (
        <View style={styles.root}>
            {title && <Subtitle style={styles.subtitle}>{title}</Subtitle>}
            {items.map((item: NavItem, index: number) => (
                <DrawerNavItem depth={0} navItem={item} key={`nav${index}`} />)
            )}
        </View>
   );
};

DrawerNavGroup.displayName = 'DrawerNavGroup';
DrawerNavGroup.defaultProps = {
    items: []
};
