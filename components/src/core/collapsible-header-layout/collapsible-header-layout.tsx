import React, { useCallback, useRef } from 'react';
import { Animated, StatusBar, ViewProps, View, SafeAreaView } from 'react-native';
import color from 'color';
import { useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { H6 } from '../typography';
import { HeaderProps as PXBHeaderProps, heightWithStatusBar } from '../header';
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
     * Default: 64 desktop, 56 mobile
     */
    collapsedHeight?: number;

    /**
     * Height of the App Bar when fully expanded
     * Default: 200
     */
    expandedHeight?: number;

    /**
     * Current mode of the app bar:
     * - 'expanded' locks the app bar at the expandedHeight,
     * - 'collapsed' locks it at the collapsedHeight,
     * - 'dynamic' resizes the toolbar based on the window scroll position.
     * Default: dynamic
     */
    mode?: 'expanded' | 'collapsed' | 'dynamic';

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
        theme: themeOveride,
        collapsedHeight: collapsedHeightProp = 56,
        expandedHeight: expandedHeightProp = 150,
        mode = 'dynamic',
        // ...viewProps
    } = props;
    const theme = useTheme(themeOveride);

    const collapsedHeight = heightWithStatusBar(collapsedHeightProp);
    const expandedHeight = heightWithStatusBar(expandedHeightProp);

    const scrollRef = useRef(null);
    const scrollAnimValue = useRef(new Animated.Value(0)).current;
    const calculatedHeight = Animated.subtract(new Animated.Value(expandedHeight), scrollAnimValue);

    const getHeaderBackgroundColor = useCallback((): string => HeaderProps.backgroundColor || theme.colors.primary, [
        theme,
        HeaderProps.backgroundColor,
    ]);

    const statusBarStyle = useCallback(
        (): 'light-content' | 'dark-content' =>
            color(getHeaderBackgroundColor()).isDark() ? 'light-content' : 'dark-content',
        [getHeaderBackgroundColor]
    );

    const getHeaderHeight = (): number | Animated.AnimatedInterpolation =>
        mode === 'collapsed'
            ? collapsedHeight
            : mode === 'expanded'
            ? expandedHeight
            : calculatedHeight.interpolate({
                  inputRange: [collapsedHeight, expandedHeight],
                  outputRange: [collapsedHeight, expandedHeight],
                  extrapolate: 'clamp',
              });

    return (
        <>
            <StatusBar barStyle={statusBarStyle()} />
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Animated.View
                    style={{
                        marginTop: 0,
                        height: getHeaderHeight(),
                        backgroundColor: getHeaderBackgroundColor(),
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                    }}
                >
                    <SafeAreaView style={{ height: '100%', overflow: 'hidden', justifyContent: 'flex-end' }}>
                        <View style={{ padding: 16 }}>
                            <H6 style={{ color: 'white' }}>{`What's Up`}</H6>
                        </View>
                    </SafeAreaView>
                </Animated.View>

                {/* This kinda works, but we need to do some tweaking to the Header to take in a height prop */}
                {/* <Header
                    expandable={true}
                    title={'South Tin Mill'}
                    subtitle={'Gary Steel Works'}
                    info={'Online'}
                    // @ts-ignore
                    height={scrollAnimValue.interpolate({
                        inputRange: [0, EXTENDED_HEIGHT - REGULAR_HEIGHT],
                        outputRange: [EXTENDED_HEIGHT, REGULAR_HEIGHT],
                        extrapolate: 'clamp'
                    })}
                    style={{position: 'absolute', zIndex: 100}}
                    navigation={{
                        icon: MenuIcon,
                        onPress: (): void => {
                            // navigation.openDrawer();
                        },
                    }}
                    actionItems={[
                        {
                            component: (
                                <UserMenuExample
                                    onToggleRTL={()=>{}}
                                    onToggleTheme={(): void => {}}
                                />
                            ),
                        },
                    ]}
                    backgroundImage={backgroundImage}
                    searchableConfig={{ placeholder: 'Search', autoFocus: true }}
                /> */}

                <Animated.ScrollView
                    ref={scrollRef}
                    style={{ paddingTop: mode === 'collapsed' ? collapsedHeight : expandedHeight }}
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
                            listener: () => {},
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
