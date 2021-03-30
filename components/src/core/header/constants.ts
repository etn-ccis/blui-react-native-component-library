import { PixelRatio } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const fontScale = PixelRatio.getFontScale();

export const EXTENDED_HEIGHT = 200 * fontScale + getStatusBarHeight(true);
export const REGULAR_HEIGHT = 56 * fontScale + getStatusBarHeight(true);
export const ICON_SIZE = 24;
export const ICON_SPACING = 16;
export const ANIMATION_LENGTH = 300;
