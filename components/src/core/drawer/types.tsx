import PropTypes from 'prop-types';
import { $DeepPartial } from '@callstack/react-theme-provider';

export type DrawerContextProps = {
    activeItem: string;
    onItemSelect?: (itemID: string) => void;
    width?: number;
};

export type SharedStyleProps = {
    /** Background color for the active item */
    activeItemBackgroundColor?: string;

    /**
     * Font color for the active item
     *
     * Default: square
     */
    activeItemFontColor?: string;

    /** Icon color for the active item */
    activeItemIconColor?: string;

    /** Color used for the background of the element */
    backgroundColor?: string;

    /**
     * Whether to show a line between all items
     *
     * Default: false
     */
    divider?: boolean;

    /** The color used for the DrawerNavItem text */
    itemFontColor?: string;

    /** The color used for the DrawerNavItem icon */
    itemIconColor?: string;

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

export type NavItemSharedStyleProps = {
    /**
     * Shape of the active item background highlight
     *
     * Default: square
     */
    activeItemBackgroundShape?: 'round' | 'square';

    /** Whether to have chevrons for all menu items */
    chevron?: boolean;

    /**
     * Icon used to collapse a DrawerNavGroup
     *
     * Default: `expandIcon` rotated 180-degrees
     */
    collapseIcon?: JSX.Element;

    /**
     * When true, disables the semi-bold text style on parent elements of active item.
     *
     * Default: false
     */
    disableActiveItemParentStyles?: boolean;

    /**
     * Icon used to expand a DrawerNavGroup
     *
     * Default: top-level items use the 'expand-more' icon from Material. Nested items use the 'arrow-drop-down' icon.
     */
    expandIcon?: JSX.Element;

    /**
     * Whether to hide the padding reserved for DrawerNavItem icons. If this is set to false, the text for all DrawerNavItems will align
     * together even if there is a mix of items with icons and items without. If this is set to true, the extra padding
     * for items without icons is removed and the text will align with the icon of DrawerNavItems with icons.
     *
     * Default: false
     */
    hidePadding?: boolean;

    /** Background color for nested items */
    nestedBackgroundColor?: string;

    /**
     * Whether to show a dividing line between nested navigation items. This property will override
     * the setting used for `divider` for nested items. If this property is undefined, nested items will adhere
     * to the setting for `divider`.
     *
     * Default: false
     */
    nestedDivider?: boolean;
};

export type AllSharedProps = SharedStyleProps & NavItemSharedStyleProps;

export const SharedStylePropTypes = {
    activeItemBackgroundColor: PropTypes.string,
    activeItemFontColor: PropTypes.string,
    activeItemIconColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    divider: PropTypes.bool,
    itemFontColor: PropTypes.string,
    itemIconColor: PropTypes.string,
};

export const NavItemSharedStylePropTypes = {
    activeItemBackgroundShape: PropTypes.oneOf(['round', 'square']),
    chevron: PropTypes.bool,
    collapseIcon: PropTypes.element,
    expandIcon: PropTypes.element,
    hidePadding: PropTypes.bool,
    disableActiveItemParentStyles: PropTypes.bool,
    nestedBackgroundColor: PropTypes.string,
    nestedDivider: PropTypes.bool,
};
