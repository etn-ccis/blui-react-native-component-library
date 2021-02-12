import React from 'react';
import { ScrollView, StyleSheet, ScrollViewProps, ViewStyle } from 'react-native';
import { DrawerNavGroup } from './drawer-nav-group';
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
        // Custom style overrides
        styles?: DrawerBodyStyles;
    };
export const DrawerBody: React.FC<DrawerBodyProps> = (props) => {
    const {
        // Inheritable Props
        /* eslint-disable @typescript-eslint/no-unused-vars */
        activeItemBackgroundColor,
        activeItemBackgroundShape,
        activeItemFontColor,
        activeItemIconColor,
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
