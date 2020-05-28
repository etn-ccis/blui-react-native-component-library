import React, { Fragment } from 'react';
import { Subtitle } from '../typography';
import { interleave } from '../helpers/utils';

export const renderableSubtitleComponent = (element: React.ReactNode): React.ReactNode => {
    switch (typeof element) {
        case 'string':
        case 'number':
            return (
                <Subtitle numberOfLines={1} font={'regular'}>
                    {`${element}`}
                </Subtitle>
            );
        default:
            return element;
    }
};

export const interpunct = (separator?: string): JSX.Element => (
    <Subtitle style={{ marginHorizontal: 4 }} font={'regular'}>
        {separator || '\u00B7'}
    </Subtitle>
);
export const withKeys = (array: React.ReactNode[]): JSX.Element[] =>
    array.map((element, index) => <Fragment key={index}>{element}</Fragment>);
export const separate = (array: React.ReactNode[], separator?: string): React.ReactNode[] =>
    interleave(array, () => interpunct(separator));