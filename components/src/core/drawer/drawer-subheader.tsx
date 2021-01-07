import React from 'react';
import { View } from 'react-native';

export const DrawerSubheader: React.FC<any> = (props) => {
    const { children, hideContentOnCollapse = true, open = false } = props;

    return <View style={{ opacity: (!hideContentOnCollapse && !open) || open ? 1 : 0 }}>{children}</View>;
};

DrawerSubheader.displayName = 'DrawerSubheader';
