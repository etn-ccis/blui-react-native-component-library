import { PixelRatio } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const fontScale = PixelRatio.getFontScale();

export const heightWithStatusBar = (height: number): number => height * fontScale + getStatusBarHeight(true);

export const EXTENDED_HEIGHT = heightWithStatusBar(200);
export const REGULAR_HEIGHT = heightWithStatusBar(56);
export const ICON_SIZE = 24;
export const ICON_SPACING = 16;
export const ANIMATION_LENGTH = 300;
