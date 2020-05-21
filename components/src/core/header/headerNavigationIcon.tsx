import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ICON_SIZE } from './constants';
import { HeaderIcon as HeaderIconType } from '../__types__';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderIcon } from './headerIcon';
import { useSearch } from './contexts/SearchContextProvider';
import { useColor } from './contexts/ColorContextProvider';

const styles = StyleSheet.create({
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
};
export const HeaderNavigationIcon: React.FC<HeaderNavigationProps> = (props) => {
    const { navigation } = props;
    const { searching, onClose } = useSearch();
    const { color } = useColor();

    if (searching) {
        return (
            <View>
                <TouchableOpacity
                    testID={'header-search-close'}
                    onPress={onClose ? (): void => onClose() : undefined}
                    style={styles.navigation}
                >
                    <Icon name={'arrow-back'} size={ICON_SIZE} color={color} />
                </TouchableOpacity>
            </View>
        );
    }
    if (navigation) {
        return (
            <View>
                <TouchableOpacity testID={'header-navigation'} onPress={navigation.onPress} style={styles.navigation}>
                    <HeaderIcon IconClass={navigation.icon} />
                </TouchableOpacity>
            </View>
        );
    }
    return null;
};
