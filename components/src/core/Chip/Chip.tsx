/**
 * @format
 * @flow
 */

import React from 'react';
import { MD3Theme, Chip as PaperChip, ChipProps as PaperChipProps, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../Icon';
import { IconSource } from '../__types__';

/**
 * Props for the Chip component.
 *
 * @typedef {object} ChipProps
 * @prop {string} [children] - The content to be displayed inside the Chip.
 * @prop {IconSource} [icon] - The source for the Icon displayed in the Chip.
 * @prop {string} [iconColor] - The color of the Icon in the Chip.
 * @prop {string} [textColor] - The color of the text content in the Chip.
 * @prop {string} [chipColor] - The background color of the Chip.
 * @prop {string} [borderColor] - The border color of the Chip.
 * @prop {boolean} [selected] - Whether the Chip is in a selected state.
 * @prop {boolean} [disabled] - Whether the Chip is in a disabled state.
 * @prop {$DeepPartial<MD3Theme>} [theme] - Theme value overrides specific to this component.
 * @prop {React.ReactElement} [avatar] - Avatar component to be displayed in the Chip.
 * @prop {string} [mode='outlined'] - Chip mode, either 'outlined' or 'elevated'.
 */

/**
 * A customizable Chip component.
 *
 * @param {ChipProps} props - The props for the Chip component.
 * @returns {JSX.Element} - The rendered Chip component.
 */

export type ChipProps = Omit<PaperChipProps, 'icon' | 'mode' | 'selectedColor'> & {
    theme?: $DeepPartial<MD3Theme>;
    iconColor?: string;
    textColor?: string;
    chipColor?: string;
    borderColor?: string;
    icon?: IconSource;
    mode?: 'elevated' | 'outlined'; // Updated modes
    avatar?: React.ReactElement; // New prop for passing Avatar component
};

export const Chip: React.FC<ChipProps> = (props) => {
    const {
        children,
        icon,
        iconColor,
        style,
        textStyle,
        mode = 'outlined',
        selected,
        disabled,
        theme: themeOverride,
        avatar,
        chipColor,
        borderColor,
        textColor,
        ...rest
    } = props;

    //@ts-ignore
    const theme = useTheme(themeOverride) as MD3Theme;

    const isOutlined = mode === 'outlined';
    const isElevated = mode === 'elevated';

    // @TODO update the disabled colors once the condition is set in place
    const defaultChipColor = isOutlined
        ? disabled
        //the chip background color should be transparent in case it is set to disable in outline mode
            ? 'transparent'
            : selected
            //the chip background color should be primary[80] in case it is set to selected in outline mode
            ? theme.colors.primaryContainer
            //the chip background color should be transparent in case it is set to unselected in outline mode
            : 'transparent'
        : isElevated
        ? disabled
            ?
            //the chip background color should be neutral[94] in case it is set to disable in elevated mode 
            //@ts-ignore
              theme.colors.disabledContainer
            : selected

            //the chip background color should be primary[80] in case it is set to selected in elevated mode
            ? theme.colors.primaryContainer

            //the chip background color should be neutral[97] in case it is set to unselected in elevated mode
            : //@ts-ignore
              theme.colors.surfaceContainerLow
        : undefined;

    const DefaultTextColor = isOutlined
        ? disabled
        //the chip text color should be neutral[90] in case it is set to disable in outline mode
            ? //@ts-ignore
              theme.colors.disabled
            : selected
            //the chip text color should be primary[80] in case it is set to selected in outline mode
            ? theme.colors.onPrimaryContainer
            //the chip text color should be neutralVariant[30] in case it is set to unselected in outline mode
            : theme.colors.onSurfaceVariant
        : isElevated
        ? disabled
        //@ts-ignore
            //the chip text color should be neutralVariant[50] in case it is set to disable in elevated mode
            ? theme.colors.onDisabledContainer
            : selected
            //the chip text color should be BLUIColors.primary[30] in case it is set to selected in elevated mode
            ? theme.colors.onPrimaryContainer
            //the chip text color should be neutralVariant[30] in case it is set to unselected in elevated mode
            : theme.colors.onSurfaceVariant
        : undefined;

    const getIcon = (): JSX.Element | undefined => {
        if (icon) {
            return <Icon source={icon} size={18} color={iconColor ? iconColor : textColor? textColor:DefaultTextColor} />;
        } else if (avatar) {
            return avatar; // Show the passed Avatar component
        }
        return undefined;
    };
    //@ts-ignore
    const chipStyle = isElevated ? {} : selected ? {} :{ borderWidth: 1, borderColor: borderColor ? borderColor : disabled? theme.colors.disabled : theme.colors.outline };

    return (
        <>
        {icon ? (
        <PaperChip
            style={[
                {
                    backgroundColor: chipColor ? chipColor : defaultChipColor,
                },
                style,
                chipStyle,
            ]}
            textStyle={[{ color: textColor ? textColor : DefaultTextColor, fontFamily: 'OpenSans-Regular' }, textStyle]}
            showSelectedCheck={false}
            selected={selected}
            disabled={disabled}
            elevated={isElevated}
            icon={()=>getIcon()}
            {...rest}
        >
            {children}
        </PaperChip>)
        :avatar?( 
    <PaperChip
            style={[
                {
                    backgroundColor: chipColor ? chipColor : defaultChipColor,
                },
                style,
                chipStyle,
            ]}
            textStyle={[{ color: textColor ? textColor : DefaultTextColor, fontFamily: 'OpenSans-Regular' }, textStyle]}
            showSelectedCheck={false}
            selected={selected}
            disabled={disabled}
            avatar={avatar}
            elevated={isElevated}
            {...rest}
        >
            {children}
        </PaperChip>
):(
    <PaperChip
            style={[
                {
                    backgroundColor: chipColor ? chipColor : defaultChipColor,
                },
                style,
                chipStyle,
            ]}
            textStyle={[{ color: textColor ? textColor : DefaultTextColor, fontFamily: 'OpenSans-Regular' }, textStyle]}
            showSelectedCheck={false}
            selected={selected}
            disabled={disabled}
            elevated={isElevated}
            {...rest}
        >
            {children}
        </PaperChip>
)
}
</>
    );
};
