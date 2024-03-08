import React, { ReactNode, useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { IconSource } from '../__types__';
import { Icon } from '../Icon';
import { useFontScale } from '../__contexts__/font-scale-context';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

type EmptyStateStyles = {
    root?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
    actions?: ViewStyle;
};

const makeStyles = (theme: ExtendedTheme, fontScale: number): StyleSheet.NamedStyles<EmptyStateStyles> =>
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
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            fontSize: 14,
            letterSpacing: 0,
        },
        actions: {
            marginTop: 16 * fontScale,
        },
    });

export type EmptyStateProps = ViewProps & {
    /** The main text to display */
    title: ReactNode;

    /** The secondary text to display */
    description?: ReactNode;

    /** The primary icon */
    icon?: IconSource;

    /** The size of the primary icon */
    iconSize?: number;

    /** Color override for the row icon
     * @default: theme.colors.disabled
     */
    iconColor?: string;

    /** Additional components to render below */
    actions?: JSX.Element;

    /** Style overrides for the elements */
    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        description?: StyleProp<TextStyle>;
        actions?: StyleProp<ViewStyle>;
    };

    /** Theme value overrides specific to this component. */
    theme?: $DeepPartial<ExtendedTheme>;
};

/**
 * [EmptyState](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--empty-state) component
 *
 * The `<EmptyState>` component is an element that can be used as a placeholder when no data is present (such as an empty list, or a placeholder page for future content). This is only used when no data is available, rather than during loading (see [empty states pattern](https://brightlayer-ui.github.io/patterns/empty-states)).
 */
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
    const theme = useExtendedTheme(themeOverride);
    const fontScale = useFontScale();
    const defaultStyles = makeStyles(theme, fontScale);

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 100;
        return Math.max(100, Math.min(200, iconSize));
    }, [iconSize]);

    const getColor = useCallback((color: string | undefined): string => color || theme.colors.disabled, [theme]);

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
