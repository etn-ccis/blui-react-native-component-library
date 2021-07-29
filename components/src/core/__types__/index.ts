import { ComponentType } from 'react';
import { ImageSourcePropType } from 'react-native';

// Icon-Specific Types
export type IconComponentProps = {
    /** The size of the icon to render */
    size: number;

    /** The color of the icon to render
     *
     * Default: Theme.colors.text
     */
    color: string; // TODO make this not required

    /** If true, the icon should scale with the system font size
     *
     * Default: true
     */
    allowFontScaling?: boolean;
};
export type IconFunctionProps = IconComponentProps & {
    /** The direction of the current device language */
    direction?: 'rtl' | 'ltr';
};

export type IconFamily = {
    name: string;
    family?: 'material' | 'pxblue' | 'material-community';
    direction?: 'rtl' | 'ltr' | 'auto';
    allowFontScaling?: boolean;
};
export type IconSourceBase = string | ImageSourcePropType;
export type IconSource = IconFamily | IconSourceBase | JSX.Element | ComponentType<IconFunctionProps>;

export type HeaderIcon = {
    /** Name of the icon */
    icon: ComponentType<IconFunctionProps>;

    /** Callback when icon is pressed */
    onPress?: () => void;
};

export type HeaderAvatar = {
    component: JSX.Element;
};

export type EdgeInsets = {
    top: number;
    left: number;
    bottom: number;
    right: number;
};
