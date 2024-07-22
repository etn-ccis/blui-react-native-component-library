import React, { ReactNode, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ImageSourcePropType,
    Image,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    ImageStyle,
    TextStyle,
} from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { HeaderIcon, IconSource } from '../__types__';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../Icon';
import { useFontScale } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

const backgroundImageStyles = StyleSheet.create({
    root: {
        position: 'absolute',
        width: '100%',
        resizeMode: 'cover',
        height: '100%',
        opacity: 0.1,
    },
});
type BackgroundImageProps = {
    /** Background image to blend with the background color */
    headerBackgroundImage?: ImageSourcePropType;

    /** Style overrides for the Image component */
    style?: StyleProp<ImageStyle>;
};

/**
 * BackgroundImage component
 *
 * This is a utility sub-component used to organize content in the ScoreCard. It
 * is responsible for laying out and styling the optional background image.
 */
const BackgroundImage: React.FC<BackgroundImageProps> = (props) => {
    const { headerBackgroundImage, style } = props;
    const defaultStyles = backgroundImageStyles;

    if (headerBackgroundImage) {
        return (
            <Image
                testID={'header-background-image'}
                source={headerBackgroundImage}
                style={[defaultStyles.root, style]}
            />
        );
    }
    return null;
};

type HeaderTextProps = {
    /** Text to display on the first line */
    title: string;
    /** Text to display on the second line */
    subtitle?: string;
    /** Text to display on the third line */
    info?: string;
    /** Color to use for the text elements */
    color?: string;
    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        info?: StyleProp<TextStyle>;
    };
};

/**
 * HeaderText component
 *
 * This is a utility sub-component used to organize content in the ScoreCard. It
 * is responsible for laying out and styling the text elements in the header.
 */
const HeaderText: React.FC<HeaderTextProps> = (props) => {
    const { title, subtitle, info, color, styles = {} } = props;
    const textColor = color || 'white';
    return (
        <View style={[{ flex: 1 }, styles.root]}>
            <Text
                testID={'header_title'}
                style={[{ color: textColor }, styles.title]}
                variant="titleLarge"
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {title}
            </Text>
            {subtitle ? (
                <Text
                    testID={'header_subtitle'}
                    style={[{ color: textColor }, styles.subtitle]}
                    variant="bodyMedium"
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {subtitle}
                </Text>
            ) : null}
            {info ? (
                <Text
                    testID={'header_info'}
                    style={[{ color: textColor }, styles.info]}
                    variant="bodySmall"
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {info}
                </Text>
            ) : null}
        </View>
    );
};

type FooterProps = {
    /** Content to render in the action row */
    actionRow?: JSX.Element;
    /** Style overrides for the View component */
    style?: StyleProp<ViewStyle>;
};

/**
 * Footer component
 *
 * This is a utility sub-component used to organize content in the ScoreCard. It
 * is responsible for laying out and styling the action row / footer.
 */
const Footer: React.FC<FooterProps> = (props) => {
    const { actionRow, style } = props;
    if (actionRow) {
        return (
            <>
                <Divider />
                <View style={[style]}>{actionRow}</View>
            </>
        );
    }
    return null;
};

type HeroPanelProps = {
    /** Content to render in the badge */
    badge?: JSX.Element;
    /** Offset to use for positioning the badge vertically */
    badgeOffset?: number;
    /** Style overrides for the View component */
    style?: StyleProp<ViewStyle>;
};
/**
 * HeroPanel component
 *
 * This is a utility sub-component used to organize content in the ScoreCard. It
 * is responsible for laying out and styling the badge content (typically a Hero or Heroes).
 */
const HeroPanel: React.FC<HeroPanelProps> = (props) => {
    const { badge, badgeOffset = 0, style } = props;
    if (badge) {
        return <View style={[{ flex: 0, flexBasis: 'auto', marginTop: badgeOffset }, style]}>{badge}</View>;
    }
    return null;
};

const actionPanelStyles = (
    fontScale: number
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    actionItem: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            flexDirection: 'row',
            margin: -8 * fontScale,
        },
        actionItem: {
            // vertical padding scales with fontSize, horizontal padding is fixed
            height: 40 * fontScale,
            width: 24 * fontScale + 16,
            paddingHorizontal: 8,
            paddingVertical: 8 * fontScale,
        },
    });
type ActionPanelProps = {
    /** Array of icons to render in the action panel */
    actionItems?: HeaderIcon[];
    /** Color to use for the icons */
    color?: string;
    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        actionItem?: StyleProp<ViewStyle>;
    };
};

/**
 * ActionPanel component
 *
 * This is a utility sub-component used to organize content in the ScoreCard. It
 * is responsible for laying out and styling the action item icons.
 */
const ActionPanel: React.FC<ActionPanelProps> = (props) => {
    const { actionItems, color = 'white', styles = {} } = props;
    const fontScale = useFontScale();
    const defaultStyles = actionPanelStyles(fontScale);

    const getIcon = useCallback(
        // eslint-disable-next-line @typescript-eslint/naming-convention
        (icon: IconSource): JSX.Element | undefined => {
            if (icon) {
                return <Icon source={icon} size={24} color={color} />;
            }
        },
        [color]
    );

    if (actionItems) {
        return (
            <View style={[defaultStyles.root, styles.root]}>
                {actionItems.slice(0, 6).map((actionItem, index) => (
                    <TouchableOpacity
                        key={`${index}`}
                        testID={`action-item${index}`}
                        onPress={actionItem.onPress}
                        style={[defaultStyles.actionItem, styles.actionItem]}
                    >
                        {getIcon(actionItem.icon)}
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
    return null;
};

const scoreCardStyles = (
    theme: ExtendedTheme,
    props: ScoreCardProps,
    fontScale: number
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    header: ViewStyle;
    headerContent: ViewStyle;
    padded: ViewStyle;
    body: ViewStyle;
    leftContent: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: theme.colors.surface,
        },
        header: {
            height: 112 * fontScale,
            overflow: 'hidden',
            backgroundColor: props.headerColor || theme.colors.primaryContainer,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        },
        headerContent: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: 16,
        },

        padded: {
            padding: 16,
        },
        body: {
            flexDirection: 'row',
            alignItems: 'stretch',
            padding: 16,
        },
        leftContent: {
            flex: 1,
            justifyContent: 'center',
            marginRight: props.badge ? 16 : 0,
        },
    });

export type ScoreCardProps = Omit<React.ComponentProps<typeof Card>, 'children' | 'theme'> & {
    /**
     * Array of icons to render to the right of the header text.
     * A maximum of six will be rendered.
     */
    actionItems?: HeaderIcon[];

    /** Component to render for the card footer */
    actionRow?: JSX.Element;

    /**  The color of the action icon
     *
     * @default: theme.colors.onSurfaceVariant
     */
    actionIconColor?: string;

    /** Component to render in the call-out area on the right side of the card body.
     * This is usually a single `Hero` or `HeroBanner`containing multiple Heroes.
     */
    badge?: JSX.Element;

    /** Vertical offset for the badge component to move it up and down */
    badgeOffset?: number;

    /** Background image to blend with the header color */
    headerBackgroundImage?: ImageSourcePropType;

    /** Background color of the header
     *
     *  @default: theme.colors.primaryContainer
     */
    headerColor?: string;

    /** The color for text in the header
     * @default: theme.colors.onPrimaryContainer
     */
    headerFontColor?: string;

    /** Third line of text to show in header */
    headerInfo?: string;

    /** Second line of text to show in header */
    headerSubtitle?: string;

    /** First line of text to show in the header */
    headerTitle: string;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        header?: StyleProp<ViewStyle>;
        backgroundImage?: StyleProp<ImageStyle>;
        headerContent?: StyleProp<ViewStyle>;
        headerText?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        info?: StyleProp<TextStyle>;
        headerActions?: StyleProp<ViewStyle>;
        headerActionItem?: StyleProp<ViewStyle>;
        body?: StyleProp<ViewStyle>;
        leftContent?: StyleProp<ViewStyle>;
        actionRow?: StyleProp<ViewStyle>;
        badge?: StyleProp<ViewStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

/**
 * [ScoreCard](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--score-card) component
 *
 * This component renders a "score card" which is typically used in dashboard
 * displays to show the status of individual items along with some details.
 * The header is configurable with various text elements and icon actions and the
 * main body is fully customizable. You can use the `badge` prop to supply elements
 * that can span between the header and the body, such as a [Hero](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--hero) with a grade icon.
 */
export const ScoreCard: React.FC<ScoreCardProps & { children?: ReactNode }> = (props) => {
    const { theme: themeOverride, ...otherProps } = props;
    const theme = useExtendedTheme(themeOverride);
    const {
        actionRow,
        actionItems,
        actionIconColor = theme.colors.onSurfaceVariant,
        badge,
        badgeOffset,
        children,
        headerBackgroundImage,
        headerColor, // eslint-disable-line @typescript-eslint/no-unused-vars
        headerTitle,
        headerSubtitle,
        headerInfo,
        headerFontColor = theme.colors.onPrimaryContainer,
        styles = {},
        style,
        ...cardProps
    } = otherProps;
    const fontScale = useFontScale();
    const defaultStyles = scoreCardStyles(theme, props, fontScale);

    return (
        // @ts-ignore bad types from RNP
        <Card elevation={1} style={[defaultStyles.root, styles.root, style]} {...cardProps}>
            <View style={[defaultStyles.header, styles.header]}>
                <BackgroundImage headerBackgroundImage={headerBackgroundImage} style={styles.backgroundImage} />
                <View style={[defaultStyles.padded, defaultStyles.headerContent, styles.headerContent]}>
                    <HeaderText
                        title={headerTitle}
                        subtitle={headerSubtitle}
                        info={headerInfo}
                        color={headerFontColor}
                        styles={{
                            root: styles.headerText,
                            title: styles.title,
                            subtitle: styles.subtitle,
                            info: styles.info,
                        }}
                    />
                    <ActionPanel
                        actionItems={actionItems}
                        color={actionIconColor}
                        styles={{
                            root: styles.headerActions,
                            actionItem: styles.headerActionItem,
                        }}
                    />
                </View>
            </View>
            <View style={[defaultStyles.body, styles.body]}>
                <View style={[defaultStyles.leftContent, styles.leftContent]}>{children}</View>
                <HeroPanel badge={badge} badgeOffset={badgeOffset} style={styles.badge} />
            </View>
            <Footer actionRow={actionRow} style={styles.actionRow} />
        </Card>
    );
};
