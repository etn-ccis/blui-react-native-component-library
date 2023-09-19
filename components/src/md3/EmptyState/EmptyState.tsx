import React, { useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, ViewProps } from 'react-native';
import { useTheme, MD3Theme, Text } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { IconSource } from '../__types__';
import { Icon } from '../Icon';
import { useFontScale } from '../__contexts__/font-scale-context';

type EmptyStateStyles = {
    root?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
    actions?: ViewStyle;
};

const makeStyles = (theme: MD3Theme, fontScale: number): StyleSheet.NamedStyles<EmptyStateStyles> =>
    StyleSheet.create({
        root: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
        },
        title: {
            textAlign: 'center',
            marginTop: 16 * fontScale,
            fontSize: 22,
            letterSpacing: 0,
            color: theme.colors.onSurface,
        },
        description: {
            color: theme.colors.onSurface,
            textAlign: 'center',
            fontSize: 14,
            letterSpacing: 0,
        },
        actions: {
            marginTop: 16 * fontScale,
        },
    });

export type EmptyStateProps = ViewProps & {
    title: string;
    description?: string;
    icon?: IconSource;
    iconSize?: number;
    iconColor?: string;
    actions?: JSX.Element;
    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        description?: StyleProp<TextStyle>;
        actions?: StyleProp<ViewStyle>;
    };
    theme?: $DeepPartial<MD3Theme>;
};

export const EmptyState: React.FC<EmptyStateProps> = (props: EmptyStateProps) => {
    const {
        title,
        description,
        actions,
        icon,
        iconColor,
        iconSize,
        styles = {},
        style,
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);
    const fontScale = useFontScale();
    const defaultStyles = makeStyles(theme, fontScale);

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 100;
        return Math.max(100, Math.min(200, iconSize));
    }, [iconSize]);

    // @TODO: change the color to theme.colors.disabled once the theme is in place
    const getColor = useCallback((color: string | undefined): string => color || theme.colors.outlineVariant, [theme]);

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (icon) {
            return <Icon source={icon} size={normalizeIconSize()} color={getColor(iconColor)} />;
        }
    }, [icon, normalizeIconSize, getColor, iconColor]);

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {getIcon()}
            <Text variant={'titleLarge'} style={[defaultStyles.title, styles.title]}>
                {title}
            </Text>
            {description ? (
                <Text variant={'bodyMedium'} style={[defaultStyles.description, styles.description]}>
                    {description}
                </Text>
            ) : null}
            {actions ? <View style={[defaultStyles.actions, styles.actions]}>{actions}</View> : null}
        </View>
    );
};
