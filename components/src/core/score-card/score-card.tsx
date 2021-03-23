import React, { ComponentType, useCallback } from 'react';
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
    PixelRatio,
} from 'react-native';
import * as Typography from '../typography';
import { useTheme, Card, Divider } from 'react-native-paper';
import { HeaderIcon } from '../__types__';
import { $DeepPartial } from '@callstack/react-theme-provider';

// const PADDING_AMOUNT = 16;
// const ICON_SIZE = 24;

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
    /** Background image to render when header is expanded */
    headerBackgroundImage?: ImageSourcePropType;

    /** Style overrides for the Image component */
    style?: StyleProp<ImageStyle>;
};
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
    title: string;
    subtitle?: string;
    info?: string;
    color?: string;
    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        info?: StyleProp<TextStyle>;
    };
};
const HeaderText: React.FC<HeaderTextProps> = (props) => {
    const { title, subtitle, info, color, styles = {} } = props;
    const textColor = color || 'white';
    return (
        <View style={[{ flex: 1 }, styles.root]}>
            <Typography.H6
                testID={'header_title'}
                style={[{ color: textColor }, styles.title]}
                font={'medium'}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {title}
            </Typography.H6>
            {subtitle ? (
                <Typography.Subtitle2
                    testID={'header_subtitle'}
                    style={[{ color: textColor }, styles.subtitle]}
                    font={'regular'}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {subtitle}
                </Typography.Subtitle2>
            ) : null}
            {info ? (
                <Typography.Subtitle2
                    testID={'header_info'}
                    style={[{ color: textColor }, styles.info]}
                    font={'light'}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {info}
                </Typography.Subtitle2>
            ) : null}
        </View>
    );
};

type FooterProps = {
    actionRow?: JSX.Element;
    style?: StyleProp<ViewStyle>;
};
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
    badge?: JSX.Element;
    badgeOffset?: number;
    style?: StyleProp<ViewStyle>;
};
const HeroPanel: React.FC<HeroPanelProps> = (props) => {
    const { badge, badgeOffset = 0, style } = props;
    if (badge) {
        return <View style={[{ flex: 0, marginTop: badgeOffset }, style]}>{badge}</View>;
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
    actionItems?: HeaderIcon[];
    color?: string;
    styles?: {
        root?: StyleProp<ViewStyle>;
        actionItem?: StyleProp<ViewStyle>;
    };
};
const ActionPanel: React.FC<ActionPanelProps> = (props) => {
    const { actionItems, color = 'white', styles = {} } = props;
    const fontScale = PixelRatio.getFontScale();
    const defaultStyles = actionPanelStyles(fontScale);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const getIcon = useCallback((IconClass: ComponentType<{ size: number; color: string }>):
        | JSX.Element
        | undefined => {
        if (IconClass) {
            return <IconClass size={24} color={color} />;
        }
    }, []);

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
    theme: ReactNativePaper.Theme,
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
        },
        header: {
            height: 100 * fontScale,
            overflow: 'hidden',
            backgroundColor: props.headerColor || theme.colors.primary,
            borderTopLeftRadius: theme.roundness,
            borderTopRightRadius: theme.roundness,
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

// TODO Extend the Card Props once RNP fixes their type definitions in 4.0.0
// export type ScoreCardProps = React.ComponentProps<typeof Card> & {
export type ScoreCardProps = {
    /** Background color of header */
    headerColor?: string;

    /** Primary text to show in header */
    headerTitle: string;

    /** Second line of text to show in header */
    headerSubtitle?: string;

    /** Third line of text to show in header */
    headerInfo?: string;

    /** Color to use for header text and icons */
    headerFontColor?: string;

    /** Hero component to render on the right side of the card */
    badge?: JSX.Element;

    /** Offset to shift the badges up or down */
    badgeOffset?: number;

    /** Action item to show at bottom of card */
    actionRow?: JSX.Element;

    /** Background image to render when header is expanded */
    headerBackgroundImage?: ImageSourcePropType;

    // TODO remove this when we extend from the Card Props
    /** Styles for the root component */
    style?: StyleProp<ViewStyle>;

    /** Style Overrides */
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
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;

    /**
     * Array of actions to render in the header.
     * A maximum of two will be rendered.
     * */
    actionItems?: HeaderIcon[];
};

/**
 * ScoreCard component.
 * This component renders a "score card" with optional Hero badge,
 * title and subtitles, and actionRow at the bottom.
 */
export const ScoreCard: React.FC<ScoreCardProps> = (props) => {
    const { theme: themeOverride, ...otherProps } = props;
    const theme = useTheme(themeOverride);
    const {
        actionRow,
        actionItems,
        badge,
        badgeOffset,
        children,
        headerBackgroundImage,
        headerColor, // eslint-disable-line @typescript-eslint/no-unused-vars
        headerTitle,
        headerSubtitle,
        headerInfo,
        headerFontColor,
        styles = {},
        style,
        ...cardProps
    } = otherProps;
    const fontScale = PixelRatio.getFontScale();
    const defaultStyles = scoreCardStyles(theme, props, fontScale);

    return (
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
                        color={headerFontColor}
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
