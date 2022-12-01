import React, { useCallback, useState } from 'react';
import { PixelRatio, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { BottomSheet } from './bottom-sheet';
import { useTheme, Divider } from 'react-native-paper';
import { InfoListItem, InfoListItemProps } from '../info-list-item/info-list-item';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFontScale } from '..';

export type UserMenuProps = {
    /** Avatar component to display as the menu trigger */
    avatar: JSX.Element;
    /** Background color of the bottom sheet */
    backgroundColor?: string;
    /** Color of text for the bottom sheet header and menu items */
    fontColor?: string;
    /** Color of icons for the bottom sheet menu items */
    iconColor?: string;
    /** An array of menu items to display in the bottom sheet */
    menuItems: InfoListItemProps[];
    /** Title to display in the bottom sheet */
    menuTitle?: string;
    /** Subtitle to display in the bottom sheet */
    menuSubtitle?: string;
    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: ViewStyle;
        avatar?: ViewStyle;
        bottomsheet?: ViewStyle;
    };
    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

const useStyles = (
    theme: ReactNativePaper.Theme,
    fontScale: number,
    avatarSize: number
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
            width: avatarSize * fontScale,
            height: avatarSize * fontScale,
            borderRadius: avatarSize * fontScale,
        },
        bottomsheet: {},
    });

/**
 * [UserMenu](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--user-menu) component
 *
 * Renders an avatar that can be clicked to open a bottomsheet menu.
 *
 * Typically used for a account-style menu with links to settings, log out, etc.
 */
export const UserMenu: React.FC<UserMenuProps> = (props) => {
    const theme = useTheme(props.theme);
    const {
        avatar,
        backgroundColor,
        fontColor,
        iconColor = theme.colors.textPalette?.secondary || theme.colors.text,
        menuTitle,
        menuSubtitle,
        menuItems,
        styles = {},
    } = props;
    const avatarSize = avatar.props.size || 40;
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const { maxScale, disableScaling } = useFontScale();
    const fontScale = !disableScaling
    ? PixelRatio.getFontScale() < maxScale
        ? PixelRatio.getFontScale()
        : maxScale
    : 1;
    const defaultStyles = useStyles(theme, fontScale, avatarSize);
    const insets = useSafeAreaInsets();

    const openMenu = (): void => {
        if (menuItems) setShowBottomSheet(true);
    };

    const closeMenu = (): void => {
        setShowBottomSheet(false);
    };

    const getAvatar = useCallback(
        () =>
            React.cloneElement(avatar, {
                size: avatarSize * fontScale,
            }),
        [avatar]
    );

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
                                <View style={[defaultStyles.avatar, styles.avatar, { marginLeft: 16 }]}>
                                    {getAvatar()}
                                </View>
                            }
                            fontColor={fontColor}
                            backgroundColor={backgroundColor}
                        />
                        <Divider style={{ marginLeft: -1 * insets.left, marginRight: -1 * insets.right }} />
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
                                iconColor={menuItem.iconColor || iconColor}
                                fontColor={menuItem.fontColor || fontColor}
                                backgroundColor={menuItem.backgroundColor || backgroundColor}
                                dense={menuItem.dense !== undefined ? menuItem.dense : true}
                                styles={Object.assign(menuItemStyles, {
                                    title: Object.assign(
                                        {
                                            fontSize: 16,
                                            fontFamily: theme.fonts.regular.fontFamily,
                                            fontWeight: theme.fonts.regular.fontWeight,
                                        },
                                        menuItemStyles.title
                                    ),
                                    divider: Object.assign(
                                        {
                                            marginLeft: -1 * insets.left,
                                            marginRight: -1 * insets.right,
                                        },
                                        menuItemStyles.divider
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
                {getAvatar()}
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
