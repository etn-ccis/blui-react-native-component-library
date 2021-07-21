import { useWindowDimensions } from 'react-native';
import {
    EXTENDED_HEIGHT_LANDSCAPE,
    EXTENDED_HEIGHT_PORTRAIT,
    heightWithoutStatusBar,
    heightWithStatusBar,
    REGULAR_HEIGHT_LANDSCAPE,
    REGULAR_HEIGHT_PORTRAIT,
} from '../header/constants';

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
    const isLandscape = deviceWidth > deviceHeight;

    const REGULAR_HEIGHT = isLandscape ? REGULAR_HEIGHT_LANDSCAPE : REGULAR_HEIGHT_PORTRAIT;
    const EXTENDED_HEIGHT = isLandscape ? EXTENDED_HEIGHT_LANDSCAPE : EXTENDED_HEIGHT_PORTRAIT;

    const getScaledHeight = isLandscape ? heightWithoutStatusBar : heightWithStatusBar;

    return {
        REGULAR_HEIGHT,
        EXTENDED_HEIGHT,
        LANDSCAPE: isLandscape,
        getScaledHeight,
    };
};
