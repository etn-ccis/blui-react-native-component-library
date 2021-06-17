import React, { useRef, useState } from 'react';
import { Animated, ViewProps, View, ScrollViewProps as RNScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ANIMATION_LENGTH, Header, HeaderProps as PXBHeaderProps, heightWithStatusBar } from '../header';

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
    const startExpanded = HeaderProps.startExpanded || false;
    const collapsedHeight = heightWithStatusBar(HeaderProps.collapsedHeight || 56);
    const expandedHeight = heightWithStatusBar(HeaderProps.expandedHeight || 200);
    const scrollableDistance = expandedHeight - collapsedHeight;
    const initialScrollPosition = headerVariant === 'static' ? 0 : !startExpanded ? scrollableDistance : 0;

    // State Variables
    const [contentPadding] = useState(
        new Animated.Value(headerVariant === 'dynamic' || startExpanded || false ? expandedHeight : collapsedHeight)
    );

    // Animation function to smoothly animate the paddingTop of ScrollView
    const animatePadding = (padding: number): Animated.CompositeAnimation =>
        Animated.timing(contentPadding, {
            toValue: padding,
            duration: ANIMATION_LENGTH,
            useNativeDriver: false,
        });

    // Update the ScrollView padding and scroll position
    const updateScrollView = (data: { padding: number | null; animate: boolean; scrollTo: number | null }): void => {
        const { padding, animate, scrollTo } = data;
        if (padding !== null) {
            if (animate) animatePadding(padding).start();
            else contentPadding.setValue(padding);
        }
        if (scrollRef && scrollRef.current && scrollTo !== null) {
            // @ts-ignore scrollRef can't be null here, but TS complains anyway
            scrollRef.current.scrollTo({
                x: 0,
                y: scrollTo,
                animated: animate,
            });
        }
    };

    return (
        <View {...viewProps} style={[{ flex: 1, backgroundColor: theme.colors.background }, styles.root, style]}>
            <Header
                testID={'pxb-header'}
                // Spread the props...anything above can be overridden by user, anything below wil be merged or explicitly controlled by this component
                {...HeaderProps}
                updateScrollView={updateScrollView}
                scrollPosition={animatedScrollValue}
                style={[HeaderProps.styles?.root, HeaderProps.style, { position: 'absolute', zIndex: 100 }]}
            />
            {/* TODO: Consider using a KeyboardAwareScrollView in the future */}
            <Animated.ScrollView
                testID={'pxb-scrollview'}
                scrollEventThrottle={32}
                // Spread the props...anything above can be overridden by user, anything below wil be merged or explicitly controlled by this component
                {...ScrollViewProps}
                ref={scrollRef}
                style={[ScrollViewProps.style, { paddingTop: contentPadding }]}
                contentOffset={{ x: 0, y: initialScrollPosition }}
                // Bind the scroll position directly to our animated value
                onScroll={Animated.event(
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
                )}
            >
                {props.children}
            </Animated.ScrollView>
        </View>
    );
};
