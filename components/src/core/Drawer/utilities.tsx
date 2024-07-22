import React, { ReactNode } from 'react';
import { AllSharedProps } from './types';

/**
 * mergeStyleProp function
 *
 * This function takes a parent value and a child value as arguments. It returns the child value if it is
 * defined, otherwise it returns the parent value.
 *
 * @param parentValue The value of the property on the parent
 * @param childValue The value of the property on the child
 * @returns The child value if it is defined, otherwise the parent value
 */

/* eslint-disable */
export const mergeStyleProp = <T extends unknown>(parentValue: T, childValue: T): T | undefined =>
    childValue !== undefined ? childValue : parentValue;
/* eslint-enable */

/**
 * inheritSharedProps function
 *
 * This function will take the properties object for a parent and a child and return an object
 * that represents the properly inherited props for the child. If a property is specified for the
 * child, that value will be used. If the value is undefined, it will use the value of the property
 * from the parent.
 *
 * @param parent object representation of the props of the parent element
 * @param child object representation of the props of the child element
 * @returns an object representing the child props with any undefined properties replaced by the parent values.
 */
export const inheritSharedProps = (parent: AllSharedProps, child: AllSharedProps): AllSharedProps => ({
    activeChevronColor: mergeStyleProp(parent.activeChevronColor, child.activeChevronColor),
    activeItemBackgroundColor: mergeStyleProp(parent.activeItemBackgroundColor, child.activeItemBackgroundColor),
    activeItemBackgroundShape: mergeStyleProp(parent.activeItemBackgroundShape, child.activeItemBackgroundShape),
    activeItemFontColor: mergeStyleProp(parent.activeItemFontColor, child.activeItemFontColor),
    activeItemIconColor: mergeStyleProp(parent.activeItemIconColor, child.activeItemIconColor),
    backgroundColor: mergeStyleProp(parent.backgroundColor, child.backgroundColor),
    chevron: mergeStyleProp(parent.chevron, child.chevron),
    chevronColor: mergeStyleProp(parent.chevronColor, child.chevronColor),
    collapseIcon: mergeStyleProp(parent.collapseIcon, child.collapseIcon),
    disableActiveItemParentStyles: mergeStyleProp(
        parent.disableActiveItemParentStyles,
        child.disableActiveItemParentStyles
    ),
    divider: mergeStyleProp(parent.divider, child.divider),
    expandIcon: mergeStyleProp(parent.expandIcon, child.expandIcon),
    hidePadding: mergeStyleProp(parent.hidePadding, child.hidePadding),
    itemFontColor: mergeStyleProp(parent.itemFontColor, child.itemFontColor),
    itemIconColor: mergeStyleProp(parent.itemIconColor, child.itemIconColor),
    nestedBackgroundColor: mergeStyleProp(parent.nestedBackgroundColor, child.nestedBackgroundColor),
    nestedDivider: mergeStyleProp(parent.nestedDivider, child.nestedDivider),
    theme: Object.assign({}, parent.theme, child.theme),
});

/**
 * findChildByType function
 *
 * This function searches the `children` array of a component and returns an array of child elements
 * whose displayName is included in the supplied list.
 *
 * @param children the children property of a react component
 * @param type an array of displayName values to search for
 * @returns an array of child elements whose displayName is in the search array
 */
export const findChildByType = (children: ReactNode, type: string[]): JSX.Element[] =>
    React.Children.map(children, (child: any) => {
        if (child && child.type) {
            const name = child.type.displayName;
            if (name && type.includes(name)) {
                return child;
            }
        }
    }) || [];
