import React from 'react';
import { TextStyle, StyleProp, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useFontScale } from '../__contexts__/font-scale-context';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { calculateHeight } from '../Utility/shared';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

export type ListItemTagProps = Omit<React.ComponentProps<typeof Text>, 'children' | 'theme' | 'variant'> & {
    /**
     * Background color for the label.
     *
     * Default: Theme.colors.primary
     **/
    backgroundColor?: string;

    /**
     * Text color for the label.
     *
     * Default: Theme.colors.onPrimary
     */
    fontColor?: string;
    /**
     * The font size to use
     */
    fontSize?: number;

    /** The label text. */
    label: string;
    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<ExtendedTheme>;
};

const listItemTagStyles = (
    props: ListItemTagProps,
    theme: ExtendedTheme,
    fontScale: number,
    fontSize: number
): StyleSheet.NamedStyles<{
    root: TextStyle;
}> =>
    StyleSheet.create({
        root: {
            backgroundColor: props.backgroundColor || theme.colors.primary,
            color: props.fontColor || theme.colors.onPrimary,
            height: calculateHeight(fontSize) * fontScale,
            padding: 0,
            paddingLeft: 4 * fontScale,
            paddingRight: 3 * fontScale, // to account for the 1px letter spacing on the last letter
            borderRadius: 2 * fontScale,
            fontWeight: '700',
            fontFamily: 'OpenSans-Bold',
            overflow: 'hidden',
            lineHeight: calculateHeight(fontSize),
            fontSize,
            letterSpacing: 1,
            textTransform: 'uppercase',
        },
    });

/**
 * [ListItemTag](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--list-item-tag) component
 *
 * This component is primarily used as a tag for list elements. It is a stylized
 * text item with a colored background and rounded corners.
 */
export const ListItemTag: React.FC<ListItemTagProps> = (props) => {
    const {
        label,
        style,
        styles = {},
        theme: themeOverride,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        fontColor,
        backgroundColor,
        ...otherTextProps
    } = props;
    const theme = useExtendedTheme(themeOverride);
    const fontScale = useFontScale();
    const defaultStyles = listItemTagStyles(props, theme, fontScale, props.fontSize || 10);

    return (
        <Text variant={'bodyMedium'} style={[defaultStyles.root, styles.root, style]} {...otherTextProps}>
            {label}
        </Text>
    );
};

ListItemTag.displayName = 'ListItemTag';
