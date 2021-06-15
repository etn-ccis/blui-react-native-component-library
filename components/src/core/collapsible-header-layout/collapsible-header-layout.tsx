import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ViewProps, View, ScrollViewProps as RNScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ANIMATION_LENGTH, Header, HeaderProps as PXBHeaderProps, heightWithStatusBar } from '../header';

export type CollapsibleLayoutProps = ViewProps & {
    /**
     * Props to pass to the Header component
     * */
    HeaderProps?: PXBHeaderProps;

    /**
     * Props to pass to the ScrollView
     */
    ScrollViewProps?: RNScrollViewProps;

    /**
     * Style Overrides
     * */
    styles?: {
        root?: StyleProp<ViewStyle>;
    };

    /**
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
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
        ScrollViewProps = {},
        styles = {},
        style,
        ...viewProps
    } = props;

    const theme = useTheme(themeOverride);
    const scrollRef = useRef(null);
    const scrollAnimValue = useRef(new Animated.Value(0)).current;

    const headerVariant = HeaderProps.variant || 'dynamic';
    const startExpanded = HeaderProps.startExpanded || false;
    const collapsedHeight = heightWithStatusBar(HeaderProps.collapsedHeight || 56);
    const expandedHeight = heightWithStatusBar(HeaderProps.expandedHeight || 200);
    const scrollableDistance = expandedHeight - collapsedHeight;
    const initialScrollPosition = headerVariant === 'static' ? 0 : !startExpanded ? scrollableDistance : 0;
    let scrollValue = 0; // using a state variable for this causes some out of sync issues with the animated value

    // Tracks the manually collapsed/expanded state (from click) to adjust the padding to avoid any weird gaps
    const [expanded, setExpanded] = useState(startExpanded || false);
    const [contentMargin] = useState(
        new Animated.Value(headerVariant === 'dynamic' ? expandedHeight : expanded ? expandedHeight : collapsedHeight)
    );

    // Animation functions to smoothly animate the paddingTop of ScrollView
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

    // Updates the stored variable for scroll position (so we can compare against it which we can't do with the raw Animated.Value)
    const onScrollChange = useCallback(({ value: scrollDistance }: { value: number }) => {
        scrollValue = scrollDistance;
    }, []);

    // Add Scroll Listener to our Animated.Value that is bound to the onScroll prop of ScrollView
    useEffect(() => {
        const listen = scrollAnimValue.addListener(onScrollChange);
        return (): void => scrollAnimValue.removeListener(listen);
    }, []);

    // Callback function when the user collapses the Header by clicking
    const handleCollapse = useCallback((): void => {
        if (headerVariant !== 'dynamic') contract.start();
        setExpanded(false);
        if (headerVariant === 'dynamic' && scrollRef && scrollRef.current && scrollValue <= scrollableDistance) {
            // @ts-ignore scrollRef can't be null here, but TS complains anyway
            scrollRef.current.scrollTo({ x: 0, y: scrollableDistance, animated: true });
        }
        // User-supplied callback
        if (HeaderProps.onCollapse) HeaderProps.onCollapse();
    }, [scrollValue, scrollRef, scrollableDistance, headerVariant, HeaderProps.onCollapse]);

    // Callback function when the user expands the Header by clicking
    const handleExpand = useCallback((): void => {
        if (headerVariant !== 'dynamic') expand.start();
        setExpanded(true);
        if (headerVariant === 'dynamic' && scrollRef && scrollRef.current && scrollValue <= scrollableDistance) {
            // @ts-ignore scrollRef can't be null here, but TS complains anyway
            scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
        // User-supplied callback
        if (HeaderProps.onExpand) HeaderProps.onExpand();
    }, [scrollValue, scrollRef, scrollableDistance, headerVariant, HeaderProps.onExpand]);

    return (
        <View {...viewProps} style={[{ flex: 1, backgroundColor: theme.colors.background }, styles.root, style]}>
            <Header
                // Spread the props...anything above can be overridden by user, anything below wil be merged or explicitly controlled by this component
                {...HeaderProps}
                onCollapse={handleCollapse}
                onExpand={handleExpand}
                scrollPosition={scrollAnimValue}
                style={[HeaderProps.styles?.root, HeaderProps.style, { position: 'absolute', zIndex: 100 }]}
            />

            <Animated.ScrollView
                scrollEventThrottle={32}
                // Spread the props...anything above can be overridden by user, anything below wil be merged or explicitly controlled by this component
                {...ScrollViewProps}
                ref={scrollRef}
                style={[ScrollViewProps.style, { paddingTop: contentMargin }]}
                contentOffset={{ x: 0, y: initialScrollPosition }}
                // Bind the scroll position directly to our animated value
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
                                  // User-supplied callback function
                                  listener: ScrollViewProps.onScroll,
                                  useNativeDriver: false,
                              }
                          )
                        : undefined
                }
            >
                {props.children}
            </Animated.ScrollView>
        </View>
    );
};
