import React from 'react';
import { Animated, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet } from 'react-native';
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
    },
});
type HeaderBackgroundProps = {
    /** Background image to render when header is expanded */
    backgroundImage?: ImageSourcePropType;

    style?: StyleProp<ImageStyle>;
};
export const HeaderBackgroundImage: React.FC<HeaderBackgroundProps> = (props) => {
    const { backgroundImage, style } = props;
    const { searching } = useSearch();
    const { headerHeight } = useHeaderHeight();

    const {REGULAR_HEIGHT, EXTENDED_HEIGHT} = useHeaderDimensions();

    if (backgroundImage && !searching) {
        return (
            <Animated.Image
                testID={'header-background-image'}
                source={backgroundImage}
                resizeMethod={'resize'}
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
