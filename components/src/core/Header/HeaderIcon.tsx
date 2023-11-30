import React from 'react';
import { Icon } from '../Icon';
import { useFontScaleSettings } from '../__contexts__/font-scale-context';
import { IconSource } from '../__types__';
import { ICON_SIZE } from './constants';
import { useColor } from './contexts/ColorContextProvider';

type HeaderIconProps = {
    /** A component to render for the icon  */
    icon?: IconSource;
};
/**
 * HeaderIcon component
 *
 * The HeaderIcon is a helper component that is used to properly size and space icons in the Header component.
 */
export const HeaderIcon: React.FC<HeaderIconProps> = (props) => {
    const { icon } = props;
    const { color } = useColor();
    const { disableScaling } = useFontScaleSettings();
    if (icon) {
        return <Icon source={icon} size={ICON_SIZE} color={color} allowFontScaling={!disableScaling} />;
    }
    return null;
};
