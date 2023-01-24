import React, { Fragment } from 'react';
import { Body2 } from '../typography';
import { interleave } from '../helpers/utils';
import { StyleProp, TextStyle } from 'react-native';

const renderBodyComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>,
    isWrapped = false
): React.ReactNode => {
    switch (typeof element) {
        case 'string':
        case 'number':
            return (
                <Body2 numberOfLines={isWrapped ? 0 : 1} style={style}>
                    {`${element}`}
                </Body2>
            );
        default:
            return element;
    }
};

export const renderableSubtitleComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>,
    wrapSubtitle = false
): React.ReactNode => renderBodyComponent(element, style, wrapSubtitle);

export const renderableInfoComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>,
    wrapInfo = false
): React.ReactNode => renderBodyComponent(element, style, wrapInfo);

export const interpunct = (separator?: string, style?: StyleProp<TextStyle>): JSX.Element => (
    <Body2 style={[{ marginHorizontal: 4 }, style]}>{separator || '\u00B7'}</Body2>
);
export const withKeys = (array: React.ReactNode[]): JSX.Element[] =>
    array.map((element, index) => <Fragment key={index}>{element}</Fragment>);
export const separate = (array: React.ReactNode[], separator?: string): React.ReactNode[] =>
    interleave(array, () => interpunct(separator));
