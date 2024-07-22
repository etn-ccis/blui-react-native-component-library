import PropTypes from 'prop-types';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { IconSource } from '../__types__';
import { ExtendedTheme } from '@brightlayer-ui/react-native-themes';

export type DrawerContextProps = {
    activeItem: string;
    onItemSelect?: (itemID: string) => void;
    width?: number;
};

export type SharedStyleProps = {
    /** chevron color for the active item */
    activeChevronColor?: string;

    /** Background color for the active item */
    activeItemBackgroundColor?: string;

    /**
     * Font color for the active item
     *
     * @default: square
     */
    activeItemFontColor?: string;

    /** Icon color for the active item */
    activeItemIconColor?: string;

    /** Color used for the background of the element */
    backgroundColor?: string;

    /** The color used for the chevron icon */
    chevronColor?: string;

    /**
     * Whether to show a line between all items
     *
     * @default: false
     */
    divider?: boolean;

    /** The color used for the DrawerNavItem text */
    itemFontColor?: string;

    /** The color used for the DrawerNavItem icon */
    itemIconColor?: string;

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

export type NavItemSharedStyleProps = {
    /**
     * Shape of the active item background highlight
     *
     * @default: square
     */
    activeItemBackgroundShape?: 'round' | 'square';

    /** Whether to have chevrons for all menu items */
    chevron?: boolean;

    /**
     * Icon used to collapse a DrawerNavGroup
     *
     * @default: `expandIcon` rotated 180-degrees
     */
    collapseIcon?: IconSource;

    /**
     * When true, disables the semi-bold text style on parent elements of active item.
     *
     * @default: false
     */
    disableActiveItemParentStyles?: boolean;

    /**
     * Icon used to expand a DrawerNavGroup
     *
     * @default: top-level items use the 'expand-more' icon from Material. Nested items use the 'arrow-drop-down' icon.
     */
    expandIcon?: IconSource;

    /**
     * Whether to hide the padding reserved for DrawerNavItem icons. If this is set to false, the text for all DrawerNavItems will align
     * together even if there is a mix of items with icons and items without. If this is set to true, the extra padding
     * for items without icons is removed and the text will align with the icon of DrawerNavItems with icons.
     *
     * @default: true
     */
    hidePadding?: boolean;

    /** Background color for nested items */
    nestedBackgroundColor?: string;

    /**
     * Whether to show a dividing line between nested navigation items. This property will override
     * the setting used for `divider` for nested items. If this property is undefined, nested items will adhere
     * to the setting for `divider`.
     *
     * @default: false
     */
    nestedDivider?: boolean;
};

export type AllSharedProps = SharedStyleProps & NavItemSharedStyleProps;

export const SharedStylePropTypes = {
    activeChevronColor: PropTypes.string,
    activeItemBackgroundColor: PropTypes.string,
    activeItemFontColor: PropTypes.string,
    activeItemIconColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    chevronColor: PropTypes.string,
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
