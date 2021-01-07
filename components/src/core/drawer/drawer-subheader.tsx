import React from 'react';

export const DrawerSubheader: React.FC<any> = (props) => {
    const { children, hideContentOnCollapse = true, open = false } = props;

    return ((!hideContentOnCollapse && !open) || open) && children;
};

DrawerSubheader.displayName = 'DrawerSubheader';
