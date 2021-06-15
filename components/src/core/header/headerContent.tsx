import React, { useCallback } from 'react';
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
    PixelRatio,
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
    searchContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 56,
        marginTop: 0,
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
    washingtonStyle?: boolean;
};
const HeaderSubtitle: React.FC<HeaderSubtitleProps> = (props) => {
    const { subtitle, theme, style, washingtonStyle } = props;
    const { color: textColor } = useColor();

    const getSubtitleStyle = useCallback(
        () => ({
            color: textColor,
            lineHeight: washingtonStyle ? 18 : 16,
            fontFamily: washingtonStyle ? theme.fonts.light.fontFamily : theme.fonts.regular.fontFamily,
            fontSize: washingtonStyle ? 18 : 16,
            writingDirection: I18nManager.isRTL ? 'rtl' : ('ltr' as WritingDirection),
            textAlign: Platform.OS === 'android' ? 'left' : ('auto' as TextAlign),
        }),
        [textColor, theme, washingtonStyle]
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

    actionCount?: {
        avatars: number;
        icons: number;
    };

    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        info?: StyleProp<TextStyle>;
        search?: StyleProp<TextStyle>;
    };

    theme: ReactNativePaper.Theme;

    washingtonStyle?: boolean;
};

export const HeaderContent: React.FC<HeaderContentProps> = (props) => {
    const {
        title,
        subtitle,
        info,
        actionCount = { avatars: 0, icons: 0 },
        theme,
        styles = {},
        washingtonStyle,
    } = props;
    const { headerHeight } = useHeaderHeight();
    const { searching, searchConfig } = useSearch();
    const fontScale = PixelRatio.getFontScale();
    const defaultStyles = headerContentStyles;

    let content: JSX.Element[] = [];

    if (searchConfig && searching) {
        content = [<SearchContent key={'search-content'} theme={theme} style={styles.search} />];
    } else {
        content = [
            <HeaderTitle title={title} key="title_key" theme={theme} style={[styles.title]} />,
            <HeaderInfo info={info} key="info_key" theme={theme} style={[styles.info]} />,
            <HeaderSubtitle
                subtitle={subtitle}
                key="subtitle_key"
                theme={theme}
                style={[styles.subtitle]}
                washingtonStyle={washingtonStyle}
            />,
        ];
    }

    const getActionPanelWidth = useCallback(() => {
        let iconLength = actionCount.icons;
        const avatarLength = actionCount.avatars;

        if (searchConfig) iconLength++;
        if (iconLength + avatarLength < 1) return 0;
        iconLength = Math.min(3 - avatarLength, iconLength);
        return iconLength * (ICON_SIZE * fontScale + ICON_SPACING) + avatarLength * (40 * fontScale);
    }, [actionCount, searchConfig, fontScale]);

    return (
        <Animated.View
            style={[
                searching ? defaultStyles.searchContainer : defaultStyles.titleContainer,
                searching
                    ? {}
                    : {
                          marginRight: headerHeight.interpolate({
                              inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                              outputRange: [getActionPanelWidth(), 0],
                          }),
                          marginTop: subtitle && title ? 10 * fontScale : 0,
                      },
                styles.root,
            ]}
        >
            <View style={{ flex: 0, justifyContent: 'center' }}>{content}</View>
        </Animated.View>
    );
};
