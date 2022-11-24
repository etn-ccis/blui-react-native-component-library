import { createContext, useContext } from 'react';

type FontScaleContextType = {
    maxScaleFont: number;
    disableFontScaling?: boolean;
};

export const FontScaleContext = createContext<FontScaleContextType>({ maxScaleFont: 1 });
export const useFontScaleContext = (): FontScaleContextType => useContext(FontScaleContext);
