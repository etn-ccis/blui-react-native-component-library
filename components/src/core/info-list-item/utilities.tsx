import React, { Fragment } from 'react';
import { Subtitle2 } from '../typography';
import { interleave } from '../helpers/utils';
import { StyleProp, TextStyle } from 'react-native';

export const renderableSubtitleComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>
): React.ReactNode => {
    switch (typeof element) {
        case 'string':
        case 'number':
            return (
                <Subtitle2 numberOfLines={1} font={'regular'} style={style}>
                    {`${element}`}
                </Subtitle2>
            );
        default:
            return element;
    }
};

export const interpunct = (separator?: string, style?: StyleProp<TextStyle>): JSX.Element => (
    <Subtitle2 style={[{ marginHorizontal: 4 }, style]} font={'regular'}>
        {separator || '\u00B7'}
    </Subtitle2>
);
export const withKeys = (array: React.ReactNode[]): JSX.Element[] =>
    array.map((element, index) => <Fragment key={index}>{element}</Fragment>);
export const separate = (array: React.ReactNode[], separator?: string): React.ReactNode[] =>
    interleave(array, () => interpunct(separator));
