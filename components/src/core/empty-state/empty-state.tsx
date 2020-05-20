import React, { Component, ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme, withTheme } from 'react-native-paper';
import { H6, Subtitle } from '../typography';
import { WithTheme } from '../__types__';

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

class EmptyStateClass extends Component<WithTheme<EmptyStateProps>> {
    render(): JSX.Element {
        const { title, description, actions } = this.props;
        return (
            <View style={styles.container}>
                {this.icon()}
                <H6 style={{ textAlign: 'center' }}>{title}</H6>
                {description ? (
                    <Subtitle color={'primary'} style={{ textAlign: 'center' }}>
                        {description}
                    </Subtitle>
                ) : null}
                {actions ? <View style={{ marginTop: 10 }}>{actions}</View> : null}
            </View>
        );
    }
    private icon(): JSX.Element | undefined {
        const { IconClass, iconColor } = this.props;
        if (IconClass) {
            return <IconClass size={this.normalizeIconSize()} color={this.getColor(iconColor)} />;
        }
    }
    private normalizeIconSize(): number {
        const { iconSize } = this.props;
        if (!iconSize) return 100;
        return Math.max(100, Math.min(200, iconSize));
    }
    private getColor(color: string | undefined): string {
        const { theme } = this.props;
        if (!color) return theme.colors.text;
        if (Object.keys(theme.colors).indexOf(color) >= 0) return theme.colors[color as keyof Theme['colors']];
        return color;
    }
}
/**
 * Empty State component
 *
 * Used as a placeholder when no content is available for a particular area/screen in your application.
 */
export const EmptyState = withTheme(EmptyStateClass);
