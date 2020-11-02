import React, { useCallback } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { InfoListItem } from '../info-list-item';
import { InfoListItemProps } from '../info-list-item/info-list-item';
import { DrawerInheritableProps } from './inheritable-types';
import { DrawerNavGroupProps } from './drawer-nav-group';
import { useTheme } from 'react-native-paper';
// import { $DeepPartial } from '@callstack/react-theme-provider';

export type NestedNavItem = Omit<NavItem, 'icon'>;

export type NavItem = {
    hidden?: boolean;
    icon?: any;
    itemID: string;
    items?: NestedNavItem[];
} & DrawerInheritableProps &
    // IconClass is replaced by the 'icon' property.
    Omit<InfoListItemProps, 'IconClass'>;

export type DrawerNavItemProps = {
    depth: number;
    expanded: boolean;
    expandHandler?: () => void;
    navGroupProps: DrawerNavGroupProps;
    navItem: NavItem | NestedNavItem;
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

const makeStyles = (props: DrawerNavItemProps): any =>
    StyleSheet.create({
        root: {},
        activeBackground: {
            backgroundColor: props.navItem.activeItemBackgroundColor,
            zIndex: 0,
            position: 'absolute',
            height: '100%',
            width: props.navItem.activeItemBackgroundShape === 'square' ? '100%' : '97%',
            left: 0,
            top: 0,
            borderTopRightRadius: props.navItem.activeItemBackgroundShape === 'square' ? 0 : 24,
            borderBottomRightRadius: props.navItem.activeItemBackgroundShape === 'square' ? 0 : 24,
            opacity: 0.9,
        },
        expandIcon: {
            display: 'flex',
            height: 48,
            width: 48,
            marginRight: -12,
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    });

export const DrawerNavItem: React.FC<DrawerNavItemProps> = (props) => {
    const defaultStyles = makeStyles(props);
    const { depth, expanded, expandHandler, navGroupProps, navItem, styles = {} } = props;
    const theme = useTheme();

    const icon = !depth ? (navItem as NavItem).icon : undefined;
    const active = navGroupProps.activeItem === navItem.itemID;
    const rightIcon = navItem.items ? (expanded ? navItem.collapseIcon : navItem.expandIcon) : undefined;

    const infoListItemStyles = styles.infoListItem || {};
    const { root: iliRoot, title: iliTitle, ...otherILI } = infoListItemStyles;

    const onPressAction = useCallback(
        (id: string): void => {
            if (navItem.onItemSelect) {
                navItem.onItemSelect(id);
            }
            if (navItem.onPress) {
                navItem.onPress();
            } else if (expandHandler) {
                expandHandler();
            }
        },
        [navItem, expandHandler]
    );

    return (
        <>
            {!navItem.hidden && (
                <View style={[defaultStyles.root, styles.root]}>
                    {active && <View style={[defaultStyles.activeBackground, styles.activeBackground]} />}
                    <InfoListItem
                        dense
                        {...navItem}
                        rightComponent={
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {navItem.rightComponent}
                                {rightIcon && (
                                    <View style={[defaultStyles.expandIcon, styles.expandIcon]}>{rightIcon}</View>
                                )}
                            </View>
                        }
                        backgroundColor={'transparent'}
                        iconColor={active ? navItem.activeItemIconColor : navItem.iconColor || navItem.itemIconColor}
                        fontColor={active ? navItem.activeItemFontColor : navItem.fontColor || navItem.itemFontColor}
                        onPress={(): void => onPressAction(navItem.itemID)}
                        IconClass={icon}
                        styles={{
                            root: Object.assign(
                                {
                                    paddingLeft: 32 * (depth > 1 ? depth - 1 : 0),
                                },
                                iliRoot
                            ),
                            title: Object.assign(
                                depth > 0
                                    ? {
                                          fontFamily: theme.fonts.regular.fontFamily,
                                          fontWeight: theme.fonts.regular.fontWeight,
                                      }
                                    : {},
                                iliTitle
                            ),
                            ...otherILI,
                        }}
                    />
                </View>
            )}
        </>
    );
};

DrawerNavItem.displayName = 'DrawerNavItem';
