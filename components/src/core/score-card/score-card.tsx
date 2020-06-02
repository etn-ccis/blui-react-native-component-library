import React, { ComponentType, useCallback } from 'react';
import { View, StyleSheet, ImageSourcePropType, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { black } from '@pxblue/colors';
import * as Typography from '../typography';
import { Theme, useTheme } from 'react-native-paper';
import { HeaderIcon } from '../__types__';

const PADDING_AMOUNT = 16;
const ICON_SIZE = 24;

const styles = StyleSheet.create({
    card: {
        shadowColor: black[900],
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1,
        flex: 1,
    },
    actionItem: {
        height: 40,
        width: 40,
        padding: 8,
    },
    header: {
        height: 100,
        overflow: 'hidden',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: PADDING_AMOUNT,
    },
    footer: {
        borderTopColor: black[50],
        borderTopWidth: 1,
    },
    padded: {
        padding: PADDING_AMOUNT,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'stretch',
        padding: PADDING_AMOUNT,
    },
});

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

    /** Style configuration for the wrapper View */
    style?: StyleProp<ViewStyle>;

    /**
     * Array of actions to render in the header.
     * A maximum of two will be rendered.
     * */
    actionItems?: HeaderIcon[];

    /**
     * Overrides for theme
     */
    theme?: Theme;
};

/**
 * ScoreCard component.
 * This component renders a "score card" with optional Hero badge,
 * title and subtitles, and actionRow at the bottom.
 */
export const ScoreCard: React.FC<ScoreCardProps> = (props) => {
    const theme = useTheme(props.theme);
    const {
        actionRow,
        actionItems,
        badge,
        badgeOffset,
        children,
        headerBackgroundImage,
        headerColor = theme.colors.primary,
        headerTitle,
        headerSubtitle,
        headerInfo,
        headerFontColor,
        style,
    } = props;

    const newStyle = {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness,
    };

    return (
        <View style={[styles.card, newStyle, style]}>
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: headerColor,
                        borderTopLeftRadius: theme.roundness,
                        borderTopRightRadius: theme.roundness,
                    },
                ]}
            >
                <BackgroundImage headerBackgroundImage={headerBackgroundImage} />
                <View style={[styles.padded, styles.headerContent]}>
                    <HeaderText
                        title={headerTitle}
                        subtitle={headerSubtitle}
                        info={headerInfo}
                        color={headerFontColor}
                    />
                    <ActionPanel actionItems={actionItems} color={headerFontColor} />
                </View>
            </View>
            <View style={[styles.row]}>
                <View style={{ flex: 1, justifyContent: 'center', marginRight: badge ? 16 : 0 }}>{children}</View>
                <HeroPanel badge={badge} badgeOffset={badgeOffset} />
            </View>
            <Footer actionRow={actionRow} />
        </View>
    );
};
type BackgroundImageProps = {
    /** Background image to render when header is expanded */
    headerBackgroundImage?: ImageSourcePropType;
};
const BackgroundImage: React.FC<BackgroundImageProps> = (props) => {
    const { headerBackgroundImage } = props;
    if (headerBackgroundImage) {
        return (
            <Image
                testID={'header-background-image'}
                source={headerBackgroundImage}
                style={{
                    position: 'absolute',
                    width: '100%',
                    resizeMode: 'cover',
                    height: '100%',
                    opacity: 0.1,
                }}
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
};
const HeaderText: React.FC<HeaderTextProps> = (props) => {
    const { title, subtitle, info, color } = props;
    const textColor = color || 'white';
    return (
        <View style={{ flex: 1 }}>
            <Typography.H7
                testID={'header_title'}
                style={{ color: textColor }}
                font={'medium'}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {title}
            </Typography.H7>
            {subtitle ? (
                <Typography.Subtitle
                    testID={'header_subtitle'}
                    style={{ color: textColor }}
                    font={'regular'}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {subtitle}
                </Typography.Subtitle>
            ) : null}
            {info ? (
                <Typography.Subtitle
                    testID={'header_info'}
                    style={{ color: textColor }}
                    font={'light'}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {info}
                </Typography.Subtitle>
            ) : null}
        </View>
    );
};

type FooterProps = {
    actionRow?: JSX.Element;
};
const Footer: React.FC<FooterProps> = (props) => {
    const { actionRow } = props;
    if (actionRow) {
        return <View style={[styles.footer]}>{actionRow}</View>;
    }
    return null;
};

type HeroPanelProps = {
    badge?: JSX.Element;
    badgeOffset?: number;
};
const HeroPanel: React.FC<HeroPanelProps> = (props) => {
    const { badge, badgeOffset = 0 } = props;
    if (badge) {
        return <View style={{ flex: 0, marginTop: badgeOffset }}>{badge}</View>;
    }
    return null;
};

type ActionPanelProps = {
    actionItems?: HeaderIcon[];
    color?: string;
};
const ActionPanel: React.FC<ActionPanelProps> = (props) => {
    const { actionItems, color = 'white' } = props;

    /* eslint-disable @typescript-eslint/naming-convention */
    const getIcon = useCallback((IconClass: ComponentType<{ size: number; color: string }>):
        | JSX.Element
        | undefined => {
        if (IconClass) {
            return <IconClass size={ICON_SIZE} color={color} />;
        }
    }, []);

    if (actionItems) {
        return (
            <View style={{ flexDirection: 'row', margin: -8 }}>
                {actionItems.slice(0, 2).map((actionItem, index) => (
                    <TouchableOpacity
                        key={`${index}`}
                        testID={`action-item${index}`}
                        onPress={actionItem.onPress}
                        style={styles.actionItem}
                    >
                        {getIcon(actionItem.icon)}
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
    return null;
};
