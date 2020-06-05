import React, { ComponentType, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider, Theme, useTheme} from 'react-native-paper';
import { Body1 } from '../typography';
import * as Colors from '@pxblue/colors';
import color from 'color';
import { renderableSubtitleComponent, withKeys, separate } from './utilities';

const MAX_SUBTITLE_ELEMENTS = 3;

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    divider: {
        color: Colors.black['100'],
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    withRightPadding: {
        paddingRight: 16,
    },
    iconContainer: {
        marginLeft: 10,
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    tab: {
        width: 6,
    },
    fullHeight: {
        height: '100%',
    },
});

export type InfoListItemProps = {
    /** Title to show */
    title: string;

    /** Subtitle. If an array, will be separated by dots. */
    subtitle?: string | React.ReactNode[];

    /** Subtitle Separator. Displays between array of subtitle items */
    subtitleSeparator?: string;

    /** Specifies whether to show color background around the icon */
    avatar?: boolean;

    /** Component to render to the left of the title */
    IconClass?: ComponentType<{ size: number; color: string }>;

    /** Color to use for stripe */
    statusColor?: string;

    /** Color to use for title text */
    fontColor?: string;

    /** Color to use for icon */
    iconColor?: string;

    /** Background color of element */
    backgroundColor?: string;

    /* Hide left padding when icon is not present */
    hidePadding?: boolean;

    /* If present, a Chevron will be displayed on the right. This can be overridden by rightComponent. */
    chevron?: boolean;

    /* Reduce overall height of listItem */
    dense?: boolean;

    /* Whether to show the bottom divider for the list item */
    divider?: 'full' | 'partial';

    /* Component to render on the right */
    rightComponent?: JSX.Element;

    /** Callback to be called on press. */
    onPress?: () => void;

    /**
     * Overrides for theme
     */
    theme?: Theme;
};

/**
 * A flexible component to be rendered within FlatLists
 */
export const InfoListItem: React.FC<InfoListItemProps> = (props) => {
    const {
        avatar,
        title,
        rightComponent,
        chevron,
        divider,
        subtitle,
        subtitleSeparator,
        statusColor,
        dense,
        fontColor,
        iconColor,
        backgroundColor,
        onPress,
        IconClass,
        hidePadding,
    } = props;
    const { row, fullHeight, tab, iconContainer, contentContainer, withRightPadding } = styles;

    const theme = useTheme(props.theme);

    const style = {
        backgroundColor: backgroundColor || 'transparent',
    };
    const titleStyle = {
        color: fontColor || theme.colors.text,
    };
    const fixedHeight = {
        height: dense ? 52 : 72,
    };

    const getIconColor = useCallback((): string => {
        if (iconColor) return iconColor;
        if (avatar) {
            return statusColor
                ? color(statusColor).isDark()
                    ? Colors.white[50]
                    : Colors.black[500]
                : Colors.white[50]; // default avatar is dark gray -> white text
        }
        return statusColor ? statusColor : theme.colors.text;
    }, [iconColor, avatar, statusColor]);

    const getAvatarStyle = useCallback((): Record<string, any> => {
        const avatarStyle = { ...styles.avatar };
        avatarStyle.backgroundColor = statusColor || Colors.black[500];
        return avatarStyle;
    }, [statusColor]);

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (IconClass) {
            return (
                <View style={avatar ? getAvatarStyle() : null}>
                    <IconClass size={24} color={getIconColor()} />
                </View>
            );
        }
    }, [IconClass, avatar, getAvatarStyle, getIconColor]);

    const getSubtitle = useCallback((): JSX.Element[] | null => {
        if (!subtitle) {
            return null;
        }
        const subtitleParts = Array.isArray(subtitle) ? [...subtitle] : [subtitle];
        const renderableSubtitleParts = subtitleParts
            .splice(0, MAX_SUBTITLE_ELEMENTS)
            .map((element) => renderableSubtitleComponent(element));

        return withKeys(separate(renderableSubtitleParts, subtitleSeparator));
    }, [subtitle, subtitleSeparator]);

    const getRightComponent = useCallback((): JSX.Element | undefined => {
        if (rightComponent) {
            return rightComponent;
        } else if (chevron) {
            return <Icon name="chevron-right" size={24} color={theme.colors.text} />;
        }
    }, [rightComponent, chevron, theme]);

    return (
        <View style={[fixedHeight, style]}>
            <TouchableOpacity
                onPress={onPress}
                style={[fullHeight, row, withRightPadding]}
                disabled={!onPress}
                activeOpacity={0.7}
            >
                <View style={[fullHeight, tab, { backgroundColor: statusColor }]} />
                {IconClass || !hidePadding ? <View style={iconContainer}>{getIcon()}</View> : null}
                <View style={contentContainer}>
                    <Body1 style={titleStyle} numberOfLines={1} ellipsizeMode={'tail'} font={'medium'}>
                        {title}
                    </Body1>
                    <View style={row}>{getSubtitle()}</View>
                </View>
                {getRightComponent()}
                <DividerWrapper divider={divider} />
            </TouchableOpacity>
        </View>
    );
};

type DividerProps = {
    divider?: 'full' | 'partial';
};
const DividerWrapper: React.FC<DividerProps> = (props) => {
    const { divider } = props;
    if (divider) {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: divider === 'partial' ? 72 : 0,
                    alignItems: 'stretch',
                }}
            >
                <Divider />
            </View>
        );
    }
    return null;
};
