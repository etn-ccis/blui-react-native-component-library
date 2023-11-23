import React, { Fragment } from 'react';
import { interleave } from '../Helpers/Utils';
import { StyleProp, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';

const renderSubtitleComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>,
    isWrapped = false
): React.ReactNode => {
    switch (typeof element) {
        case 'string':
        case 'number':
            return (
                <Text variant={'bodyMedium'} numberOfLines={isWrapped ? 0 : 1} style={style}>
                    {`${element}`}
                </Text>
            );
        default:
            return element;
    }
};

const renderInfoComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>,
    isWrapped = false
): React.ReactNode => {
    switch (typeof element) {
        case 'string':
        case 'number':
            return (
                <Text variant={'bodySmall'} numberOfLines={isWrapped ? 0 : 1} style={style}>
                    {`${element}`}
                </Text>
            );
        default:
            return element;
    }
};

export const renderableSubtitleComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>,
    wrapSubtitle = false
): React.ReactNode => renderSubtitleComponent(element, style, wrapSubtitle);

export const renderableInfoComponent = (
    element: React.ReactNode,
    style?: StyleProp<TextStyle>,
    wrapInfo = false
): React.ReactNode => renderInfoComponent(element, style, wrapInfo);

export const interpunct = (separator?: string, style?: StyleProp<TextStyle>): JSX.Element => (
    <Text variant={'bodySmall'} style={[{ marginHorizontal: 4 }, style]}>
        {separator || '\u00B7'}
    </Text>
);
export const withKeys = (array: React.ReactNode[]): JSX.Element[] =>
    array.map((element, index) => <Fragment key={index}>{element}</Fragment>);
export const separate = (array: React.ReactNode[], separator?: string): React.ReactNode[] =>
    interleave(array, () => interpunct(separator));
