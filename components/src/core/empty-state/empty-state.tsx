import React, { ComponentType, useCallback, useEffect } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, ViewProps, PixelRatio } from 'react-native';
import { useTheme } from 'react-native-paper';
import { H6, Subtitle2 } from '../typography';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { WrapIconProps } from '../icon-wrapper';

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
            // @ts-ignore
            color: theme.dark ? theme.colors.textSecondary : theme.colors.text,
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

    /** A component to render for the primary icon
     *
     * @deprecated in version 6.0.0
     */
    IconClass?: ComponentType<WrapIconProps>;

    /** A component to render for the primary icon */
    icon?: ComponentType<WrapIconProps>;

    /**
     * Props to spread to the primary icon component
     *
     * @deprecated in version 6.0.0
     */
    IconProps?: { size?: number; color?: string };

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
 * [EmptyState](https://pxblue-components.github.io/react-native/?path=/info/components-documentation--empty-state) component
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
        IconClass,
        icon: iconProp,
        iconColor,
        iconSize,
        IconProps = {},
        styles = {},
        style,
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);
    const defaultStyles = makeStyles(theme, PixelRatio.getFontScale());

    // Compatibility to facilitate updates
    const Icon = iconProp || IconClass;
    // Deprecation Warning
    useEffect(() => {
        // TODO Update docs
        if (IconClass) {
            // eslint-disable-next-line no-console
            console.warn(
                `Property 'IconClass' in EmptyState component has been deprecated and will be removed in version 6.0.0. You should update to use the renamed 'icon' prop instead.`
            );
        }
    }, [IconClass]);
    useEffect(() => {
        if (IconProps) {
            // eslint-disable-next-line no-console
            console.warn(
                `Property 'IconProps' in EmptyState component has been deprecated and will be removed in version 6.0.0. You should update to use the 'iconColor' and 'iconSize' props instead.`
            );
        }
    }, [IconProps]);

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
        if (Icon) {
            return <Icon size={normalizeIconSize()} color={getColor(iconColor)} {...IconProps} />;
        }
    }, [Icon, IconProps, normalizeIconSize, getColor, iconColor]);

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {getIcon()}
            <H6 style={[defaultStyles.title, styles.title]}>{title}</H6>
            {description ? (
                <Subtitle2 style={[defaultStyles.description, styles.description]}>{description}</Subtitle2>
            ) : null}
            {actions ? <View style={[defaultStyles.actions, styles.actions]}>{actions}</View> : null}
        </View>
    );
};
