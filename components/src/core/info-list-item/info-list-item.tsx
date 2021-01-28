import React, { ComponentType, useCallback } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ViewProps,
    StyleProp,
    ViewStyle,
    TextStyle,
    I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme, Divider as PaperDivider } from 'react-native-paper';
import { Body1 } from '../typography';
import * as Colors from '@pxblue/colors';
import color from 'color';
import { renderableSubtitleComponent, withKeys, separate } from './utilities';
import { $DeepPartial } from '@callstack/react-theme-provider';

type IconAlign = 'left' | 'center' | 'right';

const getIconAlignment = (iconAlign?: IconAlign): 'flex-start' | 'center' | 'flex-end' => {
    switch (iconAlign) {
        case 'right':
            return 'flex-end';
        case 'center':
            return 'center';
        case 'left':
        default:
            return 'flex-start';
    }
};

type DividerProps = {
    divider?: 'full' | 'partial';
    style?: StyleProp<ViewStyle>;
};
const Divider: React.FC<DividerProps> = (props) => {
    const { divider, style } = props;
    if (divider) {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    alignItems: 'stretch',
                }}
            >
                <PaperDivider inset={divider === 'partial'} style={style} />
            </View>
        );
    }
    return null;
};

const infoListItemStyles = (
    props: InfoListItemProps,
    theme: ReactNativePaper.Theme
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
    subtitleWrapper: ViewStyle;
    icon: ViewStyle;
    info: TextStyle;
    infoWrapper: ViewStyle;
    statusStripe: ViewStyle;
    iconWrapper: ViewStyle;
    avatar: ViewStyle;
    mainContent: ViewStyle;
    flipIcon: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            backgroundColor: props.backgroundColor || 'transparent',
            height: props.dense ? 52 : 72,
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 16,
        },
        title: {
            color: props.fontColor || theme.colors.text,
        },
        subtitleWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        subtitle: {
            color: props.fontColor || theme.colors.text,
        },
        infoWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        info: {
            color: props.fontColor || theme.colors.text,
        },
        statusStripe: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 6,
            backgroundColor: props.statusColor,
        },
        iconWrapper: {
            marginLeft: 16,
            width: 40,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.statusColor || theme.colors.text,
        },
        icon: {
            width: 40,
            justifyContent: 'center',
            backgroundColor: 'transparent',
            alignItems: getIconAlignment(props.iconAlign),
        },
        mainContent: {
            flex: 1,
            paddingHorizontal: 16,
        },
        flipIcon: {
            transform: [{ scaleX: -1 }],
        },
    });

export type InfoListItemProps = ViewProps & {
    /** Title to show */
    title: string;

    /** Subtitle. If an array, will be separated by dots. */
    subtitle?: string | React.ReactNode[];

    /** Subtitle Separator. Displays between array of subtitle items */
    subtitleSeparator?: string;

    /** Info. If an array, will be separated by dots. */
    info?: string | React.ReactNode[];

    /** Specifies whether to show color background around the icon */
    avatar?: boolean;

    /** Icon alignment when avatar prop is set to false */
    iconAlign?: IconAlign;

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

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        statusStripe?: StyleProp<ViewStyle>;
        iconWrapper?: StyleProp<ViewStyle>;
        avatar?: StyleProp<ViewStyle>;
        icon?: StyleProp<ViewStyle>;
        mainContent?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        subtitleWrapper?: StyleProp<ViewStyle>;
        info?: StyleProp<TextStyle>;
        infoWrapper?: StyleProp<ViewStyle>;
        divider?: StyleProp<ViewStyle>;
    };

    /**
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
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
        info,
        statusColor,
        dense, //eslint-disable-line @typescript-eslint/no-unused-vars
        fontColor, //eslint-disable-line @typescript-eslint/no-unused-vars
        iconAlign, //eslint-disable-line @typescript-eslint/no-unused-vars
        iconColor,
        backgroundColor, //eslint-disable-line @typescript-eslint/no-unused-vars
        onPress,
        IconClass,
        hidePadding,
        styles = {},
        theme: themeOverride,
        style,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);
    const defaultStyles = infoListItemStyles(props, theme);

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

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (IconClass) {
            return (
                <View style={avatar ? [defaultStyles.avatar, styles.avatar] : [defaultStyles.icon, styles.icon]}>
                    <IconClass size={24} color={getIconColor()} />
                </View>
            );
        }
    }, [IconClass, avatar, getIconColor]);

    const getSubtitle = useCallback((): JSX.Element[] | null => {
        if (!subtitle) {
            return null;
        }
        const subtitleParts = Array.isArray(subtitle) ? [...subtitle] : [subtitle];
        const renderableSubtitleParts = subtitleParts.map((element) =>
            renderableSubtitleComponent(element, Object.assign({}, defaultStyles.subtitle, styles.subtitle))
        );

        return withKeys(separate(renderableSubtitleParts, subtitleSeparator));
    }, [subtitle, subtitleSeparator, styles]);

    const getInfo = useCallback((): JSX.Element[] | null => {
        if (!info) {
            return null;
        }
        const infoParts = Array.isArray(info) ? [...info] : [info];
        const renderableInfoParts = infoParts.map((element) =>
            renderableSubtitleComponent(element, Object.assign({}, defaultStyles.info, styles.info))
        );

        return withKeys(separate(renderableInfoParts, subtitleSeparator));
    }, [info, subtitleSeparator, styles]);

    const getRightComponent = useCallback((): JSX.Element | undefined => {
        if (rightComponent) {
            return rightComponent;
        } else if (chevron) {
            return (
                <Icon
                    name="chevron-right"
                    size={24}
                    color={theme.colors.text}
                    style={I18nManager.isRTL ? defaultStyles.flipIcon : {}}
                />
            );
        }
    }, [rightComponent, chevron, theme]);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[defaultStyles.root, styles.root, style]}
            disabled={!onPress}
            activeOpacity={0.7}
            {...viewProps}
        >
            <View style={[defaultStyles.statusStripe, styles.statusStripe]} />
            {IconClass || !hidePadding ? (
                <View style={[defaultStyles.iconWrapper, styles.iconWrapper]}>{getIcon()}</View>
            ) : null}
            <View style={[defaultStyles.mainContent, styles.mainContent]}>
                <Body1
                    style={[defaultStyles.title, styles.title]}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    font={'medium'}
                >
                    {title}
                </Body1>
                <View style={[defaultStyles.subtitleWrapper, styles.subtitleWrapper]}>{getSubtitle()}</View>
                <View style={[defaultStyles.infoWrapper, styles.infoWrapper]}>{getInfo()}</View>
            </View>
            {getRightComponent()}
            <Divider divider={divider} style={styles.divider} />
        </TouchableOpacity>
    );
};
