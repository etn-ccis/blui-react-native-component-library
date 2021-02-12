import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Overline } from '../typography';
import { StyleSheet, View, ViewProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { DrawerNavItem, NavItem, DrawerNavItemProps, NestedDrawerNavItemProps } from './drawer-nav-item';
import { Divider, useTheme } from 'react-native-paper';
import { AllSharedProps } from './types';
import { findChildByType, inheritSharedProps } from './utilities';
import { useDrawerContext } from './context/drawer-context';
import { NavGroupContext } from './context';

export type DrawerNavGroupStyles = {
    root?: StyleProp<ViewStyle>;
    textContent?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    divider?: StyleProp<ViewStyle>;
};
export type DrawerNavGroupProps = AllSharedProps &
    ViewProps & {
        // List of navigation items to render
        items?: NavItem[];

        // Text to display in the group header
        title?: string;

        // Color to use for the group header title text
        titleColor?: string;

        // Custom element, substitute for title
        titleContent?: ReactNode;

        /** Style overrides */
        styles?: DrawerNavGroupStyles;
    };
const makeStyles = (props: DrawerNavGroupProps, theme: ReactNativePaper.Theme): any =>
    StyleSheet.create({
        root: {},
        textContent: {},
        title: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            height: 52,
            lineHeight: 36,
            color: props.titleColor || theme.colors.text,
        },
        divider: {},
    });

const findID = (item: DrawerNavItemProps | NestedDrawerNavItemProps, activeItem: string | undefined): boolean => {
    if (!activeItem) return false;

    // if leaf node, return
    if (!item.items && !item.children) {
        return item.itemID === activeItem;
    }

    // else, loop through the branches by items
    if (item.items) {
        for (let i = 0; i < item.items.length; i++) {
            if (findID(item.items[i], activeItem)) {
                return true;
            }
        }
    }
    // and by children
    if (item.children) {
        const childItems = findChildByType(item.children, ['DrawerNavItem']);
        for (let i = 0; i < childItems.length; i++) {
            if (findID(childItems[i].props, activeItem)) {
                return true;
            }
        }
    }

    // no active items found, return false
    return false;
};

export const DrawerNavGroup: React.FC<DrawerNavGroupProps> = (props) => {
    const {
        // Inheritable Props
        /* eslint-disable @typescript-eslint/no-unused-vars */
        activeItemBackgroundColor,
        activeItemBackgroundShape,
        activeItemFontColor,
        activeItemIconColor,
        backgroundColor,
        chevron,
        collapseIcon,
        disableActiveItemParentStyles,
        divider,
        expandIcon,
        hidePadding,
        itemFontColor,
        itemIconColor,
        nestedBackgroundColor,
        nestedDivider,
        theme: themeOverride,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        // DrawerNavGroup-specific props
        title,
        titleContent,
        titleColor /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        items = [],
        styles = {},
        // Other View Props
        style,
        children,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);
    const defaultStyles = makeStyles(props, theme);
    const { activeItem } = useDrawerContext();

    /* Keeps track of which group of IDs are in the 'active hierarchy' */
    const [activeHierarchyItems, setActiveHierarchyItems] = useState<string[]>([]);

    /* Clear the active hierarchy array if the new active Item cannot be found in the tree */
    useEffect(() => {
        if (!findID({ items: props.items, children: props.children } as DrawerNavItemProps, activeItem))
            setActiveHierarchyItems([]);
    }, [activeItem]);

    const getChildren = useCallback(
        (): JSX.Element[] =>
            findChildByType(children, ['DrawerNavItem'])
                // .slice(0, 1)
                .map((child) =>
                    React.cloneElement(child, {
                        // Inherited Props
                        ...inheritSharedProps(props, child.props),
                        depth: 0,
                        isInActiveTree: activeHierarchyItems.includes(child.props.itemID),
                        notifyActiveParent: (ids: string[]): void => {
                            if (JSON.stringify(activeHierarchyItems) !== JSON.stringify(ids)) {
                                // Sets the list of active IDs when we get a callback from an active child
                                setActiveHierarchyItems(ids);
                            }
                        },
                    })
                ),
        [props, activeHierarchyItems, setActiveHierarchyItems, children]
    );

    return (
        <NavGroupContext.Provider
            value={{
                activeHierarchy: activeHierarchyItems,
            }}
        >
            <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
                {titleContent}
                {!titleContent && title && (
                    <View style={[defaultStyles.textContent, styles.textContent]}>
                        <Overline style={[defaultStyles.title, styles.title]}>{title}</Overline>
                        <Divider style={[defaultStyles.divider, styles.divider]} />
                    </View>
                )}
                {items.map((item: NavItem, index: number) => (
                    <DrawerNavItem
                        key={`itemList_${index}`}
                        {...item}
                        {...inheritSharedProps(props, item)}
                        depth={0}
                        isInActiveTree={activeHierarchyItems.includes(item.itemID)}
                        notifyActiveParent={(ids: string[]): void => {
                            if (JSON.stringify(activeHierarchyItems) !== JSON.stringify(ids)) {
                                // Sets the list of active IDs when we get a callback from an active child
                                setActiveHierarchyItems(ids);
                            }
                        }}
                    />
                ))}
                {getChildren()}
            </View>
        </NavGroupContext.Provider>
    );
};

DrawerNavGroup.displayName = 'DrawerNavGroup';
