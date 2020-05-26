import React, {ReactNode} from 'react';
import {StyleSheet, View} from "react-native";
import {InfoListItem} from "../info-list-item";
import {InfoListItemProps} from "../info-list-item/info-list-item";

export type NestedNavItem = Omit<NavItem, 'icon'>;

export type NavItem = {
    icon?: any;
    itemID: string;
    items?: NestedNavItem[];
} & InfoListItemProps;

export type DrawerNavItemProps = {
    navItem: NavItem | NestedNavItem;
   // navGroupProps: DrawerNavGroupProps;
    depth: number;
   // expanded: boolean;
    expandHandler?: Function;
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'orange',
    }
});

export const DrawerNavItem: React.FC<DrawerNavItemProps> = (props) => {
    const { navItem, depth } = props;
    const icon = !depth ? (navItem as NavItem).icon : undefined;
    return (
        <View style={styles.root}>
            <InfoListItem
                dense
                {...navItem}
                IconClass={icon} />
        </View>
    );
};

DrawerNavItem.displayName = 'DrawerNavItem';
