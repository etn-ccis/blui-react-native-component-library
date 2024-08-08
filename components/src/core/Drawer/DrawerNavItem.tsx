import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, ViewProps } from 'react-native';
import { InfoListItem, InfoListItemProps as BLUIInfoListItemProps } from '../InfoListItem';
import { usePrevious } from '../__hooks__/usePrevious';
import { AllSharedProps } from './types';
import { useDrawerContext } from './context/drawer-context';
import { useNavGroupContext } from './context/nav-group-context';
import { findChildByType, inheritSharedProps } from './utilities';
import Collapsible from 'react-native-collapsible';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSource } from '../__types__';
import { Icon } from '../Icon';
import { useFontScale, useFontScaleSettings } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { fontStyleRegular, fontStyleSemiBold } from '../Utility/shared';

export type DrawerNavItemStyles = {
    root?: StyleProp<ViewStyle>;
    activeBackground?: StyleProp<ViewStyle>;
    expandIcon?: StyleProp<ViewStyle>;
    infoListItem?: BLUIInfoListItemProps['styles'];
};
export type DrawerNavItemProps = AllSharedProps &
    ViewProps & {
        // We have to explicitly mention this here so Typescript won't complain in some of our functions
        // that use this type definition as a parameter since it doesn't realize that children is part of
        // the definition of a React Component.
        children?: ReactNode;

        /**
         * The nested depth of the item (for creating trees).
         *
         * This property is managed automatically when used inside of a DrawerNavGroup.
         *
         * @default: 0
         */
        depth?: number;

        /**
         * Hides / does not render the item (useful for hiding certain items based on user role or permissions)
         *
         * @default: false
         */
        hidden?: boolean;

        /** A component to render for the left icon */
        icon?: IconSource;

        /**
         * Is the item a parent / ancestor of the current activeItem.
         *
         * This property is managed automatically when used inside of a DrawerNavGroup.
         *
         * @default: false
         */
        isInActiveTree?: boolean;

        /**
         * A unique ID for this item. This ID must be unique across all navigation items in a drawer.
         * The item will have the 'active' styles applied when this ID matches the `activeItem` property
         * that is set on the drawer.
         */
        itemID: string;

        /**
         * An array of navigation items to nest under this item in a tree structure
         */
        items?: NestedDrawerNavItemProps[];

        /**
         * A callback function to the parent element to tell it to update the active item hierarchy / styles
         *
         * This property is managed automatically when used inside of a DrawerNavGroup.
         */
        notifyActiveParent?: (ids: string[]) => void;

        /**
         * Callback function to execute when the navigation item is pressed
         */
        onPress?: () => void;

        /**
         * Custom content/component to display to the right
         */
        rightComponent?: JSX.Element;

        /**
         * Color used for the status stripe and icon
         */
        statusColor?: string;

        /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
        styles?: DrawerNavItemStyles;

        /** The text to display on the second line */
        subtitle?: string;

        /** The text to display on the first line */
        title: string;

        /** Used to override [InfoListItem](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--info-list-item) default props */
        InfoListItemProps?: Partial<BLUIInfoListItemProps>;
    };
export type NestedDrawerNavItemProps = Omit<DrawerNavItemProps, 'icon'>;
// aliases
export type NavItem = DrawerNavItemProps;
export type NestedNavItem = NestedDrawerNavItemProps;

// First nested item has no additional indentation.  All items start with 16px indentation.
const calcNestedPadding = (depth: number, insets: EdgeInsets): number =>
    insets.left + 16 + (depth > 0 ? depth * 40 : 0);

const makeStyles = (
    props: DrawerNavItemProps,
    theme: ExtendedTheme,
    fontScale: number
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    activeBackground: ViewStyle;
    expandIcon: ViewStyle;
    flipIcon: ViewStyle;
}> => {
    const {
        // Shared style props
        activeItemBackgroundColor = theme.colors.primaryContainer,
        activeItemBackgroundShape = 'square',
        backgroundColor,
        depth,
        nestedBackgroundColor = theme.colors.surfaceContainer,
    } = props;

    return StyleSheet.create({
        root: {
            backgroundColor: depth ? nestedBackgroundColor : backgroundColor || 'transparent',
        },
        activeBackground: {
            backgroundColor: activeItemBackgroundColor,
            zIndex: 0,
            position: 'absolute',
            height: '100%',
            width: activeItemBackgroundShape === 'square' ? '100%' : '97%',
            left: 0,
            top: 0,
            borderTopRightRadius: activeItemBackgroundShape === 'square' ? 0 : 24 * fontScale,
            borderBottomRightRadius: activeItemBackgroundShape === 'square' ? 0 : 24 * fontScale,
        },
        expandIcon: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 16,
        },
        flipIcon: {
            transform: [{ scaleX: -1 }],
        },
    });
};

/**
 * [DrawerNavItem](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--drawer) component
 *
 * The DrawerNavItem represents a single navigation item in the Drawer, usually a link to some route
 * in your application, but could also be used for static actions like login or logout. DrawerNavItems
 * can be nested (either declaratively by passing children or through the `items` prop). DrawerNavItems
 * are ultimately rendered as an InfoListItem element.
 *
 * When used inside of a DrawerNavGroup, certain props of the DrawerNavItem (`depth`, `isInActiveTree`, and `notifyActiveParent`)
 * are managed automatically for you.
 */
export const DrawerNavItem: React.FC<DrawerNavItemProps> = (props) => {
    // Destructure the props
    const { theme: themeOverride, ...otherProps } = props;
    const theme = useExtendedTheme(themeOverride);
    const fontScale = useFontScale();
    const { disableScaling } = useFontScaleSettings();
    const defaultStyles = makeStyles(props, theme, fontScale);
    const { activeItem, onItemSelect } = useDrawerContext();
    const { activeHierarchy } = useNavGroupContext();
    const previousActive = usePrevious(activeItem || '');

    const {
        // Shared style props
        activeChevronColor = theme.colors.onPrimaryContainer,
        activeItemBackgroundColor /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        activeItemBackgroundShape /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        activeItemFontColor = theme.colors.onPrimaryContainer,
        activeItemIconColor = theme.colors.onPrimaryContainer,
        backgroundColor /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        chevron /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        chevronColor = theme.colors.onSurfaceVariant,
        collapseIcon = { family: 'material', name: props.depth ? 'arrow-drop-up' : 'expand-less' },
        disableActiveItemParentStyles = false,
        divider,
        expandIcon = { family: 'material', name: props.depth ? 'arrow-drop-down' : 'expand-more' },
        hidePadding,
        itemFontColor = theme.colors.onSurface,
        itemIconColor = theme.colors.onSurfaceVariant,
        nestedBackgroundColor /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        nestedDivider,
        // Drawer Nav Item specific props
        children,
        styles = {},
        depth = 0,
        hidden,
        icon: itemIcon,
        InfoListItemProps = {} as BLUIInfoListItemProps,
        isInActiveTree,
        itemID,
        items,
        notifyActiveParent = (): void => {},
        onPress,
        rightComponent,
        statusColor,
        subtitle: itemSubtitle,
        title: itemTitle,
        // other View props
    } = otherProps;

    const defaultProps: Partial<DrawerNavItemProps> = {
        activeItemFontColor: theme.colors.onPrimaryContainer,
        activeItemIconColor: theme.colors.onPrimaryContainer,
        collapseIcon: { family: 'material', name: props.depth ? 'arrow-drop-up' : 'expand-less' },
        disableActiveItemParentStyles: false,
        expandIcon: { family: 'material', name: props.depth ? 'arrow-drop-down' : 'expand-more' },
        itemFontColor: theme.colors.onSurface,
        itemIconColor: theme.colors.onSurfaceVariant,
        styles: {},
        depth: 0,
        icon: itemIcon,
        InfoListItemProps: {} as BLUIInfoListItemProps,
        notifyActiveParent: (): void => {},
        rightComponent: undefined,
        subtitle: itemSubtitle,
        title: itemTitle,
    };

    const insets = useSafeAreaInsets();

    const [expanded, setExpanded] = useState(isInActiveTree); // isInActiveTree: there is a bug in the react-native-collapsible that incorrectly calculates the initial panel height when using nested collapse panels
    const active = activeItem === itemID;
    const hasAction = Boolean(onItemSelect || onPress || (items && items.length > 0) || Boolean(children));
    // only allow icons for the top level items
    const icon = !depth ? itemIcon : undefined;
    const showDivider =
        depth > 0 ? (nestedDivider !== undefined ? nestedDivider : false) : divider !== undefined ? divider : false;

    // When the activeItem changes, update our expanded state
    // Temporarily disabling this auto-expand behavior due to a bug in the react-native-collapsible with calculating the correct starting height
    // useEffect(() => {
    //     if (isInActiveTree && !expanded) {
    //         setExpanded(true);
    //     }
    // }, [isInActiveTree]); // Only update if the active tree changes (not after manual expand/collapse action)

    // If the active item changes
    useEffect(() => {
        if (activeItem === itemID && previousActive !== itemID) {
            // notify the parent that it should now be in the active tree
            notifyActiveParent([itemID]);
        }
    }, [activeItem, notifyActiveParent]);

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
    }, [onItemSelect, onPress, itemID, items, expanded, setExpanded, children]);

    const getActionComponent = useCallback((): JSX.Element | null => {
        if (!items && !children) {
            return null;
        }
        return (
            <View style={[defaultStyles.expandIcon, styles.expandIcon]}>
                <Icon
                    source={collapseIcon && expanded ? collapseIcon : expandIcon}
                    size={24}
                    color={theme.colors.onSurfaceVariant}
                    allowFontScaling={!disableScaling}
                />
            </View>
        );
    }, [items, children, styles, defaultStyles, collapseIcon, expanded, expandIcon]);
    const actionComponent = getActionComponent();

    const getChildren = useCallback(
        (): JSX.Element[] =>
            findChildByType(children, ['DrawerNavItem'])
                // .slice(0, 1)
                .map((child) =>
                    React.cloneElement(child, {
                        ...inheritSharedProps(props, child.props),
                        depth: depth + 1,
                        isInActiveTree: activeHierarchy.includes(child.props.itemID),
                        notifyActiveParent: (ids: string[] = []): void => {
                            notifyActiveParent(ids.concat(itemID));
                        },
                    } as DrawerNavItemProps)
                ),
        [props, activeHierarchy]
    );

    const infoListItemStyles = styles.infoListItem || {};
    const { root: iliRoot, title: iliTitle, statusStripe: iliStatusStripe, ...otherILI } = infoListItemStyles;
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
                            icon={icon}
                            chevron={!items && !children ? chevron : false}
                            chevronColor={active ? activeChevronColor : chevronColor}
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
                            styles={{
                                root: Object.assign({ paddingLeft: calcNestedPadding(depth, insets) }, iliRoot),
                                title: Object.assign(
                                    active || (isInActiveTree && !disableActiveItemParentStyles)
                                        ? {
                                              ...fontStyleSemiBold,
                                              color: activeItemFontColor,
                                          }
                                        : {
                                              ...fontStyleRegular,
                                              color: itemFontColor,
                                          },
                                    iliTitle
                                ),
                                statusStripe: Object.assign({ left: insets.left }, iliStatusStripe),
                                ...otherILI,
                            }}
                            {...InfoListItemProps}
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
                                        {...inheritSharedProps({ ...defaultProps, ...props }, subItem)}
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
