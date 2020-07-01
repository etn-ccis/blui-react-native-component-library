import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ICON_SIZE } from './constants';
import { HeaderIcon as HeaderIconType } from '../__types__';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderIcon } from './headerIcon';
import { useSearch } from './contexts/SearchContextProvider';
import { useColor } from './contexts/ColorContextProvider';

const defaultStyles = StyleSheet.create({
    navigation: {
        marginRight: 24,
        height: 40,
        width: 40,
        margin: -8,
        padding: 8,
    },
});

type HeaderNavigationProps = {
    /** Leftmost icon on header, used for navigation */
    navigation?: HeaderIconType;

    style?: StyleProp<ViewStyle>;
};
export const HeaderNavigationIcon: React.FC<HeaderNavigationProps> = (props) => {
    const { navigation, style } = props;
    const { searching, onClose } = useSearch();
    const { color } = useColor();

    if (searching) {
        return (
            <TouchableOpacity
                testID={'header-search-close'}
                onPress={onClose ? (): void => onClose() : undefined}
                style={[defaultStyles.navigation, style]}
            >
                <Icon name={'arrow-back'} size={ICON_SIZE} color={color} />
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
