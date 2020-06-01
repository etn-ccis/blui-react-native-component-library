import React, { ReactNode, useState } from 'react';
import { Subtitle } from '../typography';
import { StyleSheet, View } from 'react-native';
import { DrawerNavItem, NavItem, NestedNavItem } from './drawer-nav-item';
import { inheritDrawerProps, NavGroupInheritableProps } from './inheritable-types';
import { Divider } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import * as Colors from '@pxblue/colors';
import MatIcon from "react-native-vector-icons/MaterialIcons";

export type DrawerNavGroupProps = {

    // List of navigation items to render
    items: NavItem[];

    // Text to display in the group header
    title?: string;

    // Custom element, substitute for title
    titleContent?: ReactNode;
} & NavGroupInheritableProps;

const styles = StyleSheet.create({
    subtitle: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        height: 52,
        lineHeight: 36,
    },
});

// TODO: Can't this be replaced with a Set of itemIDs?
function findID(item: NavItem | NestedNavItem, activeItem = ''): boolean {
    // if leaf node, return
    if (!item.items) {
        return item.itemID === activeItem;
    }

    // else, loop through the branches
    for (let i = 0; i < item.items.length; i++) {
        if (findID(item.items[i], activeItem)) {
            return true;
        }
    }

    // no active items found, return false
    return false;
}

export const DrawerNavGroup: React.FC<DrawerNavGroupProps> = (props) => {
    const { title, titleContent, items } = props;

    const getDrawerItemList = (item: NavItem | NestedNavItem, depth: number): ReactNode => {
        const [expanded, setExpanded] = useState(findID(item, props.activeItem));

        // Nested items inherit from the nestedDivider prop if item's divider is unset.
        if (depth > 0 && item.divider === undefined) {
            item.divider = props.nestedDivider as any;
        }

        // if there are more sub pages, add the bucket header and recurse on this function
        if (item.items) {

            // Default expand icon changes if item is nested.
            if (depth > 0) {
                if (!item.expandIcon) {
                    item.expandIcon = <MatIcon name={'arrow-drop-down'} size={24} />
                }
                if (!item.collapseIcon) {
                    item.collapseIcon = <MatIcon name={'arrow-drop-up'} size={24} />
                }
            }

            return (
                <View key={`${item.itemID}`}>
                    <DrawerNavItem
                        navItem={inheritDrawerProps(props, item) as NavItem}
                        navGroupProps={props}
                        depth={depth}
                        expanded={expanded}
                        expandHandler={item.items ? (): void => setExpanded(!expanded) : undefined}
                    />
                    <Collapsible collapsed={!expanded} style={{ backgroundColor: props.nestedBackgroundColor }} >
                        {item.items.map((subItem: NavItem) => getDrawerItemList(subItem, depth + 1))}
                        <Divider />
                    </Collapsible>
                </View>
            );
        }
        // Otherwise, we reached a leaf node. Return.
        return (
            <DrawerNavItem
                depth={depth}
                expanded={false}
                navItem={inheritDrawerProps(props, item) as NavItem}
                key={item.itemID}
                navGroupProps={props}
            />
        );
    };

    return (
        <View>
            {titleContent}
            {!titleContent && title && (
                <View>
                    <Divider />
                    <Subtitle style={styles.subtitle}>{title}</Subtitle>
                    <Divider />
                </View>
            )}
            {items.map((item: NavItem) => getDrawerItemList(item, 0))}
        </View>
    );
};

DrawerNavGroup.displayName = 'DrawerNavGroup';
DrawerNavGroup.defaultProps = {
    items: [],
    nestedBackgroundColor: Colors.white[200],
    nestedDivider: false,
};
