import React, { useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, ViewProps, PixelRatio } from 'react-native';
import { useTheme } from 'react-native-paper';
import { H6, Subtitle2 } from '../typography';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { IconSource } from '../__types__';
import { Icon } from '../icon';

type EmptyStateStyles = {
    root?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
    actions?: ViewStyle;
};
const makeStyles = (theme: ReactNativePaper.Theme, fontScale: number): StyleSheet.NamedStyles<EmptyStateStyles> =>
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
        },
        description: {
            color:
                (theme.dark ? theme.colors.textPalette?.secondary : theme.colors.textPalette?.primary) ||
                theme.colors.text,
            textAlign: 'center',
        },
        actions: {
            marginTop: 16 * fontScale,
        },
    });

export type EmptyStateProps = ViewProps & {
    /** The primary text to display (first line) */
    title: string;

    /** The secondary text to display (second line) */
    description?: string;

    /** A component to render for the primary icon */
    icon?: IconSource;

    /** The size of the primary icon (100-200) */
    iconSize?: number;

    /** The color of the primary icon */
    iconColor?: string;

    /** Additional components to render below the text (e.g., action buttons) */
    actions?: JSX.Element;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        description?: StyleProp<TextStyle>;
        actions?: StyleProp<ViewStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * [EmptyState](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--empty-state) component
 *
 * Used as a placeholder when no content is available for a particular area/screen in your application.
 * It displays an icon with up to two lines of text and has an area for you to add custom actionable content or
 * calls-to-action.
 */
export const EmptyState: React.FC<EmptyStateProps> = (props) => {
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
    const defaultStyles = makeStyles(theme, PixelRatio.getFontScale());

    const normalizeIconSize = useCallback((): number => {
        if (!iconSize) return 100;
        return Math.max(100, Math.min(200, iconSize));
    }, [iconSize]);

    const getColor = useCallback(
        (color: string | undefined): string =>
            color || theme.colors.textPalette?.secondary || theme.colors.textPalette?.primary || theme.colors.text,
        [theme]
    );

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (icon) {
            return <Icon source={icon} size={normalizeIconSize()} color={getColor(iconColor)} />;
        }
    }, [icon, normalizeIconSize, getColor, iconColor]);

    return (
        <View style={[defaultStyles.root, styles.root, style, { padding: 8 }]} {...viewProps}>
            {getIcon()}
            <H6 style={[defaultStyles.title, styles.title]}>{title}</H6>
            {description ? (
                <Subtitle2 style={[defaultStyles.description, styles.description]}>{description}</Subtitle2>
            ) : null}
            {actions ? <View style={[defaultStyles.actions, styles.actions]}>{actions}</View> : null}
        </View>
    );
};
