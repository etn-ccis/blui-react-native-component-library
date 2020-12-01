import React from 'react';
import { TextStyle, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Color from 'color';
import { white } from '@pxblue/colors';
import { Overline, TypographyProps } from '../typography';

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
    theme: ReactNativePaper.Theme
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
            height: 16,
            padding: 0,
            paddingLeft: 4,
            paddingRight: 3, // to account for the 1px letter spacing on the last letter
            borderRadius: 2,
            // @ts-ignore TODO: bold font is not available from default RNP theming yet
            fontFamily: theme.fonts.bold ? theme.fonts.bold.fontFamily : theme.fonts.medium.fontFamily,
            // @ts-ignore TODO: bold font is not available from default RNP theming yet
            fontWeight: theme.fonts.bold ? theme.fonts.bold.fontWeight : theme.fonts.medium.fontWeight,
            overflow: 'hidden',
            lineHeight: 16,
            fontSize: 10,
            letterSpacing: 1,
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
