import React from 'react';
import { ScrollView, StyleSheet, ScrollViewProps, ViewStyle } from 'react-native';
import { DrawerNavGroup } from './DrawerNavGroup';
import { AllSharedProps } from './types';
import { inheritSharedProps } from './utilities';

type DrawerBodyStyles = {
    root?: ViewStyle;
};
const makeStyles = (): StyleSheet.NamedStyles<DrawerBodyStyles> =>
    StyleSheet.create({
        root: {},
    });

export type DrawerBodyProps = ScrollViewProps &
    AllSharedProps & {
        /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
        styles?: DrawerBodyStyles;
    };

/**
 * [DrawerBody](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--drawer) component
 *
 * The DrawerBody is a wrapper for the main content of your navigation Drawer. This section sits between
 * the DrawerHeader (or optional DrawerSubheader) and the DrawerFooter. This part of the drawer should hold
 * your main navigation elements (either using the `items` prop or by passing in DrawerNavGroup and DrawerNavItem children
 * declaratively).
 */
export const DrawerBody: React.FC<DrawerBodyProps> = (props) => {
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
        theme: themeOverride,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        // DrawerBody-specific props
        styles = {},
        // Other ScrollView Props
        style,
        children: bodyChildren,
        ...scrollProps
    } = props;
    const children = React.Children.toArray(bodyChildren);
    const defaultStyles = makeStyles();

    return (
        <ScrollView style={[defaultStyles.root, styles.root, style]} {...scrollProps}>
            {children.map((child: any, index: number) => {
                if (!child) return null;
                if (child.type && child.type.displayName !== 'DrawerNavGroup') return child;
                return (
                    <DrawerNavGroup
                        key={`NavGroup_${index}`}
                        {...child.props}
                        {...inheritSharedProps(props, child.props)}
                    />
                );
            })}
        </ScrollView>
    );
};

DrawerBody.displayName = 'DrawerBody';
