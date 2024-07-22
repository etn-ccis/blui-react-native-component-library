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
} from 'react-native';
import color from 'color';
import { ICON_SIZE, ICON_SPACING } from './constants';
import { useSearch } from './contexts/SearchContextProvider';
import { useColor } from './contexts/ColorContextProvider';
import { useHeaderHeight } from './contexts/HeaderHeightContextProvider';
import { useHeaderDimensions } from '../__hooks__/useHeaderDimensions';
import { useFontScale, useFontScaleSettings } from '../__contexts__/font-scale-context';
import { ExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { fontStyleRegular, fontStyleSemiBold } from '../Utility/shared';

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
    theme: ExtendedTheme;

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
    const { maxScale, disableScaling } = useFontScaleSettings();
    const getTitleStyle = useCallback(
        () => ({
            color: textColor,
            ...fontStyleSemiBold,
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
            allowFontScaling={!disableScaling}
            maxFontSizeMultiplier={maxScale}
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
    theme: ExtendedTheme;

    /** Style to apply to the Text element */
    style?: StyleProp<TextStyle>;
};
/**
 * HeaderSubtitle component
 *
 * The HeaderSubtitle is a helper component for organizing the contents in the Header. It is
 * used for displaying and resizing the subtitle text.
 */
const HeaderSubtitle: React.FC<HeaderSubtitleProps> = (props) => {
    const { subtitle, theme, style } = props;
    const { color: textColor } = useColor();
    const { maxScale, disableScaling } = useFontScaleSettings();
    const { headerHeight } = useHeaderHeight();
    const { REGULAR_HEIGHT, EXTENDED_HEIGHT } = useHeaderDimensions();

    const getSubtitleStyle = useCallback(
        () => ({
            color: textColor,
            ...fontStyleRegular,
            fontSize: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [14, 16],
                extrapolate: 'clamp',
            }),
            writingDirection: I18nManager.isRTL ? 'rtl' : ('ltr' as WritingDirection),
            textAlign: Platform.OS === 'android' ? 'left' : ('auto' as TextAlign),
        }),
        [textColor, theme]
    );

    if (subtitle) {
        return typeof subtitle === 'string' ? (
            <Animated.Text
                testID={'header-subtitle'}
                style={[getSubtitleStyle(), style]}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                allowFontScaling={!disableScaling}
                maxFontSizeMultiplier={maxScale}
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
    theme: ExtendedTheme;

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
    const { maxScale, disableScaling } = useFontScaleSettings();
    const fontScale = useFontScale();
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
            ...fontStyleRegular,
            fontSize: headerHeight.interpolate({
                inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                outputRange: [0.1, 14],
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
                allowFontScaling={!disableScaling}
                maxFontSizeMultiplier={maxScale}
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
    theme: ExtendedTheme;

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
    const { maxScale, disableScaling } = useFontScaleSettings();
    const placeholderTextColor = color(textColor).fade(0.4).string();
    return (
        <TextInput
            key={'search-input'}
            ref={searchRef}
            style={[
                {
                    padding: 0,
                    color: textColor,
                    ...theme.fonts.titleMedium,
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
            allowFontScaling={!disableScaling}
            maxFontSizeMultiplier={maxScale}
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
    theme: ExtendedTheme;
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
    } = props;
    const { headerHeight } = useHeaderHeight();
    const { searching, searchConfig } = useSearch();
    const fontScale = useFontScale();
    const defaultStyles = headerContentStyles;

    const { REGULAR_HEIGHT, EXTENDED_HEIGHT } = useHeaderDimensions();

    let content: JSX.Element[] = [];

    if (searchConfig && searching) {
        content = [<SearchContent key={'search-content'} theme={theme} style={styles.search} />];
    } else {
        content = [
            <HeaderTitle title={title} key="title_key" theme={theme} style={[styles.title]} />,
            <HeaderSubtitle subtitle={subtitle} key="subtitle_key" theme={theme} style={[styles.subtitle]} />,
            <HeaderInfo info={info} key="info_key" theme={theme} style={[styles.info]} />,
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
            <View style={{ flex: 0, flexBasis: 'auto', justifyContent: 'center' }}>{content}</View>
        </Animated.View>
    );
};
