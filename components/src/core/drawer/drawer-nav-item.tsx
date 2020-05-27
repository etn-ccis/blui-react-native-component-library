import React from 'react';
import {StyleSheet, View} from "react-native";
import {InfoListItem} from "../info-list-item";
import {InfoListItemProps} from "../info-list-item/info-list-item";
import {DrawerInheritableProps} from "./inheritable-types";
import {DrawerNavGroupProps} from "./drawer-nav-group";

export type NestedNavItem = Omit<NavItem, 'icon'>;

export type NavItem = {
    icon?: any;
    itemID: string;
    items?: NestedNavItem[];
} & InfoListItemProps
    & DrawerInheritableProps
    // IconClass is replaced by the 'icon' property.
    & Omit<InfoListItemProps, 'IconClass'>

export type DrawerNavItemProps = {
    depth: number;
    expanded: boolean;
    expandHandler?: Function;
    navGroupProps: DrawerNavGroupProps;
    navItem: NavItem | NestedNavItem;
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'orange',
    },
    active: {
        backgroundColor: 'green',
        zIndex: 0,
        position: 'absolute',
        height: '100%',
        width: `97%`,
        left: 0,
        top: 0,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        opacity: 0.9,
    },
    square: {
        width: '100%',
        borderRadius: 0,
    },
});

export const DrawerNavItem: React.FC<DrawerNavItemProps> = (props) => {
    const { navItem, depth, navGroupProps, expandHandler } = props;
    const { chevron } = navItem;
    console.log(chevron);
    const icon = !depth ? (navItem as NavItem).icon : undefined;
    const active = navGroupProps.activeItem === navItem.itemID;
    const onItemSelect = navItem.onItemSelect || navGroupProps.onItemSelect;
    const onPressAction = (id: string): void => {
        if (onItemSelect) {
            onItemSelect(id);
        }
        if (navItem.onPress) {
            navItem.onPress();
        } else if (expandHandler) {
            expandHandler();
        }
    };
    return (
        <View style={styles.root}>
            {active && <View style={styles.active}/>}
            <InfoListItem
                dense
                hidePadding
                chevron={chevron}
                {...navItem}
                onPress={(): void => onPressAction(navItem.itemID)}
                IconClass={icon} />
        </View>
    );
};

DrawerNavItem.displayName = 'DrawerNavItem';
