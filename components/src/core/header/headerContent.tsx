import React, { useCallback } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import color from 'color';
import { Theme } from 'react-native-paper';
import { SIZES } from '../sizes';
import { EXTENDED_HEIGHT, REGULAR_HEIGHT, ICON_SIZE, ICON_SPACING } from './constants';
import { useSearch } from './contexts/SearchContextProvider';
import { useColor } from './contexts/ColorContextProvider';
import { useHeaderHeight } from './contexts/HeaderHeightContextProvider';

const styles = StyleSheet.create({
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

    theme: Theme;
};

export const HeaderContent: React.FC<HeaderContentProps> = (props) => {
    const { title, subtitle, info, actionCount = 0, theme } = props;
    const { headerHeight } = useHeaderHeight();
    const { searching, searchConfig } = useSearch();

    let content: JSX.Element[] = [];

    if (searchConfig && searching) {
        content = [<SearchContent key={'search-content'} theme={theme} />];
    } else {
        content = [
            <HeaderTitle title={title} key="title_key" theme={theme} />,
            <HeaderInfo info={info} key="info_key" theme={theme} />,
            <HeaderSubtitle subtitle={subtitle} key="subtitle_key" theme={theme} />,
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
                styles.titleContainer,
                {
                    marginRight: headerHeight.interpolate({
                        inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                        outputRange: [getActionPanelWidth(), 0],
                    }),
                },
            ]}
        >
            <View style={{ flex: 0, justifyContent: 'center' }}>{content}</View>
        </Animated.View>
    );
};

type HeaderTitleProps = {
    title: string;
    theme: Theme;
};
const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
    const { title, theme } = props;
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
        <Animated.Text testID={'header-title'} style={getTitleStyle()} numberOfLines={1} ellipsizeMode={'tail'}>
            {title}
        </Animated.Text>
    );
};

type HeaderSubtitleProps = {
    subtitle?: string;
    theme: Theme;
};
const HeaderSubtitle: React.FC<HeaderSubtitleProps> = (props) => {
    const { subtitle, theme } = props;
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
                style={getSubtitleStyle()}
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
};
const HeaderInfo: React.FC<HeaderInfoProps> = (props) => {
    const { info, theme } = props;
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
            <Animated.Text testID={'header-info'} style={getInfoStyle()} numberOfLines={1} ellipsizeMode={'tail'}>
                {info}
            </Animated.Text>
        );
    }
    return null;
};

type SearchContentProps = {
    theme: Theme;
};
const SearchContent: React.FC<SearchContentProps> = (props) => {
    const { theme } = props;
    const { searchConfig = {}, onQueryChange, searchRef } = useSearch();
    const { color: textColor } = useColor();
    const placeholderTextColor = color(textColor).fade(0.4).string();

    return (
        <TextInput
            key={'search-input'}
            ref={searchRef}
            style={{
                padding: 0,
                color: textColor,
                fontSize: SIZES.large,
                ...theme.fonts.light,
            }}
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
