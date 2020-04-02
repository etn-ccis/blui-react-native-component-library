import React, { ComponentType } from 'react';
import { SvgProps } from 'react-native-svg';
import { IconProps } from 'react-native-vector-icons/Icon';

type IconSetArg = {
    IconClass: ComponentType<IconProps>;
    name: string;
};

type PxBlueIconArg = {
    IconClass: ComponentType<SvgProps>;
};

type IconArg = IconSetArg | PxBlueIconArg;

const isIconSetArg = (x: IconSetArg | PxBlueIconArg): x is IconSetArg => (x as any).name !== undefined;

type WrapIconProps = {
    size: number;
    color: string;
};
export const wrapIcon = (arg: IconArg): ((props: WrapIconProps) => Element) => {
    if (isIconSetArg(arg)) {
        const { name, IconClass } = arg;
        // eslint-disable-next-line react/display-name
        return (props: WrapIconProps): Element => (
            <IconClass name={name} color={props.color} size={props.size} testID={'icon'} />
        );
    }
    const { IconClass } = arg;
    // eslint-disable-next-line react/display-name
    return (props: WrapIconProps): Element => (
        <IconClass fill={props.color} width={props.size} height={props.size} testID={'icon'} />
    );
};
