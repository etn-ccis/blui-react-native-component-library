/**
 * @format
 * @flow
 */

import React from 'react';
import { Chip as PaperChip, ChipProps as PaperChipProps } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { Icon } from '../Icon';
import { IconSource } from '../__types__';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { fontStyleRegular } from '../Utility/shared';
import { StyleProp, ViewStyle } from 'react-native';

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
 * @prop {$DeepPartial<ExtendedTheme>} [theme] - Theme value overrides specific to this component.
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
    /**
     * @prop {$DeepPartial<ExtendedTheme>} [theme] - Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
    /**
     * @prop {string} [iconColor] - The color of the Icon in the Chip.
     */
    iconColor?: string;
    /**
     * @prop {string} [textColor] - The color of the text content in the Chip.
     */
    textColor?: string;
    /**
     *  @prop {string} [chipColor] - The background color of the Chip.
     */
    chipColor?: string;
    /**
     *  @prop {string} [borderColor] - The border color of the Chip.
     */
    borderColor?: string;
    /**
     * @prop {IconSource} [icon] - The source for the Icon displayed in the Chip.
     */
    icon?: IconSource;
    /**
     * @prop {string} [mode='outlined'] - Chip mode, either 'outlined' or 'elevated' Default is outlined.
     */
    mode?: 'elevated' | 'outlined'; // Updated modes
    /**
     * @prop {React.ReactElement} [avatar] - Avatar component to be displayed in the Chip.
     */
    avatar?: React.ReactElement; // New prop for passing Avatar component
    /**
     * Style overrides for internal elements. The styles you provide will be combined with the default styles.
     */
    styles?: {
        root?: StyleProp<ViewStyle>;
    };
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
        avatar,
        chipColor,
        borderColor,
        textColor,
        theme: themeOverride,
        styles = {},
        ...rest
    } = props;

    const theme = useExtendedTheme(themeOverride);
    const isOutlined = mode === 'outlined';
    const isElevated = mode === 'elevated';

    const defaultChipColor = isOutlined
        ? disabled
            ? //the chip background color should be transparent in case it is set to disable in outline mode
              'transparent'
            : selected
            ? //the chip background color should be primary[80] in case it is set to selected in outline mode
              theme.colors.primaryContainer
            : //the chip background color should be transparent in case it is set to unselected in outline mode
              'transparent'
        : disabled
        ? //the chip background color should be neutral[10] 5% in case it is set to disable in elevated mode
          theme.colors.disabledContainer
        : selected
        ? //the chip background color should be primary[80] in case it is set to selected in elevated mode
          theme.colors.primaryContainer
        : //the chip background color should be neutral[97] in case it is set to unselected in elevated mode
          theme.colors.surfaceContainerLow;

    const DefaultTextColor = isOutlined
        ? disabled
            ? //the chip text color should be neutral[10] 20% in case it is set to disable in outline mode
              theme.colors.disabled
            : selected
            ? //the chip text color should be primary[80] in case it is set to selected in outline mode
              theme.colors.onPrimaryContainer
            : //the chip text color should be neutralVariant[30] in case it is set to unselected in outline mode
              theme.colors.onSurfaceVariant
        : disabled
        ? //the chip text color should be neutral[10] 25% in case it is set to disable in elevated mode
          theme.colors.onDisabledContainer
        : selected
        ? //the chip text color should be BLUIColors.primary[30] in case it is set to selected in elevated mode
          theme.colors.onPrimaryContainer
        : //the chip text color should be neutralVariant[30] in case it is set to unselected in elevated mode
          theme.colors.onSurfaceVariant;

    const getIcon = (): JSX.Element | undefined => {
        if (icon) {
            return (
                <Icon
                    source={icon}
                    size={18}
                    color={iconColor ? iconColor : textColor ? textColor : DefaultTextColor}
                />
            );
        } else if (avatar) {
            return avatar; // Show the passed Avatar component
        }
        return undefined;
    };
    const chipStyle = isElevated
        ? {}
        : selected
        ? {}
        : {
              borderWidth: 1,
              borderColor: borderColor ? borderColor : disabled ? theme.colors.disabled : theme.colors.outline,
          };

    const renderCloseIcon = (): JSX.Element => <Icon source={{ name: 'close' }} size={18} color={DefaultTextColor} />;
    const renderIcon = (): JSX.Element | undefined => getIcon();

    return (
        <>
            {icon ? (
                <PaperChip
                    style={[
                        {
                            backgroundColor: chipColor ? chipColor : defaultChipColor,
                        },
                        styles.root,
                        style,
                        chipStyle,
                    ]}
                    textStyle={[{ color: textColor ? textColor : DefaultTextColor, ...fontStyleRegular }, textStyle]}
                    showSelectedCheck={false}
                    selected={selected}
                    disabled={disabled}
                    {...(isElevated && { elevated: !disabled })}
                    closeIcon={renderCloseIcon}
                    icon={renderIcon}
                    {...rest}
                >
                    {children}
                </PaperChip>
            ) : avatar ? (
                <PaperChip
                    style={[
                        {
                            backgroundColor: chipColor ? chipColor : defaultChipColor,
                            paddingVertical: avatar.props.size ? (avatar.props.size > 24 ? 4 : 0) : 0,
                        },
                        styles.root,
                        style,
                        chipStyle,
                    ]}
                    textStyle={[{ color: textColor ? textColor : DefaultTextColor, ...fontStyleRegular }, textStyle]}
                    showSelectedCheck={false}
                    selected={selected}
                    disabled={disabled}
                    avatar={React.cloneElement(avatar, {
                        style: avatar.props.size
                            ? {
                                  height: avatar.props.size,
                                  width: avatar.props.size,
                                  borderRadius: avatar.props.size,
                                  ...avatar.props.style,
                              }
                            : {},
                    })}
                    {...(isElevated && { elevated: !disabled })}
                    closeIcon={renderCloseIcon}
                    {...rest}
                >
                    {children}
                </PaperChip>
            ) : (
                <PaperChip
                    style={[
                        {
                            backgroundColor: chipColor ? chipColor : defaultChipColor,
                        },
                        styles.root,
                        style,
                        chipStyle,
                    ]}
                    textStyle={[{ color: textColor ? textColor : DefaultTextColor, ...fontStyleRegular }, textStyle]}
                    showSelectedCheck={false}
                    selected={selected}
                    disabled={disabled}
                    {...(isElevated && { elevated: !disabled })}
                    closeIcon={renderCloseIcon}
                    {...rest}
                >
                    {children}
                </PaperChip>
            )}
        </>
    );
};
