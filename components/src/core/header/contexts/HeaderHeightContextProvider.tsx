import { createContext, useContext } from 'react';
import { Animated } from 'react-native';

type HeaderHeightContextType = {
    headerHeight: Animated.Value | Animated.AnimatedInterpolation<string | number>;
};

export const HeaderHeightContext = createContext<HeaderHeightContextType | null>(null);

/**
 * useHeaderHeight hook
 *
 * This hook will provide you with the current height of the Header component. We expose this through a Context in order to avoid passing this prop
 * through every layer of the component hierarchy. This hook can only be called from within a
 * HeaderHeightContext.Provider.
 */
export const useHeaderHeight = (): HeaderHeightContextType => {
    const context = useContext(HeaderHeightContext);
    if (context === null) {
        throw new Error('useHeaderHeight must be used within a HeaderHeightContextProvider');
    }
    return context;
};
