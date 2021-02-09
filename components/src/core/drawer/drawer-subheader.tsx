import React from 'react';
import { Divider } from 'react-native-paper';

export const DrawerSubheader: React.FC<any> = (props) => {
    const { children, divider = true } = props;

    return (
        <>
            {children}
            {divider && <Divider />}
        </>
    );
};

DrawerSubheader.displayName = 'DrawerSubheader';
