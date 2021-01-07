import React from 'react';
import { Divider } from 'react-native-paper';

export const DrawerFooter: React.FC<any> = (props) => {
    const { children, divider = true, hideContentOnCollapse = true, open = false } = props;

    return (
        ((!hideContentOnCollapse && !open) || open) && (
            <>
                {divider && <Divider />}
                {children}
            </>
        )
    );
};

DrawerFooter.displayName = 'DrawerFooter';
