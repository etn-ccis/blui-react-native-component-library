import React from 'react';
import { TextStyle, StyleSheet } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';
import Color from 'color';
import { white } from '@pxblue/colors';
import { Overline, TypographyProps } from '..';

export type ListItemTagProps = TypographyProps & {
    /**
     * Color of the label background. Default is theme.colors.primary
     **/
    backgroundColor?: string;

    /**
     * Color of the label. Default is theme.colors.onBackground for light background,
     * or white[50] on dark background
     */
    fontColor?: string;

    /** The string label of the tag. */
    label: string;
};

const listItemTagStyles = (
    props: ListItemTagProps,
    theme: Theme
): StyleSheet.NamedStyles<{
    root: TextStyle;
}> =>
    StyleSheet.create({
        root: {
            backgroundColor: props.backgroundColor || theme.colors.primary,
            color:
                props.fontColor ||
                (Color(props.backgroundColor || theme.colors.primary).isLight()
                    ? theme.colors.onBackground
                    : white[50]),
            padding: 0,
            paddingLeft: 4,
            paddingRight: 4,
            borderRadius: 2,
            fontFamily: theme.fonts.medium.fontFamily,
            fontWeight: theme.fonts.medium.fontWeight,
            overflow: 'hidden',
        },
    });

/**
 * a text item with a colored background and rounded corners that is used to tag lists.
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
    const defaultStyles = listItemTagStyles(props, theme);

    return (
        <Overline style={[defaultStyles.root, styles.root, style]} {...otherTextProps}>
            {label}
        </Overline>
    );
};

ListItemTag.displayName = 'ListItemTag';
