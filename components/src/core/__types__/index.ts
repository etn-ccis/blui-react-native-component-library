import { ComponentType } from 'react';
import { Theme } from 'react-native-paper';

export type WithTheme<T> = T & {
    theme: Theme;
};

export type HeaderIcon = {
    /** Name of the icon */
    icon: ComponentType<{ size: number; color: string }>;

    /** Callback when icon is pressed */
    onPress: () => void;
};
