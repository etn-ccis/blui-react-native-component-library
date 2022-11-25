import React, { Fragment } from 'react';
import { Body2 } from '../typography';
import { interleave } from '../helpers/utils';
import { StyleProp, TextStyle } from 'react-native';
import { useFontScaleContext } from '..';

export const renderableSubtitleComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>
): React.ReactNode => {
    const { maxScaleFont, disableFontScaling } = useFontScaleContext();

    switch (typeof element) {
        case 'string':
        case 'number':
            return (
                <Body2
                    numberOfLines={1}
                    style={style}
                    maxFontSizeMultiplier={maxScaleFont}
                    allowFontScaling={!disableFontScaling}
                >
                    {`${element}`}
                </Body2>
            );
        default:
            return element;
    }
};

export const interpunct = (separator?: string, style?: StyleProp<TextStyle>): JSX.Element => {
    const { maxScaleFont, disableFontScaling } = useFontScaleContext();

    return (
        <Body2
            style={[{ marginHorizontal: 4 }, style]}
            maxFontSizeMultiplier={maxScaleFont}
            allowFontScaling={!disableFontScaling}
        >
            {separator || '\u00B7'}
        </Body2>
    );
};
export const withKeys = (array: React.ReactNode[]): JSX.Element[] =>
    array.map((element, index) => <Fragment key={index}>{element}</Fragment>);
export const separate = (array: React.ReactNode[], separator?: string): React.ReactNode[] =>
    interleave(array, () => interpunct(separator));
