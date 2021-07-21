import React, { ComponentType, useCallback, useState, useRef, useEffect, ReactNode } from 'react';
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
    TextInputProps,
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
import { usePrevious } from '../hooks/usePrevious';
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
    /**
     * Determines how the search input will be capitalized
     *
     * Default: 'none'
     */
    autoCapitalize?: TextInputProps['autoCapitalize'];

    /**
     * Determines whether auto-correct is enabled in the search input
     *
     * Default: false
     */
    autoCorrect?: boolean;

    /**
     * Determines whether the search input will be focused on when it is rendered / opened
     *
     * Default: false
     */
    autoFocus?: boolean;

    /** Icon to override default search icon */
    icon?: ComponentType<{ size: number; color: string }>;

    /** Callback for when the text in the search input changes */
    onChangeText?: (text: string) => void;

    /**
     * Placeholder text for the search input
     *
     * Default: 'Search'
     */
    placeholder?: string;
};

export type HeaderProps = ViewProps & {
    /** Array of icons / actions to display on the right */
    actionItems?: Array<HeaderIcon | HeaderAvatar>;

    /**
     * The color used for the background
     *
     * Default: Theme.colors.primary
     */
    backgroundColor?: string;

    /**
     * An image to blend with the colored background in the header
     */
    backgroundImage?: ImageSourcePropType;

    /**
     * Height of the Header when fully collapsed
     *
     * Default: 56
     */
    collapsedHeight?: number;

    /**
     * Allow the header to be expanded / collapsed by tapping
     *
     * Default: false
     */
    expandable?: boolean;

    /**
     * Height of the Header when fully expanded
     *
     * Default: 200
     */
    expandedHeight?: number;

    /**
     * Color of the title, subtitle, info, and icons in the header
     *
     * Default: Theme.colors.onPrimary
     */
    fontColor?: string;

    /** Optional header third line of text (hidden when collapsed) */
    info?: ReactNode;

    /** Icon to show to the left of the title, primarily used to trigger the menu / drawer */
    navigation?: HeaderIcon;

    /**
     * Y-value of the scroll position of the linked ScrollView (dynamic variant only)
     */
    scrollPosition?: Animated.Value;

    /** Configuration object for search behavior */
    searchableConfig?: SearchableConfig;

    /**
     * Renders the header in the expanded state to start
     *
     * Default: false
     */
    startExpanded?: boolean;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
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

    /** The text to display on the second line */
    subtitle?: ReactNode;

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;

    /** The test to display on the first line */
    title: ReactNode;

    /**
     * Callback function to make updates to the linked scrollView (dynamic variant only)
     */
    updateScrollView?: (data: { padding: number | null; animate: boolean; scrollTo: number | null }) => void;

    /**
     * Current resize mode of the Header:
     * - 'static': Header does not resize based on scroll position,
     * - 'dynamic' Header resizes based on the provided scrollPosition.
     *
     * Default: static
     */
    variant?: 'dynamic' | 'static';

    /**
     * @experimental
     *
     * Set to true to use the alternative subtitle styling (larger size, light weight)
     */
    washingtonStyle?: boolean;
};

/**
 * [Header](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--header) component
 *
 * The Header is used as the main banner at the top of application screens. It can display page information
 * via the `title`, `subtitle`, and `info` properties, as well as customizable backgrounds, colors, action items,
 * and more. The header can be configured to expand / collapse on press or on scroll (when using the [CollapsibleHeaderLayout](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--collapsible-header-layout) component).
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
        updateScrollView = (): void => {},
        ...viewProps
    } = props;

    const theme = useTheme(themeOverride);
    const defaultStyles = headerStyles(props, theme);
    const searchRef = useRef<TextInput>(null);

    // Utility variables
    const fontScale = PixelRatio.getFontScale();
    const collapsedHeight = heightWithStatusBar(collapsedHeightProp);
    const previousCollapsedHeight = usePrevious(collapsedHeight);
    const expandedHeight = heightWithStatusBar(expandedHeightProp);
    const previousExpandedHeight = usePrevious(expandedHeight);
    const scrollableDistance = expandedHeight - collapsedHeight;
    const previousScrollableDistance = usePrevious(scrollableDistance);
    const dynamicHeaderHeight = Animated.subtract(new Animated.Value(expandedHeight), scrollPosition);

    // Local State
    const [staticHeaderHeightValue, setStaticHeaderHeightValue] = useState(
        startExpanded ? expandedHeight : collapsedHeight
    );
    const [scrollPositionValue, setScrollPositionValue] = useState(0);
    const inDynamicRange = scrollPositionValue <= scrollableDistance;
    const [searching, setSearching] = useState(false);
    const expanded = staticHeaderHeightValue === expandedHeight;
    const [manuallyExpanded, setManuallyExpanded] = useState(false);
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

    // if variant is changed, make the necessary updates to sizing, margins, etc.
    useEffect(() => {
        // Going from dynamic -> static
        if (variant === 'static') {
            setUseStaticHeight(true);
            if (!inDynamicRange) {
                if (!expanded) {
                    updateScrollView({
                        padding: collapsedHeight,
                        animate: false,
                        scrollTo: scrollPositionValue - scrollableDistance,
                    });
                }
            } else {
                // less than halfway through the dynamic range -> use expanded
                if (scrollPositionValue <= scrollableDistance / 2) {
                    if (expanded) {
                        updateScrollView({ padding: expandedHeight, animate: false, scrollTo: 0 });
                    }
                }
                // more than halfway through the dynamic range -> use collapsed
                else if (!expanded) {
                    updateScrollView({ padding: collapsedHeight, animate: false, scrollTo: 0 });
                }
            }
        }
        // Going from static -> dynamic
        else {
            if (!inDynamicRange) {
                setUseStaticHeight(true);
                if (!expanded) {
                    updateScrollView({
                        padding: expandedHeight,
                        animate: false,
                        scrollTo: scrollPositionValue + scrollableDistance,
                    });
                }
            } else {
                setUseStaticHeight(false);
                if (expanded) {
                    staticHeaderHeight.setValue(
                        scrollPositionValue <= scrollableDistance / 2 ? expandedHeight : collapsedHeight
                    );
                    updateScrollView({
                        padding: expandedHeight,
                        animate: false,
                        scrollTo: scrollPositionValue <= scrollableDistance / 2 ? 0 : scrollableDistance,
                    });
                } else {
                    updateScrollView({
                        padding: expandedHeight,
                        animate: false,
                        scrollTo: scrollPositionValue <= scrollableDistance / 2 ? 0 : scrollableDistance,
                    });
                }
            }
        }
    }, [variant]);

    // if either height property is changed, make the necessary updates to sizing, margins, etc.
    useEffect(() => {
        // don't execute this logic on the first render
        if (previousExpandedHeight === undefined || previousCollapsedHeight === undefined) return;

        const wasExpanded = staticHeaderHeightValue === previousExpandedHeight;
        staticHeaderHeight.setValue(wasExpanded ? expandedHeight : collapsedHeight);

        if (wasExpanded) expand.start();
        else contract.start();

        const scrollableDifference = scrollableDistance - (previousScrollableDistance || scrollableDistance);
        const expandedDifference = expandedHeight - (previousExpandedHeight || expandedHeight);
        const collapsedDifference = collapsedHeight - (previousCollapsedHeight || collapsedHeight);

        // was in the dynamic range
        if (scrollPositionValue <= (previousScrollableDistance || scrollableDistance)) {
            updateScrollView({
                padding: variant === 'dynamic' || wasExpanded ? expandedHeight : collapsedHeight,
                animate: false,
                scrollTo:
                    variant === 'dynamic'
                        ? wasExpanded
                            ? -1 // workaround because if we pass 0 the ScrollView won't update because it thinks the scroll position is the same as before
                            : scrollableDistance
                        : scrollPositionValue + scrollableDifference,
            });
        } else {
            if (variant === 'static') {
                updateScrollView({
                    padding: wasExpanded ? expandedHeight : collapsedHeight,
                    animate: false,
                    scrollTo: scrollPositionValue + (wasExpanded ? expandedDifference : collapsedDifference),
                });
            } else {
                updateScrollView({
                    padding: expandedHeight,
                    animate: false,
                    scrollTo: scrollPositionValue + expandedDifference,
                });
            }
        }
    }, [expandedHeight, collapsedHeight]);

    // Track the current value of the Animated header height
    const onHeightChange = useCallback(({ value: newHeight }: { value: number }) => {
        setStaticHeaderHeightValue(newHeight);
    }, []);

    // Make updates based on changes in the scroll position
    const onScrollChange = useCallback(
        ({ value: scrollValue }: { value: number }) => {
            // save the current value of the animated scroll position
            setScrollPositionValue(scrollValue);

            if (variant !== 'dynamic' || searching) return;

            if (scrollValue <= scrollableDistance) {
                if (manuallyExpanded) {
                    if (!useStaticHeight) setUseStaticHeight(true);
                    if (scrollValue <= 0) {
                        setUseStaticHeight(false);
                        setManuallyExpanded(false);
                    }
                } else {
                    setUseStaticHeight(false);
                    // Adjust whether to collapse or expand on click based on how far the header is collapsed
                    if (scrollValue <= scrollableDistance / 2) {
                        staticHeaderHeight.setValue(expandedHeight);
                    } else {
                        staticHeaderHeight.setValue(collapsedHeight);
                    }
                }
            }
            // We have scrolled out of the dynamic range (past the point of full collapse)
            else {
                if (!useStaticHeight && !manuallyExpanded) {
                    staticHeaderHeight.setValue(collapsedHeight);
                    setUseStaticHeight(true);
                }
            }
        },
        [
            expandedHeight,
            collapsedHeight,
            scrollableDistance,
            useStaticHeight,
            staticHeaderHeight,
            variant,
            searching,
            manuallyExpanded,
        ]
    );

    // Set up listeners
    useEffect(() => {
        const statics = staticHeaderHeight.addListener(onHeightChange);
        const listen = scrollPosition.addListener(onScrollChange);
        return (): void => {
            scrollPosition.removeListener(listen);
            staticHeaderHeight.removeListener(statics);
        };
    }, [onScrollChange, onHeightChange]);

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
    }, [
        subtitle,
        searching,
        dynamicHeaderHeight,
        defaultStyles,
        useStaticHeight,
        staticHeaderHeight,
        collapsedHeight,
        expandedHeight,
    ]);

    /* CALLBACK FUNCTIONS */

    // Callback when the Header is tapped (expandable only)
    const onPress = useCallback((): void => {
        if (expanded) {
            contract.start();
            setManuallyExpanded(false);
            updateScrollView({
                padding: variant === 'dynamic' ? expandedHeight : collapsedHeight,
                animate: inDynamicRange,
                scrollTo:
                    variant === 'dynamic'
                        ? inDynamicRange
                            ? scrollableDistance
                            : null
                        : inDynamicRange
                        ? 0
                        : scrollPositionValue - scrollableDistance,
            });
        } else {
            expand.start();
            setManuallyExpanded(true);
            updateScrollView({
                padding: expandedHeight,
                animate: inDynamicRange,
                scrollTo:
                    variant === 'dynamic'
                        ? inDynamicRange
                            ? 0
                            : null
                        : inDynamicRange
                        ? 0
                        : scrollPositionValue + scrollableDistance,
            });
        }
    }, [
        expanded,
        updateScrollView,
        collapsedHeight,
        contract,
        expand,
        expandedHeight,
        variant,
        inDynamicRange,
        scrollPositionValue,
        scrollableDistance,
    ]);

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
        setUseStaticHeight(true);
        setSearching(true);
        contract.start(() => {
            // setSearching(true);
        });
        updateScrollView({
            padding: collapsedHeight,
            animate: expanded && inDynamicRange,
            scrollTo: variant === 'dynamic' || expanded ? Math.max(scrollPositionValue - scrollableDistance, 0) : null,
        });
        setPreviousExpanded(expanded);
    }, [
        contract,
        expandable,
        inDynamicRange,
        updateScrollView,
        variant,
        expanded,
        scrollPositionValue,
        scrollableDistance,
        collapsedHeight,
        staticHeaderHeightValue,
    ]);

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
            expand.start();
            updateScrollView({
                padding: expandedHeight,
                animate: inDynamicRange,
                scrollTo: inDynamicRange ? 0 : scrollPositionValue + scrollableDistance,
            });
        } else {
            if (variant === 'dynamic') {
                updateScrollView({
                    padding: expandedHeight,
                    animate: false,
                    scrollTo: scrollPositionValue + scrollableDistance,
                });
            }
        }
    }, [
        searchableConfig,
        searchRef,
        previousExpanded,
        expand,
        expandedHeight,
        inDynamicRange,
        scrollPositionValue,
        scrollableDistance,
        updateScrollView,
        variant,
    ]);

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
