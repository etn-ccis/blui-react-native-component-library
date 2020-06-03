import React, { Fragment } from 'react';
import { Subtitle2 } from '../typography';
import { interleave } from '../helpers/utils';

export const renderableSubtitleComponent = (element: React.ReactNode): React.ReactNode => {
    switch (typeof element) {
        case 'string':
        case 'number':
            return (
                <Subtitle2 numberOfLines={1} font={'regular'}>
                    {`${element}`}
                </Subtitle2>
            );
        default:
            return element;
    }
};

export const interpunct = (separator?: string): JSX.Element => (
    <Subtitle2 style={{ marginHorizontal: 4 }} font={'regular'}>
        {separator || '\u00B7'}
    </Subtitle2>
);
export const withKeys = (array: React.ReactNode[]): JSX.Element[] =>
    array.map((element, index) => <Fragment key={index}>{element}</Fragment>);
export const separate = (array: React.ReactNode[], separator?: string): React.ReactNode[] =>
    interleave(array, () => interpunct(separator));
