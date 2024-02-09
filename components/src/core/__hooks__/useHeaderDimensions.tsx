import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFontScale } from '../__contexts__/font-scale-context';

export type HeaderDimensions = {
    REGULAR_HEIGHT: number;
    EXTENDED_HEIGHT: number;
    LANDSCAPE: boolean;
    getScaledHeight: (height: number) => number;
};
/**
 * useHeaderDimensions hook
 *
 * This hook is used to provide the 'constant' values for the Header height in the collapsed
 * and expanded states. These values can change when the device rotates based on the safe areas
 * and presence or absence of a status bar.
 *
 * This hook listens for device rotation changes and makes sure the the correct constant values
 * are being returned
 *
 * @returns { REGULAR_HEIGHT, EXTENDED_HEIGHT, LANDSCAPE, getScaledHeight }
 */
export const useHeaderDimensions = (): HeaderDimensions => {
    const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();
    const fontScale = useFontScale();
    const insets = useSafeAreaInsets();
    const isLandscape = deviceWidth > deviceHeight;
    const heightWithStatusBar = (height: number): number => height * fontScale + insets.top;

    const HEIGHT = {
        EXTENDED: heightWithStatusBar(200),
        REGULAR: heightWithStatusBar(56),
    };

    const REGULAR_HEIGHT = HEIGHT.REGULAR;
    const EXTENDED_HEIGHT = HEIGHT.EXTENDED;

    const getScaledHeight = heightWithStatusBar;

    return {
        REGULAR_HEIGHT,
        EXTENDED_HEIGHT,
        LANDSCAPE: isLandscape,
        getScaledHeight,
    };
};
