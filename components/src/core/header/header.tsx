import React, { ComponentType, useCallback, useState, useRef } from 'react';
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
import createAnimatedComponent = Animated.createAnimatedComponent;
import { useTheme } from 'react-native-paper';
import { EXTENDED_HEIGHT, REGULAR_HEIGHT, ANIMATION_LENGTH } from './constants';
import { HeaderBackgroundImage } from './headerBackgroundImage';
import { HeaderNavigationIcon } from './headerNavigationIcon';
import { HeaderContent } from './headerContent';
import { HeaderActionItems } from './headerActionItems';
import { SearchContext } from './contexts/SearchContextProvider';
import { ColorContext } from './contexts/ColorContextProvider';
import { HeaderHeightContext } from './contexts/HeaderHeightContextProvider';
import { HeaderAvatar, HeaderIcon } from '../__types__';
import { $DeepPartial } from '@callstack/react-theme-provider';

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
    /** Icon to override default search icon */
    icon?: ComponentType<{ size: number; color: string }>;

    /** TextInput Prop. Placeholder text for the search input */
    placeholder?: string;

    /** TextInput Prop. Determines whether the search input will be focused on when it is rendered */
    autoFocus?: boolean;

    /** TextInput Prop. Callback for when the text in the search input changes */
    onChangeText?: (text: string) => void;

    /** TextInput Prop. Determines how the search input will be capitalized */
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

    /** TextInput Prop. Determines whether auto-correct is enabled in the search input */
    autoCorrect?: boolean;
};

export type HeaderProps = ViewProps & {
    /** Header title */
    title: string;

    /** Optional header subtitle */
    subtitle?: string;

    /** Optional header third line of text (hidden when collapsed) */
    info?: string;

    /** Leftmost icon on header, used for navigation */
    navigation?: HeaderIcon;

    /** List of up to three action items on the right of the header */
    actionItems?: Array<HeaderIcon | HeaderAvatar>;

    /** Determines whether the header can be expanded by being pressed */
    expandable?: boolean;

    /** Determines whether the header should start in the expanded state */
    startExpanded?: boolean;

    /** Background color of the header */
    backgroundColor?: string;

    /** Color of the title, subtitle, and icons in the header */
    fontColor?: string;

    /** Background image to render when header is expanded */
    backgroundImage?: ImageSourcePropType;

    /** Configuration object that determines whether the Header can have a search bar */
    searchableConfig?: SearchableConfig;

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

    /**
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
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
        fontColor,
        info,
        navigation,
        searchableConfig,
        startExpanded,
        subtitle,
        style,
        styles = {},
        theme: themeOveride,
        title,
        ...viewProps
    } = props;
    const fontScale = PixelRatio.getFontScale();

    const searchRef = useRef<TextInput>(null);
    const theme = useTheme(themeOveride);
    const [searching, setSearching] = useState(false);
    const [expanded, setExpanded] = useState(startExpanded || false);
    const [query, setQuery] = useState('');
    const [headerHeight] = useState(
        startExpanded ? new Animated.Value(EXTENDED_HEIGHT) : new Animated.Value(REGULAR_HEIGHT)
    );

    const defaultStyles = headerStyles(props, theme);

    const expand = Animated.timing(headerHeight, {
        toValue: EXTENDED_HEIGHT,
        duration: ANIMATION_LENGTH,
        useNativeDriver: false,
    });

    const contract = Animated.timing(headerHeight, {
        toValue: REGULAR_HEIGHT,
        duration: ANIMATION_LENGTH,
        useNativeDriver: false,
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

    const contentStyle = useCallback((): Array<Record<string, any>> => {
        const contractedPadding = (subtitle && !searching ? 12 : 16) * fontScale;
        return [
            searching ? defaultStyles.search : defaultStyles.content,
            searching
                ? {}
                : {
                      paddingBottom: headerHeight.interpolate({
                          inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                          outputRange: [contractedPadding, 28],
                      }),
                  },
        ];
    }, [subtitle, searching, headerHeight, defaultStyles]);

    const onPress = useCallback((): void => {
        if (expanded) {
            contract.start();
            setExpanded(false);
        } else {
            expand.start();
            setExpanded(true);
        }
    }, [expanded, setExpanded, expand, contract]);

    const onChangeSearchText = useCallback(
        (text: string): void => {
            setQuery(text);
            if (searchableConfig && searchableConfig.onChangeText) searchableConfig.onChangeText(text);
        },
        [setQuery, searchableConfig]
    );

    const onPressSearch = useCallback((): void => {
        contract.start(() => setSearching(true));
        setExpanded(false);
    }, [contract, setSearching, setExpanded]);

    const onPressSearchClear = useCallback((): void => {
        const searchInput = searchRef.current;
        if (searchInput) {
            searchInput.clear();
            if (searchableConfig && searchableConfig.onChangeText) searchableConfig.onChangeText('');
        }
        setQuery('');
    }, [searchableConfig, searchRef, setQuery]);

    const onPressSearchClose = useCallback((): void => {
        const searchInput = searchRef.current;
        if (searchInput) {
            if (searchableConfig && searchableConfig.onChangeText) searchableConfig.onChangeText('');
        }
        setSearching(false);
        setQuery('');
    }, [searchableConfig, searchRef, setSearching, setQuery]);

    const getActionItemInfo = useCallback(() => {
        if (!actionItems) return { avatars: 0, icons: 0 };
        const avatars = actionItems.filter((item) => (item as HeaderAvatar).component).length;
        return { avatars, icons: actionItems.length - avatars };
    }, [actionItems]);

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
                        { height: headerHeight },
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
                            <HeaderHeightContext.Provider value={{ headerHeight: headerHeight }}>
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
