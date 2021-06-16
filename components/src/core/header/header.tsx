import React, { ComponentType, useCallback, useState, useRef, useEffect } from 'react';
import {
    Animated,
    ImageSourcePropType,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableWithoutFeedback,
    ViewProps,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageStyle,
    PixelRatio,
} from 'react-native';
import color from 'color';
import { useTheme } from 'react-native-paper';
import { ANIMATION_LENGTH, heightWithStatusBar } from './constants';
import { HeaderBackgroundImage } from './headerBackgroundImage';
import { HeaderNavigationIcon } from './headerNavigationIcon';
import { HeaderContent } from './headerContent';
import { HeaderActionItems } from './headerActionItems';
import { SearchContext } from './contexts/SearchContextProvider';
import { ColorContext } from './contexts/ColorContextProvider';
import { HeaderHeightContext } from './contexts/HeaderHeightContextProvider';
import { HeaderAvatar, HeaderIcon } from '../__types__';
import { $DeepPartial } from '@callstack/react-theme-provider';

import createAnimatedComponent = Animated.createAnimatedComponent;
const AnimatedSafeAreaView = createAnimatedComponent(SafeAreaView);

const headerStyles = (
    props: HeaderProps,
    theme: ReactNativePaper.Theme
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    content: ViewStyle;
    search: ViewStyle;
}> => {
    const fontScale = PixelRatio.getFontScale();
    return StyleSheet.create({
        root: {
            width: '100%',
            backgroundColor: props.backgroundColor || (theme.dark ? '#2b353a' : theme.colors.primary), // @TODO: PXBLUE-2122 - remove this hardcoded color value when doing theme updates
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowRadius: 2,
            shadowOpacity: 1,
            elevation: 0,
        },
        content: {
            flex: 1,
            paddingVertical: 16 * fontScale,
            paddingHorizontal: 16,
            flexDirection: 'row',
            minHeight: 56 * fontScale,
        },
        search: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
        },
    });
};

export type SearchableConfig = {
    /** TextInput Prop. Determines how the search input will be capitalized */
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

    /** TextInput Prop. Determines whether auto-correct is enabled in the search input */
    autoCorrect?: boolean;

    /** TextInput Prop. Determines whether the search input will be focused on when it is rendered */
    autoFocus?: boolean;

    /** Icon to override default search icon */
    icon?: ComponentType<{ size: number; color: string }>;

    /** TextInput Prop. Callback for when the text in the search input changes */
    onChangeText?: (text: string) => void;

    /** TextInput Prop. Placeholder text for the search input */
    placeholder?: string;
};

export type HeaderProps = ViewProps & {
    /** List of up to three action items on the right of the header */
    actionItems?: Array<HeaderIcon | HeaderAvatar>;

    /** Background color of the header */
    backgroundColor?: string;

    /** Background image to render when header is expanded */
    backgroundImage?: ImageSourcePropType;

    /**
     * Height of the App Bar when fully collapsed
     * Default: 56
     */
    collapsedHeight?: number;

    /** Determines whether the header can be expanded / collapsed by tapping */
    expandable?: boolean;

    /**
     * Height of the App Bar when fully expanded
     * Default: 200
     */
    expandedHeight?: number;

    /** Color of the title, subtitle, and icons in the header */
    fontColor?: string;

    /** Optional header third line of text (hidden when collapsed) */
    info?: string;

    /** Leftmost icon on header, used for navigation */
    navigation?: HeaderIcon;

    /**
     * Callback function to execute when the Header is expanded via tap
     */
    onExpand?: () => void;

    /**
     * Callback function to execute when the Header is collapsed via tap
     */
    onCollapse?: () => void;

    onSearch?: () => void;
    onCloseSearch?: () => void;

    /**
     * Y-value of the scroll position of the linked ScrollView (dynamic variant only)
     */
    scrollPosition?: Animated.Value;

    /** Configuration object that determines whether the Header can have a search bar */
    searchableConfig?: SearchableConfig;

    /** Determines whether the header should start in the expanded state */
    startExpanded?: boolean;

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        backgroundImage?: StyleProp<ImageStyle>;
        content?: StyleProp<ViewStyle>;
        navigationIcon?: StyleProp<ViewStyle>;
        textContent?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        info?: StyleProp<TextStyle>;
        search?: StyleProp<TextStyle>;
        actionPanel?: StyleProp<ViewStyle>;
        actionItem?: StyleProp<ViewStyle>;
        avatar?: StyleProp<ViewStyle>;
    };

    /** Optional header subtitle */
    subtitle?: string;

    /**
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;

    /** Header title */
    title: string;

    /**
     * Current mode of the Header:
     * - 'static': Header does not resize based on scroll position,
     * - 'dynamic' Header resizes based on the provided scrollPosition.
     * Default: static
     */
    variant?: 'dynamic' | 'static';

    /**
     * Set to true to use the alternative subtitle styling
     */
    washingtonStyle?: boolean;
};

/**
 * Header component
 *
 * This component is used to display a title and navigation and action items on the top of a screen.
 * It can be tapped to expand or contract.
 */
export const Header: React.FC<HeaderProps> = (props) => {
    const {
        actionItems,
        backgroundColor,
        backgroundImage,
        expandable = false,
        expandedHeight: expandedHeightProp = 200,
        collapsedHeight: collapsedHeightProp = 56,
        fontColor,
        info,
        navigation,
        scrollPosition = new Animated.Value(0),
        searchableConfig,
        startExpanded,
        subtitle,
        style,
        styles = {},
        theme: themeOverride,
        title,
        variant = 'static',
        washingtonStyle,
        onExpand,
        onCollapse,
        onSearch,
        onCloseSearch,
        ...viewProps
    } = props;

    const theme = useTheme(themeOverride);
    const defaultStyles = headerStyles(props, theme);
    const searchRef = useRef<TextInput>(null);

    // Utility variables
    const fontScale = PixelRatio.getFontScale();
    const collapsedHeight = heightWithStatusBar(collapsedHeightProp);
    const expandedHeight = heightWithStatusBar(expandedHeightProp);
    const scrollableDistance = expandedHeight - collapsedHeight;
    const dynamicHeaderHeight = Animated.subtract(new Animated.Value(expandedHeight), scrollPosition);

    // Local State
    const [searching, setSearching] = useState(false);
    const [expanded, setExpanded] = useState(startExpanded || false);
    const [previousExpanded, setPreviousExpanded] = useState(expanded);
    const [useStaticHeight, setUseStaticHeight] = useState(variant === 'static');
    const [query, setQuery] = useState('');
    const [staticHeaderHeight] = useState(
        startExpanded ? new Animated.Value(expandedHeight) : new Animated.Value(collapsedHeight)
    );

    // Animation functions to smoothly transition the static Header height
    const expand = Animated.timing(staticHeaderHeight, {
        toValue: expandedHeight,
        duration: ANIMATION_LENGTH,
        useNativeDriver: false,
    });
    const contract = Animated.timing(staticHeaderHeight, {
        toValue: collapsedHeight,
        duration: ANIMATION_LENGTH,
        useNativeDriver: false,
    });

    /* UTILITY FUNCTIONS */

    // returns the count of each type of actionItem (avatar and icon)
    const getActionItemInfo = useCallback((): { avatars: number; icons: number } => {
        if (!actionItems) return { avatars: 0, icons: 0 };
        const avatars = actionItems.filter((item) => (item as HeaderAvatar).component).length;
        return { avatars, icons: actionItems.length - avatars };
    }, [actionItems]);

    /* EVENT LISTENERS */


    // if variant is changed to static, update our local state toggle
    useEffect(() => {
        if(variant === 'static') setUseStaticHeight(true);
    }, [variant])

    // Make updates based on changes in the scroll position
    const onScrollChange = useCallback(
        ({ value: scrollValue }: { value: number }) => {
            if (variant !== 'dynamic' || searching) return;

            // Adjust whether to collapse or expand on click based on how far the header is collapsed
            if (scrollValue <= scrollableDistance / 2) setExpanded(true);

            // We have scrolled past the point of full collapse
            if (scrollValue >= scrollableDistance) {
                if (!useStaticHeight) {
                    staticHeaderHeight.setValue(collapsedHeight);
                    setExpanded(false);
                    setUseStaticHeight(true);
                }
            }
            // we have scrolled into the dynamic window
            else {
                if (!expanded || scrollValue <= 0) {
                    setUseStaticHeight(false);
                }
            }
        },
        [expandedHeight, collapsedHeight, scrollableDistance, useStaticHeight, staticHeaderHeight, expanded, variant, searching]
    );

    // Set up a listener for when the scrollPosition changes
    useEffect(() => {
        const listen = scrollPosition.addListener(onScrollChange);
        return (): void => scrollPosition.removeListener(listen);
    }, [onScrollChange]);

    /* STYLE FUNCTIONS */

    // Returns the clamped header height based on scroll position
    const getDynamicHeaderHeight = (): Animated.Value | Animated.AnimatedInterpolation =>
        dynamicHeaderHeight.interpolate({
            inputRange: [collapsedHeight, expandedHeight],
            outputRange: [collapsedHeight, expandedHeight],
            extrapolate: 'clamp',
        });

    const getBackgroundColor = useCallback((): string => {
        if (searching) {
            return theme.colors.surface;
        }
        return backgroundColor || (theme.dark ? '#2b353a' : theme.colors.primary); // @TODO: PXBLUE-2122 - remove this hardcoded color value when doing theme updates
    }, [searching, theme, backgroundColor]);

    const getFontColor = useCallback((): string => {
        if (searching) {
            return theme.colors.text;
        }
        return fontColor || 'white';
    }, [theme, fontColor, searching]);

    const statusBarStyle = useCallback(
        (): 'light-content' | 'dark-content' =>
            color(getBackgroundColor()).isDark() ? 'light-content' : 'dark-content',
        [getBackgroundColor]
    );

    // Returns the interpolated bottom padding of the Header text elements
    const contentStyle = useCallback((): Array<Record<string, any>> => {
        const contractedPadding = (subtitle && !searching ? 12 : 16) * fontScale;
        return [
            searching ? defaultStyles.search : defaultStyles.content,
            searching
                ? {}
                : {
                      paddingBottom: (useStaticHeight ? staticHeaderHeight : dynamicHeaderHeight).interpolate({
                          inputRange: [collapsedHeight, expandedHeight],
                          outputRange: [contractedPadding, 28],
                          extrapolate: 'clamp',
                      }),
                  },
        ];
    }, [subtitle, searching, dynamicHeaderHeight, defaultStyles, useStaticHeight, staticHeaderHeight]);

    /* CALLBACK FUNCTIONS */

    // Callback when the Header is tapped (expandable only)
    const onPress = useCallback((): void => {
        if (expanded) {
            console.log('collapsing on click')
            if (onCollapse) onCollapse();
            contract.start();
            setExpanded(false);
        } else {
            console.log('expanding on click')
            if (onExpand) onExpand();
            expand.start();
            setExpanded(true);
        }
    }, [expanded, onExpand, onCollapse]);

    // Callback when the search bar text is updated
    const onChangeSearchText = useCallback(
        (text: string): void => {
            setQuery(text);
            if (searchableConfig && searchableConfig.onChangeText) searchableConfig.onChangeText(text);
        },
        [setQuery, searchableConfig]
    );

    // Callback when the search icon is clicked
    const onPressSearch = useCallback((): void => {
        if (onSearch) onSearch();
        setUseStaticHeight(true);
        contract.start(() => setSearching(true));
        setPreviousExpanded(expanded);
        setExpanded(false);
    }, [contract, expandable, onSearch]);

    // Callback when the search bar content is cleared
    const onPressSearchClear = useCallback((): void => {
        const searchInput = searchRef.current;
        if (searchInput) {
            searchInput.clear();
            if (searchableConfig && searchableConfig.onChangeText) searchableConfig.onChangeText('');
        }
        setQuery('');
    }, [searchableConfig, searchRef]);

    // Callback when the search bar is closed
    const onPressSearchClose = useCallback((): void => {
        const searchInput = searchRef.current;
        if (searchInput) {
            if (searchableConfig && searchableConfig.onChangeText) searchableConfig.onChangeText('');
        }
        setSearching(false);
        setQuery('');
        if (previousExpanded) {
            expand.start(() => setExpanded(true));
        }
        if (onCloseSearch) onCloseSearch();
    }, [searchableConfig, searchRef, previousExpanded, expand, onCloseSearch]);

// console.log('usingStatic', useStaticHeight);
    console.log('rendering header', variant)
    return (
        <>
            <StatusBar barStyle={statusBarStyle()} />
            <TouchableWithoutFeedback
                onPress={(): void => onPress()}
                disabled={!expandable || searching}
                {...viewProps}
            >
                <AnimatedSafeAreaView
                    style={[
                        defaultStyles.root,
                        styles.root,
                        style,
                        /* We only use the dynamic height when we are in the dynamic range (from scrollPosition zero to expandedHeight - collapsedHeight)
                            Everywhere else, we use the fixed header height
                            */
                        { height: useStaticHeight ? staticHeaderHeight : getDynamicHeaderHeight() },
                        searching ? { backgroundColor: theme.colors.surface } : {},
                    ]}
                >
                    <SearchContext.Provider
                        value={{
                            searchRef: searchRef,
                            query: query,
                            searching: searching,
                            onQueryChange: onChangeSearchText,
                            searchConfig: searchableConfig,
                            onSearch: onPressSearch,
                            onClear: onPressSearchClear,
                            onClose: onPressSearchClose,
                        }}
                    >
                        <ColorContext.Provider value={{ color: getFontColor() }}>
                            <HeaderHeightContext.Provider
                                value={{
                                    headerHeight: useStaticHeight ? staticHeaderHeight : getDynamicHeaderHeight(),
                                }}
                            >
                                <HeaderBackgroundImage
                                    backgroundImage={backgroundImage}
                                    style={styles.backgroundImage}
                                />
                                <Animated.View style={[contentStyle(), styles.content]}>
                                    <HeaderNavigationIcon navigation={navigation} style={styles.navigationIcon} />
                                    <HeaderContent
                                        theme={theme}
                                        title={title}
                                        subtitle={subtitle}
                                        info={info}
                                        actionCount={getActionItemInfo()}
                                        styles={{
                                            root: styles.textContent,
                                            title: styles.title,
                                            subtitle: styles.subtitle,
                                            info: styles.info,
                                            search: styles.search,
                                        }}
                                        washingtonStyle={washingtonStyle}
                                    />
                                    <HeaderActionItems
                                        actionItems={actionItems}
                                        styles={{
                                            root: styles.actionPanel,
                                            actionItem: styles.actionItem,
                                            avatar: styles.avatar,
                                        }}
                                    />
                                </Animated.View>
                            </HeaderHeightContext.Provider>
                        </ColorContext.Provider>
                    </SearchContext.Provider>
                </AnimatedSafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
};
Header.displayName = 'Header';
