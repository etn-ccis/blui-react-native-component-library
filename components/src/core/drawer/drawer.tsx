import React, { useCallback } from 'react';
import { StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Surface, useTheme } from 'react-native-paper';
import { EdgeInsets } from '../__types__';
import { AllSharedProps } from './types';
import { findChildByType, inheritSharedProps } from './utilities';
import { DrawerContext } from './context';

type DrawerStyles = {
    root?: ViewStyle;
};
const makeStyles = (
    props: DrawerProps,
    theme: ReactNativePaper.Theme,
    insets: EdgeInsets
): StyleSheet.NamedStyles<DrawerStyles> =>
    StyleSheet.create({
        root: {
            backgroundColor: props.backgroundColor || theme.colors.surface,
            zIndex: 2,
            flex: 1,
            height: '100%',
            paddingBottom: insets.bottom,
        },
    });
export type DrawerProps = ViewProps &
    AllSharedProps & {
        // the id for the currently active item
        activeItem?: string;

        // Function called whenever a navigation item or rail item is clicked
        onItemSelect?: (id: string) => void;

        // Custom style overrides
        styles?: DrawerStyles;

        // Sets the width of the drawer (in px) when open
        width?: number;
    };
export const Drawer: React.FC<DrawerProps> = (props) => {
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
        ripple,
        theme: themeOverride,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        // Drawer-specific props
        activeItem,
        onItemSelect,
        styles = {},
        width,
        // Other View Props
        style,
        ...viewProps
    } = props;

    const theme = useTheme(themeOverride);
    const insets = useSafeAreaInsets();
    const defaultStyles = makeStyles(props, theme, insets);
    // Nested expand/collapse icon defaults are different and are set in the DrawerNavGroup.
    // TODO: Move this to the nav item
    // const {
    //     expandIcon = <MatIcon name={'expand-more'} size={24} color={theme.colors.text} />,
    //     collapseIcon = <MatIcon name={'expand-less'} size={24} color={theme.colors.text} />,
    // } = props;

    // const findChildByType = useCallback(
    //     (type: string): JSX.Element[] =>
    //         React.Children.map(props.children, (child: any) => {
    //             if (child && child.type) {
    //                 const name = child.type.displayName;
    //                 if (name && name.includes(type)) {
    //                     return child;
    //                 }
    //             }
    //         }) || [],
    //     [props]
    // );

    const getSectionByDisplayName = useCallback(
        (displayName: string, inherit = false): JSX.Element[] =>
            findChildByType(props.children, [displayName])
                .slice(0, 1)
                .map((child) => {
                    let inheritableProps = {};
                    if (inherit) {
                        inheritableProps = inheritSharedProps({ ...props, theme }, child.props);
                    }
                    // TODO move these defaults where they belong
                    // expandIcon,
                    // collapseIcon,
                    // // Set theme-related default props here.
                    // activeItemBackgroundColor:
                    //     props.activeItemBackgroundColor ||
                    //     color(theme.colors.primary).fade(0.95).rgb().string(),
                    // activeItemFontColor: props.activeItemFontColor || theme.colors.primary,
                    // activeItemIconColor: props.activeItemIconColor || theme.colors.primary,
                    // itemFontColor: props.itemFontColor || theme.colors.text,
                    // itemIconColor: props.itemIconColor || theme.colors.text,
                    return React.cloneElement(child, inheritableProps);
                }),
        [props]
    );

    return (
        <DrawerContext.Provider
            value={{
                activeItem,
                onItemSelect,
                width,
            }}
        >
            <Surface style={[defaultStyles.root, styles.root, style]} {...viewProps}>
                {getSectionByDisplayName('DrawerHeader')}
                {getSectionByDisplayName('DrawerSubheader')}
                {getSectionByDisplayName('DrawerBody', true)}
                {getSectionByDisplayName('DrawerFooter')}
            </Surface>
        </DrawerContext.Provider>
    );
};

Drawer.defaultProps = {
    activeItemBackgroundShape: 'square',
    chevron: false,
    divider: false,
    hidePadding: true,
};
