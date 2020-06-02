import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerInheritableProps, inheritDrawerProps } from './inheritable-types';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {Theme, useTheme} from 'react-native-paper';
// Styles
import color from 'color';

const makeStyles = (props: DrawerInheritableProps, theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: props.backgroundColor || theme.colors.surface,
        zIndex: 2,
        flex: 1,
        height: '100%',
    },
});

export const Drawer: React.FC<DrawerInheritableProps> = (props) => {
    const theme = useTheme();
    const styles = makeStyles(props, theme);
    const insets = useSafeAreaInsets();
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
                                // Set theme-related default props here.
                                activeItemBackgroundColor: props.activeItemBackgroundColor || color(theme.colors.primary).alpha(0.16).rgb().string(),
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
        <View style={styles.container}>
            {getSectionByDisplayName('DrawerHeader')}
            {getSectionByDisplayName('DrawerSubheader')}
            {getSectionByDisplayName('DrawerBody', true)}
            {getSectionByDisplayName('DrawerFooter')}
            <View style={{ height: insets.bottom }} />
        </View>
    );
};

Drawer.defaultProps = {
    activeItemBackgroundShape: 'round',
    chevron: false,
    divider: true,
    hidePadding: true,
    // Nested expand/collapse icon defaults are different and are set in the DrawerNavGroup.
    expandIcon: <MatIcon name={'expand-more'} size={24} />,
    collapseIcon: <MatIcon name={'expand-less'} size={24} />,
};
