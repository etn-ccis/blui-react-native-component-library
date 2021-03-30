import React, { ComponentType } from 'react';
import { PixelRatio } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { IconProps } from 'react-native-vector-icons/Icon';

type IconSetArg = {
    IconClass: ComponentType<IconProps>;
    name: string;
    flip?: boolean;
    allowFontScaling?: boolean;
};

type PxBlueIconArg = {
    IconClass: ComponentType<SvgProps>;
    flip?: boolean;
    allowFontScaling?: boolean;
};

export type IconArg = IconSetArg | PxBlueIconArg;

const isIconSetArg = (x: IconSetArg | PxBlueIconArg): x is IconSetArg => (x as any).name !== undefined;

export type WrapIconProps = {
    size: number;
    color: string;
    allowFontScaling?: boolean;
};
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
    // If it is a PX Blue icon
    const { IconClass } = arg;
    // eslint-disable-next-line react/display-name
    return (props: WrapIconProps): JSX.Element => {
        const { allowFontScaling: inlineScaling = allowFontScaling, size, color } = props;
        const fontScale = inlineScaling ? PixelRatio.getFontScale() : 1;
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
