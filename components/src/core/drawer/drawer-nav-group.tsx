import React, {ReactNode, useState} from 'react';
import {Subtitle} from '../typography';
import {StyleSheet, View} from "react-native";
import {DrawerNavItem, NavItem, NestedNavItem} from './drawer-nav-item';
import {inheritDrawerProps, NavGroupInheritableProps} from "./inheritable-types";
import {Divider} from "react-native-elements";
import { List, Checkbox } from 'react-native-paper';

export type DrawerNavGroupProps = {
    // internal API
    backgroundColor?: string;

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
        lineHeight: 36
    }
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

        if (item.items) {
            // if there are more sub pages, add the bucket header and recurse on this function
            const collapsibleComponent = (
                <List.Accordion title='' expanded={expanded} key={`${item.title}_group_${depth}`}>
                    {item.items.map((subItem: NavItem) => getDrawerItemList(subItem, depth + 1))}
                </List.Accordion>
            );

            return (
                <View>
                    <DrawerNavItem
                        key={`${item.itemID}`}
                        navItem={item}
                        navGroupProps={props}
                        depth={depth}
                        expanded={expanded}
                        expandHandler={item.items ? (): void => setExpanded(!expanded) : undefined}
                    />
                    {collapsibleComponent}
                </View>
            );
        }

        // Otherwise, we reached a leaf node. Return.
        return <DrawerNavItem
            depth={depth}
            expanded={false}
            navItem={inheritDrawerProps(props, item) as NavItem}
            key={item.itemID}
            navGroupProps={props} />
    };

   return (
        <View>
            {titleContent}
            {!titleContent && title &&
                <View>
                    <Divider/>
                    <Subtitle style={styles.subtitle}>{title}</Subtitle>
                    <Divider/>
                </View>
            }
            {items.map((item: NavItem) => getDrawerItemList(item, 0))}
        </View>
   );
};

DrawerNavGroup.displayName = 'DrawerNavGroup';
DrawerNavGroup.defaultProps = {
    items: []
};
