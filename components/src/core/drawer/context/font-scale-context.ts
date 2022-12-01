import { createContext, useContext } from 'react';

type FontScaleContextType = {
    maxScale: number;
    disableScaling?: boolean;
};

export const FontScaleContext = createContext<FontScaleContextType>({ maxScale: 100, disableScaling: false });
export const useFontScale = (): FontScaleContextType => useContext(FontScaleContext);
