import React, { useCallback } from 'react';
import { Animated, StyleSheet, TextInput, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import color from 'color';
import { Theme } from 'react-native-paper';
import { SIZES } from '../sizes';
import { EXTENDED_HEIGHT, REGULAR_HEIGHT, ICON_SIZE, ICON_SPACING } from './constants';
import { useSearch } from './contexts/SearchContextProvider';
import { useColor } from './contexts/ColorContextProvider';
import { useHeaderHeight } from './contexts/HeaderHeightContextProvider';

const headerContentStyles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
});

export type HeaderContentProps = {
    /** Header title */
    title: string;

    /** Optional header subtitle */
    subtitle?: string;

    /** Optional header third line of text (hidden when collapsed) */
    info?: string;

    actionCount?: number;

    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        info?: StyleProp<TextStyle>;
        search?: StyleProp<TextStyle>;
    };

    theme: Theme;
};

export const HeaderContent: React.FC<HeaderContentProps> = (props) => {
    const { title, subtitle, info, actionCount = 0, theme, styles = {} } = props;
    const { headerHeight } = useHeaderHeight();
    const { searching, searchConfig } = useSearch();
    const defaultStyles = headerContentStyles;

    let content: JSX.Element[] = [];

    if (searchConfig && searching) {
        content = [<SearchContent key={'search-content'} theme={theme} style={styles.search} />];
    } else {
        content = [
            <HeaderTitle title={title} key="title_key" theme={theme} style={styles.title} />,
            <HeaderInfo info={info} key="info_key" theme={theme} style={styles.info} />,
            <HeaderSubtitle subtitle={subtitle} key="subtitle_key" theme={theme} style={styles.subtitle} />,
        ];
    }

    const getActionPanelWidth = useCallback(() => {
        let length = actionCount;
        if (searchConfig) length++;
        if (length < 1) return 0;
        length = Math.min(3, length);
        return length * (ICON_SIZE + ICON_SPACING);
    }, [actionCount, searchConfig]);

    return (
        <Animated.View
            style={[
                defaultStyles.titleContainer,
                {
                    marginRight: headerHeight.interpolate({
                        inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                        outputRange: [getActionPanelWidth(), 0],
                    }),
                },
                styles.root,
            ]}
        >
            <View style={{ flex: 0, justifyContent: 'center', backgroundColor: 'pink' }}>{content}</View>
        </Animated.View>
    );
};

type HeaderTitleProps = {
    title: string;
    theme: Theme;
    style?: StyleProp<TextStyle>;
};
const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
    const { title, theme, style } = props;
    const { color: textColor } = useColor();
    const { headerHeight } = useHeaderHeight();

    const getTitleStyle = useCallback(
        () => ({
            color: textColor,
            lineHeight: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [SIZES.large, 30],
            }),
            fontFamily: theme.fonts.medium.fontFamily,
            fontSize: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [SIZES.large, 30],
            }),
        }),
        [textColor, headerHeight, theme]
    );

    return (
        <Animated.Text
            testID={'header-title'}
            style={[getTitleStyle(), style]}
            numberOfLines={1}
            ellipsizeMode={'tail'}
        >
            {title}
        </Animated.Text>
    );
};

type HeaderSubtitleProps = {
    subtitle?: string;
    theme: Theme;
    style?: StyleProp<TextStyle>;
};
const HeaderSubtitle: React.FC<HeaderSubtitleProps> = (props) => {
    const { subtitle, theme, style } = props;
    const { color: textColor } = useColor();

    const getSubtitleStyle = useCallback(
        () => ({
            color: textColor,
            lineHeight: 18,
            fontFamily: theme.fonts.light.fontFamily,
            fontSize: 18,
        }),
        [textColor, theme]
    );

    if (subtitle) {
        return (
            <Animated.Text
                testID={'header-subtitle'}
                style={[getSubtitleStyle(), style]}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {subtitle}
            </Animated.Text>
        );
    }
    return null;
};

type HeaderInfoProps = {
    info?: string;
    theme: Theme;
    style?: StyleProp<TextStyle>;
};
const HeaderInfo: React.FC<HeaderInfoProps> = (props) => {
    const { info, theme, style } = props;
    const { color: textColor } = useColor();
    const { headerHeight } = useHeaderHeight();

    const getInfoStyle = useCallback(
        () => ({
            color: textColor,
            lineHeight: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [0.1, SIZES.large * 1.05], // Avoid clipping top of CAP letters
            }),
            opacity: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [0, 1],
            }),
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [0.1, SIZES.large],
            }),
        }),
        [textColor, theme, headerHeight]
    );

    if (info) {
        return (
            <Animated.Text
                testID={'header-info'}
                style={[getInfoStyle(), style]}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {info}
            </Animated.Text>
        );
    }
    return null;
};

type SearchContentProps = {
    theme: Theme;
    style?: StyleProp<TextStyle>;
};
const SearchContent: React.FC<SearchContentProps> = (props) => {
    const { theme, style } = props;
    const { searchConfig = {}, onQueryChange, searchRef } = useSearch();
    const { color: textColor } = useColor();
    const placeholderTextColor = color(textColor).fade(0.4).string();

    return (
        <TextInput
            key={'search-input'}
            ref={searchRef}
            style={[
                {
                    padding: 0,
                    color: textColor,
                    fontSize: SIZES.large,
                    ...theme.fonts.light,
                },
                style,
            ]}
            autoCapitalize={searchConfig.autoCapitalize || 'none'}
            autoCorrect={searchConfig.autoCorrect || false}
            autoFocus={searchConfig.autoFocus}
            numberOfLines={1}
            onChangeText={onQueryChange}
            placeholder={searchConfig.placeholder || 'Search'}
            placeholderTextColor={placeholderTextColor}
            returnKeyType={'search'}
            selectionColor={placeholderTextColor}
            underlineColorAndroid={'transparent'}
        />
    );
};
