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
import { ICON_SIZE, ICON_SPACING } from './constants';
import { useSearch } from './contexts/SearchContextProvider';
import { useColor } from './contexts/ColorContextProvider';
import { useHeaderHeight } from './contexts/HeaderHeightContextProvider';
import { useHeaderDimensions } from '../hooks/useHeaderDimensions';

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
    /** The content to render for the title */
    title: React.ReactNode;

    /**
     * Theme value overrides specific to this component.
     */
    theme: ReactNativePaper.Theme;

    /** Style to apply to the Text element */
    style?: StyleProp<TextStyle>;
};

/**
 * HeaderTitle component
 *
 * The HeaderTitle is a helper component for organizing the contents in the Header. It is
 * used for displaying and resizing the title text.
 */
const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
    const { title, theme, style } = props;
    const { color: textColor } = useColor();
    const { headerHeight } = useHeaderHeight();
    const { REGULAR_HEIGHT, EXTENDED_HEIGHT } = useHeaderDimensions();

    const getTitleStyle = useCallback(
        () => ({
            color: textColor,
            fontFamily: theme.fonts.medium.fontFamily,
            fontSize: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [20, 30],
                extrapolate: 'clamp',
            }),
            writingDirection: I18nManager.isRTL ? 'rtl' : ('ltr' as WritingDirection),
            textAlign: Platform.OS === 'android' ? 'left' : ('auto' as TextAlign),
        }),
        [textColor, headerHeight, theme, REGULAR_HEIGHT, EXTENDED_HEIGHT]
    );

    return typeof title === 'string' ? (
        <Animated.Text
            testID={'header-title'}
            style={[getTitleStyle(), style]}
            numberOfLines={1}
            ellipsizeMode={'tail'}
        >
            {title}
        </Animated.Text>
    ) : (
        <>{title}</>
    );
};

type HeaderSubtitleProps = {
    /** The content to render for the subtitle */
    subtitle?: React.ReactNode;

    /**
     * Theme value overrides specific to this component.
     */
    theme: ReactNativePaper.Theme;

    /** Style to apply to the Text element */
    style?: StyleProp<TextStyle>;

    /**
     * @experimental
     *
     * Set to true to use the alternative subtitle styling (larger size, light weight)
     */
    washingtonStyle?: boolean;
};
/**
 * HeaderSubtitle component
 *
 * The HeaderSubtitle is a helper component for organizing the contents in the Header. It is
 * used for displaying and resizing the subtitle text.
 */
const HeaderSubtitle: React.FC<HeaderSubtitleProps> = (props) => {
    const { subtitle, theme, style, washingtonStyle } = props;
    const { color: textColor } = useColor();

    const getSubtitleStyle = useCallback(
        () => ({
            color: textColor,
            fontFamily: washingtonStyle ? theme.fonts.light.fontFamily : theme.fonts.regular.fontFamily,
            fontSize: washingtonStyle ? 18 : 16,
            writingDirection: I18nManager.isRTL ? 'rtl' : ('ltr' as WritingDirection),
            textAlign: Platform.OS === 'android' ? 'left' : ('auto' as TextAlign),
        }),
        [textColor, theme, washingtonStyle]
    );

    if (subtitle) {
        return typeof subtitle === 'string' ? (
            <Animated.Text
                testID={'header-subtitle'}
                style={[getSubtitleStyle(), style]}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {subtitle}
            </Animated.Text>
        ) : (
            <>{subtitle}</>
        );
    }
    return null;
};

type HeaderInfoProps = {
    /** The content to render for the info */
    info?: React.ReactNode;

    /**
     * Theme value overrides specific to this component.
     */
    theme: ReactNativePaper.Theme;

    /** Style to apply to the Text element */
    style?: StyleProp<TextStyle>;
};
/**
 * HeaderInfo component
 *
 * The HeaderInfo is a helper component for organizing the contents in the Header. It is
 * used for displaying and resizing the info text.
 */
const HeaderInfo: React.FC<HeaderInfoProps> = (props) => {
    const { info, theme, style } = props;
    const { color: textColor } = useColor();
    const { headerHeight } = useHeaderHeight();
    const fontScale = PixelRatio.getFontScale();
    const { REGULAR_HEIGHT, EXTENDED_HEIGHT } = useHeaderDimensions();

    const getInfoStyle = useCallback(
        () => ({
            color: textColor,
            marginTop: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [-2 * fontScale, 0],
                extrapolate: 'clamp',
            }),
            opacity: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            }),
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [0.1, 20],
                extrapolate: 'clamp',
            }),
            writingDirection: I18nManager.isRTL ? 'rtl' : ('ltr' as WritingDirection),
            textAlign: Platform.OS === 'android' ? 'left' : ('auto' as TextAlign),
        }),
        [textColor, theme, headerHeight, REGULAR_HEIGHT, EXTENDED_HEIGHT, fontScale]
    );

    if (info) {
        return typeof info === 'string' ? (
            <Animated.Text
                testID={'header-info'}
                style={[getInfoStyle(), style]}
                numberOfLines={1}
                ellipsizeMode={'tail'}
            >
                {info}
            </Animated.Text>
        ) : (
            <>{info}</>
        );
    }
    return null;
};

type SearchContentProps = {
    /**
     * Theme value overrides specific to this component.
     */
    theme: ReactNativePaper.Theme;

    /** Style to apply to the Text element */
    style?: StyleProp<TextStyle>;
};
/**
 * SearchContent component
 *
 * The SearchContent is a helper component for organizing the contents in the Header. It is
 * used for displaying and styling the search input. It retrieves the search configuration via
 * the useSearch hook.
 */
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
    /** The content to render for the title */
    title: React.ReactNode;

    /** The content to render for the subtitle */
    subtitle?: React.ReactNode;

    /** The content to render for the info */
    info?: React.ReactNode;

    /** Specifies the number of avatars and icons that are included in the action list */
    actions?: {
        components: {
            count: number;
            width: number;
        };
        icons: {
            count: number;
        };
    };

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        info?: StyleProp<TextStyle>;
        search?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme: ReactNativePaper.Theme;

    /**
     * @experimental
     *
     * Set to true to use the alternative subtitle styling (larger size, light weight)
     */
    washingtonStyle?: boolean;
};

/**
 * HeaderContent component
 *
 * The HeaderContent is a helper component for organizing the contents in the Header. It is
 * a wrapper that organizes the title, subtitle, info, and search inputs appropriately.
 */
export const HeaderContent: React.FC<HeaderContentProps> = (props) => {
    const {
        title,
        subtitle,
        info,
        actions = { components: { count: 0, width: 0 }, icons: { count: 0 } },
        theme,
        styles = {},
        washingtonStyle,
    } = props;
    const { headerHeight } = useHeaderHeight();
    const { searching, searchConfig } = useSearch();
    const fontScale = PixelRatio.getFontScale();
    const defaultStyles = headerContentStyles;

    const { REGULAR_HEIGHT, EXTENDED_HEIGHT } = useHeaderDimensions();

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
        let iconLength = actions.icons.count;
        const componentsLength = actions.components.count;
        const componentsWidth = actions.components.width;

        if (searchConfig) iconLength++;

        if (iconLength + componentsLength < 1) return 0;

        return iconLength * (ICON_SIZE * fontScale + ICON_SPACING) + componentsWidth;
    }, [actions, searchConfig, fontScale]);

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
                              extrapolate: 'clamp',
                          }),
                          marginBottom: subtitle && title ? 5 * fontScale : 15 * fontScale,
                      },
                styles.root,
            ]}
        >
            <View style={{ flex: 0, justifyContent: 'center' }}>{content}</View>
        </Animated.View>
    );
};
