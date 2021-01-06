import React, { useCallback } from 'react';
import { StyleSheet, ViewStyle, StyleProp, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerInheritableProps, inheritDrawerProps } from './inheritable-types';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { Surface, useTheme } from 'react-native-paper';
import color from 'color';
import { EdgeInsets } from '../__types__';
import { $DeepPartial } from '@callstack/react-theme-provider';

const makeStyles = (
    props: DrawerProps,
    theme: ReactNativePaper.Theme,
    insets: EdgeInsets
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    // drawerShadow: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            backgroundColor: props.backgroundColor || theme.colors.surface,
            zIndex: 2,
            flex: 1,
            height: '100%',
            paddingBottom: insets.bottom,
            elevation: props.open ? 4 : 0,
        },
    });
export type DrawerProps = ViewProps &
    DrawerInheritableProps & {
        style?: StyleProp<ViewStyle>;

        /**
         * Overrides for theme
         */
        theme?: $DeepPartial<ReactNativePaper.Theme>;
        // Whether the drawer is open
        open?: boolean;
    };
export const Drawer: React.FC<DrawerProps> = (props) => {
    const { theme: themeOverride, style, open = false, ...viewProps } = props;
    const theme = useTheme(themeOverride);
    // Nested expand/collapse icon defaults are different and are set in the DrawerNavGroup.
    const {
        expandIcon = <MatIcon name={'expand-more'} size={24} color={theme.colors.text} />,
        collapseIcon = <MatIcon name={'expand-less'} size={24} color={theme.colors.text} />,
    } = props;
    const insets = useSafeAreaInsets();
    const defaultStyles = makeStyles(props, theme, insets);

    const findChildByType = useCallback(
        (type: string): JSX.Element[] =>
            React.Children.map(props.children, (child: any) => {
                if (child && child.type) {
                    const name = child.type.displayName;
                    if (name && name.includes(type)) {
                        return child;
                    }
                }
            }) || [],
        [props]
    );

    const getSectionByDisplayName = useCallback(
        (displayName: string, inherit = false): JSX.Element[] =>
            findChildByType(displayName)
                .slice(0, 1)
                .map((child) => {
                    let inheritableProps = {};
                    if (inherit) {
                        inheritableProps = inheritDrawerProps(
                            {
                                ...props,
                                expandIcon,
                                collapseIcon,
                                // Set theme-related default props here.
                                activeItemBackgroundColor:
                                    props.activeItemBackgroundColor ||
                                    color(theme.colors.primary).fade(0.95).rgb().string(),
                                activeItemFontColor: props.activeItemFontColor || theme.colors.primary,
                                activeItemIconColor: props.activeItemIconColor || theme.colors.primary,
                                itemFontColor: props.itemFontColor || theme.colors.text,
                                itemIconColor: props.itemIconColor || theme.colors.text,
                            },
                            child.props
                        );
                    }
                    return React.cloneElement(child, inheritableProps);
                }),
        [props]
    );

    return (
        <Surface style={[defaultStyles.root, style]} {...viewProps}>
            {getSectionByDisplayName('DrawerHeader')}
            {getSectionByDisplayName('DrawerSubheader')}
            {getSectionByDisplayName('DrawerBody', true)}
            {getSectionByDisplayName('DrawerFooter')}
        </Surface>
    );
};

Drawer.defaultProps = {
    activeItemBackgroundShape: 'square',
    chevron: false,
    divider: false,
    hidePadding: true,
};
