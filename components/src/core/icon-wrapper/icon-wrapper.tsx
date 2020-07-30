import React, { ComponentType } from 'react';
import { SvgProps } from 'react-native-svg';
import { IconProps } from 'react-native-vector-icons/Icon';

type IconSetArg = {
    IconClass: ComponentType<IconProps>;
    name: string;
    flip?: boolean;
};

type PxBlueIconArg = {
    IconClass: ComponentType<SvgProps>;
    flip?: boolean;
};

export type IconArg = IconSetArg | PxBlueIconArg;

const isIconSetArg = (x: IconSetArg | PxBlueIconArg): x is IconSetArg => (x as any).name !== undefined;

export type WrapIconProps = {
    size: number;
    color: string;
};
export const wrapIcon = (arg: IconArg): ComponentType<WrapIconProps> => {
    const flipIcon = {
        transform: [{ scaleX: -1 }],
    };

    if (isIconSetArg(arg)) {
        const { name, IconClass, flip = false } = arg;
        // eslint-disable-next-line react/display-name
        return (props: WrapIconProps): JSX.Element => (
            <IconClass name={name} color={props.color} size={props.size} testID={'icon'} style={flip ? flipIcon : {}} />
        );
    }
    const { IconClass, flip = false } = arg;
    // eslint-disable-next-line react/display-name
    return (props: WrapIconProps): JSX.Element => (
        <IconClass
            fill={props.color}
            width={props.size}
            height={props.size}
            testID={'icon'}
            style={flip ? flipIcon : {}}
        />
    );
};
