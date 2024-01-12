import { ComponentType } from 'react';
import { ImageSourcePropType } from 'react-native';

// Icon-Specific Types
export type IconComponentProps = {
    /** The size of the icon to render */
    size?: number;

    /** The color of the icon to render
     * @default: theme.colors.onSurface
     */
    color?: string;

    /** If true, the icon should scale with the system font size
     *
     * @default: true
     */
    allowFontScaling?: boolean;
};
export type IconFunctionProps = IconComponentProps & {
    /** The direction of the current device language */
    direction?: 'rtl' | 'ltr';
};

export type IconFamily = {
    name: string;
    family?: 'material' | 'brightlayer-ui' | 'material-community';
    direction?: 'rtl' | 'ltr' | 'auto';
    allowFontScaling?: boolean;
};
export type IconSourceBase = string | ImageSourcePropType;
export type IconSource = IconFamily | IconSourceBase | JSX.Element | ComponentType<IconFunctionProps>;

export type HeaderIcon = {
    /** Component to render for the icon */
    icon: IconSource;

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
