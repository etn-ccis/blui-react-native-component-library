import { getStatusBarHeight } from 'react-native-status-bar-height';

export const EXTENDED_HEIGHT = 200 + getStatusBarHeight(true);
export const REGULAR_HEIGHT = 56 + getStatusBarHeight(true);
export const ICON_SIZE = 24;
export const ICON_SPACING = 16;
export const ANIMATION_LENGTH = 300;
