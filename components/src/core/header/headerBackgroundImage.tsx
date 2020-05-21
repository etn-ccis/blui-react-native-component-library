import React from 'react';
import { Animated, ImageSourcePropType } from 'react-native';
import { REGULAR_HEIGHT, EXTENDED_HEIGHT } from './constants';
import { useSearch } from './contexts/SearchContextProvider';
import { useHeaderHeight } from './contexts/HeaderHeightContextProvider';

type HeaderBackgroundProps = {
    /** Background image to render when header is expanded */
    backgroundImage?: ImageSourcePropType;
};
export const HeaderBackgroundImage: React.FC<HeaderBackgroundProps> = (props) => {
    const { backgroundImage } = props;
    const { searching } = useSearch();
    const { headerHeight } = useHeaderHeight();

    if (backgroundImage && !searching) {
        return (
            <Animated.Image
                testID={'header-background-image'}
                source={backgroundImage}
                resizeMethod={'resize'}
                style={{
                    position: 'absolute',
                    width: '100%',
                    resizeMode: 'cover',
                    height: headerHeight,
                    opacity: headerHeight.interpolate({
                        inputRange: [REGULAR_HEIGHT, EXTENDED_HEIGHT],
                        outputRange: [0.2, 0.3],
                    }),
                }}
            />
        );
    }
    return null;
};
