import React, { createContext, ReactNode, useContext } from 'react';
import { PixelRatio } from 'react-native';

type FontScaleContextType = {
    maxScale: number;
    minScale: number;
    adjustsFontSizeToFit?: boolean;
    disableScaling?: boolean;
};

const FontScaleContext = createContext<FontScaleContextType>({
    maxScale: 100,
    minScale: 0.01,
    adjustsFontSizeToFit: true,
    disableScaling: false,
});

export const FontScaleProvider: React.FC<FontScaleContextType & { children: ReactNode }> = (props) => (
    <FontScaleContext.Provider value={{ ...props }}>{props.children}</FontScaleContext.Provider>
);
/**
 *
 * @returns the current settings specified in the nearest FontScaleContext
 */
export const useFontScaleSettings = (): FontScaleContextType => useContext(FontScaleContext);
/**
 * @param forceEnable if true, get the clamped fontScale even if the Context has disabled scaling
 * @returns the clamped fontScale value taking into account settings in the FontScaleContext
 */
export const useFontScale = (forceEnable = false): number => {
    const { disableScaling, maxScale, minScale, adjustsFontSizeToFit } = useFontScaleSettings();
    const systemScale = PixelRatio.getFontScale();
    // Clamp the scale between min and max
    return (disableScaling || !adjustsFontSizeToFit) && !forceEnable
        ? 1
        : Math.min(maxScale, Math.max(minScale, systemScale));
};
