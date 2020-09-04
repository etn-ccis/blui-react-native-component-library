import React from 'react';
import { StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { wrapIcon } from '../icon-wrapper/icon-wrapper';
import { HeaderIcon } from './headerIcon';
import { useSearch } from './contexts/SearchContextProvider';
import { HeaderIcon as HeaderIconType } from '../__types__';

const ClearIcon = wrapIcon({ IconClass: Icon, name: 'clear' });
const SearchIcon = wrapIcon({ IconClass: Icon, name: 'search' });

const defaultStyles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 8,
        height: 56,
    },
    actionItem: {
        height: 40,
        width: 40,
        padding: 8,
    },
});

type ActionItemProps = {
    /** List of up to three action items on the right of the header */
    actionItems?: HeaderIconType[];

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        actionItem?: StyleProp<ViewStyle>;
    };
};

export const HeaderActionItems: React.FC<ActionItemProps> = (props) => {
    const { actionItems, styles = {} } = props;
    const { searchConfig, searching, query, onClear, onSearch } = useSearch();

    let items: HeaderIconType[] = actionItems || [];

    if (searching) {
        if (query) {
            items = [
                {
                    icon: ClearIcon,
                    onPress: onClear,
                },
            ];
        } else {
            items = [];
        }
    } else if (searchConfig) {
        items = [
            {
                icon: SearchIcon,
                onPress: onSearch,
            },
        ];
        if (actionItems) {
            items = items.concat(actionItems);
        }
    }

    if (items) {
        return (
            <View style={[defaultStyles.root, styles.root]}>
                {items.slice(0, 3).map((actionItem, index) => (
                    <TouchableOpacity
                        key={`action_${index}`}
                        testID={`header-action-item${index}`}
                        onPress={actionItem.onPress}
                        style={[defaultStyles.actionItem, styles.actionItem]}
                    >
                        <HeaderIcon IconClass={actionItem.icon} />
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
    return null;
};
