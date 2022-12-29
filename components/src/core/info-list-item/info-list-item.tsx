import React, { useCallback } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ViewProps,
    StyleProp,
    ViewStyle,
    TextStyle,
    I18nManager,
    PixelRatio,
} from 'react-native';
import MatCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme, Divider as PaperDivider } from 'react-native-paper';
import { Subtitle1 } from '../typography';
import * as Colors from '@brightlayer-ui/colors';
import color from 'color';
import { renderableSubtitleComponent, withKeys, separate } from './utilities';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../icon';
import { IconSource } from '../__types__';
import { useFontScale } from '..';

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
    /** The width of the divider
     * - partial: inset divider
     * - full: full-width of parent container
     */
    divider?: 'full' | 'partial';
    style?: StyleProp<ViewStyle>;
};
/**
 * Divider component
 *
 * A utility component for rendering a horizontal rule. This is a wrapper around the
 * react-native-paper Divider component that gives us the ability to do a partial or
 * full width divider.
 */
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
    theme: ReactNativePaper.Theme,
    fontScale: number
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
            minHeight: (props.dense ? 52 : 72) * fontScale,
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
            overflow: 'hidden',
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
            width: 40 * fontScale,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        avatar: {
            width: 40 * fontScale,
            height: 40 * fontScale,
            borderRadius: 20 * fontScale,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.statusColor || theme.colors.text,
        },
        icon: {
            width: 40 * fontScale,
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
    /**
     * Show a colored background behind the icon
     *
     * Default: false
     */
    avatar?: boolean;

    /** The color used for the background of the InfoListItem */
    backgroundColor?: string;

    /**
     * Add a chevron icon on the right
     *
     * Default: false
     */
    chevron?: boolean;

    /**
     * Smaller height rows with less padding
     *
     * Default: false
     */
    dense?: boolean;

    /**
     * Show a dividing line below the row
     * - partial: aligns with the main text keyline of the row
     * - full: spans the full width of the row
     *
     * Default: none
     */
    divider?: 'full' | 'partial';

    /**
     * Color to use for text elements
     *
     * Default: Theme.colors.text
     */
    fontColor?: string;

    /**
     * Hide the padding reserved for icons when there is no icon. If this is set to false, the text for the InfoListItem will align
     * together even if there is a mix of items with icons and items without. If this is set to true, the extra padding
     * for items without icons is removed and the text will align with the icon of other rows.
     *
     * Default: false
     */
    hidePadding?: boolean;

    /**
     * Icon alignment when avatar prop is set to false
     *
     * Default: 'left'
     */
    iconAlign?: IconAlign;

    /** A component to render for the icon */
    icon?: IconSource;

    /** Color to use for the icon */
    iconColor?: string;

    /** The text to show on the third line.
     *
     * If an array is supplied, array items will be separated by the `subtitleSeparator`.
     * */
    info?: string | React.ReactNode[];

    /** Custom content to render between the icon and the text elements */
    leftComponent?: JSX.Element;

    /** Callback function to execute when the list item is pressed. */
    onPress?: () => void;

    /** Custom content to render to the right of the text elements */
    rightComponent?: JSX.Element;

    /** Color to use indicating status. This will apply to the status stripe and icon */
    statusColor?: string;

    /**
     * Separator character used between subtitle or info elements when an array is passed.
     *
     * Default: '·'
     */
    subtitleSeparator?: string;

    /** The text to show on the second line.
     *
     * If an array is supplied, array items will be separated by the `subtitleSeparator`.
     * */
    subtitle?: string | React.ReactNode[];

    /** The text to show on the first line */
    title: string;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
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
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * [InfoListItem](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--info-list-item) component
 *
 * The InfoListItem is a component used to render lists. It extends the basic implementation
 * of a list item with additional features, such as icons and status stripes and supplies all of
 * the correct Brightlayer UI styles.
 */
export const InfoListItem: React.FC<InfoListItemProps> = (props) => {
    const {
        avatar,
        title,
        leftComponent,
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
        icon,
        hidePadding,
        styles = {},
        theme: themeOverride,
        style,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);
    const { maxScale, disableScaling } = useFontScale();
    const fontScale = !disableScaling
        ? PixelRatio.getFontScale() < maxScale
            ? PixelRatio.getFontScale()
            : maxScale
        : 1;
    const defaultStyles = infoListItemStyles(props, theme, fontScale);

    const getIconColor = useCallback((): string => {
        if (iconColor) return iconColor;
        if (avatar) {
            return statusColor
                ? color(statusColor).isDark()
                    ? Colors.white[50]
                    : Colors.black[500]
                : Colors.white[50]; // default avatar is dark gray -> white text
        }
        return statusColor ? statusColor : theme.colors.textPalette?.secondary || theme.colors.text;
    }, [iconColor, avatar, statusColor, theme]);

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (icon) {
            return (
                <View style={avatar ? [defaultStyles.avatar, styles.avatar] : [defaultStyles.icon, styles.icon]}>
                    <Icon source={icon} size={24} color={getIconColor()} />
                </View>
            );
        }
    }, [icon, avatar, getIconColor, defaultStyles, styles]);

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

    const getRightComponent = useCallback(
        (): JSX.Element | undefined => (
            <>
                {rightComponent && rightComponent}
                {chevron && (
                    <MatCommunityIcon
                        name="chevron-right"
                        size={24}
                        color={theme.colors.text}
                        allowFontScaling
                        style={I18nManager.isRTL ? defaultStyles.flipIcon : {}}
                    />
                )}
            </>
        ),
        [rightComponent, chevron, theme]
    );

    return (
        <TouchableOpacity
            accessible={true}
            testID={`list-item-${title.replace(/\s+/g, '-').toLowerCase()}`}
            accessibilityLabel={`list-item-${title.replace(/\s+/g, '-').toLowerCase()}`}
            onPress={onPress}
            style={[defaultStyles.root, styles.root, style]}
            disabled={!onPress}
            activeOpacity={0.7}
            {...viewProps}
        >
            <View style={[defaultStyles.statusStripe, styles.statusStripe]} />
            {icon || !hidePadding ? (
                <View style={[defaultStyles.iconWrapper, styles.iconWrapper]}>{getIcon()}</View>
            ) : null}
            {leftComponent}
            <View style={[defaultStyles.mainContent, styles.mainContent]}>
                <Subtitle1 style={[defaultStyles.title, styles.title]} numberOfLines={1} ellipsizeMode={'tail'}>
                    {title}
                </Subtitle1>
                <View style={[defaultStyles.subtitleWrapper, styles.subtitleWrapper]}>{getSubtitle()}</View>
                <View style={[defaultStyles.infoWrapper, styles.infoWrapper]}>{getInfo()}</View>
            </View>
            {getRightComponent()}
            <Divider divider={divider} style={styles.divider} />
        </TouchableOpacity>
    );
};
