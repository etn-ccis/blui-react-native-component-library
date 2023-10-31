import React from 'react';
import { Avatar, MD3Theme, useTheme } from 'react-native-paper';
import { $DeepPartial } from '@callstack/react-theme-provider';

export type GradesProps = {
  label: string;
  color?: string;
  backgroundColor?: string;
};

const Grade: React.FC<GradesProps> = ({ label, color, backgroundColor, }) => {

  const avatarStyle = {
    backgroundColor: backgroundColor 
  };

  const textStyle = {
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700' as const,
  };

  return (
    <Avatar.Text
      label={label}
      style={avatarStyle}
      color={color || '#fff'}
      labelStyle={textStyle}
    />
  );
};

export const Grades = {
    A: () => <Grade label="A" backgroundColor='#32CD32' />,
    APlus: () => <Grade label="A+" backgroundColor='#097969' />,
    ANeg: () => <Grade label="A-" backgroundColor='#90EE90' />,
    B: () => <Grade label="B" backgroundColor='#FDDA0D' />,
  };
  
// export const APlus: React.FC = () => (
//     <Grade label='A+' backgroundColor='#097969' />
//   );
  
//   export const A: React.FC = () => (
//     <Grade label='A' backgroundColor='#32CD32' />
//   );
  
//   export const ANeg: React.FC = () => (
//     <Grade label='A-' backgroundColor='#90EE90' />
//   );
  
//   export const B: React.FC = () => (
//     <Grade label='B' backgroundColor='#FDDA0D' />
//   );
  


