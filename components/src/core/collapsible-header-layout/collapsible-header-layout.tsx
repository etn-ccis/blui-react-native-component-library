import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, ViewProps, View, SafeAreaView } from 'react-native';
import color from 'color';
import { useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { H6 } from '../typography';
import { ANIMATION_LENGTH, EXTENDED_HEIGHT, Header, HeaderProps as PXBHeaderProps, heightWithStatusBar, REGULAR_HEIGHT } from '../header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
// import { H6, HeaderProps as PXBHeaderProps, heightWithStatusBar } from '@pxblue/react-native-components';

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
    const {
        HeaderProps = {} as PXBHeaderProps,
        theme: themeOverride,
    } = props;
    const theme = useTheme(themeOverride);

    const collapsedHeight = heightWithStatusBar(HeaderProps.collapsedHeight || 56);
    const expandedHeight = heightWithStatusBar(HeaderProps.expandedHeight || 200);
    const scrollableDistance = expandedHeight - collapsedHeight;

    const scrollRef = useRef(null);
    const scrollAnimValue = useRef(new Animated.Value(0)).current;
    let scrollValue = 0; // using a state variable for this causes some out of sync issues with the animated value

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
        const listen = scrollAnimValue.addListener(onScrollChange)
        return () => scrollAnimValue.removeListener(listen);
    }, [])

    const handleCollapse = useCallback(() => {
        if (scrollRef && scrollRef.current && scrollValue <= scrollableDistance) {
            // @ts-ignore
            scrollRef.current.scrollTo({ x: 0, y: scrollableDistance, animated: true });
        }
    }, [scrollValue, scrollRef, scrollableDistance]);

    const handleExpand = useCallback(() => {
        if (scrollRef && scrollRef.current && scrollValue <= scrollableDistance) {
                // @ts-ignore
                scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    }, [scrollValue, scrollRef, scrollableDistance]);

    return (
        <>
            <StatusBar barStyle={statusBarStyle()} />
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Header
                    {...HeaderProps}
                    onCollapse={handleCollapse}
                    onExpand={handleExpand}
                    scrollPosition={scrollAnimValue}
                    style={{ position: 'absolute', zIndex: 100 }}
                    startExpanded={true}
                />

                <Animated.ScrollView
                    ref={scrollRef}
                    style={{ paddingTop: (HeaderProps.variant || 'dynamic') === 'collapsed' ? collapsedHeight : expandedHeight }}
                    onScroll={Animated.event(
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
                            listener: () => { },
                            useNativeDriver: false,
                        }
                    )}
                    scrollEventThrottle={32}
                >
                    {props.children}
                </Animated.ScrollView>
            </View>
        </>
    );
};
