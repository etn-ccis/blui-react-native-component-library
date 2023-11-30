import React from 'react';
import { MD3Theme, Chip as PaperChip, ChipProps as PaperChipProps, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { TextStyle } from 'react-native';
import { Icon } from '../Icon';
import { IconSource } from '../__types__';

type ChipStyles = {
    label?: TextStyle;
};

const makeStyles = (): ChipStyles => ({
    label: {
        fontFamily: 'OpenSans-Regular', // Customize with your desired font family
    },
});

export type ChipProps = Omit<PaperChipProps, 'icon' | 'mode'> & {
    theme?: $DeepPartial<MD3Theme>;
    iconColor?: string;
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
        ...rest
    } = props;

    //@ts-ignore
    const theme = useTheme(themeOverride) as MD3Theme;
    const defaultStyles = makeStyles();

    const isOutlined = mode === 'outlined';
    const isElevated = mode === 'elevated';

    // @TODO update the disabled colors once the condition is set in place
    const chipColor = isOutlined
        ? disabled
            ? theme.colors.onPrimary
            : selected
            ? theme.colors.primaryContainer
            : theme.colors.onPrimary
        : isElevated
        ? disabled
            ? //@ts-ignore
              theme.colors.surfaceContainer
            : selected
            ? theme.colors.primaryContainer
            : //@ts-ignore
              theme.colors.surfaceContainerLow
        : undefined;

    const borderColor = isOutlined
        ? disabled
            ? //@ts-ignore
              theme.colors.surfaceContainerHighest
            : selected
            ? theme.colors.primaryContainer
            : theme.colors.onSurfaceVariant
        : isElevated
        ? disabled
            ? //@ts-ignore
              theme.colors.surfaceContainerLow
            : selected
            ? theme.colors.primaryContainer
            : //@ts-ignore
              theme.colors.surfaceContainerLow
        : undefined;

    const textColor = isOutlined
        ? disabled
            ? //@ts-ignore
              theme.colors.surfaceContainerHighest
            : selected
            ? theme.colors.onPrimaryContainer
            : theme.colors.onSurfaceVariant
        : isElevated
        ? disabled
            ? theme.colors.outline
            : selected
            ? theme.colors.onPrimaryContainer
            : theme.colors.onSurfaceVariant
        : undefined;

    const getIcon = (): JSX.Element | undefined => {
        if (icon) {
            return <Icon source={icon} size={18} color={iconColor ? iconColor : textColor} />;
        } else if (avatar) {
            return avatar; // Show the passed Avatar component
        }
        return undefined;
    };

    return (
        <PaperChip
            style={[{ backgroundColor: chipColor, borderWidth: 1, borderColor: borderColor }, style]}
            textStyle={[{ color: textColor }, defaultStyles.label, textStyle]}
            showSelectedCheck={false}
            selected={selected}
            disabled={disabled}
            avatar={getIcon()}
            elevated={isElevated ? true : false}
            {...rest}
        >
            {children}
        </PaperChip>
    );
};
