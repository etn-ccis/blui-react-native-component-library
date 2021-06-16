import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ViewProps, View, ScrollViewProps as RNScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ANIMATION_LENGTH, Header, HeaderProps as PXBHeaderProps, heightWithStatusBar } from '../header';
import { usePrevious } from '../hooks/usePrevious';

export type CollapsibleLayoutProps = ViewProps & {
    /**
     * Props to pass to the Header component
     * */
    HeaderProps: PXBHeaderProps;

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
    const { HeaderProps, theme: themeOverride, ScrollViewProps = {}, styles = {}, style, ...viewProps } = props;

    const theme = useTheme(themeOverride);
    const scrollRef = useRef(null);
    const animatedScrollValue = useRef(new Animated.Value(0)).current;

    const headerVariant = HeaderProps.variant || 'dynamic';
    const previousVariant = usePrevious(headerVariant);
    const startExpanded = HeaderProps.startExpanded || false;
    const collapsedHeight = heightWithStatusBar(HeaderProps.collapsedHeight || 56);
    const expandedHeight = heightWithStatusBar(HeaderProps.expandedHeight || 200);
    const scrollableDistance = expandedHeight - collapsedHeight;
    const initialScrollPosition = headerVariant === 'static' ? 0 : !startExpanded ? scrollableDistance : 0;
    const [scrollValue, setScrollValue] = useState(0); // using a state variable for this causes some out of sync issues with the animated value

    // Tracks the manually collapsed/expanded state (from click) to adjust the padding to avoid any weird gaps
    const [expanded, setExpanded] = useState(startExpanded || false);
    const previousExpanded = usePrevious(expanded);
    const [contentPadding] = useState(
        new Animated.Value(headerVariant === 'dynamic' || expanded ? expandedHeight : collapsedHeight)
    );
    // const contentPadding = 
    //     new Animated.Value(headerVariant === 'dynamic' || expanded ? expandedHeight : collapsedHeight)
    // ;

    // Animation functions to smoothly animate the paddingTop of ScrollView
    const expand = Animated.timing(contentPadding, {
        toValue: expandedHeight,
        duration: ANIMATION_LENGTH,
        useNativeDriver: false,
    });
    const contract = Animated.timing(contentPadding, {
        toValue: collapsedHeight,
        duration: ANIMATION_LENGTH,
        useNativeDriver: false,
    });

    // Updates the stored variable for scroll position (so we can compare against it which we can't do with the raw Animated.Value)
    // const onScrollChange = useCallback(({ value: scrollDistance }: { value: number }) => {
    const onScrollChange = ({ value: scrollDistance }: { value: number }) => {
        setScrollValue(scrollDistance);
        //scrollValue = scrollDistance;
        // }, []);
    };

    // Add Scroll Listener to our Animated.Value that is bound to the onScroll prop of ScrollView
    useEffect(() => {
        const listen = animatedScrollValue.addListener(onScrollChange);
        return (): void => animatedScrollValue.removeListener(listen);
    }, []);

    // Update the contentPadding when variant changes
    useEffect(() => {
        if (headerVariant !== previousVariant) {
            // switching from dynamic to static
            if (headerVariant === 'static') {
                console.log('switching to static')
                // within the dynamic zone
                if (scrollValue <= scrollableDistance) {
                    // console.log('within dynamic range')
                    // console.log('changing the padding value to expanded ', expanded);
                    // contentPadding.setValue(expanded ? expandedHeight : collapsedHeight);
                    // if (scrollRef && scrollRef.current) {
                    //     // @ts-ignore scrollRef can't be null here, but TS complains anyway
                    //     scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
                    // }
                }
                // beyond the dynamic zone
                else {
                    console.log('beyond dynamic range')
                    if (!expanded) {
                        console.log('and header is collapsed')
                        contentPadding.setValue(collapsedHeight);
                        if (scrollRef && scrollRef.current) {
                            // @ts-ignore scrollRef can't be null here, but TS complains anyway
                            scrollRef.current.scrollTo({ x: 0, y: scrollValue - scrollableDistance, animated: true });
                        }
                    }
                    else {
                        console.log('and header is expanded');
                    }
                }
            }
            // switching from static to dynamic
            else if (headerVariant === 'dynamic') {
                if (scrollValue <= scrollableDistance) {
                    contentPadding.setValue(expandedHeight);
                    if (scrollRef && scrollRef.current) {
                        // @ts-ignore scrollRef can't be null here, but TS complains anyway
                        scrollRef.current.scrollTo({ x: 0, y: expanded ? 0 : scrollableDistance, animated: true });
                    }
                }
                else {
                    if (!expanded) {
                        contentPadding.setValue(expandedHeight);
                        if (scrollRef && scrollRef.current) {
                            // @ts-ignore scrollRef can't be null here, but TS complains anyway
                            scrollRef.current.scrollTo({ x: 0, y: scrollValue + scrollableDistance, animated: true });
                        }
                    }
                }
            }
        }
    }, [headerVariant])
    // Update the contentPadding when size changes

    // useEffect(() => {
    //     console.log('effect changed');
    //     if (previousExpanded && !expanded) {
    //         console.log('contracting')
    //         contract.start();
    //     }
    //     else if (!previousExpanded && expanded) {
    //         console.log('expanding');
    //         expand.start();
    //     }
    //     console.log('setting padding');
    //     contentPadding.setValue(headerVariant === 'dynamic' || expanded ? expandedHeight : collapsedHeight)
    // if (scrollRef && scrollRef.current) {
    //     console.log('updating scroll', scrollValue, scrollValue - (expandedHeight - collapsedHeight))
    //     // @ts-ignore scrollRef can't be null here, but TS complains anyway
    //     scrollRef.current.scrollTo({ x: 0, y: scrollValue + (expandedHeight - collapsedHeight), animated: true });
    // }

    // }, [headerVariant, expanded, previousExpanded, expandedHeight, collapsedHeight, scrollRef, scrollRef.current])

    // useEffect(() => {
    //     console.log('effect', previousExpanded, expanded, headerVariant, expandedHeight, collapsedHeight)
    //     if(previousExpanded && !expanded) contract.start();
    //     else if(!previousExpanded && expanded) expand.start();
    //     else contentPadding.setValue(headerVariant === 'dynamic' || expanded ? expandedHeight : collapsedHeight)
    // }, [previousExpanded, expanded, headerVariant, expanded, expandedHeight, collapsedHeight]);

    // Callback function when the user collapses the Header by clicking
    // const handleCollapse = useCallback((): void => {
    const handleCollapse = (tapped: boolean): void => {
        console.log('handling collapse custom', headerVariant)
        setExpanded(false);
        if (headerVariant !== 'dynamic') {
            console.log('collapsing margin, animate', tapped);
            if (tapped) contract.start();
            else contentPadding.setValue(collapsedHeight);
        }
        if (scrollRef && scrollRef.current) {
            if (headerVariant === 'dynamic' && scrollValue <= scrollableDistance) {
                console.log('updating the scroll');
                // @ts-ignore scrollRef can't be null here, but TS complains anyway
                scrollRef.current.scrollTo({ x: 0, y: scrollableDistance, animated: tapped ? true : false });
            }
            else if (headerVariant === 'static' && scrollValue > scrollableDistance) {
                console.log('updating the scroll 2');
                // @ts-ignore scrollRef can't be null here, but TS complains anyway
                scrollRef.current.scrollTo({ x: 0, y: scrollValue - scrollableDistance, animated: tapped ? true : false });
            }
            else if (headerVariant === 'static' && scrollValue <= scrollableDistance) {
                console.log('updating the scroll 3');
                // @ts-ignore scrollRef can't be null here, but TS complains anyway
                scrollRef.current.scrollTo({ x: 0, y: 0, animated: tapped ? true : false });
            }
        }
        // User-supplied callback
        if (HeaderProps.onCollapse) HeaderProps.onCollapse(tapped);
        // }, [scrollValue, scrollRef, scrollableDistance, HeaderProps.variant, HeaderProps.onCollapse]);
    };

    // Callback function when the user expands the Header by clicking
    // const handleExpand = useCallback((): void => {
    const handleExpand = (tapped: boolean): void => {
        console.log('handling expand custom', headerVariant, scrollValue)
        setExpanded(true);
        if (headerVariant !== 'dynamic') {
            console.log('expanding margin, animate', tapped);
            if (tapped) expand.start();
            else contentPadding.setValue(expandedHeight);
        }
        if (scrollRef && scrollRef.current) {
            if (headerVariant === 'dynamic' && scrollValue <= scrollableDistance) {
                // @ts-ignore scrollRef can't be null here, but TS complains anyway
                scrollRef.current.scrollTo({ x: 0, y: 0, animated: tapped ? true : false });
            }
            if (headerVariant === 'static' && scrollValue <= scrollableDistance) {
                // @ts-ignore scrollRef can't be null here, but TS complains anyway
                scrollRef.current.scrollTo({ x: 0, y: 0, animated: tapped ? true : false });
            }
        }

        // User-supplied callback
        if (HeaderProps.onExpand) HeaderProps.onExpand(tapped);
        // }, [scrollValue, scrollRef, scrollableDistance, headerVariant, HeaderProps.onExpand]);
    };

    // Open and closing the search bar is a special case that only requires changing the content padding, but not the scroll position
    // const handleSearch = useCallback((): void => {
    const handleSearch = (): void => {
        console.log('custom handle onsearch');
        if (scrollValue <= scrollableDistance && expanded) {
            console.log('contracting not yet');
            contract.start();
        }
        else if (scrollValue <= scrollableDistance && !expanded) {
            console.log('contracting already collapsed');
            // contract.start();
            contentPadding.setValue(collapsedHeight);
            if (scrollRef && scrollRef.current) {
                // @ts-ignore scrollRef can't be null here, but TS complains anyway
                scrollRef.current.scrollTo({ x: 0, y: 0, animated: false });
            }
        }
        setExpanded(false);
        // }, []);
    };
    // const handleCloseSearch = useCallback((): void => {
    const handleCloseSearch = (): void => {
        console.log('custom handle onsearch close');
        if (scrollValue <= scrollableDistance) {
            console.log('expanding');
            if (expanded) expand.start();
            else contentPadding.setValue(expandedHeight);
            if (headerVariant === 'dynamic' && !expanded) {
                if (scrollRef && scrollRef.current) {
                    // @ts-ignore scrollRef can't be null here, but TS complains anyway
                    scrollRef.current.scrollTo({ x: 0, y: scrollableDistance, animated: false });
                }
            }
        }
        setExpanded(true);
        // }, []);
    };

    // console.log('rendering layout');
    // console.log(contentPadding, headerVariant, scrollValue);
    // console.log('layout expanded', expanded);

    return (
        <View {...viewProps} style={[{ flex: 1, backgroundColor: theme.colors.background }, styles.root, style]}>
            <Header
                testID={'pxb-header'}
                // Spread the props...anything above can be overridden by user, anything below wil be merged or explicitly controlled by this component
                {...HeaderProps}
                onCollapse={handleCollapse}
                onExpand={handleExpand}
                onSearch={handleSearch}
                onCloseSearch={handleCloseSearch}
                scrollPosition={animatedScrollValue}
                style={[HeaderProps.styles?.root, HeaderProps.style, { position: 'absolute', zIndex: 100 }]}
            />

            <Animated.ScrollView
                testID={'pxb-scrollview'}
                scrollEventThrottle={32}
                // Spread the props...anything above can be overridden by user, anything below wil be merged or explicitly controlled by this component
                {...ScrollViewProps}
                ref={scrollRef}
                style={[ScrollViewProps.style, { paddingTop: contentPadding }]}
                contentOffset={{ x: 0, y: initialScrollPosition }}
                // Bind the scroll position directly to our animated value
                onScroll={
                    headerVariant === 'dynamic'
                        ? Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: animatedScrollValue,
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
