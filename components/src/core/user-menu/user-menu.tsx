import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageStyle, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { BottomSheet } from './bottom-sheet';
import { useTheme, Avatar, Divider } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';
import { InfoListItem, InfoListItemProps } from '../info-list-item/info-list-item';

export type AvatarProps = {
    // Icon to render as avatar when avatarType === 'icon'
    avatarIcon?: IconSource;
    // Image to render as avatar when avatarType === 'image'
    avatarImage?: any;
    // Text to render as avatar when avatarType === 'text'
    avatarText?: string;
    avatarType?: 'icon' | 'image' | 'text';
    avatarSize?: number;
    avatarColor?: string;
    avatarBackgroundColor?: string;
};

export type UserMenuProps = AvatarProps & {
    // Custom menu to render in bottomsheet
    menu?: JSX.Element;
    menuItems?: InfoListItemProps[];

    menuClose?: boolean;
    menuTitle?: string;
    menuSubtitle?: string;
};

const useStyles = (
    theme: ReactNativePaper.Theme,
    props: UserMenuProps
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    avatar: ViewStyle;
    avatarImage: ImageStyle;
    avatarBackgroundColor: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.surface,
        },
        avatar: {
            width: props.avatarSize ? props.avatarSize : 40,
            height: props.avatarSize ? props.avatarSize : 40,
            borderRadius: props.avatarSize ? props.avatarSize : 40,
        },
        avatarImage: {
            height: props.avatarSize ? props.avatarSize : 40,
            width: props.avatarSize ? props.avatarSize : 40,
            borderRadius: props.avatarSize ? props.avatarSize : 40,
            resizeMode: 'contain',
        },
        avatarBackgroundColor: {
            backgroundColor: props.avatarBackgroundColor ? props.avatarBackgroundColor : theme.colors.primary,
        },
    });

export const UserMenu: React.FC<UserMenuProps> = (props) => {
    const theme = useTheme();
    const {
        avatarIcon,
        avatarImage,
        avatarText,
        avatarType,
        avatarSize = 40,
        avatarColor = theme.colors.text,
        menu,
        menuTitle,
        menuSubtitle,
        menuItems,
        menuClose = false,
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
        menuClose ? closeMenu() : null;
    }, [menuClose]);

    const getAvatar = useCallback(
        (): JSX.Element => (
            <View style={defaultStyles.avatar}>
                {avatarIcon && avatarType === 'icon' && (
                    <Avatar.Icon
                        icon={avatarIcon}
                        size={avatarSize}
                        color={avatarColor}
                        style={defaultStyles.avatarBackgroundColor}
                    />
                )}
                {avatarText && avatarType === 'text' && (
                    <Avatar.Text
                        label={avatarText}
                        size={avatarSize}
                        color={avatarColor}
                        style={defaultStyles.avatarBackgroundColor}
                    />
                )}
                {avatarImage && avatarType === 'image' && (
                    <Image
                        source={avatarImage}
                        style={[
                            defaultStyles.avatarImage as ImageStyle,
                            defaultStyles.avatarBackgroundColor as ImageStyle,
                        ]}
                    />
                )}
            </View>
        ),
        [avatarIcon, avatarImage, avatarType, avatarSize, avatarColor]
    );

    const getMenu = useCallback((): JSX.Element => {
        if (menu) {
            return menu;
        }

        return (
            <>
                <InfoListItem title={menuTitle || ''} subtitle={menuSubtitle} IconClass={getAvatar} />
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
                                menuItem.onPress ? menuItem.onPress() : null;
                            }}
                        />
                    ))}
            </>
        );
    }, [menu, menuItems, menuTitle, menuSubtitle]);

    return (
        <View style={defaultStyles.container}>
            <TouchableWithoutFeedback onPress={(): void => openMenu()} style={defaultStyles.avatarImage}>
                {getAvatar()}
            </TouchableWithoutFeedback>
            <BottomSheet show={showBottomSheet} dismissBottomSheet={(): void => closeMenu()}>
                {getMenu()}
            </BottomSheet>
        </View>
    );
};
