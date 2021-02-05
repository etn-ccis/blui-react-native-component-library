import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { InfoListItem, /*InfoListItemProps as PXBInfoListItemProps*/ } from '../info-list-item';
import { DrawerInheritableProps, inheritDrawerProps } from './inheritable-types';
import { DrawerNavGroupProps } from './drawer-nav-group';
import { useTheme } from 'react-native-paper';
import { usePrevious } from '../hooks/usePrevious';
import { AllSharedProps } from './types';
import color from 'color';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useDrawerContext } from './context/drawer-context';
import { useNavGroupContext } from './context/nav-group-context';
import { findChildByType, inheritSharedProps } from './utilities';
import Collapsible from 'react-native-collapsible';

// import { $DeepPartial } from '@callstack/react-theme-provider';

export type DrawerNavItemStyles = {
    root?: StyleProp<ViewStyle>;
    activeBackground?: StyleProp<ViewStyle>;
    expandIcon?: StyleProp<ViewStyle>;
    infoListItem?: InfoListItemProps['styles'];
};
export type DrawerNavItemProps = AllSharedProps & {
    depth?: number;
    hidden?: boolean;
    icon?: any;
    isInActiveTree?: boolean;
    itemID: string;
    items?: NestedDrawerNavItemProps[];
    notifyActiveParent?: (ids?: string[]) => void;
    onPress?: () => void;
    rightComponent?: JSX.Element;
    statusColor?: string;
    styles?: DrawerNavItemStyles;
    subtitle?: string;
    title: string;
    // InfoListItemProps?: Partial<PXBInfoListItemProps>;
};
export type NestedDrawerNavItemProps = Omit<DrawerNavItemProps, 'icon'>;
// aliases
export type NavItem = DrawerNavItemProps;
export type NestedNavItem = NestedDrawerNavItemProps;

export type OldNestedNavItem = Omit<NavItem, 'icon'>;

export type OldNavItem = {
    hidden?: boolean;
    icon?: any;
    itemID: string;
    items?: NestedNavItem[];
} & DrawerInheritableProps &
    // IconClass is replaced by the 'icon' property.
    Omit<InfoListItemProps, 'IconClass'>;

export type OldDrawerNavItemProps = {
    depth: number;
    expanded: boolean;
    expandHandler?: () => void;
    navGroupProps: DrawerNavGroupProps;
    navItem: NavItem | NestedNavItem;
    isInActiveTree?: boolean;
    notifyActiveParent: () => void;
    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        activeBackground?: StyleProp<ViewStyle>;
        expandIcon?: StyleProp<ViewStyle>;
        infoListItem?: InfoListItemProps['styles'];
    };
    /** Overrides for theme */
    // theme?: $DeepPartial<Theme>; // Uncomment if we need to style anything based on the theme
};

// First nested item has no additional indentation.  All items start with 16px indentation.
const calcNestedPadding = (depth: number): number => (depth > 0 ? depth * 32 + 24 : 0);

const makeStyles = (props: DrawerNavItemProps): any =>
    StyleSheet.create({
        root: {},
        activeBackground: {
            backgroundColor: props.activeItemBackgroundColor,
            zIndex: 0,
            position: 'absolute',
            height: '100%',
            width: props.activeItemBackgroundShape === 'square' ? '100%' : '97%',
            left: 0,
            top: 0,
            borderTopRightRadius: props.activeItemBackgroundShape === 'square' ? 0 : 24,
            borderBottomRightRadius: props.activeItemBackgroundShape === 'square' ? 0 : 24,
        },
        expandIcon: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 16,
        },
    });

export const DrawerNavItem: React.FC<DrawerNavItemProps> = (props) => {
    // Destructure the props
    const { theme: themeOverride, ...otherProps } = props;
    const theme = useTheme(themeOverride);
    const defaultStyles = makeStyles(props);
    const { activeItem, onItemSelect } = useDrawerContext();
    const { activeHierarchy } = useNavGroupContext();
    const previousActive = usePrevious(activeItem || '');

    // Primary color manipulation
    const fivePercentOpacityPrimary = color(theme.colors.primary).fade(0.95).string();
    const twentyPercentOpacityPrimary = color(theme.colors.primary).fade(0.8).string();
    // approximating primary[200] but we don't have access to it directly from the theme
    const lightenedPrimary = color(theme.colors.primary).lighten(0.83).desaturate(0.39).string();

    const {
        // Shared style props
        activeItemBackgroundColor = !theme.dark ? fivePercentOpacityPrimary : twentyPercentOpacityPrimary,
        activeItemBackgroundShape = 'square',
        activeItemFontColor = !theme.dark ? theme.colors.primary : lightenedPrimary,
        activeItemIconColor = !theme.dark ? theme.colors.primary : lightenedPrimary,
        backgroundColor,
        chevron,
        collapseIcon = props.depth ? (
            <MatIcon name={'arrow-drop-up'} size={24} color={theme.colors.text} />
        ) : (
            <MatIcon name={'expand-less'} size={24} color={theme.colors.text} />
        ),
        disableActiveItemParentStyles = false,
        divider,
        expandIcon = props.depth ? (
            <MatIcon name={'arrow-drop-down'} size={24} color={theme.colors.text} />
        ) : (
            <MatIcon name={'expand-more'} size={24} color={theme.colors.text} />
        ),
        hidePadding,
        itemFontColor = theme.colors.text,
        itemIconColor = theme.colors.text,
        nestedBackgroundColor,
        nestedDivider,
        ripple = true,

        // Drawer Nav Item specific props
        children,
        styles = {},
        depth = 0,
        hidden,
        icon: itemIcon,
        // InfoListItemProps = {} as PXBInfoListItemProps,
        isInActiveTree,
        itemID,
        items,
        notifyActiveParent = (): void => {},
        onPress,
        rightComponent = props.chevron && !props.items ? (
            <MatIcon name={'chevron'} size={24} color={theme.colors.text} />
        ) : undefined,
        statusColor,
        subtitle: itemSubtitle,
        title: itemTitle,
        // other View props
    } = otherProps;

    const [expanded, setExpanded] = useState(isInActiveTree || false);
    const active = activeItem === itemID;
    const hasAction = Boolean(onItemSelect || onPress || (items && items.length > 0) || Boolean(children));
    // only allow icons for the top level items
    const icon = !depth ? itemIcon : undefined;
    const showDivider =
        depth > 0 ? (nestedDivider !== undefined ? nestedDivider : false) : divider !== undefined ? divider : false;

    // When the activeItem changes, update our expanded state
    useEffect(() => {
        if (isInActiveTree && !expanded) {
            setExpanded(true);
        }
    }, [isInActiveTree]); // Only update if the active tree changes (not after manual expand/collapse action)

    // If the active item changes
    useEffect(() => {
        if (activeItem === itemID && previousActive !== itemID) {
            // notify the parent that it should now be in the active tree
            notifyActiveParent([itemID]);
        }
    }, [activeItem, notifyActiveParent]);

    // TODO: Customize the ripple color? Is that needed?

    // const {
    //     depth,
    //     expanded,
    //     expandHandler,
    //     navGroupProps,
    //     navItem,
    //     isInActiveTree,
    //     notifyActiveParent,
    //     styles = {},
    // } = props;
    // const { activeItem } = navGroupProps;
    // const theme = useTheme();

    // const icon = !depth ? (navItem as NavItem).icon : undefined;
    // const active = navGroupProps.activeItem === navItem.itemID;
    // const rightIcon = navItem.items ? (expanded ? navItem.collapseIcon : navItem.expandIcon) : undefined;

    // const infoListItemStyles = styles.infoListItem || {};
    // const { root: iliRoot, title: iliTitle, ...otherILI } = infoListItemStyles;

    // Handle click callbacks
    const onPressAction = useCallback((): void => {
        if (onItemSelect) {
            onItemSelect(itemID);
        }
        if (onPress) {
            onPress();
        } else if ((items && items.length > 0) || Boolean(children)) {
            setExpanded(!expanded);
        }
    }, [onItemSelect, onPress, itemID, items, expanded, setExpanded]);

    const getActionComponent = useCallback((): JSX.Element | null => {
        if (!items && !children) {
            return null;
        }
        return (
            <View style={[defaultStyles.expandIcon, styles.expandIcon]}>
                {collapseIcon && expanded ? collapseIcon : expandIcon}
            </View>
        );
    }, [items, children, styles, defaultStyles, collapseIcon, expanded, expandIcon]);
    const actionComponent = getActionComponent();

    // const onPressAction = useCallback(
    //     (id: string): void => {
    //         if (navItem.onItemSelect) {
    //             navItem.onItemSelect(id);
    //         }
    //         if (navItem.onPress) {
    //             navItem.onPress();
    //         } else if (expandHandler) {
    //             expandHandler();
    //         }
    //     },
    //     [navItem, expandHandler]
    // );

    // const previousActive = usePrevious(activeItem || '');

    // useEffect(() => {
    //     if (activeItem === navItem.itemID && previousActive !== navItem.itemID) {
    //         // notify the parent that it should now be in the active tree
    //         notifyActiveParent();
    //     }
    // }, [activeItem, navItem.itemID, notifyActiveParent]);

    const getChildren = useCallback(
        (): JSX.Element[] =>
            findChildByType(children, ['DrawerNavItem'])
                // .slice(0, 1)
                .map((child) =>
                    React.cloneElement(child, {
                        ...inheritDrawerProps(props, child.props),
                        depth: depth + 1,
                        isInActiveTree: activeHierarchy.includes(child.props.itemID),
                        notifyActiveParent: (ids: string[] = []): void => {
                            notifyActiveParent(ids.concat(itemID));
                        },
                    } as DrawerNavItemProps)
                ),
        [
            activeItemBackgroundColor,
            activeItemBackgroundShape,
            activeItemFontColor,
            activeItemIconColor,
            activeHierarchy,
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
            notifyActiveParent,
            ripple,
            theme,
            children,
        ]
    );

    const infoListItemStyles = styles.infoListItem || {};
    const { root: iliRoot, title: iliTitle, ...otherILI } = infoListItemStyles;

    return (
        <>
            {!hidden && (
                <>
                    <View style={[defaultStyles.root, styles.root]}>
                        {active && <View style={[defaultStyles.activeBackground, styles.activeBackground]} />}
                        <InfoListItem
                            dense
                            title={itemTitle}
                            subtitle={itemSubtitle}
                            divider={showDivider ? 'full' : undefined}
                            statusColor={statusColor}
                            fontColor={active ? activeItemFontColor : itemFontColor}
                            // @ts-ignore
                            IconClass={icon}
                            iconColor={active ? activeItemIconColor : itemIconColor}
                            rightComponent={
                                (actionComponent || rightComponent) && (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {rightComponent}
                                        {actionComponent}
                                    </View>
                                )
                            }
                            backgroundColor={'transparent'}
                            onPress={hasAction ? onPressAction : undefined}
                            hidePadding={hidePadding}
                            // ripple={ripple}
                            // TODO: Ripple Props?
                            styles={{
                                root: Object.assign({ paddingLeft: calcNestedPadding(depth) }, iliRoot),
                                title: Object.assign(
                                    active || isInActiveTree
                                        ? {
                                              fontWeight: theme.fonts.medium.fontWeight,
                                              fontFamily: theme.fonts.medium.fontFamily,
                                          }
                                        : {
                                              fontWeight: theme.fonts.regular.fontWeight,
                                              fontFamily: theme.fonts.regular.fontFamily,
                                          },
                                    iliTitle
                                ),
                                ...otherILI,
                            }}
                        />
                    </View>
                    {/* If the NavItem has child items defined, render them in a collapse panel */}
                    {((items && items.length > 0) || Boolean(children)) && (
                        <Collapsible collapsed={!expanded}>
                            {items &&
                                items.map((subItem: DrawerNavItemProps, index: number) => (
                                    <DrawerNavItem
                                        key={`itemList_${index}`}
                                        {...subItem}
                                        {...inheritSharedProps(props, subItem)}
                                        depth={depth + 1}
                                        isInActiveTree={activeHierarchy.includes(subItem.itemID)}
                                        notifyActiveParent={(ids: string[] = []): void => {
                                            notifyActiveParent(ids.concat(itemID));
                                        }}
                                    />
                                ))}
                            {getChildren()}
                        </Collapsible>
                    )}
                </>
            )}
        </>
    );
};

DrawerNavItem.displayName = 'DrawerNavItem';
