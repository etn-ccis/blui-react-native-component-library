import React, { ComponentType, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';
import { H6, Subtitle } from '../typography';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export type EmptyStateProps = {
    /* Primary text to display */
    title: string;

    /* Secondary text to display */
    description?: string;

    /* Icon to display */
    IconClass?: ComponentType<{ size: number; color: string }>;

    /** Primary icon color */
    iconSize?: number;

    /** Primary icon color */
    iconColor?: string;

    /* Optional actions to render below the text */
    actions?: JSX.Element;

    /**
     * Overrides for theme
     */
    theme?: Theme;
};

/**
 * Empty State component
 *
 * Used as a placeholder when no content is available for a particular area/screen in your application.
 */
export const EmptyState: React.FC<EmptyStateProps> = (props) => {
    const { title, description, actions, IconClass, iconColor, iconSize } = props;
    const theme = useTheme(props.theme);

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 100;
        return Math.max(100, Math.min(200, iconSize));
    }, [iconSize]);

    const getColor = useCallback(
        (color: string | undefined): string => {
            if (!color) return theme.colors.text;
            if (Object.keys(theme.colors).indexOf(color) >= 0) return theme.colors[color as keyof Theme['colors']];
            return color;
        },
        [theme]
    );

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (IconClass) {
            return <IconClass size={normalizeIconSize()} color={getColor(iconColor)} />;
        }
    }, [IconClass, normalizeIconSize, getColor, iconColor]);

    return (
        <View style={styles.container}>
            {getIcon()}
            <H6 style={{ textAlign: 'center' }}>{title}</H6>
            {description ? (
                <Subtitle color={'primary'} style={{ textAlign: 'center' }}>
                    {description}
                </Subtitle>
            ) : null}
            {actions ? <View style={{ marginTop: 10 }}>{actions}</View> : null}
        </View>
    );
};
