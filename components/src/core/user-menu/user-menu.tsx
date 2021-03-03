import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { BottomSheet } from './bottom-sheet';
import { useTheme, Divider } from 'react-native-paper';
import { InfoListItem, InfoListItemProps } from '../info-list-item/info-list-item';
import * as Colors from '@pxblue/colors';

export type UserMenuProps = {
    // Custom avatar to render as bottomsheet trigger
    avatar: JSX.Element;
    // Background color of the bottomsheet
    backgroundColor?: string;
    // Color of font for menu items
    fontColor?: string;
    // Color of icons in the bottomsheet
    iconColor?: string;
    menuItems: InfoListItemProps[];
    menuTitle?: string;
    menuSubtitle?: string;
    styles?: {
        root?: ViewStyle;
        avatar?: ViewStyle;
        bottomsheet?: ViewStyle;
    };
};

const useStyles = (
    theme: ReactNativePaper.Theme
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    avatar: ViewStyle;
    bottomsheet: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            backgroundColor: theme.colors.surface,
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 40,
        },
        bottomsheet: {},
    });

export const UserMenu: React.FC<UserMenuProps> = (props) => {
    const theme = useTheme();
    const {
        avatar,
        backgroundColor,
        fontColor,
        iconColor = Colors.gray[500],
        menuTitle,
        menuSubtitle,
        menuItems,
        styles = {},
    } = props;
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const defaultStyles = useStyles(theme);

    const openMenu = (): void => {
        if (menuItems) setShowBottomSheet(true);
    };

    const closeMenu = (): void => {
        setShowBottomSheet(false);
    };

    const getMenu = useCallback(
        (): JSX.Element => (
            <>
                {menuTitle && (
                    <>
                        <InfoListItem
                            hidePadding
                            title={menuTitle || ''}
                            subtitle={menuSubtitle}
                            leftComponent={
                                <View style={[defaultStyles.avatar, styles.avatar, { marginLeft: 16 }]}>{avatar}</View>
                            }
                            fontColor={fontColor}
                            backgroundColor={backgroundColor}
                        />
                        <Divider />
                    </>
                )}
                {menuItems &&
                    menuItems.map((menuItem: InfoListItemProps, index: number) => {
                        const menuItemStyles = menuItem.styles || {};
                        return (
                            <InfoListItem
                                {...menuItem}
                                key={index}
                                onPress={(): void => {
                                    closeMenu();
                                    if (menuItem.onPress) menuItem.onPress();
                                }}
                                iconColor={iconColor || menuItem.iconColor}
                                fontColor={fontColor || menuItem.fontColor}
                                backgroundColor={backgroundColor || menuItem.backgroundColor}
                                styles={Object.assign(menuItemStyles, {
                                    title: Object.assign(
                                        {
                                            fontSize: 16,
                                            fontFamily: theme.fonts.regular.fontFamily,
                                            fontWeight: theme.fonts.regular.fontWeight,
                                        },
                                        menuItemStyles.title
                                    ),
                                })}
                            />
                        );
                    })}
            </>
        ),
        [menuItems, menuTitle, menuSubtitle, iconColor, fontColor, backgroundColor]
    );

    return (
        <>
            <TouchableWithoutFeedback
                onPress={(): void => openMenu()}
                testID={'avatar'}
                style={[defaultStyles.root, styles.root]}
            >
                {avatar}
            </TouchableWithoutFeedback>
            <BottomSheet
                show={showBottomSheet}
                backgroundColor={backgroundColor}
                onClose={(): void => closeMenu()}
                styles={{ root: styles.bottomsheet }}
            >
                {getMenu()}
            </BottomSheet>
        </>
    );
};
