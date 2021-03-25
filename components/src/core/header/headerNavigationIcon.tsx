import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, I18nManager, PixelRatio } from 'react-native';
import { ICON_SIZE } from './constants';
import { HeaderIcon as HeaderIconType } from '../__types__';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderIcon } from './headerIcon';
import { useSearch } from './contexts/SearchContextProvider';
import { useColor } from './contexts/ColorContextProvider';

const makeStyles = (): StyleSheet.NamedStyles<{
    navigation: ViewStyle;
    flipIcon: ViewStyle;
}> => {
    const fontScale = PixelRatio.getFontScale();
    return StyleSheet.create({
        navigation: {
            marginRight: 24,
            height: 40 * fontScale,
            width: 40 * fontScale,
            margin: -8 * fontScale,
            padding: 8 * fontScale,
        },
        flipIcon: {
            transform: [{ scaleX: -1 }],
        },
    });
};
type HeaderNavigationProps = {
    /** Leftmost icon on header, used for navigation */
    navigation?: HeaderIconType;

    style?: StyleProp<ViewStyle>;
};
export const HeaderNavigationIcon: React.FC<HeaderNavigationProps> = (props) => {
    const { navigation, style } = props;
    const { searching, onClose } = useSearch();
    const { color } = useColor();
    const defaultStyles = makeStyles();

    if (searching) {
        return (
            <TouchableOpacity
                testID={'header-search-close'}
                onPress={onClose ? (): void => onClose() : undefined}
                style={[defaultStyles.navigation, style]}
            >
                <Icon
                    name={'arrow-back'}
                    size={ICON_SIZE}
                    color={color}
                    allowFontScaling
                    style={I18nManager.isRTL ? defaultStyles.flipIcon : {}}
                />
            </TouchableOpacity>
        );
    }
    if (navigation) {
        return (
            <TouchableOpacity
                testID={'header-navigation'}
                onPress={navigation.onPress}
                style={[defaultStyles.navigation, style]}
            >
                <HeaderIcon IconClass={navigation.icon} />
            </TouchableOpacity>
        );
    }
    return null;
};
