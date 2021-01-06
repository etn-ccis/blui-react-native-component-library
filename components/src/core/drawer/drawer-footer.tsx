import React from 'react';
import { Divider } from 'react-native-paper';

export const DrawerFooter: React.FC<any> = (props) => {
  const {divider = true, children} = props;

  return (
    <>
      {divider && (<Divider />)}
      {children}
    </>
  )
}

DrawerFooter.displayName = 'DrawerFooter';
