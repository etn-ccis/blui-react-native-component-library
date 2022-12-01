import React, { ComponentType } from 'react';
import { PixelRatio } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { IconProps } from 'react-native-vector-icons/Icon';
import { useFontScale } from '..';

type IconSetArg = {
    IconClass: ComponentType<IconProps>;
    name: string;
    flip?: boolean;
    allowFontScaling?: boolean;
};

type BrightLayerUiIconArg = {
    IconClass: ComponentType<SvgProps>;
    flip?: boolean;
    allowFontScaling?: boolean;
};

export type IconArg = IconSetArg | BrightLayerUiIconArg;

const isIconSetArg = (x: IconSetArg | BrightLayerUiIconArg): x is IconSetArg => (x as any).name !== undefined;

export type WrapIconProps = {
    /** The size of the icon to render */
    size: number;

    /** The color of the icon to render */
    color: string;

    /** If true, the icon will scale with the system font size */
    allowFontScaling?: boolean;
};
/**
 * [wrapIcon](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--icon-wrapper) function
 *
 * This function is a useful utility for making sure that icons you want to use
 * are in the proper form to be consumed by the Brightlayer UI components. Icons used by the
 * Brightlayer UI components must have the shape ({size, color}) => JSX.Element;
 *
 * This function can wrap SVG files or icons from react-native-vector-icons.
 *
 * @param arg an object representing the icon you wish to render
 * @returns A Component function that properly matches the expected icon shape
 */
export const wrapIcon = (arg: IconArg): ComponentType<WrapIconProps> => {
    const flipIcon = {
        transform: [{ scaleX: -1 }],
    };
    const { allowFontScaling = true, flip = false } = arg;

    // If it is a react-native-vector icon
    if (isIconSetArg(arg)) {
        const { name, IconClass } = arg;
        // eslint-disable-next-line react/display-name
        return (props: WrapIconProps): JSX.Element => {
            const { allowFontScaling: inlineScaling = allowFontScaling, size, color } = props;
            return (
                <IconClass
                    name={name}
                    color={color}
                    size={size}
                    allowFontScaling={inlineScaling}
                    testID={'icon'}
                    style={flip ? flipIcon : {}}
                />
            );
        };
    }
    // If it is a Brightlayer UI icon
    const { IconClass } = arg;
    // eslint-disable-next-line react/display-name
    return (props: WrapIconProps): JSX.Element => {
        const { allowFontScaling: inlineScaling = allowFontScaling, size, color } = props;
        const { maxScale, disableScaling } = useFontScale();
        const fontScale = inlineScaling
            || !disableScaling ? PixelRatio.getFontScale() < maxScale
                ? PixelRatio.getFontScale()
                : maxScale
            : 1;
        return (
            <IconClass
                fill={color}
                width={size * fontScale}
                height={size * fontScale}
                testID={'icon'}
                style={flip ? flipIcon : {}}
            />
        );
    };
};
