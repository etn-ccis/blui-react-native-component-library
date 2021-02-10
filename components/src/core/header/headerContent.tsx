import React, { useCallback, useEffect, useState } from 'react';
import {
    Animated,
    StyleSheet,
    TextInput,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
    I18nManager,
    Platform,
} from 'react-native';
import color from 'color';
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

type WritingDirection = 'ltr' | 'rtl';
type TextAlign = 'left' | 'right' | 'center' | 'auto';

type HeaderTitleProps = {
    title: string;
    theme: ReactNativePaper.Theme;
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
                outputRange: [20, 30],
            }),
            fontFamily: theme.fonts.medium.fontFamily,
            fontSize: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [20, 30],
            }),
            writingDirection: I18nManager.isRTL ? 'rtl' : ('ltr' as WritingDirection),
            textAlign: Platform.OS === 'android' ? 'left' : ('auto' as TextAlign),
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
    theme: ReactNativePaper.Theme;
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
            writingDirection: I18nManager.isRTL ? 'rtl' : ('ltr' as WritingDirection),
            textAlign: Platform.OS === 'android' ? 'left' : ('auto' as TextAlign),
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
    theme: ReactNativePaper.Theme;
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
                outputRange: [0.1, 20 * 1.05], // Avoid clipping top of CAP letters
            }),
            opacity: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [0, 1],
            }),
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [0.1, 20],
            }),
            writingDirection: I18nManager.isRTL ? 'rtl' : ('ltr' as WritingDirection),
            textAlign: Platform.OS === 'android' ? 'left' : ('auto' as TextAlign),
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
    theme: ReactNativePaper.Theme;
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
                    fontSize: 20,
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

    theme: ReactNativePaper.Theme;
};

export const HeaderContent: React.FC<HeaderContentProps> = (props) => {
    const { title, subtitle, info, actionCount = 0, theme, styles = {} } = props;
    const { headerHeight } = useHeaderHeight();
    const { searching, searchConfig } = useSearch();
    const defaultStyles = headerContentStyles;
    const [collapsed, setCollapsed] = useState(true);

    let content: JSX.Element[] = [];

    useEffect(() => {
        const listener = headerHeight.addListener(({ value }) => setCollapsed(value === REGULAR_HEIGHT));
        headerHeight.removeListener(listener);
    }, []);

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
                    marginRight:
                        searchConfig && searching
                            ? 56
                            : headerHeight.interpolate({
                                  inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                                  outputRange: [getActionPanelWidth(), 0],
                              }),
                    justifyContent: collapsed ? 'center' : 'flex-end',
                    marginTop: collapsed ? 4 : 0,
                },
                styles.root,
            ]}
        >
            <View style={{ flex: 0, justifyContent: 'center' }}>{content}</View>
        </Animated.View>
    );
};
