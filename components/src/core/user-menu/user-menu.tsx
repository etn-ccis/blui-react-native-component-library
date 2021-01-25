import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { BottomSheet } from './bottom-sheet';
import { useTheme, Divider } from 'react-native-paper';
import { InfoListItem, InfoListItemProps } from '../info-list-item/info-list-item';

export type UserMenuProps = {
    // Custom avatar to render as bottomsheet trigger
    avatar: JSX.Element;
    // Background color of the bottomsheet
    backgroundColor?: string;
    // Color of font for menu items
    fontColor?: string;
    // Color of icons in the bottomsheet
    iconColor?: string;
    // Custom menu to render in the bottomsheet
    menu?: JSX.Element;
    menuItems?: InfoListItemProps[];
    menuClose?: boolean;
    menuTitle?: string;
    menuSubtitle?: string;
    styles?: {
        container?: ViewStyle;
    };
};

const useStyles = (
    theme: ReactNativePaper.Theme,
    props: UserMenuProps
): StyleSheet.NamedStyles<{
    container: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            backgroundColor: props.backgroundColor || theme.colors.surface,
        },
    });

export const UserMenu: React.FC<UserMenuProps> = (props) => {
    const theme = useTheme();
    const {
        avatar,
        backgroundColor,
        fontColor,
        iconColor,
        menu,
        menuTitle,
        menuSubtitle,
        menuItems,
        menuClose = false,
        styles = {},
    } = props;
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const defaultStyles = useStyles(theme, props);

    const openMenu = (): void => {
        setShowBottomSheet(true);
    };

    const closeMenu = (): void => {
        setShowBottomSheet(false);
    };

    useEffect((): void => {
        if (menuClose) {
            closeMenu();
        }
    }, [menuClose]);

    const getMenu = useCallback((): JSX.Element => {
        if (menu) {
            return menu;
        }

        return (
            <>
                <InfoListItem
                    title={menuTitle || ''}
                    subtitle={menuSubtitle}
                    leftComponent={avatar}
                    fontColor={fontColor}
                    backgroundColor={backgroundColor}
                />
                <Divider />
                {menuItems &&
                    menuItems.map((menuItem: InfoListItemProps, index: number) => (
                        <InfoListItem
                            key={index}
                            title={menuItem.title}
                            subtitle={menuItem.subtitle}
                            IconClass={menuItem.IconClass}
                            onPress={(): void => {
                                closeMenu();
                                if (menuItem.onPress) menuItem.onPress();
                            }}
                            subtitleSeparator={menuItem.subtitleSeparator}
                            info={menuItem.info}
                            iconAlign={menuItem.iconAlign}
                            iconColor={menuItem.iconColor || iconColor}
                            hidePadding={menuItem.hidePadding}
                            avatar={menuItem.avatar}
                            chevron={menuItem.chevron}
                            dense={menuItem.dense}
                            divider={menuItem.divider}
                            leftComponent={menuItem.leftComponent}
                            rightComponent={menuItem.rightComponent}
                            statusColor={menuItem.statusColor}
                            fontColor={menuItem.fontColor || fontColor}
                            backgroundColor={menuItem.backgroundColor || backgroundColor}
                            theme={menuItem.theme}
                        />
                    ))}
            </>
        );
    }, [menu, menuItems, menuTitle, menuSubtitle]);

    return (
        <View style={[defaultStyles.container, styles.container]}>
            <TouchableWithoutFeedback onPress={(): void => openMenu()}>{avatar}</TouchableWithoutFeedback>
            <BottomSheet show={showBottomSheet} dismissBottomSheet={(): void => closeMenu()}>
                {getMenu()}
            </BottomSheet>
        </View>
    );
};
