import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ViewProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { DrawerNavItem, NavItem, DrawerNavItemProps, NestedDrawerNavItemProps } from './DrawerNavItem';
import { Divider, Text } from 'react-native-paper';
import { AllSharedProps } from './types';
import { findChildByType, inheritSharedProps } from './utilities';
import { useDrawerContext } from './context/drawer-context';
import { NavGroupContext } from './context';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFontScale } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { fontStyleSemiBold } from '../Utility/shared';

export type DrawerNavGroupStyles = {
    root?: StyleProp<ViewStyle>;
    textContent?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    divider?: StyleProp<ViewStyle>;
};
export type DrawerNavGroupProps = AllSharedProps &
    ViewProps & {
        /** List of navigation items to render */
        items?: NavItem[];

        /** Text to display in the group header */
        title?: string;

        /** Color to use for the group header title text
         *
         * @default: theme.colors.onSurface
         */
        titleColor?: string;

        /** Custom content to use in place of the group header title (if you want to use non-string content) */
        titleContent?: ReactNode;

        /** Whether to show a dividing line below the title */
        titleDivider?: boolean;

        /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
        styles?: DrawerNavGroupStyles;
    };
const makeStyles = (
    props: DrawerNavGroupProps,
    theme: ExtendedTheme,
    insets: EdgeInsets,
    fontScale: number
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    textContent: ViewStyle;
    title: TextStyle;
    divider: ViewStyle;
}> =>
    StyleSheet.create({
        root: {},
        textContent: {
            height: 52 * fontScale,
            position: 'relative',
            justifyContent: 'center',
            paddingLeft: insets.left,
        },
        title: {
            paddingHorizontal: 16,
            color: props.titleColor || theme.colors.onSurface,
            fontSize: 12,
            letterSpacing: 2,
            lineHeight: 16,
            textTransform: 'uppercase',
            ...fontStyleSemiBold,
        },
        divider: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
        },
    });

/**
 * findID function
 *
 * A depth-first recursive search function to identify if the specified
 * id is anywhere in the tree of the supplied item.
 *
 * @param item The topmost item to start from
 * @param activeItem The id to search for
 * @returns true if the ID is found in the tree, false otherwise
 */
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

/**
 * [DrawerNavGroup](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--drawer) component
 *
 * The DrawerNavGroup represents a collection of navigation items to display in the Drawer, useful for organizing
 * your links into buckets. Each group can be given a `title` to describe its items. Individual items in each group can be passed
 * through the `items` prop or passed declaratively as children.
 */
export const DrawerNavGroup: React.FC<DrawerNavGroupProps> = (props) => {
    const {
        // Inheritable Props
        /* eslint-disable @typescript-eslint/no-unused-vars */
        activeChevronColor,
        activeItemBackgroundColor,
        activeItemBackgroundShape,
        activeItemFontColor,
        activeItemIconColor,
        backgroundColor,
        chevron,
        chevronColor,
        collapseIcon,
        disableActiveItemParentStyles,
        divider,
        expandIcon,
        hidePadding,
        itemFontColor,
        itemIconColor,
        nestedBackgroundColor,
        nestedDivider,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        // DrawerNavGroup-specific props
        title,
        titleContent,
        titleColor /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        titleDivider = true,
        items = [],
        styles = {},
        // Other View Props
        style,
        children,
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useExtendedTheme(themeOverride);
    const insets = useSafeAreaInsets();
    const fontScale = useFontScale();
    const defaultStyles = makeStyles(props, theme, insets, fontScale);
    const { activeItem } = useDrawerContext();

    const defaultProps: Partial<DrawerNavGroupProps> = {
        titleDivider: true,
        items: [],
        styles: {},
    };

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
                        // depth: 0,
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
                {titleContent !== null && <View style={{ paddingLeft: insets.left }}>{titleContent}</View>}
                {!titleContent && title && (
                    <View style={[defaultStyles.textContent, styles.textContent]}>
                        <Text variant="bodyMedium" style={[defaultStyles.title, styles.title]}>
                            {title}
                        </Text>
                        {titleDivider && <Divider style={[defaultStyles.divider, styles.divider]} />}
                    </View>
                )}
                {items.map((item: NavItem, index: number) => (
                    <DrawerNavItem
                        key={`itemList_${index}`}
                        {...item}
                        {...inheritSharedProps({ ...defaultProps, ...props }, item)}
                        // depth={1}
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
