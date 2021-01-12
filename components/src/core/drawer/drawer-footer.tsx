import React from 'react';
import { Divider } from 'react-native-paper';

export const DrawerFooter: React.FC<any> = (props) => {
    const { children, divider = true } = props;

    return (
        <>
            {divider && <Divider />}
            {children}
        </>
    );
};

DrawerFooter.displayName = 'DrawerFooter';
