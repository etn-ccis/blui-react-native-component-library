// type shared by Drawer, DrawerBody, DrawerNavGroup, NestedNavItem
// these types are inherited from the Drawer level to the NestedNavItem
// parent props will be overriden by the child props if defined
import * as Colors from '@pxblue/colors';

export type DrawerInheritableProps = {
    // itemID for the 'active' item
    activeItem?: string;
    
    // Background color for the 'active' item
    activeItemBackgroundColor?: string;

    // shape of the active item background
    activeItemBackgroundShape?: 'round' | 'square';

    // Font color for the 'active' item
    activeItemFontColor?: string;

    // Icon color for the 'active' item
    activeItemIconColor?: string;

    // Background color
    backgroundColor?: string;

    // Whether to have chevrons for all menu items
    chevron?: boolean;

    // Icon used to collapse drawer
    // default is expandIcon rotated 180 degrees
    collapseIcon?: JSX.Element;

    // Whether to show a line between all items
    divider?: boolean;

    // Icon used to expand drawer
    expandIcon?: JSX.Element;

    // Whether to hide the paddings reserved for menu item icons
    hidePadding?: boolean;

    // InfoListItem overrides for NavItem
    // InfoListItemProps?: Partial<BaseInfoListItemProps>;

    // The color used for the item text
    itemFontColor?: string;

    // The color used for the icon
    itemIconColor?: string;

    // internal API
    // will apply to all menu items when onClick
    onItemSelect?: (itemID?: string) => void;

    // Whether to apply material ripple effect to items
    ripple?: boolean;
};

// These properties can be applied to NavItems
export type NavGroupInheritableProps = {

    // background color for nested menu items
    nestedBackgroundColor?: string;

    // Whether to show a line between nested menu items
    nestedDivider?: boolean;

    // Font color for group header
    titleColor?: string;
} & DrawerInheritableProps;

// Returns inhertiable props with child values taking precedence.
export const inheritProps = (parent: DrawerInheritableProps, child: DrawerInheritableProps): DrawerInheritableProps => ({
    activeItem: child.activeItem || parent.activeItem,
    activeItemBackgroundColor: child.activeItemBackgroundColor || parent.activeItemBackgroundColor || Colors.blue[50],
    activeItemFontColor: child.activeItemFontColor || parent.activeItemFontColor,
    activeItemIconColor: child.activeItemIconColor || parent.activeItemIconColor,
    activeItemBackgroundShape: child.activeItemBackgroundShape || parent.activeItemBackgroundShape || 'square',
    backgroundColor: child.backgroundColor || parent.backgroundColor || Colors.white[50],
    chevron: child.chevron === undefined ? parent.chevron : undefined,
    collapseIcon: child.collapseIcon || parent.collapseIcon,
    divider: child.divider === undefined ? parent.divider || true : child.divider,
    expandIcon: child.expandIcon || parent.expandIcon,
    hidePadding: child.hidePadding === undefined ? parent.hidePadding : undefined,
    itemFontColor: child.itemFontColor || parent.itemFontColor,
    itemIconColor: child.itemIconColor || parent.itemIconColor,
    ripple: child.ripple === undefined ? parent.ripple : child.ripple,
    onItemSelect: child.onItemSelect || parent.onItemSelect,
    ...child
});
