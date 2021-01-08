import React, { ReactNode, useCallback, useState } from 'react';
import { Overline } from '../typography';
import { StyleSheet, View, ViewProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { DrawerNavItem, NavItem, NestedNavItem, DrawerNavItemProps } from './drawer-nav-item';
import { inheritDrawerProps, NavGroupInheritableProps } from './inheritable-types';
import { Divider, useTheme } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import * as Colors from '@pxblue/colors';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { $DeepPartial } from '@callstack/react-theme-provider';

export type DrawerNavGroupProps = ViewProps & {
    // List of navigation items to render
    items: NavItem[];

    // Text to display in the group header
    title?: string;

    // Custom element, substitute for title
    titleContent?: ReactNode;

    /** Style overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        content?: StyleProp<ViewStyle>;
        textContent?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        divider?: StyleProp<ViewStyle>;
        navItem?: DrawerNavItemProps['styles'];
    };
    /** Overrides for theme */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
} & NavGroupInheritableProps;

const drawerNavGroupStyles = StyleSheet.create({
    root: {},
    textContent: {},
    title: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        height: 52,
        lineHeight: 36,
    },
    divider: {},
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

function isChildActive(item: NavItem | NestedNavItem, activeItem = ''): boolean {
    if (!item.items || item.items.length < 1) return item.itemID === activeItem;
    for (let i = 0; i < item.items.length; i++) {
        if (isChildActive(item.items[i], activeItem)) return true;
    }
    return false;
}

export const DrawerNavGroup: React.FC<DrawerNavGroupProps> = (props) => {
    const {
        theme: themeOverride,
        title,
        titleContent,
        items = [],
        nestedDivider = false,
        styles = {},
        style,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);
    const nestedBackgroundColor = theme.dark ? Colors.darkBlack[100] : Colors.white[200];

    const defaultStyles = drawerNavGroupStyles;

    const getDrawerItemList = useCallback(
        (item: NavItem | NestedNavItem, depth: number): JSX.Element => {
            const [expanded, setExpanded] = useState(findID(item, props.activeItem));

            // Nested items inherit from the nestedDivider prop if item's divider is unset.
            if (depth > 0 && item.divider === undefined) {
                item.divider = nestedDivider as any; // typescript doesn't like trying to assign boolean to type undefined
            }

            // if there are more sub pages, add the bucket header and recurse on this function
            if (item.items) {
                // Default expand icon changes if item is nested.
                if (depth > 0) {
                    if (!item.expandIcon) {
                        item.expandIcon = <MatIcon name={'arrow-drop-down'} size={24} color={theme.colors.text} />;
                    }
                    if (!item.collapseIcon) {
                        item.collapseIcon = <MatIcon name={'arrow-drop-up'} size={24} color={theme.colors.text} />;
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
                            styles={styles.navItem}
                            isChildActive={isChildActive(item, props.activeItem)}
                        />
                        <Collapsible
                            collapsed={!expanded}
                            style={[{ backgroundColor: nestedBackgroundColor }, styles.content]}
                        >
                            {item.items.map((subItem: NavItem) => getDrawerItemList(subItem, depth + 1))}
                            <Divider style={[defaultStyles.divider, styles.divider]} />
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
                    styles={styles.navItem}
                />
            );
        },
        [props]
    );

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {titleContent}
            {!titleContent && title && (
                <View style={[defaultStyles.textContent, styles.textContent]}>
                    <Overline style={[defaultStyles.title, styles.title]}>{title}</Overline>
                    <Divider style={[defaultStyles.divider, styles.divider]} />
                </View>
            )}
            {items.map((item: NavItem) => getDrawerItemList(item, 0))}
        </View>
    );
};

DrawerNavGroup.displayName = 'DrawerNavGroup';
