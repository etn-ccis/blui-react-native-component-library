import { ComponentType } from 'react';

export type WithTheme<T> = T & {
    theme: ReactNativePaper.Theme;
};

export type HeaderIcon = {
    /** Name of the icon */
    icon: ComponentType<{ size: number; color: string }>;

    /** Callback when icon is pressed */
    onPress?: () => void;
};

export type HeaderActionComponent = {
    component: JSX.Element;
    width?: number;
};

export type EdgeInsets = {
    top: number;
    left: number;
    bottom: number;
    right: number;
};
