import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Animated,
    ViewProps,
    View,
    ScrollViewProps as RNScrollViewProps,
    StyleProp,
    ViewStyle,
    ScrollView,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { ANIMATION_LENGTH, Header, HeaderProps as PXBHeaderProps, heightWithStatusBar } from '../header';

export type CollapsibleLayoutProps = ViewProps & {
    /** Props to spread to the Header component. */
    HeaderProps: PXBHeaderProps;

    /** Props to spread to the ScrollView component. */
    ScrollViewProps?: RNScrollViewProps;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
    };

    /** Theme value overrides specific to this component. */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * [CollapsibleHeaderLayout](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--collapsible-header-layout) component
 *
 * This component displays a scrollable page with a header that shrinks between an expanded size and
 * a collapsed size as the page is scrolled. It uses a standard [`Header`](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--header)
 * and `ScrollView` component under the hood and
 * you can set all of the props directly to these components in order to configure them. The layout itself
 * is primarily responsible for tracking the current scroll position and updating the size of the `Header`.
 */
export const CollapsibleHeaderLayout: React.FC<CollapsibleLayoutProps> = (props) => {
    const {
        HeaderProps = { styles: {} } as PXBHeaderProps,
        theme: themeOverride,
        ScrollViewProps = {},
        styles = {},
        style,
        ...viewProps
    } = props;

    const theme = useTheme(themeOverride);
    const scrollRef = useRef(null);
    const animatedScrollValue = useRef(new Animated.Value(0)).current;
    const [scrollValue, setScrollValue] = useState(0);
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
    const [contentPaddingValue, setContentPaddingValue] = useState(
        headerVariant === 'dynamic' || startExpanded || false ? expandedHeight : collapsedHeight
    );

    // Animation function to smoothly animate the paddingTop of ScrollView
    const animatePadding = (padding: number): Animated.CompositeAnimation =>
        Animated.timing(contentPadding, {
            toValue: padding,
            duration: ANIMATION_LENGTH,
            useNativeDriver: false,
        });

    // Track the scroll position here too so we can minimize unnecessary updates
    const onScrollChange = useCallback(({ value: scrollDistance }: { value: number }) => {
        // save the current value of the animated scroll position
        setScrollValue(scrollDistance);
    }, []);
    // Track the padding current (non animated) value so we can minimize unnecessary updates
    const onPaddingChange = useCallback(({ value: newPadding }: { value: number }) => {
        // save the current value of the animated padding
        setContentPaddingValue(newPadding);
    }, []);

    // Set up listeners
    useEffect(() => {
        const scroll = animatedScrollValue.addListener(onScrollChange);
        const padding = contentPadding.addListener(onPaddingChange);
        return (): void => {
            animatedScrollValue.removeListener(scroll);
            contentPadding.removeListener(padding);
        };
    }, [onScrollChange, onPaddingChange]);

    // Update the ScrollView padding and scroll position
    const updateScrollView = (data: { padding: number | null; animate: boolean; scrollTo: number | null }): void => {
        const { padding, animate, scrollTo } = data;

        if (padding !== null && padding !== contentPaddingValue) {
            if (animate) animatePadding(padding).start();
            else contentPadding.setValue(padding);
        }
        // Only update the scroll position if it is not null and is different from the current
        if (scrollRef && scrollRef.current && scrollTo !== null && scrollTo !== scrollValue) {
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
                style={[
                    HeaderProps.styles ? HeaderProps.styles.root : {},
                    HeaderProps.style,
                    { position: 'absolute', zIndex: 100 },
                ]}
            />
            {/* TODO: Consider using a KeyboardAwareScrollView in the future or perhaps allowing for a FlatList */}
            <ScrollView
                testID={'pxb-scrollview'}
                scrollEventThrottle={32}
                // Spread the props...anything above can be overridden by user, anything below wil be merged or explicitly controlled by this component
                {...ScrollViewProps}
                ref={scrollRef}
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
                <Animated.View testID={'pxb-padded-view'} style={{ paddingTop: contentPadding }}>
                    {props.children}
                </Animated.View>
            </ScrollView>
        </View>
    );
};
