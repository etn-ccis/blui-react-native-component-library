import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, ViewProps, I18nManager, PixelRatio } from 'react-native';
import { InfoListItem, InfoListItemProps as PXBInfoListItemProps } from '../info-list-item';
import { useTheme } from 'react-native-paper';
import { usePrevious } from '../hooks/usePrevious';
import { AllSharedProps } from './types';
import color from 'color';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useDrawerContext } from './context/drawer-context';
import { useNavGroupContext } from './context/nav-group-context';
import { findChildByType, inheritSharedProps } from './utilities';
import * as Colors from '@pxblue/colors';
import Collapsible from 'react-native-collapsible';
import { EdgeInsets } from '../__types__';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DrawerNavItemStyles = {
    root?: StyleProp<ViewStyle>;
    activeBackground?: StyleProp<ViewStyle>;
    expandIcon?: StyleProp<ViewStyle>;
    infoListItem?: PXBInfoListItemProps['styles'];
};
export type DrawerNavItemProps = AllSharedProps &
    ViewProps & {
        children?: ReactNode;
        depth?: number;
        hidden?: boolean;
        icon?: any;
        isInActiveTree?: boolean;
        itemID: string;
        items?: NestedDrawerNavItemProps[];
        notifyActiveParent?: (ids: string[]) => void;
        onPress?: () => void;
        rightComponent?: JSX.Element;
        statusColor?: string;
        styles?: DrawerNavItemStyles;
        subtitle?: string;
        title: string;
    };
export type NestedDrawerNavItemProps = Omit<DrawerNavItemProps, 'icon'>;
// aliases
export type NavItem = DrawerNavItemProps;
export type NestedNavItem = NestedDrawerNavItemProps;

// First nested item has no additional indentation.  All items start with 16px indentation.
const calcNestedPadding = (depth: number, insets: EdgeInsets): number => insets.left + (depth > 0 ? (depth - 1) * 32 : 0);

const makeStyles = (
    props: DrawerNavItemProps,
    theme: ReactNativePaper.Theme
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    activeBackground: ViewStyle;
    expandIcon: ViewStyle;
    flipIcon: ViewStyle;
}> => {
    // Primary color manipulation
    const fivePercentOpacityPrimary = color(theme.colors.primaryBase || theme.colors.primary)
        .fade(0.95)
        .string();
    const twentyPercentOpacityPrimary = color(theme.colors.primaryBase || theme.colors.primary)
        .fade(0.8)
        .string();

    const {
        // Shared style props
        activeItemBackgroundColor = !theme.dark ? fivePercentOpacityPrimary : twentyPercentOpacityPrimary,
        activeItemBackgroundShape = 'square',
        backgroundColor,
        depth,
        nestedBackgroundColor = theme.dark ? Colors.darkBlack[100] : Colors.white[200],
    } = props;
    const fontScale = PixelRatio.getFontScale();

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

export const DrawerNavItem: React.FC<DrawerNavItemProps> = (props) => {
    // Destructure the props
    const { theme: themeOverride, ...otherProps } = props;
    const theme = useTheme(themeOverride);
    const defaultStyles = makeStyles(props, theme);
    const { activeItem, onItemSelect } = useDrawerContext();
    const { activeHierarchy } = useNavGroupContext();
    const previousActive = usePrevious(activeItem || '');

    // approximating primary[200] but we don't have access to it directly from the theme
    const lightenedPrimary = color(theme.colors.primaryBase || theme.colors.primary)
        .lighten(0.83)
        .desaturate(0.39)
        .string();

    const {
        // Shared style props
        activeItemBackgroundColor /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        activeItemBackgroundShape /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        activeItemFontColor = !theme.dark ? theme.colors.primary : lightenedPrimary,
        activeItemIconColor = !theme.dark ? theme.colors.primary : lightenedPrimary,
        backgroundColor /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        chevron /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        collapseIcon = props.depth ? (
            <MatIcon name={'arrow-drop-up'} size={24} color={theme.colors.text} allowFontScaling />
        ) : (
            <MatIcon name={'expand-less'} size={24} color={theme.colors.text} allowFontScaling />
        ),
        disableActiveItemParentStyles = false,
        divider,
        expandIcon = props.depth ? (
            <MatIcon name={'arrow-drop-down'} size={24} color={theme.colors.text} allowFontScaling />
        ) : (
            <MatIcon name={'expand-more'} size={24} color={theme.colors.text} allowFontScaling />
        ),
        hidePadding,
        itemFontColor = theme.colors.text,
        itemIconColor = theme.colors.text,
        nestedBackgroundColor /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        nestedDivider,
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
        notifyActiveParent = (): void => { },
        onPress,
        rightComponent = props.chevron && !props.items && !props.children ? (
            <MatIcon
                name={'chevron-right'}
                size={24}
                color={theme.colors.text}
                style={I18nManager.isRTL ? defaultStyles.flipIcon : {}}
            />
        ) : undefined,
        statusColor,
        subtitle: itemSubtitle,
        title: itemTitle,
        // other View props
    } = otherProps;

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
                {collapseIcon && expanded ? collapseIcon : expandIcon}
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
                            styles={{
                                root: Object.assign({ paddingLeft: calcNestedPadding(depth, insets) }, iliRoot),
                                title: Object.assign(
                                    active || (isInActiveTree && !disableActiveItemParentStyles)
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
                                statusStripe: Object.assign({ left: insets.left }, iliStatusStripe),
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
