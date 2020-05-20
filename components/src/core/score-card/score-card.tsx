import React, { Component, ComponentType } from 'react';
import { View, StyleSheet, ImageSourcePropType, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { black } from '@pxblue/colors';
import { ScoreCardListItem } from './list-item';
import * as Typography from '../typography';
import { withTheme, Theme } from 'react-native-paper';
import { WithTheme } from '../__types__';

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

export type HeaderIcon = {
    /** Name of the icon */
    icon: ComponentType<{ size: number; color: string }>;

    /** Callback when icon is pressed */
    onPress: () => void;
};

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

class ScoreCardClass extends Component<WithTheme<ScoreCardProps>> {
    public static ListItem = ScoreCardListItem;

    public render(): JSX.Element {
        const { children, theme, headerColor = theme.colors.primary, style } = this.props;
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
                    {this.backgroundImage()}
                    <View style={[styles.padded, styles.headerContent]}>
                        {this.headerText()}
                        {this.actionItems()}
                    </View>
                </View>
                <View style={[styles.row]}>
                    <View style={{ flex: 1, justifyContent: 'center', marginRight: this.props.badge ? 16 : 0 }}>
                        {children}
                    </View>
                    {this.heroes()}
                </View>
                {this.footer()}
            </View>
        );
    }

    private headerText(): JSX.Element {
        const { headerTitle, headerSubtitle, headerInfo } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Typography.H7
                    testID={'header_title'}
                    style={{ color: this.fontColor() }}
                    font={'medium'}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {headerTitle}
                </Typography.H7>
                {headerSubtitle ? (
                    <Typography.Subtitle
                        testID={'header_subtitle'}
                        style={{ color: this.fontColor() }}
                        font={'regular'}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {headerSubtitle}
                    </Typography.Subtitle>
                ) : null}
                {headerInfo ? (
                    <Typography.Subtitle
                        testID={'header_info'}
                        style={{ color: this.fontColor() }}
                        font={'light'}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {headerInfo}
                    </Typography.Subtitle>
                ) : null}
            </View>
        );
    }

    private heroes(): JSX.Element | undefined {
        const { badge, badgeOffset = 0 } = this.props;
        if (badge) {
            return <View style={{ flex: 0, marginTop: badgeOffset }}>{badge}</View>;
        }
    }

    private backgroundImage(): JSX.Element | undefined {
        const { headerBackgroundImage } = this.props;
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
    }

    private footer(): JSX.Element | undefined {
        const { actionRow } = this.props;

        if (actionRow) {
            return <View style={[styles.footer]}>{actionRow}</View>;
        }
    }

    private actionItems(): JSX.Element | undefined {
        const { actionItems } = this.props;

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
                            {this.icon(actionItem.icon)}
                        </TouchableOpacity>
                    ))}
                </View>
            );
        }
    }

    private icon(IconClass: ComponentType<{ size: number; color: string }>): JSX.Element | undefined {
        if (IconClass) {
            return <IconClass size={ICON_SIZE} color={this.fontColor()} />;
        }
    }

    private fontColor(): string {
        const { headerFontColor } = this.props;
        return headerFontColor || 'white';
    }
}

/**
 * ScoreCard component.
 * This component renders a "score card" with optional Hero badge,
 * title and subtitles, and actionRow at the bottom.
 */
export const ScoreCard = withTheme(ScoreCardClass);
