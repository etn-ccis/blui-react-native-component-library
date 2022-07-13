import React from 'react';
import { Animated, ImageProps, ImageSourcePropType, StyleSheet, Text } from 'react-native';
import { useSearch } from './contexts/SearchContextProvider';
import { useHeaderHeight } from './contexts/HeaderHeightContextProvider';
import { useHeaderDimensions } from '../hooks/useHeaderDimensions';

const defaultStyles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
        width: '100%',
    },
});
type HeaderBackgroundProps = Omit<ImageProps, 'source'> & {
    /** Background image to render */
    backgroundImage?: ImageSourcePropType;
};

/**
 * HeaderBackgroundImage component
 *
 * The HeaderBackgroundImage is a helper component for organizing the contents in the Header. It is
 * used for displaying the background image and blending it with the background color.
 */
export const HeaderBackgroundImage: React.FC<HeaderBackgroundProps> = (props) => {
    const { backgroundImage, style, ...otherImageProps } = props;
    const { searching } = useSearch();
    const { headerHeight } = useHeaderHeight();

    const { REGULAR_HEIGHT, EXTENDED_HEIGHT } = useHeaderDimensions();

    if (backgroundImage && !searching) {
        return (
            <Animated.Image
                testID={'header-background-image'}
                resizeMethod={'resize'}
                {...otherImageProps}
                source={backgroundImage}
                style={[
                    defaultStyles.root,
                    style,
                    {
                        height: headerHeight,
                        opacity: headerHeight.interpolate({
                            inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                            outputRange: [0.2, 0.3],
                        }),
                    },
                ]}
            />
        );
    }
    return null;
};
