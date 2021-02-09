import React, { ReactNode } from 'react';
import { AllSharedProps } from './types';

// Use the child prop if it exists, or inherit from the parent prop
export const mergeStyleProp = <T extends unknown>(parentValue: T, childValue: T): T | undefined =>
    childValue !== undefined ? childValue : parentValue;

export const inheritSharedProps = (parent: AllSharedProps, child: AllSharedProps): AllSharedProps => ({
    activeItemBackgroundColor: mergeStyleProp(parent.activeItemBackgroundColor, child.activeItemBackgroundColor),
    activeItemBackgroundShape: mergeStyleProp(parent.activeItemBackgroundShape, child.activeItemBackgroundShape),
    activeItemFontColor: mergeStyleProp(parent.activeItemFontColor, child.activeItemFontColor),
    activeItemIconColor: mergeStyleProp(parent.activeItemIconColor, child.activeItemIconColor),
    backgroundColor: mergeStyleProp(parent.backgroundColor, child.backgroundColor),
    chevron: mergeStyleProp(parent.chevron, child.chevron),
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

export const findChildByType = (children: ReactNode, type: string[]): JSX.Element[] =>
    React.Children.map(children, (child: any) => {
        if (child && child.type) {
            const name = child.type.displayName;
            if (name && type.includes(name)) {
                return child;
            }
        }
    }) || [];
