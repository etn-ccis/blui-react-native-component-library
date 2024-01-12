import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, I18nManager } from 'react-native';
import { ICON_SIZE } from './constants';
import { IconSource } from '../__types__';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderIcon } from './HeaderIcon';
import { useSearch } from './contexts/SearchContextProvider';
import { useColor } from './contexts/ColorContextProvider';
import { useFontScale, useFontScaleSettings } from '../__contexts__/font-scale-context';

const makeStyles = (): StyleSheet.NamedStyles<{
    navigation: ViewStyle;
    flipIcon: ViewStyle;
}> => {
    const fontScale = useFontScale();
    return StyleSheet.create({
        navigation: {
            height: 40 * fontScale,
            width: 40 * fontScale,
            marginLeft: -8 * fontScale,
            marginRight: 24,
            marginTop: 8 * fontScale,
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

    /**
     * The color used for the navigation Icon
     *
     * @default: theme.colors.onSurface
     */
    navigationIconColor?: string;

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
    const { icon, navigationIconColor, onPress, style } = props;
    const { searching, onClose } = useSearch();
    const { color } = useColor();
    const defaultStyles = makeStyles();
    const { disableScaling, maxScale } = useFontScaleSettings();

    if (searching) {
        return (
            <TouchableOpacity
                testID={'header-search-close'}
                accessibilityLabel={'header-search-close'}
                onPress={onClose ? (): void => onClose() : undefined}
                style={[defaultStyles.navigation, style]}
            >
                <Icon
                    name={'arrow-back'}
                    size={ICON_SIZE}
                    color={color}
                    allowFontScaling={!disableScaling}
                    style={I18nManager.isRTL ? defaultStyles.flipIcon : {}}
                    maxFontSizeMultiplier={maxScale}
                />
            </TouchableOpacity>
        );
    }
    if (icon) {
        return (
            <TouchableOpacity
                testID={'header-navigation'}
                accessibilityLabel={'header-navigation'}
                onPress={onPress}
                style={[defaultStyles.navigation, style]}
                disabled={!onPress}
            >
                <HeaderIcon icon={icon} color={navigationIconColor} />
            </TouchableOpacity>
        );
    }
    return null;
};
