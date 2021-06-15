import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, ViewProps, View } from 'react-native';
import color from 'color';
import { useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ANIMATION_LENGTH, Header, HeaderProps as PXBHeaderProps, heightWithStatusBar } from '../header';

export type CollapsibleLayoutProps = ViewProps & {
    /** Props to pass through to the Header component */
    HeaderProps?: PXBHeaderProps;
    /**
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;

    /**
     * Height of the App Bar when fully collapsed
     * Default: 56
     */
    // collapsedHeight?: number;

    /**
     * Height of the App Bar when fully expanded
     * Default: 200
     */
    // expandedHeight?: number;

    /**
     * Current mode of the app bar:
     * - 'expanded' locks the app bar at the expandedHeight,
     * - 'collapsed' locks it at the collapsedHeight,
     * - 'dynamic' resizes the toolbar based on the window scroll position.
     * Default: dynamic
     */
    // variant?: 'expanded' | 'collapsed' | 'dynamic' | 'snap';

    // TODO: style overrides
    // styles?:
};

/**
 * CollapsibleHeaderLayout component
 *
 * This component displays a scrollable page with a header that shrinks between an expanded size and
 * a collapsed size as the page is scrolled.
 */
export const CollapsibleHeaderLayout: React.FC<CollapsibleLayoutProps> = (props) => {
    const { HeaderProps = {} as PXBHeaderProps, theme: themeOverride } = props;
    const headerVariant = HeaderProps.variant || 'dynamic';
    const startExpanded = HeaderProps.startExpanded || false;
    const theme = useTheme(themeOverride);

    const collapsedHeight = heightWithStatusBar(HeaderProps.collapsedHeight || 56);
    const expandedHeight = heightWithStatusBar(HeaderProps.expandedHeight || 200);
    const scrollableDistance = expandedHeight - collapsedHeight;

    const scrollRef = useRef(null);
    const scrollAnimValue = useRef(new Animated.Value(0)).current;
    let scrollValue = 0; // using a state variable for this causes some out of sync issues with the animated value

    const [expanded, setExpanded] = useState(startExpanded || false);

    const getHeaderBackgroundColor = useCallback((): string => HeaderProps.backgroundColor || theme.colors.primary, [
        theme,
        HeaderProps.backgroundColor,
    ]);

    const statusBarStyle = useCallback(
        (): 'light-content' | 'dark-content' =>
            color(getHeaderBackgroundColor()).isDark() ? 'light-content' : 'dark-content',
        [getHeaderBackgroundColor]
    );

    // Scroll Listener
    const onScrollChange = useCallback(({ value: scrollDistance }: { value: number }) => {
        scrollValue = scrollDistance;
    }, []);

    useEffect(() => {
        const listen = scrollAnimValue.addListener(onScrollChange);
        return (): void => scrollAnimValue.removeListener(listen);
    }, []);
    const [contentMargin] = useState(
        new Animated.Value(headerVariant === 'dynamic' ? expandedHeight : expanded ? expandedHeight : collapsedHeight)
    );
    const expand = Animated.timing(contentMargin, {
        toValue: expandedHeight,
        duration: ANIMATION_LENGTH,
        useNativeDriver: false,
    });

    const contract = Animated.timing(contentMargin, {
        toValue: collapsedHeight,
        duration: ANIMATION_LENGTH,
        useNativeDriver: false,
    });

    const handleCollapse = useCallback((): void => {
        if (headerVariant !== 'dynamic') contract.start();
        setExpanded(false);
        if (headerVariant === 'dynamic' && scrollRef && scrollRef.current && scrollValue <= scrollableDistance) {
            // @ts-ignore
            scrollRef.current.scrollTo({ x: 0, y: scrollableDistance, animated: true });
        }
    }, [scrollValue, scrollRef, scrollableDistance, headerVariant]);

    const handleExpand = useCallback((): void => {
        if (headerVariant !== 'dynamic') expand.start();
        setExpanded(true);
        if (headerVariant === 'dynamic' && scrollRef && scrollRef.current && scrollValue <= scrollableDistance) {
            // @ts-ignore
            scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    }, [scrollValue, scrollRef, scrollableDistance, headerVariant]);

    const initialScrollPosition = headerVariant === 'static' ? 0 : !startExpanded ? scrollableDistance : 0;

    return (
        <>
            <StatusBar barStyle={statusBarStyle()} />
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Header
                    {...HeaderProps}
                    // TODO: Merge all of these prop overrides
                    onCollapse={handleCollapse}
                    onExpand={handleExpand}
                    scrollPosition={scrollAnimValue}
                    style={{ position: 'absolute', zIndex: 100 }}
                />

                <Animated.ScrollView
                    ref={scrollRef}
                    style={{ paddingTop: contentMargin }}
                    contentOffset={{ x: 0, y: initialScrollPosition }}
                    onScroll={
                        headerVariant === 'dynamic'
                            ? Animated.event(
                                  [
                                      {
                                          nativeEvent: {
                                              contentOffset: {
                                                  y: scrollAnimValue,
                                              },
                                          },
                                      },
                                  ],
                                  {
                                      listener: () => {},
                                      useNativeDriver: false,
                                  }
                              )
                            : undefined
                    }
                    scrollEventThrottle={32}
                >
                    {props.children}
                </Animated.ScrollView>
            </View>
        </>
    );
};
