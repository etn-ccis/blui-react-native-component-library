import React from 'react';
import { Text, TextProps, TextStyle, StyleProp, I18nManager, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { useFontScaleSettings } from '../__contexts__/font-scale-context';

export type TypographyProps = {
    /**
     * The font size to use
     */
    fontSize?: number;

    /**
     * The font style to use (from the predefined values in the Theme)
     */
    font?: keyof ReactNativePaper.Theme['fonts'];

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
    theme?: $DeepPartial<ReactNativePaper.Theme>;
} & TextProps;

/**
 * createTypography function
 * createTypography is a component-generator function. It returns a Text component styled based on
 * the getStyle function that is passed as an argument.
 *
 * @param getStyle a function that takes in a theme and returns a text style object
 * @returns a theme-wrapped text component that utilizes that styles and theme that are provided
 */
const createTypography =
    (getStyle: (theme: ReactNativePaper.Theme) => StyleProp<TextStyle>): React.FC<TypographyProps> =>
    ({ font, fontSize, color, style, styles = {}, ...props }): JSX.Element => {
        const theme = useTheme(props.theme);
        const { maxScale, minScale, disableScaling, adjustsFontSizeToFit } = useFontScaleSettings();

        let customStyle: StyleProp<TextStyle> = {};
        if (fontSize) {
            customStyle.fontSize = fontSize;
        }
        if (font) {
            customStyle = {
                ...customStyle,
                ...theme.fonts[font],
            };
        }
        let appliedColor = theme.colors.text;
        if (color) {
            if (['primary', 'accent', 'error', 'text', 'notification'].includes(color || ''))
                appliedColor = theme.colors[color as keyof ReactNativePaper.Theme['colors']] as string;
            else appliedColor = color;
        }
        return (
            <Text
                {...props}
                style={[
                    { color: appliedColor },
                    { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
                    Platform.OS === 'android' ? { textAlign: 'left' } : {},
                    getStyle(theme),
                    customStyle,
                    styles.root,
                    style,
                ]}
                allowFontScaling={!disableScaling}
                adjustsFontSizeToFit={adjustsFontSizeToFit}
                maxFontSizeMultiplier={maxScale}
                minimumFontScale={minScale}
            />
        );
    };

/**
 * [H1](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * An H1 heading
 */
export const H1 = createTypography((theme) => ({
    ...theme.fonts.light,
    fontSize: 96,
    letterSpacing: 0,
}));
/**
 * [H2](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * An H2 heading
 */
export const H2 = createTypography((theme) => ({
    ...theme.fonts.light,
    fontSize: 60,
    letterSpacing: 0,
}));
/**
 * [H3](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * An H3 heading
 */
export const H3 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 48,
    letterSpacing: 0,
}));
/**
 * [H4](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * An H4 heading
 */
export const H4 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 34,
    letterSpacing: 0,
}));
/**
 * [H5](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * An H5 heading
 */
export const H5 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 24,
    letterSpacing: 0,
}));
/**
 * [H6](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * An H6 heading (used commonly for titles)
 */
export const H6 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: 20,
    letterSpacing: 0,
}));
/**
 * [Body1](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * A text component used for most body copy
 */
export const Body1 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 16,
    letterSpacing: 0,
}));
/**
 * [Body2](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * A text component used for alternative body copy
 */
export const Body2 = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 14,
    letterSpacing: 0,
}));
/**
 * [Label](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * A secret, undocumented text component used for some labels in very specific places.
 *
 * Not intended for general use.
 */
export const Label = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 16,
    letterSpacing: 0,
}));
/**
 * [Subtitle1](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * A subtitle component
 */
export const Subtitle1 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: 16,
    letterSpacing: 0,
}));
/**
 * [Subtitle2](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * An alternative subtitle component
 */
export const Subtitle2 = createTypography((theme) => ({
    ...theme.fonts.medium,
    fontSize: 14,
    letterSpacing: 0,
}));
/**
 * [Button](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * A text component used for button labels
 */
export const Button = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 14,
    letterSpacing: 0,
}));
/**
 * [Caption](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * A text component used for image captions
 */
export const Caption = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 12,
    letterSpacing: 0,
}));
/**
 * [Overline](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography) component
 *
 * An all-caps text component used for specific labeling situations.
 */
export const Overline = createTypography((theme) => ({
    ...theme.fonts.regular,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
}));
