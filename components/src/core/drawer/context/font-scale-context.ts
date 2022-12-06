import { createContext, useContext } from 'react';

type FontScaleContextType = {
    maxScale: number;
    minScale: number;
    disableScaling?: boolean;
};

export const FontScaleContext = createContext<FontScaleContextType>({
    maxScale: 100,
    minScale: 0.01,
    disableScaling: false,
});
export const useFontScale = (): FontScaleContextType => useContext(FontScaleContext);
