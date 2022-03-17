import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, I18nManager, PixelRatio } from 'react-native';
import { ICON_SIZE } from './constants';
import { IconSource } from '../__types__';
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
    /** A component to render for the navigation icon */
    icon?: IconSource;

    /** A callback function to call when the icon is pressed */
    onPress?: () => void;

    /** Style to apply to the Touchable element */
    style?: StyleProp<ViewStyle>;
};
/**
 * HeaderNavigationIcon component
 *
 * The HeaderNavigationIcon is a helper component that is used to properly size and space the main navigation icon (on the left) in the Header component.
 */
export const HeaderNavigationIcon: React.FC<HeaderNavigationProps> = (props) => {
    const { icon, onPress, style } = props;
    const { searching, onClose } = useSearch();
    const { color } = useColor();
    const defaultStyles = makeStyles();

    if (searching) {
        return (
            <TouchableOpacity
                testID={'header-search-close'}
                accessibiltyLabel={'header-search-close'}
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
    if (icon) {
        return (
            <TouchableOpacity
                testID={'header-navigation'}
                accessibiltyLabel={'header-navigation'}
                onPress={onPress}
                style={[defaultStyles.navigation, style]}
                disabled={!onPress}
            >
                <HeaderIcon icon={icon} />
            </TouchableOpacity>
        );
    }
    return null;
};
