import { createContext, useContext } from 'react';
import { Animated } from 'react-native';

type HeaderHeightContextType = {
    headerHeight: Animated.Value | Animated.AnimatedInterpolation;
};

export const HeaderHeightContext = createContext<HeaderHeightContextType | null>(null);

export const useHeaderHeight = (): HeaderHeightContextType => {
    const context = useContext(HeaderHeightContext);
    if (context === null) {
        throw new Error('useHeaderHeight must be used within a HeaderHeightContextProvider');
    }
    return context;
};
