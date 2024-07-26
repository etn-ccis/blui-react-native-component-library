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
} from 'react-native';
import MatCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider as PaperDivider, Text } from 'react-native-paper';
import { renderableSubtitleComponent, renderableInfoComponent, withKeys, separate } from './utilities';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../Icon';
import { IconSource } from '../__types__';
import { useFontScale, useFontScaleSettings } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { fontStyleSemiBold } from '../Utility/shared';

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
    fontScale?: number;
};
/**
 * Divider component
 *
 * A utility component for rendering a horizontal rule. This is a wrapper around the
 * react-native-paper Divider component that gives us the ability to do a partial or
 * full width divider.
 */

const Divider: React.FC<DividerProps> = (props) => {
    const { divider, fontScale = 1 } = props;
    if (divider) {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: I18nManager.isRTL ? (divider === 'full' ? 0 : 72 * fontScale) : 0,
                    left: !I18nManager.isRTL ? (divider === 'full' ? 0 : 72 * fontScale) : 0,
                    alignItems: 'stretch',
                }}
            >
                <PaperDivider />
            </View>
        );
    }
    return null;
};

const infoListItemStyles = (
    props: InfoListItemProps,
    theme: ExtendedTheme,
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
}> => {
    const isWrapEnabled = props.wrapSubtitle || props.wrapTitle || props.wrapInfo;
    return StyleSheet.create({
        root: {
            backgroundColor: props.backgroundColor || 'transparent',
            minHeight: isWrapEnabled ? (props.dense ? 56 : 72) * fontScale : 'auto',
            height: !isWrapEnabled ? (props.dense ? 56 : 72) * fontScale : 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
        },
        title: {
            color: props.fontColor || theme.colors.onSurface,
            ...fontStyleSemiBold,
        },
        subtitleWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
        },
        subtitle: {
            color: props.fontColor || theme.colors.onSurfaceVariant,
        },
        infoWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        info: {
            color: props.fontColor || theme.colors.onSurfaceVariant,
        },
        statusStripe: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 6,
            backgroundColor: props.statusColor,
        },
        iconWrapper: {
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
            backgroundColor: props.statusColor || theme.colors.neutralFilledContainer,
        },
        icon: {
            width: 40 * fontScale,
            height: 40 * fontScale,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: getIconAlignment(props.iconAlign),
        },
        mainContent: {
            flex: 1,
            paddingHorizontal: props.hidePadding ? 0 : 16,
        },
        flipIcon: {
            transform: [{ scaleX: -1 }],
        },
    });
};

export type InfoListItemProps = ViewProps & {
    /**
     * Show a colored background behind the icon
     *
     * @default: false
     */
    avatar?: boolean;

    /** The color used for the background of the InfoListItem
     *
     * @default: 'transparent'
     */
    backgroundColor?: string;

    /**
     * Add a chevron icon on the right
     *
     * @default: false
     */
    chevron?: boolean;

    /**
     * The color used for chevron icon
     *
     * @default: theme.colors.onSurfaceVariant
     */
    chevronColor?: string;

    /**
     * Smaller height rows with less padding
     *
     * @default: false
     */
    dense?: boolean;

    /**
     * Show a dividing line below the row
     * - partial: aligns with the main text keyline of the row
     * - full: spans the full width of the row
     *
     * @default: none
     */
    divider?: 'full' | 'partial';

    /**
     * Color to use for text elements
     *
     * @default: Title: theme.colors.onSurface
     * Subtitle, Info: theme.colors.onSurfaceVariant
     */
    fontColor?: string;

    /**
     * Hide the padding reserved for icons when there is no icon. If this is set to false, the text for the InfoListItem will align
     * together even if there is a mix of items with icons and items without. If this is set to true, the extra padding
     * for items without icons is removed and the text will align with the icon of other rows.
     *
     * @default: false
     */
    hidePadding?: boolean;

    /**
     * Icon alignment when avatar prop is set to false
     *
     * @default: 'left'
     */
    iconAlign?: IconAlign;

    /** A component to render for the icon */
    icon?: IconSource;

    /** Color to use for the icon
     * @default: theme.colors.onSurfaceVariant
     * With Avatar: theme.colors.onNeutralFilledContainer
     */
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

    /** Color to use indicating status. This will apply to the status stripe and icon
     *
     * @default: theme.colors.onSurfaceVariant
     */
    statusColor?: string;

    /**
     * Separator character used between subtitle or info elements when an array is passed.
     *
     * @default: '·'
     */
    subtitleSeparator?: string;

    /** The text to show on the second line.
     *
     * If an array is supplied, array items will be separated by the `subtitleSeparator`.
     * */
    subtitle?: string | React.ReactNode[];

    /** The text to show on the first line */
    title: string;

    /** Whether the info line text should wrap to multiple lines on overflow
     *
     * @default: false
     */
    wrapInfo?: boolean;

    /** Whether the subtitle line text should wrap to multiple lines on overflow
     *
     * @default: false
     */
    wrapSubtitle?: boolean;

    /** Whether the title line text should wrap to multiple lines on overflow
     *
     * @default: false
     */
    wrapTitle?: boolean;

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
    theme?: $DeepPartial<ExtendedTheme>;
};

/**
 * [InfoListItem](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--info-list-item) component
 *
 * The InfoListItem is a component used to render lists. It extends the basic implementation
 * of a list item with additional features, such as icons and status stripes and supplies all of
 * the correct Brightlayer UI styles.
 */
export const InfoListItem: React.FC<InfoListItemProps> = (props) => {
    const { theme: themeOverride, ...otherProps } = props;
    const theme = useExtendedTheme(themeOverride);
    const fontScale = useFontScale();
    const { disableScaling, maxScale } = useFontScaleSettings();
    const defaultStyles = infoListItemStyles(props, theme, fontScale);

    const {
        avatar,
        title,
        wrapTitle,
        leftComponent,
        rightComponent,
        chevron,
        chevronColor = theme.colors.onSurfaceVariant,
        divider,
        subtitle,
        wrapSubtitle,
        subtitleSeparator,
        info,
        wrapInfo,
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
        style,
        ...viewProps
    } = otherProps;

    const getIconColor = useCallback((): string => {
        if (iconColor) return iconColor;
        if (avatar) {
            return theme.colors.onNeutralFilledContainer;
        }
        return statusColor ? statusColor : theme.colors.onSurfaceVariant;
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
            renderableSubtitleComponent(
                element,
                Object.assign({}, defaultStyles.subtitle, styles.subtitle),
                wrapSubtitle
            )
        );

        return withKeys(separate(renderableSubtitleParts, subtitleSeparator));
    }, [subtitle, subtitleSeparator, styles]);

    const getInfo = useCallback((): JSX.Element[] | null => {
        if (!info) {
            return null;
        }
        const infoParts = Array.isArray(info) ? [...info] : [info];
        const renderableInfoParts = infoParts.map((element) =>
            renderableInfoComponent(element, Object.assign({}, defaultStyles.info, styles.info), wrapInfo)
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
                        color={chevronColor}
                        allowFontScaling={!disableScaling}
                        maxFontSizeMultiplier={maxScale}
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
                <Text
                    variant={'titleMedium'}
                    style={[defaultStyles.title, styles.title]}
                    numberOfLines={wrapTitle ? 0 : 1}
                    ellipsizeMode={'tail'}
                >
                    {title}
                </Text>
                <View style={[defaultStyles.subtitleWrapper, styles.subtitleWrapper]}>{getSubtitle()}</View>
                <View style={[defaultStyles.infoWrapper, styles.infoWrapper]}>{getInfo()}</View>
            </View>
            {getRightComponent()}
            <Divider divider={divider} fontScale={fontScale} />
        </TouchableOpacity>
    );
};
