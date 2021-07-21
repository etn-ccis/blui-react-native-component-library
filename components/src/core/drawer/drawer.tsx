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
        /** The itemID of the currently active / selected item */
        activeItem?: string;

        /** A callback function to execute whenever a navigation item is clicked */
        onItemSelect?: (id: string) => void;

        /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
        styles?: DrawerStyles;
    };

/**
 * [Drawer](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--drawer) component
 *
 * The Drawer is a parent container that manages all of the content displayed in your primary
 * navigation drawer. It can contain a DrawerHeader, DrawerSubheader, DrawerBody, and DrawerFooter.
 */
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
        theme: themeOverride,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        // Drawer-specific props
        activeItem,
        onItemSelect,
        styles = {},
        // Other View Props
        style,
        ...viewProps
    } = props;

    const theme = useTheme(themeOverride);
    const insets = useSafeAreaInsets();
    const defaultStyles = makeStyles(props, theme, insets);

    const getSectionByDisplayName = useCallback(
        (displayName: string, inherit = false): JSX.Element[] =>
            findChildByType(props.children, [displayName])
                .slice(0, 1)
                .map((child) => {
                    let inheritableProps = {};
                    if (inherit) {
                        inheritableProps = inheritSharedProps({ ...props, theme }, child.props);
                    }
                    return React.cloneElement(child, inheritableProps);
                }),
        [props, theme]
    );

    return (
        <DrawerContext.Provider
            value={{
                activeItem,
                onItemSelect,
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
