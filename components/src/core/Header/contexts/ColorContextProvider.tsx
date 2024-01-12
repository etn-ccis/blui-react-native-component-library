import { createContext, useContext } from 'react';

type ColorContextType = {
    color: string;
};

export const ColorContext = createContext<ColorContextType | null>(null);

/**
 * useColor hook
 *
 * This hook will provide you with the current text color value that is set at the top level
 * of the Header component. We expose this through a Context in order to avoid passing this prop
 * through every layer of the component hierarchy. This hook can only be called from within a
 * ColorContext.Provider.
 */
export const useColor = (): ColorContextType => {
    const context = useContext(ColorContext);
    if (context === null) {
        throw new Error('useColor must be used within a ColorContextProvider');
    }
    return context;
};
