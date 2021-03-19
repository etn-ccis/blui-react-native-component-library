import React, { ComponentType, useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { H6, Subtitle2 } from '../typography';
import { $DeepPartial } from '@callstack/react-theme-provider';

const defaultStyles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        textAlign: 'center',
        marginTop: 16,
    },
    subtitle: {
        textAlign: 'center',
    },
    actions: {
        marginTop: 10,
    },
});

export type EmptyStateProps = ViewProps & {
    /* Primary text to display */
    title: string;

    /* Secondary text to display */
    description?: string;

    /* Icon to display */
    IconClass?: ComponentType<{ size: number; color: string }>;

    /** Props to pass to the Icon component */
    IconProps?: { size?: number; color?: string };

    /** Primary icon color */
    iconSize?: number;

    /** Primary icon color */
    iconColor?: string;

    /* Optional actions to render below the text */
    actions?: JSX.Element;

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        description?: StyleProp<TextStyle>;
        actions?: StyleProp<ViewStyle>;
    };

    /**
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * Empty State component
 *
 * Used as a placeholder when no content is available for a particular area/screen in your application.
 */
export const EmptyState: React.FC<EmptyStateProps> = (props) => {
    const {
        title,
        description,
        actions,
        IconClass,
        iconColor,
        iconSize,
        IconProps = {},
        styles = {},
        style,
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 100;
        return Math.max(100, Math.min(200, iconSize));
    }, [iconSize]);

    const getColor = useCallback(
        (color: string | undefined): string => {
            if (!color) return theme.colors.textSecondary || theme.colors.text;
            if (Object.keys(theme.colors).indexOf(color) >= 0)
                return theme.colors[color as keyof ReactNativePaper.Theme['colors']];
            return color;
        },
        [theme]
    );

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (IconClass) {
            return <IconClass size={normalizeIconSize()} color={getColor(iconColor)} {...IconProps} />;
        }
    }, [IconClass, IconProps, normalizeIconSize, getColor, iconColor]);

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {getIcon()}
            <H6 style={[defaultStyles.title, styles.title]}>{title}</H6>
            {description ? (
                <Subtitle2 color={'primary'} style={[defaultStyles.subtitle, styles.description]}>
                    {description}
                </Subtitle2>
            ) : null}
            {actions ? <View style={[defaultStyles.actions, styles.actions]}>{actions}</View> : null}
        </View>
    );
};
