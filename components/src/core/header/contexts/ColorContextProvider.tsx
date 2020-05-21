import { createContext, useContext } from 'react';

type ColorContextType = {
    color: string;
};

export const ColorContext = createContext<ColorContextType | null>(null);

export const useColor = (): ColorContextType => {
    const context = useContext(ColorContext);
    if (context === null) {
        throw new Error('useColor must be used within a ColorContextProvider');
    }
    return context;
};
