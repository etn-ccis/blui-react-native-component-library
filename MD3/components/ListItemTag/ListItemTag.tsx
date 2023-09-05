import React from 'react';
import { TextStyle,TextProps,StyleProp, StyleSheet } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import Color from 'color';
import { white, black } from '@brightlayer-ui/colors';
import { useFontScale } from '../__contexts__/font-scale-context';
import { $DeepPartial } from '@callstack/react-theme-provider';

export type TypographyProps = {
    /**
     * The font size to use
     */
    fontSize?: number;

    /**
     * The font style to use (from the predefined values in the Theme)
     */
    font?: keyof MD3Theme['fonts'];

    /**
     * The color to use for the text (from the predefined values in the Theme or custom)
     */
    color?: string;

    /** Style overrides for internal elements. The styles you provide will be combined with the default styles. */
    styles?: {
        root?: StyleProp<TextStyle>;
    };

    /**
     * Theme value overrides specific to this component.
     */
    theme?: $DeepPartial<MD3Theme>;
} & TextProps;

export type ListItemTagProps = TypographyProps & {
    /**
     * Background color for the label.
     *
     * Default: Theme.colors.primary
     **/
    backgroundColor?: string;

    /**
     * Text color for the label.
     *
     * Default: Theme.colors.onBackground for light background,
     * or white[50] on dark background
     */
    fontColor?: string;

    /** The label text. */
    label: string;
};

const listItemTagStyles = (
    props: ListItemTagProps,
    theme: MD3Theme,
    fontScale: number
): StyleSheet.NamedStyles<{
    root: TextStyle;
}> =>
    StyleSheet.create({
        root: {
            backgroundColor: props.backgroundColor || theme.colors.primary,
            color:
                props.fontColor ||
                (Color(props.backgroundColor || theme.colors.primary).isLight()
                    ? theme.dark
                        ? black[500]
                        : theme.colors.primary
                    : white[50]),
            height: 16 * fontScale,
            padding: 0,
            paddingLeft: 4 * fontScale,
            paddingRight: 3 * fontScale, // to account for the 1px letter spacing on the last letter
            borderRadius: 2 * fontScale,
            fontWeight: '700',
            overflow: 'hidden',
            lineHeight: 16,
            fontSize: 12,
            letterSpacing: 2,
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
        // ignore unused vars so that we can do prop transferring to the root element
        /* eslint-disable @typescript-eslint/no-unused-vars */
        fontColor,
        backgroundColor,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...otherTextProps
    } = props;
    const theme = useTheme(themeOverride);
    const fontScale = useFontScale();
    const defaultStyles = listItemTagStyles(props, theme, fontScale);

    return (
        <Text variant={'bodyMedium'} style={[defaultStyles.root, styles.root, style]} {...otherTextProps}>
            {label}
        </Text>
    );
};

ListItemTag.displayName = 'ListItemTag';
